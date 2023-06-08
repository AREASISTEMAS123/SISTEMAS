import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Cumpleanos }from '../components/Cumpleanos';
import { Login } from '../components/Login';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/cumpleanos" element={<Cumpleanos />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}

export default AppRoutes;