<<<<<<< HEAD
=======
import React from 'react';
<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import { Cumpleanos, Login, RegistroAsistencia, PerfilColaborador, VistaEvaluaciones, VistaHomeColaborador, JustificacionColaborador} from '../components';
import { AsistenciaAdmin } from '../Components/AsistenciaAdmin';
=======
>>>>>>> fe99708eb454e64f1fec1a69ca8db14014efa240
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
<<<<<<< HEAD
            <Route path="/justColaborador" element={<JustificacionColaborador/>}/>
            <Route path="/homeColaborador" element={<VistaHomeColaborador/>}/>
=======
>>>>>>> 4702201eef1fbf650f3dcc7230da1414af3dbe86
>>>>>>> fe99708eb454e64f1fec1a69ca8db14014efa240
        </Routes>
    );
}

export default AppRoutes;