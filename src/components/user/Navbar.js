// Navbar.js
import React from 'react';
import { Moon, Clock } from 'lucide-react';
import { VscLayoutSidebarLeft } from 'react-icons/vsc'; // Correct import

const Navbar = ({ leftSidebarOpen,  toggleLeftSidebar }) => {
  return (
    <div className="bg-white border-b flex items-center gap-4 px-4 py-3">
      {!leftSidebarOpen && (
        <button
          onClick={toggleLeftSidebar}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <VscLayoutSidebarLeft size={20} />
        </button>
      )}
      
      <div className="flex-1 text-lg font-semibold">AI Chat Helper</div>

      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
        <Moon size={20} />
      </button>
      
      
    </div>
  );
};
export default Navbar;
