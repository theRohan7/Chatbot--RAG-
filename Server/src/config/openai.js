import { ChatOpenAI } from "@langchain/openai";


const openai = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0.8
})

export default openai