import { Route, Routes, Navigate } from "react-router-dom";
import {
    Cumpleanos,
    Login,
    Asistencia,
    Perfil,
    VistaEvaluaciones,
    VistaHomeColaborador,
    AsistenciaAdmin,
    AdmiJustificacion,
    CumpleanosDetalle,
    JustificacionColaborador,
    EvaluacionesColaborador,
    VistaAdminColaborador,
    OlvideContraseña,
    RestablecerContraseña
} from "../components";
import { VistaReportes } from "../components/VistaReportes";
import { AdmiDetalleDeJustificacion } from "../Components/AdmiDetalleDeJustificacion";
import { JustificacionDetalleColaborador } from "../Components/JustificacionDetalleColaborador";

const AppRoutes = () => {
    const rol = localStorage.getItem('rol');
    const isLoggedIn = localStorage.getItem('login') === 'true';

    // Función para verificar si el usuario tiene un rol específico
    const hasRole = (targetRole) => {
        return rol === targetRole;
    };

    return (
        <Routes>
            {isLoggedIn ? (
                <>
                    <Route path="/home" element={<VistaHomeColaborador />} />
                    <Route path="/cumpleanos" element={<Cumpleanos />} />
                    <Route path="/detalleCumpleanos/:month/:day" element={<CumpleanosDetalle />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/asistencia" element={<Asistencia />} />
                    <Route path="/justificacion" element={<JustificacionColaborador />} />
                    <Route path="/evaluacion" element={<EvaluacionesColaborador />} />
                    <Route path="/logout" />
                    {hasRole('Lider Area') && (
                        <>
                            <Route path="/evaluaciones" element={<VistaEvaluaciones />} />
                        </>
                    )}
                    {hasRole('Lider Departamento') && (
                        <>
                            <Route path="/colaboradores" element={<VistaAdminColaborador />} />
                            <Route path="/justificaciones" element={<AdmiJustificacion />} />
                            <Route path="/asistencias" element={<AsistenciaAdmin />} />
                            <Route path="/reportes" element={<VistaReportes />} />
                        </>
                    )}
                    {hasRole('Gerencia') && (
                        <>
                            <Route path="/colaboradores" element={<VistaAdminColaborador />} />
                            <Route path="/justificaciones" element={<AdmiJustificacion />} />
                            <Route path="/asistencias" element={<AsistenciaAdmin />} />
                            <Route path="/reportes" element={<VistaReportes />} />
                            <Route path="/detalles/:id" element={<AdmiDetalleDeJustificacion/>}/>
                        </>
                    )}
                    <Route path="/*" element={<Navigate to="/home" />} />
                </>
            ) : (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/OlvideContraseña" element={<OlvideContraseña />} />
                    <Route path="/RestablecerContraseña" element={<RestablecerContraseña />} />
                    <Route path="/*" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
};

export default AppRoutes;