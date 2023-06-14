import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export const Topbar = ({ toggleSidebar }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const showMenuUser = () => {
    setIsVisible(!isVisible);
    setIsCategoryMenuVisible(false);
  };

  

  const toggleCategoryMenu = () => {
    setIsCategoryMenuVisible(!isCategoryMenuVisible);
    setIsVisible(false);
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Ajusta el punto de interrupción según tus necesidades
    };

    checkIsMobile();

    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <div className="w-full h-20 p-2 bg-cv-primary flex justify-between items-center">
      {isMobile ? (
        <>
          {isCategoryMenuVisible ? (
            <button onClick={toggleCategoryMenu} className="absolute top-4 right-4 text-white">
              <CloseIcon />
            </button>
          ) : (
            <button onClick={toggleCategoryMenu} className="bg-white text-cv-primary rounded-lg p-2 outline-none">
              <MenuIcon />
            </button>
          )}
        </>
      ) : (
        <button onClick={() => toggleSidebar()} className="bg-white text-cv-primary rounded-lg p-2 outline-none">
          {isVisible ? <MenuIcon /> : <MenuIcon />}
        </button>
      )}
      <div className="relative">
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <p className="text-2xl font-medium text-white">Bonnie Green</p>
            <p className="text-lg font-normal text-teal-300">Administrador</p>
          </div>
          <button onClick={showMenuUser} className="outline-none">
            <img
              src="https://images.pexels.com/photos/3579181/pexels-photo-3579181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Foto de Perfil"
              className="w-14 h-14 rounded-full shadow-lg cursor-pointer"
            />
          </button>
        </div>
        <div className={`${isVisible ? 'block' : 'hidden'} absolute w-52 mt-3 bg-cv-primary p-4 rounded-b-lg z-[50]`}>
          <div className="space-y-2 text-white">
            <Link to="/perfil" className="cursor-pointer">
              <div className="p-2 font-semibold hover:bg-cv-secondary rounded-md">
                <span className="mr-4">
                  <AccountCircleIcon />
                </span>
                <span>Perfil</span>
              </div>
            </Link>
            <Link to="/configuracion" className="cursor-pointer">
              <div className="p-2 font-semibold hover:bg-cv-secondary rounded-md">
                <span className="mr-4">
                  <SettingsIcon />
                </span>
                <span>Configuración</span>
              </div>
            </Link>
            <Link to="/login" className="cursor-pointer">
              <div className="p-2 font-semibold hover:bg-cv-secondary rounded-md">
                <span className="mr-4">
                  <LogoutIcon />
                </span>
                <span>Cerrar Sesión</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {isMobile && isCategoryMenuVisible && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-cv-primary flex justify-center items-center">
          <button onClick={toggleCategoryMenu} className="absolute top-4 right-4 text-white">
            <CloseIcon />
          </button>
          <ul className="space-y-2 text-white" onClick={toggleCategoryMenu}>
            <li>
              <Link to="/colaboradores" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                Colaboradores
              </Link>
            </li>
            <li>
              <Link to="cumpleanos" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                Cumpleaños
              </Link>
            </li>
            <li>
              <Link to="/evaluaciones" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                Evaluaciones
              </Link>
            </li>
            <li>
              <Link to="/justificaciones" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                Justificaciones
              </Link>
            </li>
            <li>
              <Link to="/asistencia" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                Asistencias
              </Link>
            </li>
            <li>
              <Link to="/reportes" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                Reportes
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
