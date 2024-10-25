import React from 'react';
import { Bot, User, Search, Settings, Send } from 'lucide-react';

const MainChat = ({ messages, isTyping, currentMessage, setCurrentMessage, handleSubmit, messagesEndRef }) => {
  return (
    <div className="flex-1 flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex gap-3 max-w-[80%]">
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Bot size={20} className="text-blue-600" />
                  </div>
                )}
                <div className={`overflow-hidden rounded-lg ${message.role === 'user' ? 'bg-blue-600' : 'bg-gray-100'}`}>
                  <div className={`p-4 ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                    {message.content}
                  </div>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-gray-600" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Bot size={20} className="text-blue-600" />
              </div>
              <div className="bg-gray-100 rounded-lg">
                <div className="p-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.3s]" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-.5s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="max-w-4xl mx-auto flex gap-3">
          <button type="button" className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-slate-400">
              <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-lg px-4">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Start typing"
              className="flex-1 py-3 bg-transparent focus:outline-none text-sm"
            />
            <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
              <Search size={20} />
            </button>
            <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
              <Settings size={20} />
            </button>
          </div>
          <button 
            type="submit" 
            disabled={!currentMessage.trim()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
export default MainChat;