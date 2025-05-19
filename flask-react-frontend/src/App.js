import React, { useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'You', text: message };
    setChatHistory([...chatHistory, userMessage]);

    const response = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const botMessage = { sender: 'Bot', text: data.reply };

    setChatHistory([...chatHistory, userMessage, botMessage]);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat with Flask Bot</h1>
      <div className="chat-box">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender === 'You' ? 'user' : 'bot'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
