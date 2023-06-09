import { Link } from "react-router-dom";

export const Sidebar = ({ isOpen }) => {
    return (
        <nav className={`w-60 h-screen p-2 bg-slate-950 text-white ${isOpen ? 'block' : 'hidden'}`}>
            <div className="w-full h-36">
                <Link to="/"><img src="https://images.pexels.com/photos/3579181/pexels-photo-3579181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="w-full h-full" /></Link>
            </div>
            <ul className="py-4 space-y-4">
                <li className="py-2 font-semibold cursor-pointer hover:text-teal-300 hover:border-b-2 border-teal-300">
                    <Link to="/perfil">Colaboradores</Link></li>
                <li className="py-2 font-semibold cursor-pointer hover:text-teal-300 hover:border-b-2 border-teal-300">
                    <Link to="/cumpleanos">Cumpleaños</Link></li>
                <li className="py-2 font-semibold cursor-pointer hover:text-teal-300 hover:border-b-2 border-teal-300">
                    <Link to="evaluacion">Evaluaciones</Link></li>
                <li className="py-2 font-semibold cursor-pointer hover:text-teal-300 hover:border-b-2 border-teal-300">Justificaciones</li>
                <li className="py-2 font-semibold cursor-pointer hover:text-teal-300 hover:border-b-2 border-teal-300">
                    <Link to="asistencia">Asistencias</Link></li>
                <li className="py-2 font-semibold cursor-pointer hover:text-teal-300 hover:border-b-2 border-teal-300">
                    <Link >Reportes</Link></li>
            </ul>
        </nav>
    );
};