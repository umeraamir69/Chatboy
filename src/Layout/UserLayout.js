import React, { useState, useRef, useEffect } from 'react';
import { User, MessageCircle, Clock, Trophy,  LogOut, BadgeDollarSign} from 'lucide-react';
import { VscLayoutSidebarLeft } from 'react-icons/vsc';
import { useSession, signIn, signOut } from 'next-auth/react';
import { TbTransactionDollar } from "react-icons/tb";
import { MdOutlineCardMembership } from "react-icons/md";
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '@/components/user/Navbar';
const UserLayout = ({ children }) => {

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
    <div className="flex h-screen">
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
          <p className="text-sm opacity-90 mb-3">Strengthen artificial intelligence: get plan!</p>
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
      <main className="flex-1 overflow-auto min-h-screen bg-gray-200">
        <Navbar leftSidebarOpen={leftSidebarOpen}
        toggleLeftSidebar={toggleLeftSidebar}
        toggleRightSidebar={toggleRightSidebar}
        rightSidebarOpen={rightSidebarOpen}/>
        {children}
      </main>
    </div>
  );
};

export default UserLayout;