import { useState, useEffect } from 'react';
import { RiEyeLine, RiEyeCloseLine } from 'react-icons/ri';

export const RestablecerContraseña = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordResetInfo, setPasswordResetInfo] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(true); // Reset passwordMatch on password change
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(true); // Reset passwordMatch on confirm password change
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 8 || confirmPassword.length < 8) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres.');
            setSuccessMessage('');
            return;
        }

        if (password === confirmPassword) {
            setPasswordMatch(true);
            setIsLoading(true);

            try {
                const response = await fetch(import.meta.env.VITE_API_URL + '/password/reset', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: passwordResetInfo.email,
                        password,
                        password_confirmation: confirmPassword,
                        token: passwordResetInfo.token,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccessMessage('La contraseña fue restablecida.');
                    setErrorMessage('');
                    setTimeout(() => {
                        window.close();
                    }, 5000);
                } else {
                    setErrorMessage(data.message);
                    setSuccessMessage('');
                }
            } catch (error) {
                console.error('Ocurrió un error', error);
                setErrorMessage('Un error ha ocurrido mientras se cambiaba la contraseña');
                setSuccessMessage('');
            }

            setIsLoading(false);
        } else {
            setPasswordMatch(false);
            setErrorMessage('');
            setSuccessMessage('');
        }
    };

    useEffect(() => {
        const obtenerInformacionRestablecimiento = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get('token');

                if (!token) {
                    setErrorMessage('No se pudo obtener la información del restablecimiento de contraseña');
                    return;
                }

                const response = await fetch(import.meta.env.VITE_API_URL +`/password/find/${token}`);
                const data = await response.json();

                if (response.ok) {
                    setPasswordResetInfo(data);
                    setErrorMessage('');
                } else {
                    setErrorMessage('No se pudo obtener la información del restablecimiento de contraseña');
                }
            } catch (error) {
                console.error('Ocurrió un error', error);
                setErrorMessage('Un error ha ocurrido mientras se obtenía la información del restablecimiento de contraseña');
            }
        };

        obtenerInformacionRestablecimiento();
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <form className="w-full max-w-sm mx-auto px-4 sm:px-6 lg:px-8" onSubmit={handleFormSubmit}>
                <div className="mb-6">
                    <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                        Contraseña nueva:
                    </label>
                    <div className="relative">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-b-gray-700"
                            placeholder="Contraseña nueva"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <div
                            className="absolute top-0 right-0 pr-3 h-full flex items-center"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <RiEyeCloseLine size={20} className="text-gray-400 cursor-pointer" />
                            ) : (
                                <RiEyeLine size={20} className="text-gray-400 cursor-pointer" />
                            )}
                        </div>
                    </div>
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-500 font-bold mb-1 md:mb-0 pr-4">
                        Confirmar contraseña:
                    </label>
                    <div className="relative">
                        <input
                            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${passwordMatch ? 'focus:border-b-gray-700' : 'focus:border-red-500'
                                }`}
                            placeholder="Confirmar contraseña"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        {!passwordMatch && (
                            <p className="text-red-500 text-xs italic">Las contraseñas no coinciden.</p>
                        )}
                    </div>
                </div>
                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            className="shadow bg-cv-primary hover:bg-slate-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            disabled={isLoading}
                        >
                            Restablecer contraseña
                        </button>
                    </div>
                </div>
               
                {isLoading && <p className="text-black">Cargando...</p>}
                {successMessage && (
                    <div>
                        <p className="text-green-500">{successMessage}</p>

                    </div>

                )}
                {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};
