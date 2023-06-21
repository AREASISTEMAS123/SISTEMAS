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
            naviget("/homeColaborador");

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


    function loginSubmit() {
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
            fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(Data)
            }).then((response) => response.json())
                .then((response) => {
                    if (response.message === "No autorizado") {
                        setError(response.message)
                    } else {
                        setMsg(response.message)
                        setTimeout(function () {
                            localStorage.setItem("token", response.accessToken);
                            localStorage.setItem("login", true);
                            naviget("/homeColaborador");
                        }, 5000)
                    }

                }).catch((err) => {
                    setError(err);
                    console.log(err)
                })
        } else {
            setError("Todos los campos son requeridos")
        }
    }


    return (
        <>
            <div className=" h-screen md:mx-4 md:my-9 ">
                <div>
                    <div className="grid grid-cols-2 bg-white rounded-lg p-1 ">
                        <div className=" p-8  rounded-lg ">
                            <div className=" bg-slate-800 rounded-md   ">
                                <div className="p-8 grid place-content-center  ">
                                    <img
                                        className=""
                                        src="https://img.freepik.com/vector-gratis/joven-programador-que-trabaja-computadora-portatil-personaje-dibujos-animados_24797-2123.jpg"
                                        width="300"
                                        height="100"

                                    />
                                </div>
                                <div className="rounded-2xl p-2 m-3 bg-auto text-white bg-cv-secondary text-center">
                                    <p className="font-light text-lg ">
                                        Céntrate hacia dónde quieres ir, no en lo que temes.
                                    </p>
                                </div>
                                <div className=" m-2 text-center">
                                    <p className="m-2 inline-block">
                                        <a href="https://www.facebook.com/AgenciaConsigueVentas" target="blank">
                                            <FacebookOutlinedIcon
                                                sx={{ color: "white" }} />
                                        </a>
                                    </p>

                                    <p className="m-2  inline-block">
                                        <a href="https://www.instagram.com/consigueventasonline/" target="blank">
                                            <InstagramIcon
                                                sx={{ color: "white" }} />
                                        </a>
                                    </p>
                                    <p className="m-2 inline-block">
                                        <a href="https://www.youtube.com/@consigueventas7332" target="blank">
                                            <YouTubeIcon
                                                sx={{ color: "white" }} />
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/*LADO DERECHO*/}
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            {/*LOGO*/}
                            <div className=" ">
                                <img
                                    width={300}

                                    src={cv_negativo}

                                    alt="Logo"
                                    type="img/svc"
                                />
                            </div>
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    LOGIN
                                </h1>
                                <p>
                                    {
                                        error !== "" ?
                                            <span className="text-red-500">{error.toString()}</span> :
                                            <span className="text-green-400">{msg.toString()}</span>
                                    }

                                </p>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                                        <input
                                            className="bg-gray-50 border ml-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                            placeholder="Es tu dni"
                                            name="username"
                                            value={username}
                                            onChange={(e) => handleInputChange(e, "username")}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input placeholder="••••••••"
                                            className="bg-gray-50 border ml-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                            name="password"
                                            value={password}
                                            onChange={(e) => handleInputChange(e, "password")}
                                        />
                                    </div>
                                    {/*CAPTCHA*/}
                                    <div >
                                        <ReCAPTCHA sitekey={SITE_KEY} />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full text-white bg-slate-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                        onClick={loginSubmit}
                                    >Ingresar</button>
                                    <div className="flex items-center justify-center">
                                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">¿Olvidaste tu contraseña?</a>
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

    )
}
