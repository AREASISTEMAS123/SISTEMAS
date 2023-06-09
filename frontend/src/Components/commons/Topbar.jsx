import { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export const Topbar = ({ toggleSidebar }) => {
    const [isVisible, setIsVisible] = useState(false);

    const showMenuUser = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="w-full h-20 p-2 bg-cv-primary flex justify-between items-center">
            <button
                onClick={toggleSidebar}
                className="bg-white text-cv-primary rounded-lg p-2 outline-none"
            >
                <MenuIcon />
            </button>
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
                            className="w-14 h-14 rounded-full shadow-lg"
                        />
                    </button>
                </div>
                <div className={`${isVisible ? "block" : "hidden"} absolute w-52 mt-3 bg-cv-primary p-4 rounded-b-lg`}>
                    <div className="space-y-2 text-white">
                        <Link to="/perfil" className="cursor-pointer">
                            <div className="p-2 font-semibold hover:bg-cv-secondary rounded-md">
                                <span className="mr-4"><AccountCircleIcon /></span>
                                <span>Perfil</span>
                            </div>
                        </Link>
                        <Link to="/configuracion" className="cursor-pointer">
                            <div className="p-2 font-semibold hover:bg-cv-secondary rounded-md">
                                <span className="mr-4"><SettingsIcon /></span>
                                <span>Configuración</span>
                            </div>
                        </Link>
                        <Link to="/login" className="cursor-pointer">
                            <div className="p-2 font-semibold hover:bg-cv-secondary rounded-md">
                                <span className="mr-4"><LogoutIcon /></span>
                                <span>Cerrar Sesión</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};