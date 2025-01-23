import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import axios from 'axios';

const CreateBot = () => {
  const [file, setFile] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(null);
  };

  const handleConfigure = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const allowedTypes = ['application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only PDF and TXT files are allowed');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('https://rag-chatbot-atr7.onrender.com/api/v1/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setIsConfigured(true);
      setLoading(false);
    } catch (err) {
      setError('Failed to configure chatbot');
      setLoading(false);
    }
  };

  if (isConfigured) {
    return <ChatInterface />;
  }

  return (
    <div className="create-bot-container">
      <div className="create-bot-card">
      <img src="../public/chatbot.png" alt="" />
        <h2>Configure Your Chatbot</h2>
        <span>Feed your Data!!</span>
        <input 
          type="file" 
          accept=".pdf,.txt"
          onChange={handleFileChange}
          className="file-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button 
          onClick={handleConfigure}
          disabled={loading}
          className="configure-btn"
        >
          {loading ? 'Configuring...' : 'Configure Chatbot'}
        </button>
      </div>
    </div>
  );
};

export default CreateBot;