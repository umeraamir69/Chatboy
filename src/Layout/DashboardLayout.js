import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/components/dashboard/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto min-h-screen bg-gray-200">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;