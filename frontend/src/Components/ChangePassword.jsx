import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
    const [old_password, setOld_password] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (password === confirm_password) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [password, confirm_password]);

    const navigate = useNavigate();
    const cancelarChange = () =>{
        navigate('/home')
    }
    const onsubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8 || confirm_password.length < 8) {
            setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
            setSuccessMessage("");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(import.meta.env.VITE_API_URL +  "/profile/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    old_password,
                    password,
                    confirm_password,
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                setSuccessMessage("Contraseña cambiada correctamente");
                setErrorMessage("");
            } else {
                setErrorMessage(responseData.message);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="min-h-screen  py-6 sm:py-12 flex flex-col justify-center">
            <form onSubmit={onsubmit} className="max-w-md mx-auto">
                <div className="mb-6">
                    <label className="block text-white font-bold mb-1 md:mb-0">
                        Contraseña antigua:
                    </label>
                    <div className="relative">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-700"
                            type="password"
                            placeholder="Contraseña antigua"
                            required
                            value={old_password}
                            onChange={(e) => setOld_password(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-white font-bold mb-1 md:mb-0">
                        Contraseña nueva:
                    </label>
                    <div className="relative">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-700"
                            type="password"
                            placeholder="Contraseña nueva"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label className="block text-white font-bold mb-1 md:mb-0">
                        Confirma contraseña:
                    </label>
                    <div className="relative">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-700"
                            type="password"
                            placeholder="Confirma contraseña"
                            value={confirm_password}
                            onChange={(e) => setConfirm_password(e.target.value)}
                            required
                        />
                    </div>
                </div>
                {(confirm_password !== "" && !passwordMatch) && (
                    <div className="text-red-500">Las contraseñas no coinciden.</div>
                )}
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                {successMessage && <div className="text-green-500">{successMessage}</div>}
                <div className="flex justify-center space-x-2">
                    <button
                        className="bg-cyan-400 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Cargando..." : "Cambiar contraseña"}
                    </button>
                    <button className="bg-amber-400 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={cancelarChange}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>

    )
}
