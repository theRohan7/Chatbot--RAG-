import { log } from "console";
import { askOpenAI } from "../services/askOpenAI.js";
import { generateAndStoreEmbeddings } from "../services/embeddings.js";
import { createChunks } from "../utils/chunkTexts.js";
import { parseFile } from "../utils/ParseFile.js";
import fs, { stat } from "fs";

export const  configureChatbot = async (req, res, next) => {
    try {
        if(!req.file) {
            return res
            .status(400)
            .json({error: "No file uploaded"});
        }

        const splitDocs = await parseFile(req.file.path);
        const chunks = await createChunks(splitDocs);
        await generateAndStoreEmbeddings(chunks);

        fs.unlinkSync(req.file.path);

        return res
        .status(201)
        .json({message: "Chatbot configured successfully"});


    } catch (error) {
        console.error("Error while configuring chatbot:", error);
        throw error;
    }
}


export const  chatController = async (req, res) => {
try {
    const {question, chatHistory = []} = req.body;
    console.log(question)
    const response = await askOpenAI(question, chatHistory);

    return res
    .status(200)
    .json({
        status: "success",
        response: response.content,
        updatedChatHistory: response.chatHistory
    })
    
} catch (error) {
    console.error("Error getting response from chatbot:", error);
    throw error;
}
}