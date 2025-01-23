import { AIMessage, HumanMessage } from "@langchain/core/messages";
import openai from "../config/openai.js";
import { queryEmbeddings } from "./queryEmbedding.js";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";





const manageChatHistory = async(chatHistory = []) => {

    const limitedHistory = chatHistory.slice(-8)

    return limitedHistory.map(message => {
        if(message.role === 'human'){
            return new HumanMessage(message.content);
        } else if(message.role === 'ai'){
            return new AIMessage(message.content);
        }
        return message;

    })
}




export const askOpenAI = async (question, chatHistory =[]) => {
    try {
        const processedChatHistory = await manageChatHistory(chatHistory);
    
        const resultDocs = await queryEmbeddings(question);

        const template = ChatPromptTemplate.fromMessages([
            [
                'system',
                "You are a helpful assistant. Answer the user's question based on the following context: {context}. Use the chat history to provide more personalized and contextually relevant responses.",
            ],
            new MessagesPlaceholder("chat_history"),
            ["user", "{question}"],
        ]);

        const chain = template.pipe(openai);
        const response = await chain.invoke({
            question,
            context: resultDocs.map((doc) => doc.pageContent).join("\n"),
            chat_history: processedChatHistory
        })

        console.log(response.content);
        return {
            content: response.content,
            chatHistory: [
                ...processedChatHistory,
                new HumanMessage(question),
                new AIMessage(response.content)
            ]
        };
        
    } catch (error) {
        console.error("Error in askOpenAI:", error);
        throw error;
    }
}