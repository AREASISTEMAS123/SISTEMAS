import { useState, useEffect } from 'react';
import '../css/olvideContraseña.css'
export const OlvideContraseña = () => {
    const [email, setEmail] = useState('');
    const [correoEnviado, setCorreoEnviado] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [showMessageWait, setShowMessageWait] = useState(false);
    const [showEmptyDataMessage, setShowEmptyDataMessage] = useState(false);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    const [hasError, setHasError] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setShowEmptyDataMessage(true);
            return;
        }
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/password/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                // eslint-disable-next-line no-unused-vars
                const data = await response.json();
                setCorreoEnviado(true);
                setError(null);
                setIsButtonDisabled(true);

                setSecondsRemaining(30);
                setHasError(false);

            } else {
                const errorData = await response.json();
                setError(new Error(errorData.message));
                setCorreoEnviado(false);
            }
        } catch (error) {
            setError(error);
            setCorreoEnviado(false);
            setHasError(true);
        }

        setIsLoading(false);
    };
    useEffect(() => {
        if (email.trim()) {
            setShowEmptyDataMessage(false);
        }
    }, [email]);

    useEffect(() => {
        if (correoEnviado) {
            setIsButtonDisabled(true);
            setShowMessage(false);
            setShowMessageWait(true);
            setSecondsRemaining(30); // Reiniciar el contador a 30 segundos
            const interval = setInterval(() => {
                setSecondsRemaining((prevSeconds) => prevSeconds - 1);
            }, 1000);

            setTimeout(() => {
                setCorreoEnviado(false);
                setIsButtonDisabled(false);
                setShowMessage(true);
                setShowMessageWait(false);
                clearInterval(interval);
            }, 30000);
        }
    }, [correoEnviado]);
    useEffect(() => {
        if (hasError) {
            setTimeout(() => {
                setError(null);
            }, 500);
        }
    }, [hasError]);

    return (
        <div className='h-screen flex items-center justify-center '>
            <div className="  py-6  flex  sm:py-12">
                <div className="relative  sm:max-w-xl sm:mx-auto">
                    <div className="celeste absolute inset-0 bg-gradient-to-r   shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-10 lg:p-20">
                        <div className="max-w-md mx-auto">
                            <h1 className="text-2xl font-semibold">Recuperar contraseña</h1>

                            <div className="py-6 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input
                                        name="email"
                                        type="text"
                                        className=" h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder:text-gray-500 placeholder:text-sm "
                                        placeholder="Dirección de correo electrónico"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />

                                </div>
                                <div className='flex flex-col sm:flex-row justify-center sm:space-x-4 p-6 sm:p-2 border-gray-200 rounded-b'>
                                    <button
                                        className="celeste   font-bold uppercase rounded-lg text-sm px-5 py-2.5 text-center mb-2 sm:mb-0 hover:bg-slate-500  hover:text-white"
                                        onClick={handleSubmit}
                                        disabled={isButtonDisabled}
                                    >
                                        Enviar
                                    </button>
                                    <button
                                        className="bg-amber-300 hover:bg-amber-600 font-bold uppercase  rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={() => (window.location.href = '/login')}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                {showEmptyDataMessage && <p className="text-red-500">Debe llenar datos</p>}
                                {isLoading && <p className="text-black">Cargando...</p>}
                                {error && <p className="text-red-500">Error: {error.message}</p>}
                                {correoEnviado && !error && <p className="text-black">Correo enviado correctamente.</p>}
                                {showMessage && <p className="text-green-500">Puede volver a utilizar el botón de enviar.</p>}
                                {showMessageWait && <p>
                                    <span className='text-sm'> Recomendaciones: </span>
                                    <ul className='list-disc list-inside'>
                                        <li>Revisa en tu carpeta Spam</li>
                                        <li>Si deseas volver a mandar el correo debes esperar {secondsRemaining} segundos</li>
                                    </ul>
                                </p>}
                                {hasError && <p className="text-red-500">Error: {error.message}</p>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    

    );
};
