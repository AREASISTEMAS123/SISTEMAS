import  { useState, useEffect } from 'react';

export const RestablecerContraseña = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordResetInfo, setPasswordResetInfo] = useState(null);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      //CONTRASEÑAS COINCIDEN
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
          // CONTRASEÑA CAMBIADA
          setSuccessMessage(data.message);
          setErrorMessage('');
        } else {
          // ERROR AL CAMBIAR
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
      // Contraseñas no coinciden
      setPasswordMatch(false);
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  useEffect(() => {
    const obtenerInformacionRestablecimiento = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/password/find/${'XCBlkxu7Nzdw83zVYwPw7z7v7i0N8PkAgafBZYFU8koqCxxnuokMfKGsB8A0'}`);
        const data = await response.json();
        if (response.ok) {
          setPasswordResetInfo(data);
        } else {
          // Manejar el caso en el que no se puede obtener la información del objeto PasswordReset
          setErrorMessage('No se pudo obtener la información del restablecimiento de contraseña');
        }
      } catch (error) {
        // Manejar el error de la solicitud
        console.error('Ocurrió un error', error);
        setErrorMessage('Un error ha ocurrido mientras se obtenía la información del restablecimiento de contraseña');
      }
    };

    obtenerInformacionRestablecimiento();
  }, []);

  return (
    <form className="w-full max-w-sm" onSubmit={handleFormSubmit}>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Contraseña nueva:
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            type="password"
            placeholder="Contraseña nueva"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
      </div>
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            Confirmar contraseña:
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white ${passwordMatch ? 'focus:border-purple-500' : 'focus:border-red-500'}`}
            type="password"
            placeholder="Confirmar contraseña"
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
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={isLoading}>
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
  );
};

