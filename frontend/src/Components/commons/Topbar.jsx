import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { TareaItem } from './TareaItem';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { AES, enc } from 'crypto-js';

export const Topbar = ({ toggleSidebar }) => {
  Topbar.propTypes = {
    toggleSidebar: PropTypes.func.isRequired,
  };
  const [isJustificacionesOpen, setIsJustificacionesOpen] = useState(false);
  const [isEvaluacionesOpen, setIsEvaluacionesOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false)
  const [isCategoryMenuVisible, setIsCategoryMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [mensajeError, setMensajeError] = useState('');


  const showMenuUser = () => {
    setShowMenu(!showMenu)
    setIsVisible(!isVisible);
    setIsCategoryMenuVisible(false);
  };

  const handleClickAway = () => {
    setShowMenu(false);
  };

  const showTodoList = () => {
    setShowTask(!showTask);
  };

  const handleClickAwayTask = () => {
    setShowTask(false);
  };

  const handleChange = () =>{
    setShowMenu(false);
  }


  //Local Storage
  const userId = localStorage.getItem("iduser");
  const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
    const token = tokenD.toString(enc.Utf8)

  //Agregar Tarea
  const agregarTarea = () => {
    if (titulo.trim() === '' || descripcion.trim() === '' || fecha.trim() === '') {
      setShowModal(true),
        setMensajeError('Rellene todos los campos');
      return;
    }


    fetch(import.meta.env.VITE_API_URL + '/task/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        tittle: titulo,
        description: descripcion,
        limit_date: fecha,
      }),
    })
      .then(response => {
        if (response.ok) {
          setShowAlert(true);
          setMessage('Tarea agregada exitosamente');
          setTitulo('');
          setDescripcion('');
          setFecha('');
          setMensajeError('');
          listarTarea();
        } else {
          throw new Error('Error al guardar los datos');
        }
      })
      .catch(error => {
        setShowAlert(true);
        setMessage(`Error al agregar la tarea: ${error.message}`);
      });
  };

  //Listar Tareas
  const listarTarea = () => {
    fetch(import.meta.env.VITE_API_URL + '/task/' + userId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  };
  useEffect(() => {
    listarTarea();
  }, []);

  //Modificar Tarea
  const modificarTarea = (taskUpdate) => {

    fetch(import.meta.env.VITE_API_URL + `/task/update/${taskUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(taskUpdate),
    })
      .then(response => {
        if (response.ok) {
          setMessage('Tarea modificada exitosamente');
          setShowAlert(true);
          setTasks(prevTasks => {
            return prevTasks.map(task => {
              if (task.id === taskUpdate.id) {
                return taskUpdate;
              }
              return task;
            });
          });
        } else {
          throw new Error('Error al guardar la tarea');
        }
      })
      .catch(error => {
        setMessage(`Error al modificar la tarea: ${error.message}`);
        setShowAlert(true);
      });
  };

  //Eliminar Tarea
  const eliminarTarea = (taskId) => {

    fetch(import.meta.env.VITE_API_URL + `/task/delete/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        if (response.ok) {
          setMessage('Tarea eliminada exitosamente');
          setShowAlert(true);
          setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } else {
          throw new Error('Error al eliminar la tarea');
        }
      })
      .catch(error => {
        setMessage(`Error al eliminar la tarea: ${error.message}`);
        setShowAlert(true);
      });
  };

  function logoutSubmit() {
    localStorage.setItem('login', 'false');
    localStorage.setItem('loginStatus', 'Cierre de sesión exitoso!');
    window.location.reload();
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


  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const AddTask = () => {
    setShowModal(false),
      setShowAlert(false),
      agregarTarea()
  }

  const rol = localStorage.getItem('rol');
  const nombre = localStorage.getItem('name');
  const avatar = localStorage.getItem('avatar');
  const apellido = localStorage.getItem('surname');

  const firstName = nombre.split(" ")[0];
  const firstSurname = apellido.split(" ")[0];
  const firstSurnameInitial = firstSurname.charAt(0);

  const openDesplegableJustificacion = () => {
    setIsJustificacionesOpen(!isJustificacionesOpen);
  }
  const openDesplegableEvaluaciones = () => {
    setIsEvaluacionesOpen(!isEvaluacionesOpen);
  }
  return (
    <div className="w-full h-20 sticky top-0 p-2 bg-cv-primary flex justify-between items-center z-50">
      {isMobile ? (
        <>
          {isCategoryMenuVisible ? (
            <button onClick={toggleCategoryMenu} className="absolute top-4 right-4 text-white">
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>
          ) : (
            <button onClick={toggleCategoryMenu} className="bg-white text-cv-primary rounded-lg p-2 outline-none">
              <MenuIcon sx={{ fontSize: 18 }} />
            </button>
          )}
        </>
      ) : (
        <button onClick={() => toggleSidebar()} className="bg-white text-cv-primary rounded-lg p-2 outline-none">
          {isVisible ? <MenuIcon sx={{ fontSize: 20 }} /> : <MenuIcon sx={{ fontSize: 20 }} />}
        </button>
      )}
      <div className="relative">
        <div className="flex justify-between items-center space-x-2 md:space-x-5">
          <ClickAwayListener onClickAway={handleClickAwayTask}>
            <div>
              <Tooltip title="Lista de tareas personales">
                <button onClick={showTodoList} className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white border border-cv-secondary hover:bg-cv-secondary rounded-lg ">
                  <ListAltIcon sx={{ fontSize: 22 }} />
                  <span className="sr-only">Tareas</span>
                  {tasks.length > 0 && (

                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 border-2 border-cv-primary rounded-full -top-2 -right-2 ">{tasks.length}</div>
                  )}
                </button>
              </Tooltip>
              {
                showTask && (
                  <div className='absolute right-0'>
                    <div className="flex items-center justify-center md:w-auto mt-3 bg-cv-primary p-2 sm:p-4 rounded-b-lg z-[50] shadow-2xl">
                      <div className="space-y-2 text-white">
                        <button onClick={() => { setShowModal(true); setShowTask(false); }} className={`p-3 w-full bg-cv-secondary text-white flex items-center justify-center rounded-lg text-${isMobile ? 'xs' : 'sm'} font-bold uppercase hover:bg-green-500 hover:text-cv-primary active:scale-95 ease-in-out duration-300 whitespace-nowrap`}>
                          <AddTaskIcon sx={{ fontSize: 18 }} />
                          <span className='ml-4'>Agregar Tarea</span>
                        </button>
                        <div className='max-h-72 overflow-y-auto'>
                          <TareaItem sx={{ fontSize: 18 }} data={tasks} setSelectedCard={setSelectedCard} update={() => { setShowModalUpdate(true); setShowTask(false); }} eliminarTarea={eliminarTarea} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </ClickAwayListener>
          <div>
            <p className={`text-${isMobile ? 'sm' : 'lg'} font-bold leading-tight text-white whitespace-nowrap`}>
              {isMobile ? `${firstName} ${firstSurnameInitial}.` : `${firstName} ${firstSurname}`}
            </p>
            <p className={`text-${isMobile ? 'xs' : 'normal'} font-light leading-tight text-teal-300`}>
              {isMobile ? `${rol} ` : `${rol} `}
            </p>

          </div>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div>
              <Tooltip title="Mas opciones">
                <button onClick={showMenuUser} className="outline-none">
                  <img
                    src={avatar}
                    alt="Foto de Perfil"
                    className={`w-${isMobile ? '10' : '12'} h-${isMobile ? '10' : '12'} border-2 border-cv-cyan rounded-full shadow-lg cursor-pointer object-cover`}
                  />
                </button>
              </Tooltip>
              {
                showMenu && (
                  <div className='block absolute  right-2 w-52 mt-3 bg-cv-primary p-4 rounded-b-lg z-[100] shadow-2xl'>
                    <div className="space-y-4 text-white">
                      <Link to="/perfil" onClick={handleClickAway} className="cursor-pointer">
                        <div className="p-1.5 font-semibold hover:bg-cv-secondary rounded-md">
                          <span className="mr-4">
                            <AccountCircleIcon sx={{ fontSize: 18 }} />
                          </span>
                          <span className='text-sm'>Perfil</span>
                        </div>
                      </Link>
                      <Link to="/changePassword" onClick={handleChange} className="cursor-pointer">
                        <div className="p-1.5 font-semibold hover:bg-cv-secondary rounded-md">
                          <span className="mr-4">
                            <ManageAccountsIcon sx={{ fontSize: 18 }} />
                          </span>
                          <span className='text-sm whitespace-nowrap'>Cambiar contraseña</span>
                        </div>
                      </Link>
                      <Link to="/login" onClick={logoutSubmit} className="cursor-pointer">
                        <div className="p-1.5 font-semibold hover:bg-cv-secondary rounded-md">
                          <span className="mr-4">
                            <LogoutIcon sx={{ fontSize: 18 }} />
                          </span>
                          <span className='text-sm whitespace-nowrap'>Cerrar Sesión</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )
              }
            </div>
          </ClickAwayListener>

        </div>

        {showModal ? (
          <div>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">

                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Agregar Tarea
                    </h3>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <div className='space-y-2 flex flex-col items-center'>
                      <div className='w-full'>
                        <label htmlFor="title" className="block mb-2 font-medium text-gray-900">Titulo de Tarea</label>
                        <input type="text" id="title" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full p-4 text-gray-900 border-b-2 border-gray-300  bg-white outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Escribe aquí...' />
                      </div>
                      <div className='w-full'>
                        <label htmlFor="task" className="block mb-2 font-medium text-gray-900">Descripción</label>
                        <textarea id="task" rows="4" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="p-2.5 w-full text-gray-900 bg-gray-100 border rounded-lg border-gray-300 outline-none resize-none placeholder-gray-700 font-semibold" placeholder="Escribe aquí..."></textarea>

                      </div>
                      <div className='w-full'>
                        <label htmlFor="time" className="block mb-2 font-medium text-gray-900">Fecha y Hora Limite</label>
                        <input type="datetime-local" id="time" value={fecha} onChange={(e) => setFecha(e.target.value)} className='p-2.5 w-full text-gray-900 bg-gray-100 border rounded-lg border-gray-300 outline-none resize-none placeholder-gray-700 font-semibold' />
                      </div>
                      <p className='text-red-500 font-semibold'>{mensajeError}</p>
                    </div>

                  </div>
                  <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="py-2 px-4 rounded-md text-gray-500 bg-gray-300 hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl uppercase active:scale-95 ease-in-out duration-300"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase active:scale-95 ease-in-out duration-300"
                      type="button"
                      onClick={AddTask}


                    >Guardar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}

        {showAlert ? (
          <div>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">
                  <div className="relative p-6 flex-auto">
                    <div className='space-y-2 flex flex-col items-center'>
                      <div className='w-full flex items-center justify-center text-green-500 text-x'>
                        {message === 'Tarea agregada exitosamente' || message === 'Tarea modificada exitosamente' || message === 'Tarea eliminada exitosamente' ? (
                          <CheckCircleIcon className="text-green-500" sx={{ fontSize: 96 }} />
                        ) : (
                          <ErrorIcon className="text-red-500" sx={{ fontSize: 96 }} />
                        )}
                      </div>
                      <div className='w-full flex items-center justify-center text-gray-950'>
                        {message && <h3 className="text-3xl font-bold text-center">{message}</h3>}
                      </div>
                    </div>

                  </div>
                  <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">

                    <button
                      className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowAlert(false)}
                    >
                      Cerrar
                    </button>

                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}

        {showModalUpdate ? (
          <div>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">

                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Modificar Tarea
                    </h3>
                  </div>
                  <div className="relative p-6 flex-auto">
                    {selectedCard && (
                      <div className='space-y-2 flex flex-col items-center'>
                        <div className='w-full'>
                          <label htmlFor="title" className="block mb-2 font-medium text-gray-900">Titulo de Tarea</label>
                          <input type="text" id="title" value={selectedCard.tittle} onChange={(event) =>
                            setSelectedCard((prevTask) => ({
                              ...prevTask,
                              tittle: event.target.value,
                            }))
                          } className="w-full p-4 text-gray-900 border-b-2 border-gray-300  bg-white outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Escribe aquí...' />
                        </div>
                        <div className='w-full'>
                          <label htmlFor="task" className="block mb-2 font-medium text-gray-900">Descripción</label>
                          <textarea id="task" rows="4" value={selectedCard.description} onChange={(event) =>
                            setSelectedCard((prevTask) => ({
                              ...prevTask,
                              description: event.target.value,
                            }))
                          } className="p-2.5 w-full text-gray-900 bg-gray-100 border rounded-lg border-gray-300 outline-none resize-none placeholder-gray-700 font-semibold" placeholder="Escribe aquí..."></textarea>

                        </div>
                        <div className='w-full'>
                          <label htmlFor="time" className="block mb-2 font-medium text-gray-900">Fecha y Hora Limite</label>
                          <input type="datetime-local" name="" id="time" value={selectedCard.limit_date} onChange={(event) =>
                            setSelectedCard((prevTask) => ({
                              ...prevTask,
                              limit_date: event.target.value,
                            }))
                          } className='p-2.5 w-full text-gray-900 bg-gray-100 border rounded-lg border-gray-300 outline-none resize-none placeholder-gray-700 font-semibold' />
                        </div>
                      </div>
                    )}

                  </div>
                  <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="py-2 px-4 rounded-md text-gray-500 bg-gray-300 hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModalUpdate(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => { setShowModalUpdate(false), modificarTarea(selectedCard); }}
                    >Guardar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}

      </div>

      {isMobile && isCategoryMenuVisible && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-cv-primary flex justify-center items-center z-10">
          <button onClick={toggleCategoryMenu} className="absolute top-4 right-4 text-white">
            <CloseIcon />
          </button>
          <ul className="space-y-2 text-white" onClick={toggleCategoryMenu}>
            {
              rol === 'Lider Nucleo' ? (
                <>
                  <li>
                    <Link to="/perfil" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Perfil
                    </Link>
                  </li>
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
                    <Link to="/reportes" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Reportes
                    </Link>
                  </li>
                  <li>
                    <Link to="/asistencia" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Asistencias
                    </Link>
                  </li>
                  <li>
                    <Link onClick={(e) => {
                      openDesplegableJustificacion();
                      e.stopPropagation();
                    }} className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Justificaciones
                    </Link>
                  </li>
                  {isJustificacionesOpen && (
                    <div className="relative">
                      <div className="absolute left-0 mt-2 bg-cv-primary w-44 py-2 rounded-md shadow-md z-10">
                        <Link to="/justificacion" className="block px-4 py-2 text-white hover:bg-cv-secondary">
                          Justificacion
                        </Link>
                        <Link to="/justificaciones" className="block px-4 py-2 text-white hover:bg-cv-secondary">
                          Justificaciones
                        </Link>
                      </div>
                    </div>
                  )}
                  <li>
                    <Link onClick={(e) => {
                      openDesplegableEvaluaciones();
                      e.stopPropagation();
                    }} className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Evaluaciones
                    </Link>
                  </li>
                  {isEvaluacionesOpen && (
                    <div className="relative">
                      <div className="absolute left-0 mt-2 bg-cv-primary w-44 py-2 rounded-md shadow-md z-10">
                        <Link to="/evaluacion" className="block px-4 py-2 text-white hover:bg-cv-secondary">
                          Evaluación
                        </Link>
                        <Link to="/evaluaciones" className="block px-4 py-2 text-white hover:bg-cv-secondary">
                          Evaluaciones
                        </Link>
                      </div>
                    </div>
                  )}


                </>
              ) : rol === 'Colaborador' ? (
                <>
                  <li>
                    <Link to="/perfil" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/asistencia" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Asistencias
                    </Link>
                  </li>
                  <li>
                    <Link to="cumpleanos" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Cumpleaños
                    </Link>
                  </li>
                  <li>
                    <Link to="/evaluacion" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Evaluaciones
                    </Link>
                  </li>
                  <li>
                    <Link to="/justificacion" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Justificacion
                    </Link>
                  </li>
                </>
              ) : rol === 'Gerencia' ? (
                <>
                  <li>
                    <Link to="/perfil" className="cursor-pointer block hover:bg-cv-secondary p-2 rounded-md">
                      Perfil
                    </Link>
                  </li>
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
                </>

              ) : null
            }
          </ul>
        </div>
      )}
    </div>
  );
};
