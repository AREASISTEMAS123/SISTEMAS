//import { UseForms } from "../hooks/UseForms"

import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';



export const Login = () => {
    /*const { formulario, onInputChange } = UseForms({
        username: '',
        password: ''
    })
    const { username, password } = formulario*/
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

            <div className=" h-screen  ">
                <div className="  	 p-10 bg-slate-800  " >
                    <div className="grid grid-cols-2 bg-white rounded-lg ">
                        <div className=" p-5  rounded-lg ">
                            <div className=" bg-slate-800 rounded-md  grid justify-center">
                                <div className="  md:mx-4 md:my-9 ">
                                    <img

                                        src="https://img.freepik.com/vector-gratis/joven-programador-que-trabaja-computadora-portatil-personaje-dibujos-animados_24797-2123.jpg"
                                        width="300"
                                        height="100"

                                    />
                                </div>

                                <p className="border-2 inline-block text-white ">
                                    Céntrate hacia dónde quieres ir, no en lo que temes.
                                </p>

                                <p>Redes Sociales</p>

                            </div>
                        </div>

                        <div className="   grid   ">

                            <img className="inline my-6" src="https://consigueventas.com/wp-content/uploads/Rectangle-39.png" />

                            <div className="grid  m-1">
                                <div className="  mx-6 mt-1" >
                                    <p>
                                        {
                                            error !== "" ?
                                                <span className="text-red-500">{error.toString()}</span> :
                                                <span className="text-green-400">{msg.toString()}</span>
                                        }

                                    </p>


                                    <p>Usuario</p>
                                    <input
                                        type="text"
                                        placeholder="Es tu dni"
                                        name="username"
                                        value={username}
                                        onChange={(e) => handleInputChange(e, "username")}
                                        className=" inline-block border-2  rounded-lg my-3 ml-6  text-center"
                                    />
                                </div>


                                <div className="mx-6 mt-1 ">
                                    <p>Contraseña</p>
                                    <input
                                        type="password"
                                        placeholder="Contraseña"
                                        name="password"
                                        value={password}
                                        onChange={(e) => handleInputChange(e, "password")}
                                        className=" inline-block border-2  rounded-lg my-3 ml-6 text-center"
                                    />
                                </div>

                                <div className="my-3  ml-8">
                                    <button className="border-2 bg-slate-400 w-48 h-12">
                                        Catpcha
                                    </button>

                                </div>
                                <div className="grid justify-center m-2">
                                    <label></label>
                                    <input
                                        className=" border-2 my-2 mx-1 rounded-lg bg-slate-800  w-64  h-10 text-white "
                                        type="submit"

                                        onClick={loginSubmit}

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>

    )
}
