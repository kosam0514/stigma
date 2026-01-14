import React, { useState, useEffect, useRef } from 'react';
import { Character, Message } from '../types';
import { geminiService } from '../services/geminiService';

interface ChatInterfaceProps {
  character: Character;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ character, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session on mount
    geminiService.startChat(character);
    
    // Initial greeting simulation
    setMessages([{
      role: 'model',
      text: `> 넥서스 382년｜흐림｜오후 6:00｜아나테마 성당 지하\n\n${character.name}| "당신이군, 새로 온 낙인 발현자가."\n\n*${character.name}는 차가운 눈빛으로 당신을 위아래로 훑어본다. 어두운 복도에는 촛불만이 일렁이고 있다.*`,
      timestamp: new Date()
    }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [character]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      role: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const stream = await geminiService.sendMessageStream(userMessage.text);
      
      let fullResponse = '';
      
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: '', timestamp: new Date() },
      ]);

      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'model') {
            lastMessage.text = fullResponse;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: "*(통신 오류: 교단과의 연결이 끊어졌습니다. 다시 시도하십시오.)*", timestamp: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Determine colors purely on Red/Black theme, slightly different for distinction but unified
  const isFaculty = character.group === 'faculty';
  const borderColor = isFaculty ? 'border-amber-900' : 'border-red-900';
  const textColor = isFaculty ? 'text-amber-600' : 'text-red-600';
  const chatBubbleBorder = isFaculty ? 'border-amber-900/40' : 'border-red-900/40';

  return (
    <div className="flex h-screen flex-col bg-black text-neutral-300 font-serif">
      <div className="fixed inset-0 z-0 pointer-events-none crt-overlay opacity-20"></div>

      {/* Header */}
      <header className={`relative z-10 flex items-center justify-between border-b bg-neutral-950/80 p-4 shadow-lg ${borderColor}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-neutral-500 hover:text-red-500 transition-colors font-mono-tech text-xs tracking-widest border border-neutral-800 px-3 py-1 hover:border-red-500"
          >
            [ DISCONNECT ]
          </button>
          <div className="flex items-center gap-4">
            <div className={`relative h-12 w-12 border ${borderColor} overflow-hidden grayscale`}>
              <img 
                src={character.avatarUrl} 
                alt={character.name} 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-mono-tech text-[10px] text-neutral-600 tracking-widest">TARGET_ID: {character.id.toUpperCase()}</span>
              <h2 className="font-gothic text-xl font-bold text-neutral-200">{character.name}</h2>
              <span className={`text-xs ${textColor} uppercase tracking-wider font-bold`}>{character.role}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 sm:p-6 space-y-8 custom-scrollbar bg-black/90">
        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div 
              key={index} 
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[90%] sm:max-w-[75%] p-4 leading-relaxed whitespace-pre-wrap text-base sm:text-lg ${
                  isUser 
                    ? 'bg-neutral-900 border border-neutral-700 text-neutral-300' 
                    : `bg-black border-l-2 ${chatBubbleBorder} text-neutral-400 pl-4`
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        {isTyping && (
          <div className="flex justify-start">
            <div className={`text-xs ${textColor} animate-pulse pl-4 font-mono-tech`}>
              INCOMING_TRANSMISSION...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`relative z-10 border-t bg-neutral-950 p-4 ${borderColor}`}>
        <div className="mx-auto max-w-5xl relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isFaculty ? "답변을 입력하십시오..." : "행동이나 대사를 입력하세요..."}
            className={`w-full bg-black border p-4 pr-16 text-neutral-300 placeholder-neutral-700 focus:outline-none transition-all font-serif text-base sm:text-lg ${
              isFaculty 
              ? 'border-neutral-800 focus:border-amber-900' 
              : 'border-neutral-800 focus:border-red-900'
            }`}
            disabled={isTyping}
          />
          <button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className={`absolute right-2 top-2 bottom-2 px-4 disabled:opacity-30 transition-colors font-mono-tech tracking-wider text-xs ${
              isFaculty 
              ? 'text-neutral-500 hover:text-amber-500' 
              : 'text-neutral-500 hover:text-red-500'
            }`}
          >
            [ SEND ]
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;