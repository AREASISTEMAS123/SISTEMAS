import { UseForms } from "../hooks/UseForms"

export const Login = () => {
    const { formulario, onInputChange } = UseForms({
        user: '',
        password: ''
    })
    const { user, password } = formulario
    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div className="">
                    
                </div>
                <div className="   grid justify-center		">
                    
                    <h1 className="text-3xl font-normal 	">Login</h1>
                    <div className="mt-3">
                        <input
                            type="text"
                            placeholder="Es tu dni"
                            name="user"
                            value={user}
                            onChange={onInputChange}
                            className="border-2"
                        />
                    </div>
                    <div className="mt-3">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            className="border-2 "
                        />
                    </div>

                    <button
                        className="mt-3 border-2"
                    >Ingresar</button>

                    <button>PPPPP</button>
                </div>
            </div>



        </>

    )
}
