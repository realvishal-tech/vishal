import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  Copy,
  RotateCcw,
  Zap,
  MessageSquare,
} from 'lucide-react';

function ChatInterface({ studentInfo }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content:
        'Hi! 👋 I\'m your BCA Assistant. I can help you with Java, Python, C++, DBMS, OS, and more. What would you like to learn today?',
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('concept');
  const messagesEndRef = useRef(null);

  const modes = [
    { id: 'exam', label: '📝 Exam', desc: 'Short concise answers' },
    { id: 'concept', label: '🧠 Concept', desc: 'Easy to understand' },
    { id: 'practice', label: '🎯 Practice', desc: 'Practice problems' },
    { id: 'assignment', label: '📋 Assignment', desc: 'Structured solutions' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, mode }),
      });

      const data = await response.json();

      if (data.success) {
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: data.message,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: messages.length + 2,
          type: 'bot',
          content:
            '❌ Sorry, I encountered an error. Please check the API key in your environment variables and try again.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content:
          '❌ Connection error. Make sure your OpenAI API key is configured in the environment variables.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    alert('Copied to clipboard!');
  };

  const handleRegenerate = (index) => {
    const originalMessage = messages[index - 1];
    if (originalMessage) {
      setInput(originalMessage.content);
      setMessages((prev) => prev.slice(0, index - 1));
    }
  };

  const handleExplainSimple = () => {
    const lastBotMessage = [...messages].reverse().find((m) => m.type === 'bot');
    if (lastBotMessage) {
      setInput(`Explain this in very simple terms: ${lastBotMessage.content}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderContent = (content) => {
    // Check for code blocks
    const codeBlockRegex = /```([\s\S]*?)```/g;
    const parts = content.split(codeBlockRegex);

    return parts.map((part, idx) => {
      if (idx % 2 === 1) {
        return (
          <div key={idx} style={{ position: 'relative', marginTop: '10px' }}>
            <div className="code-block">
              <code>{part.trim()}</code>
            </div>
            <button
              className="copy-code-btn"
              onClick={() => handleCopy(part.trim())}
            >
              <Copy size={12} style={{ marginRight: '4px' }} />
              Copy Code
            </button>
          </div>
        );
      }
      return <p key={idx}>{part}</p>;
    });
  };

  return (
    <div className="chat-container animate-fadeInUp">
      {/* Mode Selector */}
      <div className="mode-selector">
        {modes.map((m) => (
          <button
            key={m.id}
            className={`mode-btn ${mode === m.id ? 'active' : ''}`}
            onClick={() => setMode(m.id)}
            title={m.desc}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="messages-container">
        {messages.map((message, idx) => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.type === 'bot' && (
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                🤖
              </div>
            )}

            <div style={{ flex: 1 }}>
              <div className="message-bubble">
                {isLoading && message.id === messages.length ? (
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                ) : (
                  renderContent(message.content)
                )}
              </div>

              {message.type === 'bot' && message.id !== messages.length && (
                <div className="message-actions">
                  <button
                    className="action-btn"
                    onClick={() => handleCopy(message.content)}
                    title="Copy"
                  >
                    <Copy size={12} />
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => handleRegenerate(idx)}
                    title="Regenerate"
                  >
                    <RotateCcw size={12} />
                  </button>
                  <button
                    className="action-btn"
                    onClick={handleExplainSimple}
                    title="Explain simply"
                  >
                    Explain Simply
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Ask about Java, Python, DBMS, OS, or anything BCA-related..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <div className="input-actions">
            <button
              className="input-btn"
              title="Voice input"
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            >
              <Mic size={18} />
            </button>
          </div>
        </div>
        <button
          className="send-btn"
          onClick={sendMessage}
          disabled={isLoading || !input.trim()}
        >
          <Send size={18} />
        </button>
      </div>

      {/* Quick suggestions */}
      {messages.length === 1 && (
        <div style={{ marginTop: '20px' }}>
          <p
            style={{
              fontSize: '12px',
              color: '#94a3b8',
              marginBottom: '10px',
              textAlign: 'center',
            }}
          >
            Try asking:
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
            }}
          >
            {[
              '💡 What is polymorphism?',
              '🗄️ Explain ACID properties',
              '🔄 How does TCP work?',
              '⚡ Optimize this code for me',
            ].map((suggestion, idx) => (
              <button
                key={idx}
                className="btn btn-secondary"
                onClick={() => {
                  setInput(suggestion);
                }}
                style={{ fontSize: '12px', padding: '8px' }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatInterface;
