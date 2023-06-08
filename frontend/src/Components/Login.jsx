import { UseForms } from "../hooks/UseForms"

export const Login = () => {
    const { formulario, onInputChange } = UseForms({
        user: '',
        password: ''
    })
    const { user, password } = formulario
    return (
        <>
            <div>
                <div className=" bg-slate-500 p-7	" >
                    <div className="grid grid-cols-2 bg-white rounded-lg">
                        <div className="grid bg-white p-7">
                            <div className="bg-slate-500 ">

                            </div>
                        </div>

                        <div className="   grid justify-center ">
                            <div>
                                <img className="inline" src="https://consigueventas.com/wp-content/uploads/Rectangle-39.png" />
                            </div>

                            <div className="mt-1 static" >
                                <p>Usuario</p>
                                <input
                                    type="text"
                                    placeholder="Es tu dni"
                                    name="user"
                                    value={user}
                                    onChange={onInputChange}
                                    className=" inline-block border-2  "
                                />
                            </div>


                            <div className="mt-1 static object-right">
                                <p>Contraseña</p>
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    name="password"
                                    value={password}
                                    onChange={onInputChange}
                                    className=" inline-block border-2 "
                                />
                            </div>

                            <button
                                className=" border-2 bg-slate-600	mt-1"
                            >Ingresar</button>

                        </div>
                    </div>

                </div>



            </div>



        </>

    )
}
