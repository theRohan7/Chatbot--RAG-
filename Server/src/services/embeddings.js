import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { config } from "../config/config.js";

 const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
})


// const  pinconeIndex = await pineconeInstance.createIndex({
//     name: 'chatbot2',
//     dimension: 1536, 
//     metric: 'cosine', 
//     spec: { 
//         serverless: { 
//             cloud: 'aws', 
//             region: 'us-east-1' 
//         }
//     } 
// });


const pineconeIndex = pinecone.Index('chatbot2');



const generateAndStoreEmbeddings = async(chunks) => {
    try {
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: process.env.OPENAI_API_KEY
        })
        console.log("Preparing documents for embedding...");

        const texts = chunks.map((chunk) => chunk.pageContent)
        const metadata = chunks.map((chunk, idx) =>({
            id: `chunk-${chunk.metadata.index || idx}`,
            source: chunk.metadata.source || 'unknown',
            ...chunk.metadata
        }) );
        console.log("Generating embeddings for documents...");

        const store = await PineconeStore.fromTexts(
            texts,
            metadata,
            embeddings,
            {
                pineconeIndex: pineconeIndex ,
            }
        )
        console.log("Embeddings successfully generated and stored in Pinecone.");
        
    } catch (error) {
        console.error("Error while generating and storing embeddings:", error);
        throw new Error("Failed to generate and store embeddings."); 
    }
    
}


export {generateAndStoreEmbeddings, pinecone}
