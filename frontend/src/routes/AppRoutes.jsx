import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Cumpleanos, Login, RegistroAsistencia, PerfilColaborador, VistaEvaluaciones, VistaHomeColaborador, JustificacionColaborador } from '../components';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/cumpleanos" element={<Cumpleanos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/asistencia" element={<RegistroAsistencia />} />
            <Route path="/perfil" element={<PerfilColaborador />} />
            <Route path="/evaluaciones" element={<VistaEvaluaciones />} />
            <Route path="/justificaciones" element={<JustificacionColaborador/>}/>
        </Routes>
    );
}

export default AppRoutes;