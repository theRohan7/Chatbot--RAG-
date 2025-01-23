export const config = {
    openAIApiKey: process.env.OPENAI_API_KEY,
    pineconeApiKey: process.env.PINECONE_API_KEY,
    pineconeIndexName: process.env.PINECONE_INDEX,
    namespace: "my-document-namespace", // Optional
    modelName: "text-embedding-3-large" // Optional
  };