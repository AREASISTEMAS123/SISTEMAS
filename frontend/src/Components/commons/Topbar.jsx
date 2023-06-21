import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { TareaItem } from './TareaItem';

export const Topbar = ({ toggleSidebar }) => {

  Topbar.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTask, setShowTask] = useState(false);

  const showMenuUser = () => {
    setIsVisible(!isVisible);
    setIsCategoryMenuVisible(false);
  };

  const showTodoList = () => {
    setShowTask(!showTask);
  };

  const cardsTask = [
    {
      "id": 1,
      "title": "Item 1",
      "description": "Descripción del Item 1",
      "date": "2023-06-21 14:45:00"
    },
    {
      "id": 2,
      "title": "Item 2",
      "description": "Descripción del Item 2",
      "date": "2023-06-20 21:57:00"
    },
    {
      "id": 3,
      "title": "Item 3",
      "description": "Descripción del Item 3",
      "date": "2023-06-23 17:00:00"
    },
    {
      "id": 4,
      "title": "Item 4",
      "description": "Descripción del Item 4",
      "date": "2023-06-22 09:15:00"
    },    
    {
      "id": 5,
      "title": "Item 5",
      "description": "Descripción del Item 5",
      "date": "2023-06-24 12:00:00"
    }
  ];

  const naviget = useNavigate();
  function logoutSubmit() {
    localStorage.setItem("login", "");
    localStorage.setItem("loginStatus", "Cierre de sesión exitoso!")
    naviget("/");
  }

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
        <div className="flex justify-between items-center space-x-5">
          <button onClick={showTodoList} className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white border border-cv-secondary rounded-lg ">
            <ListAltIcon fontSize="large" />
            <span className="sr-only">Tareas</span>
            {cardsTask.length > 0 && (

              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 border-2 border-cv-primary rounded-full -top-2 -right-2 ">{cardsTask.length}</div>
            )}
          </button>
          <div>
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
        <div className={`${isVisible ? 'block' : 'hidden'} absolute right-2 w-52 mt-3 bg-cv-primary p-4 rounded-b-lg z-[50]`}>
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
                <span onClick={logoutSubmit}>Cerrar Sesión</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={`${showTask ? 'block' : 'hidden'} absolute right-5 w-auto mt-3 bg-cv-primary p-2 sm:p-4 rounded-b-lg z-[50]`}>
          <div className="space-y-2 text-white">
            <button className="p-3 w-full bg-cv-secondary text-white flex items-center justify-center rounded-lg text-xl font-bold uppercase">
              <AddTaskIcon fontSize="large" />
              <p className='ml-4'>Agregar Tarea</p>
            </button>
            <div className='max-h-72 overflow-y-scroll'>
              <TareaItem data={cardsTask} />
            </div>
          </div>
        </div>
      </div>
      {isMobile && isCategoryMenuVisible && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-cv-primary flex justify-center items-center z-10">
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
