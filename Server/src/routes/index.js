import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { chatController, configureChatbot } from "../controllers/configureChatbot.js";

const router = Router();


router.route('/upload').post(upload.single('file'), configureChatbot)
router.route('/chat').post( chatController)




export default router;