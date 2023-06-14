import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Cumpleanos, Login, RegistroAsistencia, PerfilColaborador, VistaEvaluaciones, VistaHomeColaborador, JustificacionColaborador} from '../components';
import { AsistenciaAdmin } from '../Components/AsistenciaAdmin';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<VistaHomeColaborador />} />
            <Route path="/cumpleanos" element={<Cumpleanos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/asistencia" element={<RegistroAsistencia />} />
            <Route path="/perfil" element={<PerfilColaborador />} />
            <Route path="/evaluaciones" element={<VistaEvaluaciones />} />
            <Route path="/justificaciones" element={<JustificacionColaborador/>}/>
            <Route path="/asistenciaAdmin" element={<AsistenciaAdmin/>}/>
        </Routes>
    );
}

export default AppRoutes;