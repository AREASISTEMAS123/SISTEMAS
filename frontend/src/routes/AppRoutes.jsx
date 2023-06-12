import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Cumpleanos } from '../components/Cumpleanos';
import { Login } from '../components/Login';
import { RegistroAsistencia } from '../Components/RegistroAsistencia';
import { PerfilColaborador } from '../components/PerfilColaborador';
import { EvaluacionesCard } from '../components/EvaluacionesCard';
import { JustificacionColaborador } from '../Components/JustificacionColaborador';

function AppRoutes() {
    return (
            <Routes>
                <Route path="/cumpleanos" element={<Cumpleanos />} />
                <Route path="/login" element={<Login />} />
                <Route path="/asistencia" element={<RegistroAsistencia />} />
                <Route path="/perfil" element={<PerfilColaborador />} />
                <Route path="/evaluacion" element={<EvaluacionesCard />} />
                <Route path="/justColaborador" element={<JustificacionColaborador />} />
            </Routes>
    );
}

export default AppRoutes;