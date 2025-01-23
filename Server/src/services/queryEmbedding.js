import { OpenAIEmbeddings } from "@langchain/openai";

import { PineconeStore } from "@langchain/pinecone";
import { pinecone } from "./embeddings.js";




export const queryEmbeddings = async(query) => {
    try {
        const embeddings =  new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY
        })
        console.log("Preparing query for embedding...");
    
        const index = pinecone.Index('chatbot2');
    
    
        const vectorStore = await PineconeStore.fromExistingIndex(
            embeddings,
            {
                pineconeIndex: index
            }
        );
    
    
        const result = await vectorStore.similaritySearch(
            query,
            2
        )
        
        return result;
        
    } catch (error) {
        console.error("Error while querying embeddings:", error);
        throw error;
    }

}