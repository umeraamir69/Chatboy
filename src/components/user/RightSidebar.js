import React from 'react';
import { Search, Clock, FaArrowsLeftRightToLine } from 'lucide-react';

const RightSidebar = ({ isOpen, onToggle, chatHistory }) => {
  return (
    <div 
      className={`${
        isOpen ? 'w-72' : 'w-0'
      } fixed md:relative right-0 top-0 h-full bg-white border-l transition-all duration-300 overflow-hidden flex flex-col z-20`}
    >
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">History</h2>
          <button 
            onClick={onToggle}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <FaArrowsLeftRightToLine size={18} />
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {chatHistory.map((chat, index) => (
          <button
            key={index}
            className={`w-full p-3 flex flex-col gap-1 text-left rounded-lg mb-2 transition-colors ${
              chat.active ? 'bg-orange-50 text-orange-600' : 'hover:bg-slate-50'
            }`}
          >
            <div className="text-sm font-medium">{chat.title}</div>
            <div className="text-xs text-slate-500 truncate">{chat.description}</div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t">
        <button className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700">
          <Clock size={18} />
          <span className="text-sm">Clear history</span>
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;