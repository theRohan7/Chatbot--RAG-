import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";


const parseFile = async (filepath) => {

  try {

    const fileExtension = filepath.split('.').pop().toLowerCase();

    switch(fileExtension) {
      case 'pdf':
        const pdfLoader = new PDFLoader(filepath);
        return await pdfLoader.load();
      case 'txt':
        const textLoader = new TextLoader(filepath);
        return await textLoader.load();
      default:
        throw new Error(`Unsupported file type: .${fileExtension}`);
    } 

  } catch (error) {
    console.log("Error in parsing file: ", error);
    throw error
    
  }
}

export {parseFile}

