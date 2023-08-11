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
    RestablecerContraseña,
    VistaEvaluar,
    DetalleEvaluaciones,
    VistaPerfil
} from "../components";
import { VistaReportes } from "../components/VistaReportes";
import { AdmiDetalleDeJustificacion } from "../Components/AdmiDetalleDeJustificacion";
import { JustificacionDetalleColaborador } from "../Components/JustificacionDetalleColaborador";
import { HabilidadesBlandas } from "../Components/Evaluaciones/HabilidadesBlandas";
import { Desempeño } from "../Components/Evaluaciones/Desempeño";
import { AutoEvaluacion } from "../Components/Evaluaciones/AutoEvaluacion";
import { DiagnosticoLiderazgo } from "../Components/Evaluaciones/DiagnosticoLiderazgo";
import { ChangePassword } from "../Components/ChangePassword";

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
                    <Route path="/details/:id" element={<JustificacionDetalleColaborador />} />
                    <Route path="/logout" />
                    <Route path="/changePassword" element={<ChangePassword/>}/>

                    {hasRole('Lider Nucleo') && (
                        <>
                            <Route path="/colaboradores" element={<VistaAdminColaborador />} />
                            <Route path="/justificaciones" element={<AdmiJustificacion />} />
                            <Route path="/detalles/:id" element={<AdmiDetalleDeJustificacion />} />
                            <Route path="/asistencias" element={<AsistenciaAdmin />} />
                            <Route path="/reportes" element={<VistaReportes />} />
                           {/*<Route path="/evaluaciones" element={<VistaEvaluaciones />} />*/ } 
                            <Route path="/evaluar" element={<VistaEvaluar />} />
                            <Route path="/evaluacion/detalle" element={<DetalleEvaluaciones />} />
                            <Route path="/evaluaciones/habilidades-blandas" element={<HabilidadesBlandas />} />
                            <Route path="/evaluaciones/desempeño" element={<Desempeño />} />
                            <Route path="/evaluaciones/autoevaluacion" element={<AutoEvaluacion />} />
                            <Route path="/colaborador/perfil/:id" element={<VistaPerfil />} />
                        </>
                    )}
                    {hasRole('Gerencia') && (
                        <>
                            <Route path="/colaboradores" element={<VistaAdminColaborador />} />
                            <Route path="/justificaciones" element={<AdmiJustificacion />} />
                           {/*<Route path="/evaluaciones" element={<VistaEvaluaciones />} />*/ } 
                            <Route path="/asistencias" element={<AsistenciaAdmin />} />
                            <Route path="/reportes" element={<VistaReportes />} />
                            <Route path="/detalles/:id" element={<AdmiDetalleDeJustificacion />} />
                            <Route path="/evaluar" element={<VistaEvaluar />} />
                            <Route path="/evaluacion/detalle" element={<DetalleEvaluaciones />} />
                            <Route path="/evaluacion/diagnosticoLiderazgo" element={<DiagnosticoLiderazgo />} />
                            <Route path="/evaluaciones/habilidades-blandas" element={<HabilidadesBlandas />} />
                            <Route path="/evaluaciones/desempeño" element={<Desempeño />} />
                            <Route path="/evaluaciones/autoevaluacion" element={<AutoEvaluacion />} />
                            <Route path="/colaborador/perfil/:id" element={<VistaPerfil />} />

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