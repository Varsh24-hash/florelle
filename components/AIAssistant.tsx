
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Heart } from 'lucide-react';
import { getFloralAdvice } from '../geminiService';
import { ChatMessage } from '../types';

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await getFloralAdvice(input);
    const botMsg: ChatMessage = { role: 'model', content: response };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[550px] rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl border border-pink-100 animate-slide-in-up">
          <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Heart size={20} className="text-white fill-white" />
              </div>
              <div>
                <span className="block font-bold text-white text-sm">Rusty</span>
                <span className="block text-[10px] text-pink-100 font-medium tracking-widest uppercase">Petal Assistant</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/10 p-2 rounded-full text-white hover:bg-white/20 transition-colors">
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
            {messages.length === 0 && (
              <div className="text-center mt-10 px-6">
                <p className="text-slate-400 text-sm italic mb-2">
                  Hello! I'm Rusty.
                </p>
                <p className="text-slate-500 text-xs font-medium">
                  Ask me about our pastel steel roses or custom handmade arrangements!
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-rose-400 text-white rounded-br-none' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-pink-50'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 p-4 rounded-3xl rounded-bl-none border border-pink-50 text-xs animate-pulse">
                  Rusty is sketching ideas...
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-pink-50 flex gap-3 bg-white">
            <input 
              className="flex-1 bg-slate-50 border border-pink-100 rounded-2xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200"
              placeholder="Say something sweet..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-rose-400 p-3 rounded-2xl text-white hover:bg-rose-500 transition-all shadow-md shadow-rose-100 active:scale-95"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-rose-400 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-rose-100 hover:scale-105 transition-all active:scale-95"
        >
          <MessageSquare size={28} />
        </button>
      )}
    </div>
  );
};
