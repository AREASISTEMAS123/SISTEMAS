import React from 'react';
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import { Cumpleanos, Login, RegistroAsistencia, PerfilColaborador, VistaEvaluaciones, VistaHomeColaborador, JustificacionColaborador} from '../components';
import { AsistenciaAdmin } from '../Components/AsistenciaAdmin';
=======
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Cumpleanos, Login, RegistroAsistencia, PerfilColaborador, VistaEvaluaciones, VistaHomeColaborador, JustificacionColaborador, AdmiJustificacion } from '../components';
>>>>>>> 4702201eef1fbf650f3dcc7230da1414af3dbe86

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<VistaHomeColaborador />} />
            <Route path="/cumpleanos" element={<Cumpleanos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/asistencia" element={<RegistroAsistencia />} />
            <Route path="/perfil" element={<PerfilColaborador />} />
            <Route path="/evaluaciones" element={<VistaEvaluaciones />} />
<<<<<<< HEAD
            <Route path="/justificaciones" element={<JustificacionColaborador/>}/>
            <Route path="/asistenciaAdmin" element={<AsistenciaAdmin/>}/>
=======
            <Route path="/justificaciones" element={<AdmiJustificacion/>}/>
>>>>>>> 4702201eef1fbf650f3dcc7230da1414af3dbe86
        </Routes>
    );
}

export default AppRoutes;