import React from "react";
import { Link, Router } from "react-router-dom";
import CVLogo from "../../assets/logo.svg";
import CVIsotipo from "../../assets/isotipo.svg";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import CakeIcon from "@mui/icons-material/Cake";
import DescriptionIcon from "@mui/icons-material/Description";
import BalanceIcon from "@mui/icons-material/Balance";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export const Sidebar = ({ isOpen }) => {
    const menuItems = [
        { route: "colaboradores", title: "Colaboradores", icon: <Diversity3Icon /> },
        { route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon /> },
        { route: "evaluaciones", title: "Evaluaciones", icon: <DescriptionIcon /> },
        { route: "justificaciones", title: "Justificaciones", icon: <BalanceIcon /> },
        { route: "asistencia", title: "Asistencias", icon: <ChecklistIcon /> },
        { route: "reportes", title: "Reportes", icon: <TrendingUpIcon /> },
    ];

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
                </div>
            </div>
        </nav>
    );
};