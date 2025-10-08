import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';

// Obtém a URL do Webhook da variável de ambiente
const WEBHOOK_URL = import.meta.env.VITE_CHATBOT_WEBHOOK_URL;

const ChatWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Olá! Sou o Agente Alertaê. Como posso te ajudar hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scrolla automaticamente para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !WEBHOOK_URL) return;

    const userMessage = input.trim();
    
    // 1. Adiciona a mensagem do usuário
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Falha na comunicação com o servidor.');
      }

      const data = await response.json();
      
      // 2. Adiciona a resposta do bot (do campo 'reply' do seu JSON de retorno)
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        text: data.reply || 'Desculpe, não consegui obter a resposta do servidor.' 
      }]);
      
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Erro de comunicação. Tente novamente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chat-container ${isOpen ? 'open' : ''}`}>
      <div className="chat-header">
        Agente Alertaê
        <button onClick={onClose} className="close-btn">X</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot loading">Digitando...</div>}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="chat-input-form">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!input.trim() || isLoading}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;