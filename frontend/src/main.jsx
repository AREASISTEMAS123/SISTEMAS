import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css'
//import { PerfilColaborador } from './Components/PerfilColaborador.jsx'
import { Login } from './Components/Login'

ReactDOM.render(
  <React.StrictMode>
    <Login></Login>
  </React.StrictMode>,
  document.getElementById('root')
);