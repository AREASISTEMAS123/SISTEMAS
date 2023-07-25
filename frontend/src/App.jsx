import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Topbar } from './components/commons/Topbar';
import { Sidebar } from './components/commons/Sidebar';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    const loginStatus = localStorage.getItem('login');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  const isInicioPage = !(location.pathname === '/*' && isLoggedIn);

  const isLoginPage = location.pathname === '/login';
  const isRecuperar = location.pathname === '/recuperarContraseña';

  return (
    <BrowserRouter>
      <div className="flex h-full w-full">
        {!isMobile && !isLoginPage && isInicioPage && !isRecuperar && isLoggedIn && (
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="flex-grow flex-shrink flex-auto overflow-y-scroll">
          {!isLoginPage && !isRecuperar && isInicioPage && isLoggedIn && (
            <Topbar toggleSidebar={toggleSidebar} />
          )}
          <div className="bg-cv-secondary p-3 sm:p-5">
            <AppRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;