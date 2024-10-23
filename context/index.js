import React, { createContext, useState, useEffect } from "react";
import { useMediaQuery } from "@react-hook/media-query";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);// Width Control
  const [isOpen, setIsOpen] = useState(false); // Sidebar open or not
  const isLGScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    setIsOpen(isLGScreen); // Set isOpen based on isLGScreen
  }, [isLGScreen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <GlobalContext.Provider value={{ isSidebarOpen, toggleSidebar, isOpen, toggleOpen }}>
      {children}
    </GlobalContext.Provider>
  );
}
