import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { Topbar } from './components/commons/Topbar';
import { Sidebar } from './components/commons/Sidebar';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isActive, setIsActive] = useState(true);
  let inactivityTimer;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const resetTimer = () => {
    setIsActive(true);
  };

  const handleInactivity = () => {
    setIsActive(false);
    logoutSubmit();
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

  useEffect(() => {
    resetInactivityTimer();

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'wheel'];

    const handleActivity = () => {
      resetTimer();
      resetInactivityTimer();
    };

    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      clearTimeout(inactivityTimer);
    };
  }, []);

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    // inactivityTimer = setTimeout(handleInactivity, 5 * 60 * 1000);
    inactivityTimer = setTimeout(handleInactivity, 2 * 60 * 1000);
  };

  const isInicioPage = !(location.pathname === '/*' && isLoggedIn);
  const isLoginPage = location.pathname === '/login';
  const isRecuperar = location.pathname === '/recuperarContraseña';

  return (
    <BrowserRouter>
      <div className="flex h-screen w-full">
        {!isMobile && !isLoginPage && isInicioPage && !isRecuperar && isLoggedIn && (
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="flex-grow flex-shrink flex-auto overflow-y-scroll">
          {!isLoginPage && !isRecuperar && isInicioPage && isLoggedIn && (
            <Topbar toggleSidebar={toggleSidebar} />
          )}
          <div className={`bg-cv-secondary ${location.pathname === "/login" ? " " : "p-3 sm:p-5"}`}>
            <AppRoutes />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

function logoutSubmit() {
  if(localStorage.getItem('login') === 'true'){

    window.location.reload();
  }
  localStorage.setItem('login', 'false');
  localStorage.setItem('loginStatus', 'Cierre de sesión exitoso!');
}