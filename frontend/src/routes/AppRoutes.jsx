import { Route, Routes, Navigate } from "react-router-dom";
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
            <Route path="/" element={<VistaHomeColaborador />} />

            {hasRole('Colaborador') && (
                <>
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

            <Route path="/login" element={<Login />} />

            {/* Ruta por defecto para usuarios con roles no definidos */}
            <Route path="/*" element={<Navigate to="/login" />} />
            <Route path="/OlvideContraseña" element={<OlvideContraseña/>}/>
            <Route path="/RestablecerContraseña" element={<RestablecerContraseña/>}/>
        </Routes>
    );
};

export default AppRoutes;