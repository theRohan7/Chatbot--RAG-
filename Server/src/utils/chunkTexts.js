import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";

export const createChunks= async(docs) => {

    try {

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 300,
            chunkOverlap: 20,
        })


        const chunks = await Promise.all(
            docs.map(async (doc, originalIndex) => {
                const textChunks = await splitter.splitText(doc.pageContent);



                return textChunks.map((chunk, chunkIndex) => 
                    new Document({
                        pageContent: chunk,
                        metadata: {
                            ...doc.metadata,
                            originalDocIndex: originalIndex,
                            index: chunkIndex,
                            totalChunks: textChunks.length
                        }
                    }))
            })
        )

        return chunks.flat();
        
    } catch (error) {
        console.error("Error splitting documents into chunks:", error);
       throw error;
        
    }
    
}