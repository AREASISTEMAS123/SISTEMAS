import React from 'react'
import ReactDOM from 'react-dom/client'
//import { Login } from './Components/Login.jsx'
import './css/index.css'
import Calendar from './Components/Cumpleaños.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Calendar/>
    {/* <Login/> */}
  </React.StrictMode>,
)
