import { Route, Routes } from "react-router-dom";
import {
    Cumpleanos,
    Login,
    RegistroAsistencia,
    PerfilColaborador,
    VistaEvaluaciones,
    VistaHomeColaborador,
    AsistenciaAdmin,
    AdmiJustificacion,
    DetalleCumpleanos,
    JustificacionColaborador,
    
} from "../components";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<VistaHomeColaborador />} />
            <Route path="/cumpleanos" element={<Cumpleanos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/asistencia" element={<RegistroAsistencia />} />
            <Route path="/perfil" element={<PerfilColaborador />} />
            <Route path="/evaluaciones" element={<VistaEvaluaciones />} />
            <Route path="/asistenciaAdmin" element={<AsistenciaAdmin />} />
            <Route path="/justificaciones" element={<AdmiJustificacion />} />
            <Route path="/justificacionColaborador" element={<JustificacionColaborador />} />
            <Route path="/homeColaborador" element={<VistaHomeColaborador />} />
            <Route path="/detalleCumpleanos/:month/:day" element={<DetalleCumpleanos />} />
        </Routes>
    );
}

export default AppRoutes;