//import { UseForms } from "../hooks/UseForms"

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import cv_negativo from "../assets/logo.svg";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import HelpIcon from '@mui/icons-material/Help';
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LeMBbAmAAAAAA_QeeFgQfnfOD9QtLiz_qA7cCEw";

export const Login = () => {
    const naviget = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [msg, setMsg] = useState('')

    useEffect(() => {
        let login = localStorage.getItem("login");
        if (login) {
            naviget("/");

        }
        let loginStatus = localStorage.getItem("loginStatus");
        if (loginStatus) {
            setError(loginStatus);
            setTimeout(function () {
                localStorage.clear();
                window.location.reload();
            }, 3000);
        }
        setTimeout(function () {
            setMsg("");
        }, 5000);
    }, [msg]);

    const handleInputChange = (e, type) => {
        switch (type) {
            case "username":
                setError("");
                setUsername(e.target.value);
                if (e.target.value === "") {
                    setError("Llenar campo de usuario")
                }
                break;
            case "password":
                setError("");
                setPassword(e.target.value);
                if (e.target.value === "") {
                    setError("Llenar campo de contraseña")
                }
                break;
        }
    }



    const loginSubmit = async () => {
        if (username !== "" && password !== "") {
            var url = 'http://127.0.0.1:8000/api/login';
            var headers = {
                "Accept": "application/json",
                "Content-type": "application/json"
            };
            var Data = {
                username: username,
                password: password
            };
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(Data)
                });
                const responseData = await response.json();

                if (response.ok) {
                    if (responseData.message === 'No autorizado' || responseData.message === 'Tu cuenta ha sido bloqueado, contacte a un administrador') {
                        setError(responseData.message);
                    } else {
                        setMsg(responseData.message);
                        localStorage.setItem('token', responseData.accessToken);
                        localStorage.setItem('iduser', responseData.user.id);
                        localStorage.setItem('login', true);
                        naviget('/');
                    }
                } else {
                    setError(responseData.message);
                }
            } catch (err) {
                setError(err.toString());
                console.log(err);
            }
        } else {
            setError('Todos los campos son requeridos');
        }
    }

    const onRecuperar = () =>{
        naviget("/recuperarContraseña")
    }
  
    return (
        <>
            <div className="">
                <div className="grid grid-cols-2 bg-white rounded-lg  ">
                    <div className="p-5 rounded-lg">
                        <div className="bg-slate-800 rounded-md p-2 w-[80%] md:w-[70%] mx-auto">
                            <div className="p-2 grid place-content-center">
                                <img
                                    className=""
                                    src="https://img.freepik.com/vector-gratis/joven-programador-que-trabaja-computadora-portatil-personaje-dibujos-animados_24797-2123.jpg"
                                    width="300"
                                    height="100"
                                    alt="Imagen"
                                />
                            </div>
                            <div className="rounded-2xl p-2 m-3 bg-auto text-white bg-cv-secondary text-center">
                                <p className="font-light text-lg">
                                    Céntrate hacia dónde quieres ir, no en lo que temes.
                                </p>
                            </div>
                            <div className="m-2 text-center">
                                <p className="m-2 inline-block">
                                    <a href="https://www.facebook.com/AgenciaConsigueVentas" target="_blank" rel="noopener noreferrer">
                                        <FacebookOutlinedIcon sx={{ color: "white" }} />
                                    </a>
                                </p>
                                <p className="m-2 inline-block">
                                    <a href="https://www.instagram.com/consigueventasonline/" target="_blank" rel="noopener noreferrer">
                                        <InstagramIcon sx={{ color: "white" }} />
                                    </a>
                                </p>
                                <p className="m-2 inline-block">
                                    <a href="https://www.youtube.com/@consigueventas7332" target="_blank" rel="noopener noreferrer">
                                        <YouTubeIcon sx={{ color: "white" }} />
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex justify-center items-center">
                                <img
                                    width={300}
                                    src={cv_negativo}
                                    alt="Logo"
                                    type="img/svc"
                                />
                            </div>
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <p>
                                    {error !== "" ? (
                                        <span className="text-red-500">{error.toString()}</span>
                                    ) : (
                                        <span className="text-green-400">{msg.toString()}</span>
                                    )}
                                </p>
                                <form className="space-y-4 md:space-y-6" >
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                                        <input
                                            className="bg-gray-50 border ml-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                            placeholder="Es tu DNI"
                                            name="username"
                                            value={username}
                                            onChange={(e) => handleInputChange(e, "username")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 sm:text-sm font-medium text-gray-900 dark:text-white w-full">Contraseña</label>
                                        <input
                                            placeholder="••••••••"
                                            className="bg-gray-50 border ml-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                            name="password"
                                            value={password}
                                            onChange={(e) => handleInputChange(e, "password")}
                                        />
                                    </div>
                                    <div>
                                        <ReCAPTCHA sitekey={SITE_KEY} />
                                    </div>

                                    <button
                                        type="button"
                                        className="w-full text-white bg-slate-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        onClick={loginSubmit}>
                                        Ingresar
                                    </button>
                                    <div className="flex items-center justify-center">
                                        <button onClick={onRecuperar} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500" type="">
                                            ¿Olvidaste tu contraseña?
                                        </button>
                                        <div className="ml-20">
                                            <HelpIcon />
                                        </div>
                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
           


        </>

    );
};