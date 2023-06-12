<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import  { useState } from 'react';
>>>>>>> cab00877a101b6be25d52b81d84bc8a3e65ccf38
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Topbar } from './components/commons/Topbar';
import Sidebar from './Components/commons/Sidebar';



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

<<<<<<< HEAD
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">
        {!isMobile && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className="flex flex-col flex-1">
          <Topbar toggleSidebar={toggleSidebar} />
          <div className="flex flex-col flex-1 overflow-y-auto">
            <AppRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
=======
    return (
        <BrowserRouter>
            <div className="flex h-screen overflow-hidden">
                <Sidebar isOpen={sidebarOpen} />
                <div className="flex flex-col flex-1">
                    <Topbar toggleSidebar={toggleSidebar} />
                    <div className="flex flex-col flex-1 overflow-y-auto w-full bg-cv-secondary p-5">
                        <AppRoutes />
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
>>>>>>> cab00877a101b6be25d52b81d84bc8a3e65ccf38
};

export default App;
