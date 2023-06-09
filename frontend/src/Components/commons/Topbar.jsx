import React from 'react';

export const Topbar = ({ toggleSidebar }) => {
    return (
        <div className="w-full h-20 p-2 bg-slate-950 flex justify-between items-center">
            <button onClick={toggleSidebar} className="bg-teal-300 text-white rounded-lg p-2">
                <p>Abrir</p>
            </button>
            <div className="relative">
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <p className="text-2xl font-medium text-white">Bonnie Green</p>
                        <p className="text-lg font-normal text-teal-300">Administrador</p>
                    </div>
                    <button>
                        <img src="https://images.pexels.com/photos/3579181/pexels-photo-3579181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Foto de Perfil" className="w-14 h-14 rounded-full shadow-lg" />
                    </button>
                </div>

                <div className="absolute hidden w-52 mt-3 bg-slate-950 p-4 rounded-b-lg">
                    <ul className="space-y-2 text-white">
                        <li className="py-2 font-semibold cursor-pointer hover:text-teal-300">Perfil</li>
                        <li className="py-2 font-semibold cursor-pointer hover:text-teal-300">Configuración</li>
                        <li className="py-2 font-semibold cursor-pointer hover:text-teal-300">Cerrar Sesión</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};