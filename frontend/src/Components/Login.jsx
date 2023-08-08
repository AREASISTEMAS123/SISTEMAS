import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import HelpIcon from '@mui/icons-material/Help';
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LeGN9AmAAAAAPLyo5sGMV5XnB0AhqjMpAVCPBoa";

export const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const [captchaCompleted, setCaptchaCompleted] = useState(false);
    const [captchaError, setCaptchaError] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');

    useEffect(() => {
        let loginStatus = localStorage.getItem("loginStatus");
        if (loginStatus) {
            setError(loginStatus);
            setTimeout(function () {
                localStorage.clear();
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
            if (captchaCompleted) {
                var url = import.meta.env.VITE_API_URL + '/login';
                var headers = {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                };
                var Data = {
                    username: username,
                    password: password,
                    "captchaResponse": captchaValue

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
                            localStorage.setItem('rol', responseData.rol);
                            localStorage.setItem('area', responseData.profile.area);
                            localStorage.setItem('name', responseData.user.name);
                            localStorage.setItem('avatar', responseData.avatar)
                            localStorage.setItem('surname', responseData.user.surname)
                            localStorage.setItem('shift', responseData.profile.shift)
                            localStorage.setItem('login', true);
                            window.location.reload();
                        }
                    } else {
                        setError(responseData.message);
                    }
                } catch (err) {
                    setError(err.toString());
                    console.log(err);
                }
            } else {
                setError('No has marcado el captcha.');
            }
        } else {
            setError('Todos los campos son requeridos');
        }
    }

    const onRecuperar = () => {
        navigate("/OlvideContraseña")
    }

    const onRecaptchaChange = (value) => {
        setCaptchaValue(value);
        setCaptchaCompleted(true);
        setCaptchaError('');
    }

    //Frases
    const randomIndex = Math.floor(Math.random() * Frases.length);


    return (
        <div className="w-full h-full fixed flex items-center justify-center">
            <div className="w-full max-w-4xl flex items-center justify-center p-2">
                <div className="w-full flex flex-col md:flex-row bg-white rounded-2xl gap-4 p-5">
                    <div className="w-1/2 hidden md:block h-full">
                        <div className="w-full h-full flex flex-col items-center content-between bg-slate-800 rounded-2xl p-12 space-y-4">
                            <div className="flex justify-center">
                                <img
                                    className=""
                                    src="https://img.freepik.com/vector-gratis/joven-programador-que-trabaja-computadora-portatil-personaje-dibujos-animados_24797-2123.jpg"
                                    width="300"
                                    height="100"
                                    alt="Imagen"
                                />
                            </div>
                            <div className="rounded-lg p-2 bg-auto text-white bg-cv-secondary text-center">
                                <p className="font-light text-lg">
                                    {Frases[randomIndex]}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="w-full bg-white rounded-lg">
                            <div className="flex justify-center items-center">
                                <div className="w-72">
                                    <Logo />
                                </div>
                            </div>
                            <div className="w-full">
                                <div>
                                    {error !== "" ? (
                                        <span className="text-red-500">{error.toString()}</span>
                                    ) : (
                                        <span className="text-green-400">{msg.toString()}</span>
                                    )}
                                    {error["g-recaptcha-response"] && (
                                        <span className="text-violet-900">
                                            {error["g-recaptcha-response"].toString()}
                                        </span>
                                    )}
                                    <form className="space-y-4">
                                        <div className="w-full">
                                            <label htmlFor="username" className="block mb-1 font-medium text-gray-900 ">Usuario</label>
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-cv-primary block w-full p-2.5   "
                                                required=""
                                                placeholder="Es tu DNI"
                                                name="username"
                                                id="username"
                                                value={username}
                                                onChange={(e) => handleInputChange(e, "username")}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor="password" className="block mb-1 font-medium text-gray-900 w-full">Contraseña</label>
                                            <input
                                                placeholder="••••••••"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-cv-primary block w-full p-2.5   "
                                                required=""
                                                type="password"
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={(e) => handleInputChange(e, "password")}
                                            />
                                        </div>
                                        <div className="w-full flex flex-col items-center justify-center">
                                            <ReCAPTCHA
                                                sitekey={SITE_KEY}
                                                onChange={onRecaptchaChange}
                                                onExpired={() => setCaptchaCompleted(false)}
                                                onErrored={() => setCaptchaError('Hubo un error en el captcha.')}
                                            />
                                            {captchaError && (
                                                <span className="text-red-500">{captchaError}</span>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <button
                                                type="button"
                                                onClick={loginSubmit}
                                                className=" w-full  justify-center bg-slate-600 py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                            >
                                                Iniciar sesión
                                            </button>
                                            <div className="flex items-center justify-center relative">
                                                <button
                                                    type="button"
                                                    onClick={onRecuperar}
                                                    className="text-sm font-medium text-cv-primary  hover:underline focus:outline-none text-center"
                                                >
                                                    ¿Olvidaste tu contraseña?
                                                </button>
                                                <div className="absolute right-2 flex justify-end">
                                                    <button className="text-cv-primary">
                                                        <HelpIcon />
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};


export const Frases = [
    "Céntrate hacia dónde quieres ir, no en lo que temes.",
    "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. Si amas lo que haces, tendrás éxito.",
    "La vida es 10% lo que te sucede y 90% cómo reaccionas ante ello.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "El único lugar donde el éxito viene antes que el trabajo es en el diccionario."
]


export const Logo = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Capa 1"
            viewBox="0 0 1080 421.07"
        >
            <path
                d="M553.06 128.48c-5.6-5.4-8.51-12.21-8.51-20.51s2.9-15.11 8.61-20.61c5.7-5.5 12.91-8.21 21.61-8.21s17.11 2.5 26.02 7.6V75.04c-9.71-4.2-18.61-6.2-26.52-6.2-11.51 0-21.31 3.8-29.12 11.31-7.9 7.5-11.81 16.81-11.81 27.92 0 6.9 1.7 13.41 5.2 19.41 3.4 6 8.11 10.71 14.01 14.11 5.9 3.4 13.11 5.1 21.61 5.1 10.41 0 19.61-2.2 27.62-6.5v-11.91c-8.81 5.6-17.71 8.51-26.92 8.51-8.91-.3-16.21-3-21.81-8.3ZM681.54 79.75c-7.8-7.4-17.61-11.11-29.32-11.11s-21.41 3.7-29.12 11.11-11.51 16.81-11.51 28.12 3.8 20.21 11.41 27.62c7.6 7.3 17.11 11.01 28.62 11.01s21.91-3.7 29.82-11.01c7.9-7.3 11.81-16.61 11.81-27.82s-3.9-20.51-11.71-27.92Zm-7.9 48.43c-5.7 5.5-12.71 8.31-21.21 8.31s-15.41-2.7-21.01-8.11c-5.6-5.4-8.41-12.21-8.41-20.41s2.8-15.41 8.41-20.81c5.6-5.4 12.71-8.11 21.41-8.11 8.21 0 15.21 2.7 20.91 8.21 5.7 5.5 8.51 12.21 8.51 20.31-.2 8.2-3 15.01-8.61 20.61ZM767 128.68l-51.23-58.94h-8.81v75.85h10.21V87.16l50.73 58.43h9.41V69.74H767v58.94zM818.63 104.87l-8.31-4.9c-3.7-2.2-6.4-4.3-8.11-6.2-1.7-2-2.5-4.1-2.5-6.4 0-2.6 1.1-4.7 3.4-6.3 2.3-1.6 5.2-2.5 8.71-2.5 6.3 0 12.21 2.6 17.61 7.9V74.16c-5.3-3.6-11.11-5.3-17.41-5.3s-12.01 1.9-16.21 5.6c-4.1 3.7-6.2 8.61-6.2 14.61 0 4 1.1 7.5 3.3 10.61 2.2 3.1 5.9 6.2 11.01 9.31l8.31 5c6.7 4.1 10.01 8.51 10.01 13.11 0 2.8-1.1 5.2-3.4 7.1-2.3 1.9-5.1 2.8-8.51 2.8-7.71 0-14.51-3.7-20.41-11.11v13.81c6.2 4.6 13.01 6.9 20.51 6.9 6.5 0 11.81-1.9 15.91-5.7 4.1-3.8 6.1-8.71 6.1-14.81.1-8.71-4.5-15.71-13.81-21.21ZM844.55 69.74h10.91v75.85h-10.91zM913.19 117.87H927.9v15.81l-1 .3c-6 2-11.21 3-15.61 3-8.91 0-16.31-2.7-21.91-8.21-5.6-5.5-8.51-12.51-8.51-21.11s2.8-15.11 8.51-20.81c5.7-5.7 12.71-8.51 21.01-8.51 8.91 0 17.91 2.6 26.92 7.9V75.13c-5.9-2.5-10.71-4.2-14.61-5.1-3.8-.9-7.91-1.4-12.21-1.4-11.71 0-21.51 3.8-29.32 11.31s-11.71 17.01-11.71 28.32 3.8 19.81 11.31 27.12c7.5 7.3 17.51 11.01 30.12 11.01 9.21 0 18.51-2 27.82-6.1v-32.12h-25.52v9.71ZM1007.65 112.77h-.2c0 6-.5 10.21-1.4 12.71-.9 2.5-2.5 4.6-4.6 6.4-4.1 3.4-9.31 5-15.71 5-4.5 0-8.51-.8-11.81-2.5-3.3-1.7-5.8-3.9-7.4-6.7-1.6-2.8-2.4-7.71-2.4-14.91V69.64h-10.91v42.93c0 6.1.4 10.61 1.2 13.51.8 2.9 1.8 5.3 3.1 7.2 1.2 2 2.8 3.8 4.6 5.3 6 5.1 13.91 7.71 23.82 7.71s17.61-2.6 23.62-7.8c1.8-1.6 3.3-3.3 4.6-5.3 1.2-2 2.3-4.4 3.1-7.4.8-3 1.3-7.4 1.3-13.21V69.45h-10.91v43.33ZM1044.28 135.79v-23.52h31.12v-9.7h-31.12V79.35h32.22v-9.61h-43.03v75.75h44.03v-9.7h-33.22zM561.67 212.04l-22.82-53.34h-10.9l32.62 76.25h2.5l32.12-76.25h-10.81l-22.71 53.34zM614.3 201.23h31.12v-9.71H614.3v-23.11h32.22v-9.71h-43.03v75.85h44.03v-9.71H614.3v-23.61zM719.37 217.64l-51.13-58.94h-8.81v75.95h10.21v-58.44l50.73 58.44h9.41V158.7h-10.41v58.94zM802.92 158.6h-63.34v9.71h26.02v66.34h10.91v-66.34h26.41v-9.71zM826.24 158.3l-32.62 76.35h11.21l9.51-22.51h32.42l10.11 22.51h11.11l-34.02-76.35h-7.71Zm-7.6 44.13 11.31-27.52 12.21 27.52h-23.52ZM901.39 193.82l-8.31-4.9c-3.7-2.2-6.4-4.3-8.11-6.2-1.7-2-2.5-4.1-2.5-6.4 0-2.6 1.1-4.7 3.4-6.3 2.3-1.6 5.2-2.5 8.71-2.5 6.3 0 12.21 2.6 17.61 7.9v-12.31c-5.3-3.6-11.11-5.3-17.41-5.3s-12.01 1.9-16.21 5.6c-4.1 3.7-6.2 8.61-6.2 14.61 0 4 1.1 7.5 3.3 10.61 2.2 3.1 5.9 6.2 11.01 9.31l8.31 5c6.7 4.1 10.01 8.51 10.01 13.11 0 2.8-1.1 5.2-3.4 7.1s-5.1 2.8-8.51 2.8c-7.71 0-14.51-3.7-20.41-11.11v13.71c6.2 4.6 13.01 6.9 20.51 6.9 6.5 0 11.81-1.9 15.91-5.7 4.1-3.8 6.1-8.71 6.1-14.81.1-8.51-4.6-15.61-13.81-21.11ZM538.65 274.78h10.51v-2.21h-10.51v-5.9h11.21v-2.2h-13.71v19.01h14.21v-2.2h-11.71v-6.5zM564.87 273.48c-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5s-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7 1.1-.5 1.9-1.2 2.5-2.1.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7-.6-.7-1.4-1.4-2.5-1.9ZM583.98 265.57c-.6-.4-1.4-.7-2.3-.9-.7-.1-1.6-.2-2.9-.2h-7.2v19.01h2.5v-7.71h4.9c2.7 0 4.6-.6 5.6-1.7s1.5-2.5 1.5-4.1c0-.9-.2-1.8-.6-2.6-.3-.8-.9-1.4-1.5-1.8Zm-1.5 7c-.7.6-1.8.9-3.5.9h-4.9v-6.8h4.9c1.1 0 1.9.1 2.3.2.7.2 1.2.6 1.6 1.1.4.5.6 1.2.6 2 0 1.2-.3 2-1 2.6ZM591.89 274.78h10.5v-2.21h-10.5v-5.9h11.2v-2.2h-13.7v19.01h14.2v-2.2h-11.7v-6.5zM618.6 280.48c-1 .8-2.2 1.2-3.6 1.2-1.2 0-2.2-.3-3.2-.9-1-.6-1.7-1.5-2.2-2.7-.5-1.2-.7-2.6-.7-4.2 0-1.3.2-2.5.6-3.7.4-1.2 1.1-2.1 2.1-2.8 1-.7 2.2-1.1 3.7-1.1 1.3 0 2.3.3 3.2.9.8.6 1.5 1.6 1.9 3l2.5-.6c-.5-1.8-1.4-3.1-2.7-4.1-1.3-1-2.9-1.5-4.8-1.5-1.7 0-3.2.4-4.6 1.1-1.4.7-2.5 1.9-3.2 3.4-.8 1.5-1.1 3.2-1.1 5.2 0 1.8.3 3.5 1 5.1.7 1.6 1.6 2.8 2.9 3.6 1.3.8 3 1.3 5 1.3s3.7-.5 5-1.6c1.4-1.1 2.3-2.7 2.8-4.7l-2.5-.6c-.4 1.6-1.1 2.9-2.1 3.7ZM626.71 264.47h2.5v19.01h-2.5zM638.92 264.47l-7.3 19.01h2.7l2.1-5.8h8.01l2.2 5.8h2.9l-7.8-19.01h-2.8Zm-1.9 11.21 2.1-5.6c.4-1.2.8-2.4 1-3.6.3 1 .7 2.3 1.3 3.9l2 5.3h-6.4ZM653.83 264.47h-2.51v19.01h11.91v-2.2h-9.4v-16.81zM666.63 264.47h2.5v19.01h-2.5zM684.65 273.48c-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5-.4-.6-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7 1.1-.5 1.9-1.2 2.5-2.1.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7-.6-.7-1.4-1.4-2.5-1.9ZM704.96 264.47h-15.11v2.2h6.3v16.81h2.51v-16.81h6.3v-2.2zM710.76 264.47l-7.3 19.01h2.7l2.1-5.8h8.01l2.2 5.8h2.9l-7.8-19.01h-2.8Zm-1.8 11.21 2.1-5.6c.4-1.2.8-2.4 1-3.6.3 1 .7 2.3 1.3 3.9l2 5.3h-6.4ZM734.38 273.48c-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5s-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7 1.1-.5 1.9-1.2 2.5-2.1.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7-.6-.7-1.4-1.4-2.5-1.9ZM750.99 274.78h10.61v-2.21h-10.61v-5.9h11.31v-2.2h-13.81v19.01h14.21v-2.2h-11.71v-6.5zM778.81 279.38l-10.01-14.91h-2.6v19.01h2.4v-14.91l10.01 14.91h2.6v-19.01h-2.4v14.91zM795.42 274.78h10.5v-2.21h-10.5v-5.9h11.2v-2.2h-13.8v19.01h14.2v-2.2h-11.6v-6.5zM820.63 277.68c-.5 1.3-.8 2.4-1 3.1-.2-.6-.5-1.6-.9-2.8l-4.5-13.51h-3.8v19.01h2.4v-16.21l5.5 16.21h2.3l5.6-15.91v15.91h2.4v-19.01h-3.4l-4.6 13.21ZM843.35 273.38c.9-.4 1.6-1 2-1.7s.7-1.5.7-2.3c0-.9-.2-1.7-.7-2.5-.5-.8-1.2-1.4-2.1-1.8-.9-.4-2-.6-3.5-.6h-7.1v19.01h7.3c1.2 0 2.2-.1 3.1-.3.8-.2 1.5-.5 2.1-.9.6-.4 1-1 1.4-1.8.4-.8.6-1.6.6-2.5 0-1.1-.3-2.1-.9-2.9-.8-.8-1.7-1.4-2.9-1.7Zm-4.4-6.7c1.4 0 2.3.1 2.9.3s1 .5 1.3 1 .5 1 .5 1.7-.2 1.2-.5 1.7c-.3.4-.8.8-1.4.9-.5.1-1.3.2-2.4.2h-4.1l-.1-5.8h3.8Zm5 12.91c-.3.5-.6.8-1 1.1-.4.2-.9.4-1.5.5-.3.1-.9.1-1.7.1h-4.7v-6.5h4.4c1.2 0 2.1.1 2.8.3.7.2 1.1.6 1.5 1.1.4.5.5 1.1.5 1.8.1.6 0 1.1-.3 1.6ZM862.76 275.48h.2c0 2.4-.4 4-1.2 4.8-.8.8-2.1 1.3-4 1.3-1.1 0-2-.2-2.7-.6s-1.3-1-1.6-1.8c-.3-.8-.5-2-.5-3.7v-11.01h-2.5v11.01c0 2 .2 3.6.7 4.8.5 1.2 1.3 2.1 2.4 2.7 1.1.6 2.6.9 4.4.9s3.3-.4 4.4-1.1c1.1-.7 1.9-1.6 2.3-2.7.4-1.1.6-2.6.6-4.6v-11.01h-2.5v11.01ZM882.37 266.07c-.8-.7-1.7-1.1-2.8-1.4-.8-.2-1.9-.3-3.4-.3h-6.6v19.01h6.9c1.2 0 2.2-.1 3.1-.3.9-.2 1.6-.5 2.3-1 .6-.4 1.2-1 1.7-1.7s1-1.7 1.3-2.8c.3-1.1.5-2.4.5-3.8 0-1.7-.2-3.2-.7-4.5-.5-1.2-1.3-2.3-2.3-3.2Zm-.1 11.41c-.3 1-.8 1.8-1.4 2.4-.4.4-1 .8-1.7 1-.7.2-1.7.4-3 .4h-4.1v-14.51h4c1.5 0 2.6.1 3.3.4.9.4 1.7 1.1 2.4 2.1s1 2.6 1 4.6c0 1.4-.2 2.6-.5 3.6ZM901.99 265.37c-1.4-.8-3-1.3-4.8-1.3-2.7 0-4.9.9-6.6 2.7-1.7 1.8-2.5 4.3-2.5 7.4 0 1.7.4 3.3 1.1 4.8.7 1.5 1.8 2.7 3.2 3.5 1.4.8 3 1.3 4.8 1.3 1.7 0 3.2-.4 4.6-1.2 1.4-.8 2.5-1.9 3.3-3.5.8-1.5 1.2-3.2 1.2-5.2s-.4-3.6-1.1-5.1c-.7-1.4-1.8-2.6-3.2-3.4Zm-.1 14.31c-1.2 1.3-2.8 2-4.7 2s-3.4-.7-4.6-2-1.8-3.1-1.8-5.4c0-2.9.6-4.9 1.9-6.1 1.3-1.2 2.8-1.8 4.6-1.8 1.3 0 2.4.3 3.4 1s1.8 1.5 2.3 2.7c.5 1.2.8 2.5.8 4.1-.1 2.3-.7 4.2-1.9 5.5ZM920.6 273.48c-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5s-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7 1.1-.5 1.9-1.2 2.5-2.1.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7-.6-.7-1.4-1.4-2.5-1.9ZM947.42 266.07c-.8-.7-1.7-1.1-2.8-1.4-.8-.2-1.9-.3-3.4-.3h-6.6v19.01h6.9c1.2 0 2.2-.1 3.1-.3.9-.2 1.6-.5 2.3-1 .6-.4 1.2-1 1.7-1.7s1-1.7 1.3-2.8c.3-1.1.5-2.4.5-3.8 0-1.7-.2-3.2-.7-4.5-.6-1.2-1.3-2.3-2.3-3.2Zm-.1 11.41c-.3 1-.8 1.8-1.4 2.4-.4.4-1 .8-1.7 1-.7.2-1.7.4-3 .4h-4.1v-14.51h4c1.5 0 2.6.1 3.3.4.9.4 1.7 1.1 2.4 2.1s1 2.6 1 4.6c0 1.4-.2 2.6-.5 3.6ZM956.42 274.78h10.61v-2.21h-10.61v-5.9h11.31v-2.2h-13.81v19.01h14.21v-2.2h-11.71v-6.5zM986.74 278.28c-.4 1-.7 2.1-1 3.1-.3-1-.6-2-1-3.1l-4.9-13.81h-2.7l7.4 19.01h2.6l7.5-19.01h-2.6l-5.3 13.81ZM999.35 274.78h10.5v-2.21h-10.5v-5.9h11.21v-2.2h-13.71v19.01h14.21v-2.2h-11.71v-6.5zM1027.07 279.38l-10.01-14.91h-2.6v19.01h2.4v-14.91l10.01 14.91h2.6v-19.01h-2.4v14.91zM1047.38 264.47h-15.11v2.2h6.3v16.81h2.5v-16.81h6.31v-2.2zM1053.18 264.47l-7.3 19.01h2.7l2.1-5.8h8.01l2.2 5.8h2.9l-7.8-19.01h-2.8Zm-1.8 11.21 2.1-5.6c.4-1.2.8-2.4 1-3.6.3 1 .7 2.3 1.3 3.9l2 5.3h-6.4ZM1079.2 275.38c-.5-.8-1.3-1.4-2.5-1.9-.8-.3-2.2-.8-4.2-1.2-2-.5-3.3-.9-3.8-1.4-.5-.4-.7-1-.7-1.7 0-.8.3-1.5 1-2 .7-.6 1.8-.8 3.3-.8s2.6.3 3.3.9c.7.6 1.2 1.5 1.3 2.7l2.4-.2c0-1.1-.4-2.1-.9-3-.6-.9-1.4-1.6-2.5-2-1.1-.4-2.3-.7-3.7-.7-1.3 0-2.4.2-3.5.6-1.1.4-1.8 1.1-2.4 1.9-.6.8-.8 1.7-.8 2.7 0 .9.2 1.7.7 2.4.4.7 1.1 1.3 2 1.8.7.4 1.9.8 3.7 1.2 1.7.4 2.9.7 3.4.9.8.3 1.4.7 1.7 1.1.3.4.5 1 .5 1.6s-.2 1.1-.5 1.6c-.4.5-.9.9-1.6 1.2-.7.3-1.6.4-2.5.4-1.1 0-2.1-.2-2.9-.6-.9-.4-1.5-.9-1.9-1.5s-.7-1.4-.8-2.3l-2.4.2c0 1.3.4 2.4 1 3.4.7 1 1.6 1.8 2.7 2.3 1.2.5 2.6.8 4.3.8 1.4 0 2.6-.2 3.7-.7s1.9-1.2 2.5-2.1c.6-.9.9-1.8.9-2.9 0-1-.3-1.9-.8-2.7Z"
                style={{
                    fill: "#16232b",
                    fillOpacity: 1,
                }}
            />
            <path
                d="M487.92 350.32V0l-71.85 71.95v214.73l-214.43-.4-64.04 64.04z"
                style={{
                    display: "inline",
                    fill: "#16232b",
                    fillOpacity: 1,
                }}
            />
            <path
                d="m291.5 308.5-90.86-21.82-64.04 64.14 350.32-.1L291.5 308.5z"
                style={{
                    fill: "#283c4c",
                    fillOpacity: 1,
                }}
            />
            <path
                d="M225.35 33.02C101.87 34.12 1.11 134.99 0 258.37c-.5 63.54 25.02 121.08 66.54 162.7l55.54-55.54c-27.62-28.02-44.13-66.94-42.63-109.77 2.8-77.45 65.84-140.49 143.29-143.29 42.83-1.5 81.65 15.01 109.77 42.63l55.54-55.54c-41.53-41.53-99.16-67.14-162.7-66.54Z"
                style={{
                    display: "inline",
                    fill: "#16232b",
                    fillOpacity: 1,
                }}
            />
            <path
                d="M227.25 33.02c-76.95 0-144.89 38.22-186.02 96.66 36.92-25.92 81.95-41.23 130.48-41.23 62.74 0 119.58 25.42 160.7 66.54l55.54-55.44c-41.13-41.13-97.96-66.54-160.7-66.54ZM79.46 255.46c.9-26.42 8.91-51.23 22.11-72.55-27.12 37.12-43.23 82.65-43.63 131.68-.3 34.02 6.9 66.24 19.91 95.26l44.33-44.33c-27.62-28.12-44.23-67.14-42.73-110.07Z"
                style={{
                    fill: "#283c4c",
                    fillOpacity: 1,
                }}
            />
        </svg>
    )
}
