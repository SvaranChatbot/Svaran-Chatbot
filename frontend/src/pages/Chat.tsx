import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/chat.css';
import icon from "../assets/icon.png"

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'bn', name: 'Bengali' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'ur', name: 'Urdu' }
];

// Define backend URL here
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL; // Update this whenever needed

function Chat() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot'; timestamp: Date }>>([
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
    if (shouldScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      setShouldScroll(false);
    }
  }, [messages, shouldScroll]);

  useEffect(() => {
    const handleResize = () => {
      if (Math.abs(window.innerHeight - windowHeight) > 100) {
        setWindowHeight(window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowHeight]);

  useEffect(() => {
    axios.post(`${BACKEND_URL}/set_language`, { language })
      .then(res => console.log(res.data))
      .catch(err => console.error('Error setting language:', err));
  }, [language]);

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
    setShouldScroll(true);

    try {
      const res = await axios.post(`${BACKEND_URL}/predict`, { message: inputMessage });
      const botMessage = {
        text: res.data.answer,
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setShouldScroll(true);
    } catch (err) {
      setMessages(prev => [...prev, {
        text: "Sorry, something went wrong!",
        sender: 'bot',
        timestamp: new Date()
      }]);
      setShouldScroll(true);
      console.error(err);
    } finally {
      setIsTyping(false);
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
    setShouldScroll(true);
  };

  return (
    <div className="chat-page appear">
      <div className="chat-container" style={{ height: `${windowHeight - 180}px` }}>
        <div className="chat-header">
          <div className="chat-title">
            <img src={icon} alt="Svaran" className="chat-avatar" />
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

        <div className="messages-container">
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
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
          />
          <button onClick={handleSend} disabled={inputMessage.trim() === ''} className="send-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
