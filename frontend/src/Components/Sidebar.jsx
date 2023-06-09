import { useState } from "react";
import { Link } from "react-router-dom";
import CVLogo from '../assets/logo.svg'
import CVIsotipo from '../assets/isotipo.svg'
import MenuIcon from '@mui/icons-material/Menu';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CakeIcon from '@mui/icons-material/Cake';
import DescriptionIcon from '@mui/icons-material/Description';
import BalanceIcon from '@mui/icons-material/Balance';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';



export const Sidebar = () => {

	const [isVisible, setIsVisible] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const menuItems = [
		{ route: "colaboradores", title: "Colaboradores", icon: <Diversity3Icon /> },
		{ route: "cumpleanos", title: "Cumpleaños", icon: <CakeIcon /> },
		{ route: "evaluaciones", title: "Evaluaciones", icon: <DescriptionIcon /> },
		{ route: "justificaciones", title: "Justificaciones", icon: <BalanceIcon /> },
		{ route: "asistencia", title: "Asistencias", icon: <ChecklistIcon /> },
		{ route: "reportes", title: "Reportes", icon: <TrendingUpIcon /> }
	]

	const menuItemsUser = [
		{ route: "perfil", title: "Perfil", icon: <AccountCircleIcon /> },
		{ route: "configuracion", title: "Configuración", icon: <SettingsIcon /> },
		{ route: "login", title: "Cerrar Sesión", icon: <LogoutIcon /> },
	]

	const showMenuUser = () => {
		setIsVisible(!isVisible);
	}
	const showSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	}

	return (
		<>
			<section className="flex">
				<nav className={`${sidebarOpen ? "w-60" : "w-20"} h-screen duration-300`}>
					<div className="w-full h-full p-5 bg-cv-primary text-white">
						<div className="w-full">

							<img src={CVLogo} alt="Logo" className={`${!sidebarOpen && "hidden"} duration-500`} />
							<img src={CVIsotipo} alt="Logo" className={`${!sidebarOpen ? "block pb-5" : "hidden"} duration-30`} />

						</div>
						<div className="py-4 space-y-4">
							{menuItems.map((menu, index) => (
								<Link key={index} to={`/${menu.route}`} className="cursor-pointer flex items-center p-2 hover:bg-cv-secondary rounded-md">
									<div className="font-semibold flex items-center gap-x-4">
										<span>{menu.icon}</span>
										<span className={`${!sidebarOpen && "hidden"} origin-left duration-200`}>{menu.title}</span>
									</div>
								</Link>
							))}
						</div>
					</div>

				</nav>
				<div className="w-full">
					<div className="w-full h-20 p-2 bg-cv-primary flex justify-between items-center">
						<button onClick={showSidebar} className="bg-white text-cv-primary rounded-lg p-2 outline-none">
							<MenuIcon />
						</button>
						<div className="relative">
							<div className="flex justify-between items-center">
								<div className="mr-2">
									<p className="text-2xl font-medium text-white">Bonnie Green</p>
									<p className="text-lg font-normal text-teal-300">Administrador</p>
								</div>
								<button onClick={showMenuUser} className="outline-none">
									<img src="https://images.pexels.com/photos/3579181/pexels-photo-3579181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Foto de Perfil" className="w-14 h-14 rounded-full shadow-lg" />
								</button>
							</div>

							<div className={`${isVisible ? "block" : "hidden"} absolute w-52 mt-3 bg-cv-primary p-4 rounded-b-lg`}>
								<div className="space-y-2 text-white">
									{menuItemsUser.map((menu, index) => (
										<Link key={index} to={`/${menu.route}`} className="cursor-pointer">
											<div className="p-2 font-semibold hover:bg-cv-secondary rounded-md">
												<span className="mr-4">{menu.icon}</span>
												<span>{menu.title}</span>
											</div>
										</Link>
									))}
								</div>
							</div>

						</div>
					</div>
					<section className="w-full  p-2">
						<h1>Seccion para agregar vistas</h1>
					</section>
				</div>
			</section >
		</>
	)
}

