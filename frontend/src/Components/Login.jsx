import { UseForms } from "../hooks/UseForms"

export const Login = () => {
    const { formulario, onInputChange, onResetForms } = UseForms({
        user: '',
        password: ''
    })
    const { user, password } = formulario
    return (
        <>
            <h1 className="text-3xl font-bold underline	">Login</h1>
            <div  >
                <input
                    type="text"
                    placeholder="nombre"
                    name="user"
                    value={user}
                    onChange={onInputChange}
                    className="border-separate"
                />
            </div>
            <div >
                <input
                    type="password"
                    placeholder="contraseña"
                    name="password"
                    value={password}
                    onChange={onInputChange}

                />
            </div>

            <button onClick={onResetForms}>Borrar</button>


        </>

    )
}
