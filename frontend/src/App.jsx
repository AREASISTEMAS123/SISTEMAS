import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Topbar } from './components/commons/Topbar';
import { Sidebar } from './components/commons/Sidebar';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="flex h-screen w-full">
        {!isMobile && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className=" flex-grow flex-shrink flex-auto overflow-y-scroll">
          <Topbar toggleSidebar={toggleSidebar} />
          <div className="bg-cv-secondary p-3 sm:p-5">
            <AppRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
