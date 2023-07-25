import React, { useState } from 'react';
import CVLogo from "../../assets/logo.svg";
import CVIsotipo from "../../assets/isotipo.svg";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CakeIcon from "@mui/icons-material/Cake";
import DescriptionIcon from "@mui/icons-material/Description";
import BalanceIcon from "@mui/icons-material/Balance";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const getRole = () => {
  return localStorage.getItem('rol');
};

const sidebarContent = {
  Colaborador: [
    { route: "perfil", title: "Perfil", icon: <AccountCircleIcon /> },
    { route: "asistencia", title: "Asistencia", icon: <TrendingUpIcon /> },
    { route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon /> },
    { route: "evaluacion", title: "Evaluacion", icon: <DescriptionIcon /> },
    { route: "justificacion", title: "Justificacion", icon: <BalanceIcon /> },
  ],
  "Lider Nucleo": [
    { route: "perfil", title: "Perfil", icon: <AccountCircleIcon /> },
    { route: "colaboradores", title: "Colaboradores", icon: <Diversity3Icon /> },
    { route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon /> },
    { route: "reportes", title: "Reportes", icon: <TrendingUpIcon /> },
  ],
  Gerencia: [
    { route: "perfil", title: "Perfil", icon: <AccountCircleIcon /> },
    { route: "colaboradores", title: "Colaboradores", icon: <Diversity3Icon /> },
    { route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon /> },
    { route: "evaluaciones", title: "Evaluaciones", icon: <DescriptionIcon /> },
    { route: "justificaciones", title: "Justificaciones", icon: <BalanceIcon /> },
    { route: "asistencias", title: "Asistencias", icon: <ChecklistIcon /> },
    { route: "reportes", title: "Reportes", icon: <TrendingUpIcon /> },
  ],
};

export const Sidebar = ({ isOpen }) => {
  const rol = getRole();
  const menuItems = sidebarContent[rol] || [];

  const [isAsistenciaOpen, setIsAsistenciaOpen] = useState(false);
  const [isJustificacionesOpen, setIsJustificacionesOpen] = useState(false);
  const [isEvaluacionesOpen, setIsEvaluacionesOpen] = useState(false);

  const toggleAsistenciaDropdown = () => {
    setIsAsistenciaOpen(!isAsistenciaOpen);
    setIsJustificacionesOpen(false);
    setIsEvaluacionesOpen(false);
  };

  const toggleJustificacionesDropdown = () => {
    setIsJustificacionesOpen(!isJustificacionesOpen);
    setIsAsistenciaOpen(false);
    setIsEvaluacionesOpen(false);
  };

  const toggleEvaluacionesDropdown = () => {
    setIsEvaluacionesOpen(!isEvaluacionesOpen);
    setIsAsistenciaOpen(false);
    setIsJustificacionesOpen(false);
  };

  return (
    <nav className={`${isOpen ? "w-60" : "w-20"} min-h-screen duration-300`}>
      <div className="w-full h-full p-5 bg-cv-primary text-white relative">
        <div className="w-full">
          <img
            src={CVLogo}
            alt="Logo"
            className={`${isOpen ? "" : "hidden"} duration-500`}
          />
          <img
            src={CVIsotipo}
            alt="Logo"
            className={`${!isOpen ? "block pb-5" : "hidden"} duration-300`}
          />
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
              <div className="relative">
                <div
                  className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
                  onClick={toggleAsistenciaDropdown}
                >
                  <div className="font-semibold flex items-center gap-x-4">
                    <span>
                      <ChecklistIcon />
                    </span>
                    <span
                      className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                    >
                      Asistencia
                    </span>
                  </div>
                </div>
                {isAsistenciaOpen && (
                  <div className="absolute left-0 top-12 bg-cv-primary w-44 py-2 rounded-md shadow-md z-10">
                    <Link
                      to="/asistencia"
                      className="block px-4 py-2 text-white hover:bg-cv-secondary"
                    >
                      Asistencia
                    </Link>
                    <Link
                      to="/asistencias"
                      className="block px-4 py-2 text-white hover:bg-cv-secondary"
                    >
                      Asistencias
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <div
                  className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
                  onClick={toggleJustificacionesDropdown}
                >
                  <div className="font-semibold flex items-center gap-x-4">
                    <span>
                      <BalanceIcon />
                    </span>
                    <span
                      className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                    >
                      Justificaciones
                    </span>
                  </div>
                </div>
                {isJustificacionesOpen && (
                  <div className="absolute left-0 top-12 bg-cv-primary w-44 py-2 rounded-md shadow-md z-10">
                    <Link
                      to="/justificacion"
                      className="block px-4 py-2 text-white hover:bg-cv-secondary"
                    >
                      Justificacion
                    </Link>
                    <Link
                      to="/justificaciones"
                      className="block px-4 py-2 text-white hover:bg-cv-secondary"
                    >
                      Justificaciones
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <div
                  className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md"
                  onClick={toggleEvaluacionesDropdown}
                >
                  <div className="font-semibold flex items-center gap-x-4">
                    <span>
                      <DescriptionIcon />
                    </span>
                    <span
                      className={`${isOpen ? "" : "hidden"} origin-left duration-200`}
                    >
                      Evaluaciones
                    </span>
                  </div>
                </div>
                {isEvaluacionesOpen && (
                  <div className="absolute left-0 top-12 bg-cv-primary w-44 py-2 rounded-md shadow-md z-10">
                    <Link
                      to="/evaluacion"
                      className="block px-4 py-2 text-white hover:bg-cv-secondary"
                    >
                      Evaluacion
                    </Link>
                    <Link
                      to="/evaluaciones"
                      className="block px-4 py-2 text-white hover:bg-cv-secondary"
                    >
                      Evaluaciones
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};