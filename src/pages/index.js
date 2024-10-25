import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Search, Settings, User, MessageCircle, Clock, Trophy, BarChart2, LogOut, Moon, Send, Bot , BadgeDollarSign} from 'lucide-react';
import { VscLayoutSidebarLeft } from 'react-icons/vsc';
import { FaArrowsLeftRightToLine } from 'react-icons/fa6';
import { useSession, signIn, signOut } from 'next-auth/react';
import { TbTransactionDollar } from "react-icons/tb";
import { MdOutlineCardMembership } from "react-icons/md";
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ModernChatInterface = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I'm here to help you with any questions or tasks you have. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const router = useRouter();

  const isActiveRoute = (path) => {
    return router.pathname === path;
  };


  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { data: session, status } = useSession();

  const handleLogout = ()=>{
     toast.success(`Thanks for Using Our Services`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
  });
    return signOut()

  }

  const menuItems = [
    { icon: MessageCircle, label: 'AI Chat Helper', link : "/user" },
    { icon: BadgeDollarSign, label: 'Payments' , link : "/payments"  },
    { icon: TbTransactionDollar , label: 'Transaction' ,link : "/transaction" },
    { icon: Trophy , label: 'Loyality Rewards' , link : "/rewards" },
    { icon: MdOutlineCardMembership, label: 'Membership',link : "/membership"  },
  ];

  const chatHistory = [
    { 
      title: 'Create welcome form',
      description: 'Write code (HTML, CSS and JS) for a simple...',
      active: true
    },
    { 
      title: 'Instructions',
      description: 'How to set up a Wi-Fi wireless network?'
    }
  ];

  // Initialize sidebar states and handle resize
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    
    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
      
      if (mobile) {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
      }
    };

    // Set initial states
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sidebar toggles with mobile constraints
  const toggleLeftSidebar = () => {
    if (isMobile && rightSidebarOpen) {
      setRightSidebarOpen(false);
    }
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    if (isMobile && leftSidebarOpen) {
      setLeftSidebarOpen(false);
    }
    setRightSidebarOpen(!rightSidebarOpen);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const newMessage = {
      role: 'user',
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate response
    setTimeout(() => {
      const response = {
        role: 'assistant',
        content: `This is a simulated response to: "${currentMessage}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-screen flex bg-slate-50">
      {/* Left Sidebar */}
      <div 
      className={`${
        leftSidebarOpen ? 'w-72' : 'w-0'
      } fixed md:relative left-0 top-0 h-full bg-slate-900 transition-all duration-300 overflow-hidden flex flex-col z-20`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-white text-lg font-semibold">MindMerge</span>
        </div>
        <button 
          onClick={toggleLeftSidebar}
          className="text-white hover:text-gray-300"
        >
          <VscLayoutSidebarLeft size={20} />
        </button>
      </div>

      <div className="px-2 py-4">
        {menuItems.map((item, index) => (
          <Link href={item.link}>
          <div
            key={index}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-colors ${
              isActiveRoute(item.link) ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800/50'
            } mb-1`}
          >
            
            <div className="w-8 flex items-center justify-center">
              <item.icon size={20} />
            </div>
            <span className="text-sm font-medium pl-5 py-1">{item.label}</span>
           
          </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto p-4">
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl p-4 text-white">
          <h3 className="font-semibold mb-1">Pro Plan</h3>
          <p className="text-sm opacity-90 mb-3">Strengthen artificial helloe intelligence: get plan!</p>
          <div className="flex items-center justify-between">
            <span className="text-sm">$10 / mo</span>
            <button className="px-3 py-1 bg-white text-orange-500 rounded-lg text-sm font-medium">
              Get
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
            <User size={18} />
          </div>
          {session && (
            <>
              <span onClick={handleLogout} className="flex-1 text-sm font-medium">Log out</span>
              <LogOut size={18} onClick={handleLogout} />
            </>
          )}
        </button>
      </div>
    </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
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
          
          {!rightSidebarOpen && (
            <button
              onClick={toggleRightSidebar}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Clock size={20} />
            </button>
          )}
        </div>

        {/* Chat Messages */}
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

        {/* Input Form */}
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

      {/* Right Sidebar */}
      <div 
        className={`${
          rightSidebarOpen ? 'w-72' : 'w-0'
        } fixed md:relative right-0 top-0 h-full bg-white border-l transition-all duration-300 overflow-hidden flex flex-col z-20`}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">History</h2>
            <button 
              onClick={toggleRightSidebar}
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
    </div>
  );
};

export default ModernChatInterface;