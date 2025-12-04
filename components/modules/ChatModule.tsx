import React, { useState, useEffect, useRef } from 'react';
import { Message } from '../../types';
import { VIDEO_IDEAS, SUGGESTIONS } from '../../constants';
import { getSessionId, sendMessageToN8N } from '../../services/n8nService';

// Icons
const SendIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>;
const BotIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>;
const UserIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export const ChatModule: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "System initialized. I'm your NXAI Assistant ready for task execution. Awaiting command.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sessionId = useRef(getSessionId()).current;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToN8N(text, sessionId);

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: responseText,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full w-full bg-[#0a0a0a]">
      {/* Tools Panel (Left Sidebar) */}
      <div className="hidden lg:flex flex-col w-[280px] bg-[#0c0c0c] border-r border-[#27272a] h-full">
        <div className="p-4 border-b border-[#27272a]">
            <h3 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Idea Generator
            </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {VIDEO_IDEAS.map((idea, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(idea.prompt)}
              className="group w-full text-left p-3.5 rounded-lg bg-[#111] border border-[#27272a] hover:border-amber-500/50 hover:bg-[#151515] transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-200">{idea.icon}</span>
                <span className="font-semibold text-sm text-slate-200 group-hover:text-white">{idea.title}</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 font-medium">{idea.prompt}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Chat Stream */}
        <div className="flex-1 overflow-y-auto p-0 scroll-smooth">
          <div className="max-w-4xl mx-auto w-full py-8 px-6 space-y-8">
             {messages.map((msg) => (
               <div key={msg.id} className={`flex gap-5 animate-enter ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                 
                 {/* Avatar */}
                 <div className={`flex-shrink-0 w-10 h-10 rounded-md flex items-center justify-center border ${
                   msg.sender === 'bot' 
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
                    : 'bg-white/5 border-white/10 text-slate-300'
                 }`}>
                   {msg.sender === 'bot' ? <BotIcon /> : <UserIcon />}
                 </div>

                 {/* Content */}
                 <div className={`flex flex-col gap-1 max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                   <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300">{msg.sender === 'bot' ? 'NXAI Assistant' : 'You'}</span>
                      <span className="text-[10px] text-slate-600 font-mono">{msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                   </div>
                   
                   <div className={`text-[15px] leading-7 font-light tracking-wide ${
                     msg.sender === 'user' ? 'text-slate-300 text-right' : 'text-slate-100'
                   }`}>
                      {msg.text.split(/(\*\*.*?\*\*)/).map((part, i) => 
                        part.startsWith('**') && part.endsWith('**') 
                          ? <strong key={i} className="font-bold text-white border-b border-amber-500/30">{part.slice(2, -2)}</strong> 
                          : part
                      )}
                   </div>
                 </div>
               </div>
             ))}

             {loading && (
               <div className="flex gap-5 animate-enter">
                  <div className="w-10 h-10 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                    <BotIcon />
                  </div>
                  <div className="flex items-center gap-1.5 h-10">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-sm typing-dot"></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-sm typing-dot"></span>
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-sm typing-dot"></span>
                  </div>
               </div>
             )}
             <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        {/* Input Zone */}
        <div className="p-6 bg-[#0a0a0a] border-t border-[#27272a]">
          <div className="max-w-4xl mx-auto w-full space-y-4">
            
            {/* Suggestions - Horizontal Scroll */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide mask-fade-right">
              {SUGGESTIONS.map((sugg, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(sugg.prompt)}
                  className="flex-shrink-0 px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] hover:border-amber-500/30 rounded text-xs text-slate-400 hover:text-amber-500 transition-colors whitespace-nowrap font-medium font-mono"
                >
                  <span className="mr-1.5 opacity-50">{sugg.icon}</span>
                  {sugg.label}
                </button>
              ))}
            </div>

            {/* Input Field */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-300 blur"></div>
              <div className="relative flex items-center bg-[#050505] border border-[#27272a] group-focus-within:border-amber-500/50 rounded-xl overflow-hidden transition-colors shadow-lg">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Execute command or ask a question..."
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-200 placeholder-slate-600 resize-none py-4 px-4 text-sm font-medium"
                  rows={1}
                  style={{ minHeight: '56px' }}
                />
                <div className="pr-3">
                    <button 
                        onClick={() => handleSend()}
                        disabled={loading || !input.trim()}
                        className="p-2.5 rounded-lg bg-white text-black hover:bg-amber-400 disabled:opacity-50 disabled:bg-[#333] disabled:text-slate-500 transition-all duration-200 transform active:scale-95"
                    >
                        <SendIcon />
                    </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-slate-600 font-mono uppercase">
               <span>Secure Channel // TLS 1.3</span>
               <span>v2.0.4-stable</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};