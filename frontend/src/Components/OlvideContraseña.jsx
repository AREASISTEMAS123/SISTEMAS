import { useState, useEffect } from 'react';

export const OlvideContraseña = () => {
  const [email, setEmail] = useState('');
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMessageWait, setShowMessageWait] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        const data = await response.json();
        setCorreoEnviado(true);
        setError(null);
        setIsButtonDisabled(true);
      
      } else {
        const errorData = await response.json();
        setError(new Error(errorData.message));
        setCorreoEnviado(false);
      }
    } catch (error) {
      setError(error);
      setCorreoEnviado(false);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (correoEnviado) {
      setIsButtonDisabled(true);
      setShowMessage(false);
      setShowMessageWait(true);
      setTimeout(() => {
        setCorreoEnviado(false);
        setIsButtonDisabled(false);
        setShowMessage(true);
        setShowMessageWait(false);
      }, 30000);
    }
  }, [correoEnviado]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r bg-cv-primary  shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Recuperar contraseña</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    name="email"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Dirección de correo electrónico"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                    Email
                  </label>
                </div>
                <div className="relative">
                  <button
                    className="bg-blue-500 text-white rounded-md px-2 py-1"
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                  >
                    Enviar
                  </button>
                </div>
                {isLoading && <p className="text-black">Cargando...</p>}
                {error && <p className="text-red-500">Error: {error.message}</p>}
                {correoEnviado && !error && <p className="text-black">Correo enviado correctamente.</p>}
                {showMessage && <p className="text-green-500">Puede volver a utilizar el botón de enviar.</p>}
                {showMessageWait && <p>
                  <span className='text-sm'> Recomendaciones: </span>

                  <ul className='text-sm'>
                    <li>
                      Revisa en tu carpeta Spam
                    </li>
                    <li>
                      Si deseas volver a mandar el correo debes esperar 30 segundos
                    </li>
                  </ul>
                </p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
