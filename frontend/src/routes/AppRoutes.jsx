import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Cumpleanos }from '../components/Cumpleanos';
import { Login } from '../components/Login';
import { RegistroAsistencia } from '../Components/RegistroAsistencia';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/cumpleanos" element={<Cumpleanos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/asistencia" element={<RegistroAsistencia/>}/>
        </Routes>
    );
}

export default AppRoutes;