import { useState } from 'react';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CakeIcon from "@mui/icons-material/Cake";
// import DescriptionIcon from "@mui/icons-material/Description";
import BalanceIcon from "@mui/icons-material/Balance";
import ChecklistIcon from "@mui/icons-material/Checklist";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

const getRole = () => {
  return localStorage.getItem('rol');
};

const sidebarContent = {
  Colaborador: [
    { route: "perfil", title: "Perfil", icon: <AccountCircleIcon /> },
    { route: "asistencia", title: "Asistencia", icon: <ChecklistIcon /> },
    { route: "justificacion", title: "Justificacion", icon: <BalanceIcon /> },
    { route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon /> },
    // { route: "evaluacion", title: "Evaluacion", icon: <DescriptionIcon /> },
  ],
  // "Lider Nucleo": [
  //   { route: "perfil", title: "Perfil", icon: <AccountCircleIcon /> },
  //   { route: "colaboradores", title: "Colaboradores", icon: <Diversity3Icon /> },
  //   { route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon /> },
  //   { route: "reportes", title: "Reportes", icon: <TrendingUpIcon /> },
  // ],
  Gerencia: [
    { route: "perfil", title: "Perfil", icon: <AccountCircleIcon /> },
    { route: "asistencias", title: "Asistencias", icon: <ChecklistIcon /> },
    { route: "justificaciones", title: "Justificaciones", icon: <BalanceIcon /> },
    { route: "colaboradores", title: "Colaboradores", icon: <Diversity3Icon /> },
    { route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon /> },
    // { route: "evaluaciones", title: "Evaluaciones", icon: <DescriptionIcon /> },
    // { route: "reportes", title: "Reportes", icon: <TrendingUpIcon /> },
  ],
};

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ isOpen }) => {
  const rol = getRole();
  const menuItems = sidebarContent[rol] || [];

  const [isAsistenciaOpen, setIsAsistenciaOpen] = useState(false);
  const [isJustificacionesOpen, setIsJustificacionesOpen] = useState(false);
  // const [isEvaluacionesOpen, setIsEvaluacionesOpen] = useState(false);

  const toggleAsistenciaDropdown = () => {
    setIsAsistenciaOpen(!isAsistenciaOpen);
    setIsJustificacionesOpen(false);
    // setIsEvaluacionesOpen(false);
  };

  const handleClickAwayAsistencia = () => {
    setIsAsistenciaOpen(false);
  };

  const toggleJustificacionesDropdown = () => {
    setIsJustificacionesOpen(!isJustificacionesOpen);
    setIsAsistenciaOpen(false);
    // setIsEvaluacionesOpen(false);
  };

  const handleClickAwayJustificaciones = () => {
    setIsJustificacionesOpen(false)
  }

  // const toggleEvaluacionesDropdown = () => {
  //   setIsEvaluacionesOpen(!isEvaluacionesOpen);
  //   setIsAsistenciaOpen(false);
  //   setIsJustificacionesOpen(false);
  // };

  // const handleClickAwayEvaluaciones = () => {
  //   setIsEvaluacionesOpen(false)
  // }

  return (
    <nav className={`${isOpen ? "w-60" : "w-20"} min-h-screen duration-300`}>
      <div className="w-full h-full p-5 bg-cv-primary text-white relative">
        <div className="w-full">
          <Link to="/home">
            {isOpen ? (
              <div className='origin-left  duration-200'>
                <Logo />
              </div>
            ) : (
              <div className='pb-5 origin-left  duration-200'>
                <Isotipo />
              </div>
            )}

          </Link>
        </div>
        <div className="py-4 space-y-4">
          {menuItems.map((menu, index) => (
            <Link
              key={index}
              to={`/${menu.route}`}
              className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
            >
              <div className="font-semibold flex items-center gap-x-4">
                <span>{menu.icon}</span>
                <span
                  className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </div>
            </Link>
          ))}
          
          {rol === "Lider Nucleo" && (
            <>
            
              <Link
                to={`/perfil`}
                className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
              >
                <div className="font-semibold flex items-center gap-x-4">
                  <span><AccountCircleIcon /></span>
                  <span
                    className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                  >Perfil</span>
                </div>
              </Link>
              <ClickAwayListener onClickAway={handleClickAwayAsistencia}>
                <div className="relative">
                  <div
                    className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
                    onClick={toggleAsistenciaDropdown}
                  >
                    <div className="w-full font-semibold flex items-center justify-between">
                      <div className='flex items-center gap-x-4'>
                        <span>
                          <ChecklistIcon />
                        </span>
                        <span className={`${isOpen ? "" : "hidden"} origin-left duration-200`}>
                          Asistencia
                        </span>
                      </div>
                      <span className={`${isOpen ? "" : "hidden"} text-end origin-left duration-200`}>
                        <ChevronRightIcon />
                      </span>
                    </div>
                  </div>
                  {isAsistenciaOpen && (
                    <div className={`${isOpen ? " left-52 ml-2.5" : "left-14 ml-1.5"} absolute  top-0 bg-cv-primary w-44 py-2 rounded-md shadow-2xl z-10`}>
                      <Link
                        to="/asistencia"
                        onClick={handleClickAwayAsistencia}
                        className="block px-4 p-2 text-white hover:bg-cv-secondary rounded-md"
                      >
                        Asistencia
                      </Link>
                      <hr className="h-px border-0 bg-cv-secondary" />
                      <Link
                        to="/asistencias"
                        onClick={handleClickAwayAsistencia}
                        className="block px-4 py-2 text-white hover:bg-cv-secondary rounded-md"
                      >
                        Asistencias
                      </Link>
                    </div>
                  )}
                </div>
              </ClickAwayListener>

              <ClickAwayListener onClickAway={handleClickAwayJustificaciones}>
                <div className="relative">
                  <div
                    className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
                    onClick={toggleJustificacionesDropdown}
                  >
                    <div className="w-full font-semibold flex items-center justify-between">
                      <div className='flex items-center gap-x-4'>
                        <span>
                          <BalanceIcon />
                        </span>
                        <span
                          className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                        >
                          Justificaciones
                        </span>
                      </div>                      
                      <span className={`${isOpen ? "" : "hidden"} text-end origin-left duration-200`}>
                        <ChevronRightIcon />
                      </span>
                    </div>
                  </div>
                  {isJustificacionesOpen && (
                    <div className={`${isOpen ? " left-52 ml-2.5" : "left-14 ml-1.5"} absolute  top-0 bg-cv-primary w-44 p-2 rounded-md shadow-2xl z-10`}>
                      <Link
                        to="/justificacion"
                        onClick={handleClickAwayJustificaciones}
                        className="block px-4 py-2 text-white hover:bg-cv-secondary rounded-md"
                      >
                        Justificacion
                      </Link>
                      <hr className="h-px border-0 bg-cv-secondary" />
                      <Link
                        to="/justificaciones"
                        onClick={handleClickAwayJustificaciones}
                        className="block px-4 py-2 text-white hover:bg-cv-secondary rounded-md"
                      >
                        Justificaciones
                      </Link>
                    </div>
                  )}
                </div>
              </ClickAwayListener>

              <Link
                to={`/colaboradores`}
                className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
              >
                <div className="font-semibold flex items-center gap-x-4">
                  <span><Diversity3Icon /> </span>
                  <span
                    className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                  >Colaboradores</span>
                </div>
              </Link>

              <Link
                to={`/cumpleanos`}
                className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
              >
                <div className="font-semibold flex items-center gap-x-4">
                  <span><CakeIcon /></span>
                  <span
                    className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                  >Cumpleanos</span>
                </div>
              </Link>

              {/* <ClickAwayListener onClickAway={handleClickAwayEvaluaciones}>
                <div className="relative">
                  <div
                    className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
                    onClick={toggleEvaluacionesDropdown}
                  >
                    <div className="w-full font-semibold flex items-center justify-between">
                      <div className='flex items-center gap-x-4'>
                        <span>
                          <DescriptionIcon />
                        </span>
                        <span
                          className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                        >
                          Evaluaciones
                        </span>
                      </div>
                      <span className={`${isOpen ? "" : "hidden"} text-end origin-left duration-200`}>
                        <ChevronRightIcon />
                      </span>
                    </div>
                  </div>
                  {isEvaluacionesOpen && (
                    <div className={`${isOpen ? " left-52 ml-2.5" : "left-14 ml-1.5"} absolute  top-0 bg-cv-primary w-44 p-2 rounded-md shadow-2xl z-10`}>
                      <Link
                        to="/evaluacion"
                        onClick={handleClickAwayEvaluaciones}
                        className="block px-4 py-2 text-white hover:bg-cv-secondary rounded-md"
                      >
                        Evaluacion
                      </Link>
                      <hr className="h-px border-0 bg-cv-secondary" />
                      <Link
                        to="/evaluaciones"
                        onClick={handleClickAwayEvaluaciones}
                        className="block px-4 py-2 text-white hover:bg-cv-secondary rounded-md"
                      >
                        Evaluaciones
                      </Link>
                    </div>
                  )}
                </div>
              </ClickAwayListener>

              <Link
                to={`/reportes`}
                className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
              >
                <div className="font-semibold flex items-center gap-x-4">
                  <span><TrendingUpIcon /></span>
                  <span
                    className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                  >Reportes</span>
                </div>
              </Link> */}

            </>
          )}
        </div>
      </div>
    </nav>
  );
};



export const Logo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={200}
      height={78}>
      <path
        d="M102.418 23.8c-1.035-1-1.574-2.26-1.574-3.8 0-1.535.535-2.797 1.594-3.816 1.054-1.02 2.39-1.524 4-1.524 1.609 0 3.167.465 4.816 1.41v-2.168c-1.797-.78-3.445-1.148-4.91-1.148-2.13 0-3.946.703-5.39 2.094-1.462 1.39-2.188 3.113-2.188 5.172 0 1.277.316 2.484.964 3.593a6.859 6.859 0 0 0 2.594 2.614c1.094.632 2.426.945 4 .945 1.93 0 3.633-.406 5.114-1.203v-2.207c-1.63 1.039-3.278 1.578-4.985 1.578-1.648-.055-3-.555-4.035-1.54ZM126.207 14.773c-1.445-1.37-3.262-2.058-5.43-2.058-2.168 0-3.965.687-5.39 2.058-1.43 1.372-2.133 3.114-2.133 5.207 0 2.098.703 3.747 2.113 5.118 1.406 1.351 3.168 2.039 5.301 2.039 2.129 0 4.055-.684 5.52-2.04 1.464-1.35 2.187-3.074 2.187-5.152 0-2.078-.723-3.8-2.168-5.172Zm-1.465 8.973c-1.055 1.016-2.351 1.54-3.926 1.54-1.574 0-2.851-.5-3.89-1.505-1.035-1-1.555-2.261-1.555-3.781s.516-2.855 1.555-3.855 2.355-1.5 3.965-1.5c1.52 0 2.816.5 3.87 1.52 1.055 1.019 1.579 2.26 1.579 3.76-.04 1.52-.559 2.782-1.598 3.821ZM142.031 23.836l-9.488-10.918h-1.629v14.05h1.89V16.146l9.391 10.824h1.743V12.918h-1.907ZM151.59 19.426l-1.54-.906c-.683-.41-1.183-.797-1.5-1.149-.316-.371-.464-.762-.464-1.187 0-.48.203-.872.629-1.164.426-.297.965-.465 1.613-.465 1.168 0 2.262.48 3.262 1.465v-2.282a5.595 5.595 0 0 0-3.223-.984c-1.168 0-2.226.355-3.004 1.039-.758.687-1.148 1.594-1.148 2.707 0 .742.207 1.39.613 1.965.406.574 1.09 1.148 2.04 1.726l1.538.926c1.239.758 1.852 1.574 1.852 2.426 0 .52-.203.965-.63 1.316-.425.352-.944.52-1.573.52-1.43 0-2.688-.688-3.782-2.059v2.559c1.149.851 2.41 1.277 3.797 1.277 1.203 0 2.188-.351 2.946-1.054.761-.704 1.132-1.614 1.132-2.747.016-1.613-.835-2.91-2.558-3.925ZM156.39 12.918h2.02v14.05h-2.02ZM169.098 21.836h2.722v2.926l-.183.058c-1.114.367-2.075.555-2.89.555-1.65 0-3.02-.5-4.06-1.52-1.035-1.02-1.574-2.32-1.574-3.914 0-1.59.52-2.796 1.575-3.851 1.058-1.059 2.355-1.578 3.89-1.578 1.652 0 3.317.48 4.984 1.465v-2.059c-1.09-.465-1.98-.777-2.703-.945a9.758 9.758 0 0 0-2.261-.258c-2.168 0-3.985.703-5.43 2.094-1.445 1.39-2.168 3.152-2.168 5.246 0 2.093.703 3.668 2.094 5.023 1.39 1.352 3.242 2.04 5.578 2.04 1.707 0 3.426-.372 5.152-1.13V20.04h-4.726ZM186.586 20.89h-.035c0 1.11-.094 1.891-.258 2.356-.168.461-.465.852-.852 1.184-.761.629-1.726.925-2.91.925-.832 0-1.578-.148-2.187-.46-.61-.317-1.074-.723-1.371-1.243-.297-.52-.442-1.43-.442-2.761v-7.993h-2.023v7.954c0 1.132.074 1.964.222 2.503.149.536.336.98.575 1.332.222.372.52.708.851.985 1.114.945 2.578 1.426 4.41 1.426 1.836 0 3.262-.48 4.375-1.446.332-.293.61-.609.852-.98.223-.371.426-.817.574-1.371.149-.555.242-1.371.242-2.446v-7.992h-2.023ZM193.371 25.152v-4.355h5.762V19h-5.762v-4.3h5.965v-1.782h-7.969v14.031h8.153v-1.797ZM104.012 39.277l-4.227-9.879H97.77l6.039 14.125h.464l5.946-14.125h-2ZM113.758 37.277h5.762v-1.8h-5.762v-4.282h5.965v-1.797h-7.97V43.45h8.153v-1.8h-6.148ZM133.21 40.316l-9.464-10.918h-1.633v14.07h1.89V32.642l9.392 10.828h1.742v-14.07h-1.926ZM148.68 29.379h-11.727v1.8h4.817v12.29h2.02v-12.29h4.89ZM153 29.324l-6.043 14.145h2.078l1.762-4.172h6l1.871 4.172h2.059l-6.297-14.145Zm-1.41 8.176 2.094-5.098 2.261 5.098ZM166.914 35.902l-1.539-.906c-.688-.406-1.188-.797-1.504-1.148-.312-.371-.46-.758-.46-1.188 0-.48.202-.867.628-1.164.426-.297.965-.465 1.613-.465 1.168 0 2.262.48 3.262 1.465v-2.281a5.604 5.604 0 0 0-3.226-.98c-1.165 0-2.223.35-3 1.035-.758.687-1.149 1.597-1.149 2.707 0 .742.203 1.39.613 1.964.407.575 1.09 1.149 2.036 1.727l1.539.926c1.242.758 1.855 1.574 1.855 2.43 0 .515-.203.96-.629 1.312-.426.352-.945.52-1.578.52-1.426 0-2.684-.684-3.777-2.06v2.54c1.148.852 2.41 1.281 3.797 1.281 1.203 0 2.187-.355 2.945-1.058.762-.704 1.129-1.614 1.129-2.743.02-1.578-.852-2.89-2.555-3.91ZM99.75 50.902h1.945v-.41H99.75v-1.094h2.074v-.406H99.29v3.52h2.629v-.407H99.75ZM104.605 50.66a4.92 4.92 0 0 0-.777-.222c-.371-.094-.613-.168-.703-.258-.094-.075-.133-.188-.133-.317 0-.148.059-.277.188-.37.129-.11.332-.15.61-.15.276 0 .483.06.612.169.13.11.223.277.239.5l.445-.035c0-.207-.074-.391-.168-.559a.93.93 0 0 0-.461-.371 1.954 1.954 0 0 0-.684-.129c-.242 0-.445.039-.648.113a.924.924 0 0 0-.445.352.78.78 0 0 0-.149.5c0 .164.035.312.13.445a.944.944 0 0 0 .37.332c.13.074.352.149.684.223.316.074.539.129.629.168a.702.702 0 0 1 .316.203.516.516 0 0 1 .094.297c0 .11-.04.203-.094.293a.727.727 0 0 1-.297.222 1.155 1.155 0 0 1-.46.075c-.204 0-.391-.036-.54-.11a.813.813 0 0 1-.351-.277 1.002 1.002 0 0 1-.149-.426l-.441.035c0 .242.07.446.183.63.13.187.297.335.5.425.223.094.48.148.797.148.258 0 .48-.035.684-.129.203-.09.352-.222.465-.386a.943.943 0 0 0 .015-1.04 1.33 1.33 0 0 0-.46-.35ZM108.145 49.195a1.366 1.366 0 0 0-.426-.168 3.579 3.579 0 0 0-.54-.035h-1.331v3.52h.46v-1.426h.91c.5 0 .852-.113 1.036-.316.183-.204.277-.465.277-.758 0-.168-.035-.336-.11-.485a.713.713 0 0 0-.276-.332Zm-.278 1.297c-.133.11-.336.168-.648.168h-.91v-1.262h.91c.203 0 .351.02.426.04.128.035.222.109.293.203.074.09.113.222.113.37 0 .22-.055.368-.184.481ZM109.61 50.902h1.94v-.41h-1.94v-1.094h2.07v-.406h-2.535v3.52h2.628v-.407h-2.164ZM114.555 51.957c-.188.148-.41.223-.668.223-.223 0-.407-.055-.594-.168-.184-.11-.313-.278-.406-.5-.094-.223-.13-.48-.13-.778 0-.242.036-.464.11-.687a.992.992 0 0 1 .39-.516c.184-.129.407-.203.684-.203.243 0 .426.055.594.164.149.113.278.297.352.555l.46-.11a1.353 1.353 0 0 0-.5-.757c-.238-.188-.534-.282-.886-.282-.316 0-.594.075-.852.207a1.31 1.31 0 0 0-.593.63c-.149.277-.204.593-.204.96 0 .336.055.649.184.946.133.297.297.52.54.668.241.148.554.242.925.242s.684-.094.926-.297c.258-.203.425-.5.52-.871l-.466-.113c-.074.296-.203.539-.386.687ZM116.055 48.992h.465v3.52h-.465ZM118.316 48.992l-1.351 3.52h.5l.387-1.075h1.484l.406 1.075h.54l-1.446-3.52Zm-.351 2.074.387-1.035c.074-.222.148-.445.187-.668.055.184.129.426.238.723l.371.98ZM121.074 48.992h-.46v3.52h2.202v-.407h-1.742ZM123.445 48.992h.465v3.52h-.465ZM126.781 50.66a4.92 4.92 0 0 0-.777-.222c-.371-.094-.61-.168-.703-.258-.094-.075-.13-.188-.13-.317 0-.148.056-.277.184-.37.133-.11.336-.15.614-.15.277 0 .48.06.61.169a.72.72 0 0 1 .241.5l.446-.035c0-.207-.075-.391-.168-.559a.94.94 0 0 0-.465-.371 1.954 1.954 0 0 0-.684-.129c-.242 0-.445.039-.648.113a.962.962 0 0 0-.446.352.804.804 0 0 0-.148.5c0 .164.04.312.133.445a.958.958 0 0 0 .367.332c.133.074.356.149.688.223.312.074.535.129.628.168a.726.726 0 0 1 .317.203c.055.074.09.184.09.297a.55.55 0 0 1-.09.293.727.727 0 0 1-.297.222 1.163 1.163 0 0 1-.465.075c-.203 0-.387-.036-.535-.11a.79.79 0 0 1-.352-.277 1.002 1.002 0 0 1-.148-.426l-.445.035c0 .242.074.446.183.63.133.187.297.335.5.425.223.094.485.148.797.148.262 0 .48-.035.688-.129.203-.09.351-.222.46-.386a.927.927 0 0 0 .02-1.04 1.387 1.387 0 0 0-.465-.35ZM130.543 48.992h-2.797v.406h1.164v3.114h.465v-3.114h1.168ZM131.617 48.992l-1.351 3.52h.5l.386-1.075h1.485l.406 1.075h.539l-1.445-3.52Zm-.332 2.074.387-1.035c.074-.222.148-.445.187-.668.055.184.13.426.239.723l.37.98ZM135.992 50.66a5.002 5.002 0 0 0-.781-.222c-.367-.094-.61-.168-.703-.258-.09-.075-.13-.188-.13-.317a.43.43 0 0 1 .188-.37c.13-.11.332-.15.61-.15.277 0 .48.06.61.169.132.11.222.277.241.5l.446-.035c0-.207-.075-.391-.168-.559a.93.93 0 0 0-.461-.371 1.976 1.976 0 0 0-.688-.129c-.238 0-.445.039-.648.113a.932.932 0 0 0-.442.352.78.78 0 0 0-.148.5c0 .164.035.312.129.445a.944.944 0 0 0 .371.332c.129.074.352.149.684.223.316.074.535.129.628.168a.702.702 0 0 1 .317.203c.055.074.09.184.09.297a.55.55 0 0 1-.09.293.727.727 0 0 1-.297.222 1.163 1.163 0 0 1-.465.075c-.203 0-.387-.036-.535-.11a.79.79 0 0 1-.352-.277 1.002 1.002 0 0 1-.148-.426l-.445.035c0 .242.074.446.187.63.13.187.293.335.5.425.219.094.48.148.793.148a1.6 1.6 0 0 0 .688-.129c.203-.09.351-.222.46-.386a.927.927 0 0 0 .02-1.04 1.33 1.33 0 0 0-.46-.35ZM139.066 50.902h1.965v-.41h-1.965v-1.094h2.094v-.406h-2.558v3.52h2.632v-.407h-2.168ZM144.215 51.754l-1.852-2.762h-.48v3.52h.445V49.75l1.852 2.762h.48v-3.52h-.445ZM147.293 50.902h1.941v-.41h-1.941v-1.094h2.074v-.406h-2.554v3.52h2.628v-.407h-2.148ZM151.96 51.438c-.093.242-.148.445-.187.574-.035-.11-.09-.297-.164-.52l-.836-2.5h-.703v3.52h.446v-3.004l1.02 3.004h.425l1.035-2.946v2.946h.445v-3.52h-.629ZM156.168 50.64a.793.793 0 0 0 .367-.312.906.906 0 0 0 .133-.426.834.834 0 0 0-.133-.465.828.828 0 0 0-.387-.332c-.168-.074-.37-.113-.648-.113h-1.316v3.524h1.351c.223 0 .41-.02.574-.059.149-.035.282-.09.391-.164.11-.074.184-.188.258-.336a.993.993 0 0 0 .113-.46.877.877 0 0 0-.168-.54 1.103 1.103 0 0 0-.535-.312Zm-.816-1.238c.257 0 .425.016.539.055.109.035.183.09.238.184a.568.568 0 0 1 0 .629.43.43 0 0 1-.258.167c-.094.02-.242.04-.445.04h-.758l-.02-1.075Zm.925 2.391a.663.663 0 0 1-.183.203 1.096 1.096 0 0 1-.278.094c-.058.015-.168.015-.316.015h-.871v-1.203h.816c.223 0 .387.02.52.055a.55.55 0 0 1 .277.203c.074.094.09.207.09.336.02.11 0 .203-.055.297ZM159.762 51.031h.035c0 .446-.074.742-.223.887-.148.148-.387.242-.738.242a.998.998 0 0 1-.5-.11.66.66 0 0 1-.297-.335c-.055-.149-.094-.371-.094-.684v-2.039h-.46v2.04c0 .37.035.667.128.886.094.223.239.39.446.5.203.113.48.168.812.168.332 0 .613-.074.816-.203a1.01 1.01 0 0 0 .426-.5c.075-.203.11-.48.11-.852v-2.039h-.461ZM163.39 49.29a1.19 1.19 0 0 0-.519-.263 2.797 2.797 0 0 0-.629-.054h-1.222v3.52h1.28c.22 0 .407-.016.571-.056.168-.035.297-.09.426-.183a1.28 1.28 0 0 0 .316-.316c.094-.13.184-.313.242-.52a2.72 2.72 0 0 0 .09-.703c0-.313-.035-.594-.129-.832a1.667 1.667 0 0 0-.425-.594Zm-.019 2.112a1.004 1.004 0 0 1-.258.442.758.758 0 0 1-.316.187 2.06 2.06 0 0 1-.555.074h-.758v-2.687h.743c.277 0 .48.02.609.074.168.074.316.203.445.387.13.187.184.484.184.851 0 .262-.035.485-.094.668ZM167.023 49.156a1.757 1.757 0 0 0-.886-.238c-.5 0-.91.164-1.223.5-.316.332-.465.797-.465 1.371 0 .313.074.61.203.887.133.277.336.5.594.648.258.149.555.242.89.242.313 0 .59-.074.852-.222.258-.149.461-.352.61-.649a2 2 0 0 0 .222-.965c0-.367-.074-.664-.203-.94a1.472 1.472 0 0 0-.594-.634Zm-.02 2.653a1.13 1.13 0 0 1-.866.37c-.352 0-.633-.128-.852-.37-.222-.243-.336-.575-.336-1 0-.54.113-.907.352-1.13.242-.222.52-.335.851-.335.243 0 .446.058.633.187.184.13.332.278.426.5.09.223.144.461.144.758-.015.426-.128.777-.351 1.02ZM170.469 50.66a4.92 4.92 0 0 0-.778-.222c-.37-.094-.609-.168-.703-.258-.093-.075-.129-.188-.129-.317 0-.148.055-.277.184-.37.129-.11.336-.15.613-.15.278 0 .48.06.61.169a.72.72 0 0 1 .242.5l.441-.035c0-.207-.07-.391-.164-.559a.957.957 0 0 0-.465-.371 1.954 1.954 0 0 0-.683-.129c-.242 0-.446.039-.649.113a.962.962 0 0 0-.445.352.804.804 0 0 0-.148.5c0 .164.039.312.132.445a.958.958 0 0 0 .368.332c.132.074.351.149.687.223.313.074.535.129.629.168a.687.687 0 0 1 .312.203.49.49 0 0 1 .094.297c0 .11-.035.203-.094.293a.69.69 0 0 1-.293.222 1.175 1.175 0 0 1-.464.075c-.203 0-.387-.036-.536-.11a.79.79 0 0 1-.351-.277.952.952 0 0 1-.149-.426l-.445.035c0 .242.074.446.184.63.133.187.297.335.5.425.222.094.484.148.797.148.261 0 .48-.035.687-.129.203-.09.352-.222.461-.386a.947.947 0 0 0 .168-.54.961.961 0 0 0-.148-.5 1.387 1.387 0 0 0-.465-.35ZM175.438 49.29a1.213 1.213 0 0 0-.52-.263 2.821 2.821 0 0 0-.629-.054h-1.223v3.52h1.278c.222 0 .406-.016.574-.056a1.07 1.07 0 0 0 .426-.183c.11-.074.222-.188.312-.316.094-.13.188-.313.242-.52.055-.203.094-.441.094-.703 0-.313-.039-.594-.129-.832a2.016 2.016 0 0 0-.425-.594Zm-.02 2.112a1.009 1.009 0 0 1-.262.442.768.768 0 0 1-.312.187 2.084 2.084 0 0 1-.555.074h-.762v-2.687h.743c.277 0 .48.02.609.074.168.074.316.203.445.387.13.187.184.484.184.851 0 .262-.035.485-.09.668ZM177.102 50.902h1.964v-.41h-1.964v-1.094h2.093v-.406h-2.554v3.52h2.629v-.407h-2.168ZM182.715 51.55c-.074.184-.13.388-.184.575a8.864 8.864 0 0 0-.187-.574l-.906-2.559h-.5l1.37 3.52h.481l1.39-3.52h-.484ZM185.05 50.902h1.946v-.41h-1.945v-1.094h2.074v-.406h-2.54v3.52h2.634v-.407h-2.168ZM190.184 51.754l-1.856-2.762h-.48v3.52h.445V49.75l1.852 2.762h.484v-3.52h-.445ZM193.945 48.992h-2.8v.406h1.167v3.114h.461v-3.114h1.172ZM195.016 48.992l-1.352 3.52h.5l.39-1.075h1.485l.406 1.075h.535l-1.44-3.52Zm-.332 2.074.39-1.035c.074-.222.149-.445.184-.668.054.184.129.426.242.723l.371.98ZM199.836 51.012c-.094-.149-.242-.258-.465-.352a4.92 4.92 0 0 0-.777-.222c-.371-.094-.61-.168-.703-.258-.094-.075-.13-.188-.13-.317 0-.148.055-.277.184-.37.133-.11.336-.15.614-.15.277 0 .48.06.609.169a.72.72 0 0 1 .242.5l.445-.035c0-.207-.074-.391-.167-.559a.94.94 0 0 0-.465-.371 1.954 1.954 0 0 0-.684-.129c-.242 0-.445.039-.648.113a.962.962 0 0 0-.446.352.804.804 0 0 0-.148.5c0 .164.039.312.133.445a.958.958 0 0 0 .367.332c.133.074.351.149.687.223.313.074.536.129.63.168a.726.726 0 0 1 .316.203c.054.074.09.184.09.297a.55.55 0 0 1-.09.293.727.727 0 0 1-.297.222 1.163 1.163 0 0 1-.465.075c-.203 0-.387-.036-.535-.11a.79.79 0 0 1-.352-.277 1.002 1.002 0 0 1-.148-.426l-.446.035c0 .242.075.446.184.63.133.187.297.335.5.425.223.094.484.148.797.148.262 0 .48-.035.687-.129.204-.09.352-.222.461-.386a.927.927 0 0 0 .02-1.04ZM77.055 13.328v39.777l-39.703-.074-11.86 11.864h64.863V0Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#fff",
          fillOpacity: 1,
        }}
      />
      <path
        d="m53.988 57.148-16.824-4.043L25.31 64.988l64.863-.02Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#ccc",
          fillOpacity: 1,
        }}
      />
      <path
        d="M41.742 6.117C18.88 6.32.222 25.007.016 47.86-.074 59.633 4.648 70.29 12.336 78L22.62 67.71c-5.113-5.19-8.172-12.397-7.894-20.331.52-14.348 12.191-26.027 26.53-26.543 7.93-.281 15.118 2.777 20.325 7.894l10.285-10.289C64.176 10.75 53.507 6.004 41.742 6.117Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#fff",
          fillOpacity: 1,
        }}
      />
      <path
        d="M42.094 6.117c-14.25 0-26.828 7.078-34.442 17.906a41.917 41.917 0 0 1 24.157-7.64c11.617 0 22.14 4.71 29.753 12.328l10.286-10.27C64.23 10.821 53.71 6.113 42.094 6.113ZM14.73 47.32c.165-4.89 1.649-9.488 4.094-13.437a41.814 41.814 0 0 0-8.078 24.394 42.098 42.098 0 0 0 3.684 17.645l8.21-8.211a27.603 27.603 0 0 1-7.913-20.39Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#ccc",
          fillOpacity: 1,
        }}
      />
    </svg>
  )
}

export const Isotipo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={34}
      viewBox="0 0 39 34"
    >
      <path
        d="M33.258 5.809v17.34l-17.14-.032L11 28.29h28V0Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#fff",
          fillOpacity: 1,
        }}
      />
      <path
        d="m23.3 24.91-7.265-1.762-5.117 5.18 28-.008Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#ccc",
          fillOpacity: 1,
        }}
      />
      <path
        d="M18.012 2.668C8.145 2.754.09 10.898 0 20.863-.04 25.993 2 30.641 5.32 34l4.438-4.484a12.033 12.033 0 0 1-3.406-8.864c.222-6.254 5.261-11.343 11.453-11.57a11.793 11.793 0 0 1 8.773 3.441L31.02 8.04c-3.32-3.351-7.93-5.422-13.008-5.371Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#fff",
          fillOpacity: 1,
        }}
      />
      <path
        d="M18.164 2.668c-6.148 0-11.582 3.086-14.867 7.805a17.966 17.966 0 0 1 10.43-3.328c5.015 0 9.558 2.05 12.843 5.37l4.438-4.476c-3.285-3.32-7.828-5.371-12.844-5.371ZM6.352 20.629c.074-2.133.71-4.137 1.77-5.86a18.349 18.349 0 0 0-3.49 10.633 18.532 18.532 0 0 0 1.59 7.692l3.544-3.578a12.093 12.093 0 0 1-3.414-8.887Zm0 0"
        style={{
          stroke: "none",
          fillRule: "nonzero",
          fill: "#ccc",
          fillOpacity: 1,
        }}
      />
    </svg>
  )
}
