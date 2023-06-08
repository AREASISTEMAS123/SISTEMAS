import { UseForms } from "../hooks/UseForms"

export const Login = () => {
    const { formulario, onInputChange } = UseForms({
        user: '',
        password: ''
    })
    const { user, password } = formulario
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
                            
                            <form className="grid  m-1">
                                <div className="  mx-6 mt-1" >
                                    <p>Usuario</p>
                                    <input
                                        type="text"
                                        placeholder="Es tu dni"
                                        name="user"
                                        value={user}
                                        onChange={onInputChange}
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
                                        onChange={onInputChange}
                                        className=" inline-block border-2  rounded-lg my-3 ml-6 text-center"
                                    />
                                </div>

                                <div className="my-3  ml-8">
                                    <button className="border-2 bg-slate-400 w-48 h-12">
                                        Catpcha
                                    </button>

                                </div>
                                <div className="grid justify-center m-2">
                                    <button
                                        className=" border-2 my-2 mx-1 rounded-lg bg-slate-800  w-64  h-10 text-white "
                                    >Ingresar</button>
                                </div>

                            </form>


                        </div>
                    </div>

                </div>



            </div>



        </>

    )
}
