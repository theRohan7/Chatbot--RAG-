import dotenv from "dotenv";
import express from "express";
import cors from 'cors';

const app = express();

dotenv.config({
  path: "./env",
});

app.use(express.json({ limit: "16kb"}))
app.use(express.urlencoded({ extended:true, limit: "16kb"}))
app.use(express.static("uploads"));

const allowedOrigins = [
  "http://localhost:5173",
]

app.use(cors({
  origin: function (origin, callback) {
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORSpolicy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));


const startServer = async () => {
  try {
    app.listen(process.env.PORT || 8001, () => {
      console.log(`Server running on port ${process.env.PORT || 8001}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer()


app.get('/', (req, res) => {
  res.send(`Hello World, Connected to DB Successfully!`);
})

