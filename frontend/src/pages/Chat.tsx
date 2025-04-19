// Kunal Sharma 2023UMA0221 Mathematics and Computing

import React from 'react'
import { useState, useRef, useEffect } from 'react';
import '../styles/chat.css';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  // Add more languages as needed
];

function Chat() {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot', timestamp: Date}>>([
    {
      text: "Hi there! I'm Svaran, the IIT Jammu chatbot. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const [shouldScroll, setShouldScroll] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (messagesEndRef.current && shouldScroll) {
      // Use this technique to scroll without moving the whole page
      messagesEndRef.current.scrollIntoView({ block: 'end', inline: 'nearest' });
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);

  useEffect(() => {
    const handleResize = () => {
      // Only update if there's a significant change
      if (Math.abs(window.innerHeight - windowHeight) > 100) {
        setWindowHeight(window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowHeight]);

  const handleSend = async () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    setShouldScroll(true); // Set flag to scroll after user sends message

    setTimeout(async () => {
      let botText = getBotResponse(inputMessage);
      if (language !== 'en') {
        botText = await translateText(botText, language);
      }
      const botResponse = {
        text: botText,
        sender: 'bot' as const,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Dummy Google Translate API call (replace with real API in production)
  const translateText = async (text: string, targetLang: string) => {
    if (targetLang === 'en') return text;
    // Replace this with actual Google Translate API call
    // For demo, just append language code
    return `[${targetLang}] ${text}`;
  };

  const getBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Hello! How can I help you with information about IIT Jammu?";
    } else if (lowerInput.includes('course') || lowerInput.includes('program')) {
      return "IIT Jammu offers various undergraduate, postgraduate, and doctoral programs in engineering, sciences, and humanities.";
    } else if (lowerInput.includes('admission') || lowerInput.includes('apply')) {
      return "Admissions to undergraduate programs at IIT Jammu are through JEE Advanced. For postgraduate programs, GATE scores are considered.";
    } else if (lowerInput.includes('location') || lowerInput.includes('address')) {
      return "IIT Jammu is located in Jammu, Jammu and Kashmir, India.";
    } else if (lowerInput.includes('hostel') || lowerInput.includes('accommodation')) {
      return "IIT Jammu provides hostel facilities for students with modern amenities.";
    } else if (lowerInput.includes('faculty') || lowerInput.includes('professor')) {
      return "IIT Jammu has highly qualified faculty members from prestigious institutions across India and abroad.";
    } else if (lowerInput.includes('thank')) {
      return "You're welcome! Feel free to ask if you have more questions.";
    } else {
      return "I'm still learning about IIT Jammu. Could you please ask something else or rephrase your question?";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleNewChat = () => {
    setMessages([
      {
        text: "Hi there! I'm Svaran, the IIT Jammu chatbot. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setInputMessage('');
  };

  return (
    <div className="chat-page appear">
      <div 
        className="chat-container" 
        style={{ height: `${windowHeight - 180}px` }} // Fixed height based on initial load
      >
        <div className="chat-header">
          <div className="chat-title">
            <img src="/src/assets/icon.png" alt="Svaran" className="chat-avatar" />
            <div>
              <h1>Svaran</h1>
              <p>IIT Jammu Chatbot</p>
            </div>
          </div>
          <div className="chat-controls">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="language-dropdown"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
            <button onClick={handleNewChat} className="new-chat-button">
              New Chat
            </button>
          </div>
        </div>

        <div className="messages-container" style={{ position: 'relative' }}>
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} style={{ position: 'absolute', bottom: 0, height: 0 }} />
        </div>

        <div className="input-area">
          <textarea 
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={inputMessage.trim() === ''}
            className="send-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
