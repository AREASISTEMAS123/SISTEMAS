import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
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
    EvaluacionesColaborador,
    VistaAdminColaborador,
    OlvideContraseña,
    RestablecerContraseña
} from "../components";
import { VistaReportes } from "../components/VistaReportes";

const AppRoutes = () => {
    const rol = localStorage.getItem('rol');

    // Función para verificar si el usuario tiene un rol específico
    const hasRole = (targetRole) => {
        return rol === targetRole;
    };

    return (
        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/OlvideContraseña" element={<OlvideContraseña/>}/>
            <Route path="/RestablecerContraseña" element={<RestablecerContraseña/>}/>

            {hasRole('Colaborador') && (
                <>
                    <Route path="/home" element ={<VistaHomeColaborador />} />
                    <Route path="/cumpleanos" element={<Cumpleanos />} />
                    <Route path="/detalleCumpleanos/:month/:day" element={<DetalleCumpleanos />} />
                    <Route path="/perfil" element={<PerfilColaborador />} />
                    <Route path="/asistencia" element={<RegistroAsistencia />} />
                    <Route path="/justificacion" element={<JustificacionColaborador />} />
                    <Route path="/evaluacion" element={<EvaluacionesColaborador />} />
                </>
            )}

            {hasRole('Lider Area') && (
                <>
                    <Route path="/home" element ={<VistaHomeColaborador />} />
                    <Route path="/cumpleanos" element={<Cumpleanos />} />
                    <Route path="/detalleCumpleanos/:month/:day" element={<DetalleCumpleanos />} />
                    <Route path="/perfil" element={<PerfilColaborador />} />
                    <Route path="/asistencia" element={<RegistroAsistencia />} />
                    <Route path="/justificacion" element={<JustificacionColaborador />} />
                    <Route path="/evaluaciones" element={<VistaEvaluaciones />} />
                    <Route path="/evaluacion" element={<EvaluacionesColaborador />} />
                </>
            )}

            {hasRole('Lider Departamento') && (
                <>
                    <Route path="/home" element ={<VistaHomeColaborador />} />
                    <Route path="/cumpleanos" element={<Cumpleanos />} />
                    <Route path="/colaboradores" element={<VistaAdminColaborador />} />
                    <Route path="/detalleCumpleanos/:month/:day" element={<DetalleCumpleanos />} />
                    <Route path="/perfil" element={<PerfilColaborador />} />
                    <Route path="/asistencia" element={<RegistroAsistencia />} />
                    <Route path="/justificacion" element={<JustificacionColaborador />} />
                    <Route path="/justificaciones" element={<AdmiJustificacion />} />
                    <Route path="/evaluaciones" element={<VistaEvaluaciones />} />
                    <Route path="/asistencias" element={<AsistenciaAdmin />} />
                    <Route path="/reportes" element={<VistaReportes/>}/>
                </>
            )}

            {hasRole('Gerencia') && (
                <>
                    <Route path="/home" element ={<VistaHomeColaborador />} />
                    <Route path="/cumpleanos" element={<Cumpleanos />} />
                    <Route path="/colaboradores" element={<VistaAdminColaborador />} />
                    <Route path="/detalleCumpleanos/:month/:day" element={<DetalleCumpleanos />} />
                    <Route path="/perfil" element={<PerfilColaborador />} />
                    <Route path="/justificaciones" element={<AdmiJustificacion />} />
                    <Route path="/evaluaciones" element={<VistaEvaluaciones />} />
                    <Route path="/asistencias" element={<AsistenciaAdmin />} />
                    <Route path="/reportes" element={<VistaReportes/>}/>
                </>
            )}

            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;