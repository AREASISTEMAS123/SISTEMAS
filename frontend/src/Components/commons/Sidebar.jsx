import React from 'react';
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

export const Sidebar = ({ isOpen }) => {
  const rol = localStorage.getItem('rol');

    // Función para verificar si el usuario tiene un rol específico
    const hasRole = (targetRoles) => {
      if (!Array.isArray(targetRoles)) {
        targetRoles = [targetRoles];
      }
      return targetRoles.includes(rol);
    };

  const menuItems = [
    { route: "perfil", title: "Perfil", icon: <AccountCircleIcon />, requiredRoles: ["Colaborador", "Lider Area", "Gerencia", "Lider Departamento"]},
    { route: "colaboradores", title: "Colaboradores", icon: <Diversity3Icon />, requiredRoles: ["Gerencia", "Lider Departamento"]},
    { route: "asistencia", title: "Asistencia", icon: <TrendingUpIcon />, requiredRoles: ["Colaborador", "Lider Area", "Lider Departamento"] },
    { route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon />, requiredRoles: ["Colaborador", "Lider Area", "Gerencia", "Lider Departamento"] },
    { route: "evaluacion", title: "Evaluacion", icon: <DescriptionIcon />, requiredRoles: ["Colaborador", "Lider Area"] },
    { route: "justificacion", title: "Justificacion", icon: <BalanceIcon />, requiredRoles: ["Colaborador", "Lider Area", "Lider Departamento"] },
    { route: "evaluaciones", title: "Evaluaciones", icon: <DescriptionIcon />, requiredRoles: ["Gerencia", "Lider Area", "Lider Departamento"] },
    { route: "justificaciones", title: "Justificaciones", icon: <BalanceIcon />, requiredRoles: ["Gerencia", "Lider Departamento"] },
    { route: "asistencias", title: "Asistencias", icon: <ChecklistIcon />, requiredRoles: ["Gerencia", "Lider Departamento"] },
    { route: "reportes", title: "Reportes", icon: <TrendingUpIcon />, requiredRoles: ["Gerencia", "Lider Departamento"] },

  ];

  const filteredMenuItems = menuItems.filter(menu => {
    // Verificar si el usuario tiene el rol requerido para el menú actual
    return hasRole(menu.requiredRoles);
  });

  return (
    <nav className={`${isOpen ? "w-60" : "w-20"} h-screen duration-300`}>
      <div className="w-full h-full p-5 bg-cv-primary text-white">
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
          {filteredMenuItems.map((menu, index) => (
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
        </div>
      </div>
    </nav>
  );
};