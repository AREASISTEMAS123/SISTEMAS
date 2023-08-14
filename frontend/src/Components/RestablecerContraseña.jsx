import { useState, useEffect } from 'react';
import LockResetIcon from '@mui/icons-material/LockReset';
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

    useEffect(() => {
        document.title = 'Restablecer contraseña | Consigue Ventas';
    }, []);

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

                const response = await fetch(import.meta.env.VITE_API_URL + `/password/find/${token}`);
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
        <div>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-5"
            >
                <div className="relative w-full my-6 mx-auto max-w-lg border-2 border-white p-1 rounded-lg rotate-[5deg]">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg] p-5 gap-5">
                        <div className='flex flex-col items-center gap-5'>
                            <div className='w-full text-center text-cv-primary'>
                                <LockResetIcon sx={{ fontSize: 60 }} />
                                <h1 className="text-2xl font-semibold">Restablecer contraseña</h1>
                            </div>
                            <form className="w-full" onSubmit={handleFormSubmit}>
                                <div className="mb-6">
                                    <label htmlFor='password' className="block mb-1 font-medium text-gray-900">
                                        Contraseña nueva:
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="bg-white border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary focus:border-cv-primary block w-full p-2.5"
                                            placeholder="Contraseña nueva"
                                            id='password'
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
                                    <label htmlFor='confirm_password' className="block mb-1 font-medium text-gray-900">
                                        Confirmar contraseña:
                                    </label>
                                    <div className="relative">
                                        <input
                                            className={`bg-white border border-gray-300 text-gray-900 outline-none sm:text-sm rounded-lg focus:ring-cv-secondary block w-full p-2.5 ${passwordMatch ? 'focus:border-cv-primary ' : 'focus:border-red-500'
                                                }`}
                                            id='confirm_password'
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
                                <div className="flex items-center justify-center">
                                    <button
                                        className="w-full shadow bg-cv-primary hover:bg-slate-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        Restablecer contraseña
                                    </button>
                                </div>

                                {isLoading && <p className="text-sm mt-1 text-black">Cargando...</p>}
                                {successMessage && (
                                    <p className="text-sm mt-1 text-green-500">{successMessage}</p>

                                )}
                                {errorMessage && (
                                    <p className="text-sm mt-1 text-red-500">{errorMessage}</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
