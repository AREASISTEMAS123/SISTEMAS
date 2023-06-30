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
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (password === confirmPassword) {
      setPasswordMatch(true);
      setIsLoading(true);
  
      try {
        const response = await fetch('http://127.0.0.1:8000/api/password/reset', {
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
            window.close(); // Cierra la ventana después de 15 segundos
          }, 15000);
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

        const response = await fetch(`http://127.0.0.1:8000/api/password/find/${token}`);
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
      <form className="w-full max-w-sm" onSubmit={handleFormSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Contraseña nueva:
            </label>
          </div>
          <div className="md:w-2/3 relative">
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
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
              Confirmar contraseña:
            </label>
          </div>
          <div className="md:w-2/3 relative">
            <input
              className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${passwordMatch ? 'focus:border-b-gray-700' : 'focus:border-red-500'}`}
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
        {successMessage && (
          <p className="text-green-500">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};
