import React, { useState, useEffect, useRef } from 'react';
import { RelojAnalogico } from './commons/RelojAnalogico';
import { useMediaQuery } from '@mui/material';
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from 'react-icons/bs';
import { Toaster, toast } from 'react-hot-toast';

export const Asistencia = () => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [marcarEntrada, setMarcarEntrada] = useState(false);
  const [tardanza, setTardanza] = useState(false);
  const [entradaMarcada, setEntradaMarcada] = useState(false);
  const [salidaMarcada, setSalidaMarcada] = useState(false);
  const [botonDesactivado, setBotonDesactivado] = useState(false);
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const videoRef = useRef(null);
  const [timer, setTimer] = useState(5);
  const [capturing, setCapturing] = useState(false);
  const [mostrarBotonEntrada, setMostrarBotonEntrada] = useState(false);
  const [mostrarBotonSalida, setMostrarBotonSalida] = useState(false);
  const [mostrarBotonCamara, setMostrarBotonCamara] = useState(true);
  const [segundaFotoTomada, setSegundaFotoTomada] = useState(false);
  const [terceraFotoTomada, setTerceraFotoTomada] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleEntrada = () => {
    const hora = horaActual.getHours();
    const minutos = horaActual.getMinutes();
    const fecha = new Date().toISOString().slice(0, 10); // Obtenemos la fecha actual en formato yyyy-mm-dd

    if (hora === 8 && minutos >= 0 && minutos <= 10) {
      setTardanza(false);
      setEntradaMarcada(true);
      setBotonDesactivado(true);
      setMostrarBotonEntrada(false);
      setFotoUsuario(null);
      setFotoCapturada(null)
      setMostrarBotonCamara(true);

      // Enviar la solicitud de registro de entrada al servidor
      const formData = new FormData();
      formData.append('date', fecha);
      formData.append('admission_time', horaActual.toLocaleTimeString());
      formData.append('admission_image', fotoCapturada);

      fetch('http://127.0.0.1:8000/api/attendance/insert', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar la respuesta del servidor si es necesario
          console.log(data);
          toast.success('Entrada marcada exitosamente');
        })
        .catch((error) => {
          console.error('Error al enviar la solicitud:', error);
        });
    } else {
      setTardanza(true);
      setEntradaMarcada(true);
      setBotonDesactivado(true);
      setMostrarBotonEntrada(false);
      setFotoUsuario(null);
      setMostrarBotonCamara(true);
      toast.success('Entrada marcada exitosamente');
    }
  };

  const handleSalida = () => {
    setMarcarEntrada(false);
    setEntradaMarcada(false);
    setSalidaMarcada(true);
    setBotonDesactivado(true);
    setMostrarBotonSalida(false);
    setFotoUsuario(null);
    setFotoCapturada(null);
    setMostrarBotonCamara(false);
    toast.success('Salida marcada correctamente');
  };

  const reiniciarConteo = () => {
    setTimer(5);
    setCapturing(false);
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setCameraStream(stream);
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.log('Error accessing camera:', error);
      });
  };

  const stopCamera = () => {
    if (cameraStream && videoRef.current) {
      cameraStream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setCameraStream(null);
    }
  };

  const toggleCamera = () => {
    if (videoEnabled) {
      stopCamera();
    } else {
      startCamera();
    }
    setVideoEnabled(!videoEnabled);
    reiniciarConteo(); // Reiniciar el conteo al cambiar el estado de la cámara
  };

  const intervalRef = useRef(null); // Variable de referencia para almacenar el identificador del intervalo

  const handleCapture = () => {
    if (cameraStream) {
      setCapturing(true);
      const videoTrack = cameraStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      clearInterval(intervalRef.current); // Cancelar el intervalo del contador anterior

      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      intervalRef.current = countdown; // Almacenar el identificador del nuevo intervalo

      setTimeout(() => {
        clearInterval(countdown); // Cancelar el intervalo del contador actual

        imageCapture
          .takePhoto()
          .then((blob) => {
            setFotoUsuario(URL.createObjectURL(blob));
            setCapturing(false);
            setTimer(5);

            if (!segundaFotoTomada) {
              setMostrarBotonEntrada(true);
              setSegundaFotoTomada(true);
            } else if (segundaFotoTomada) {
              setMostrarBotonSalida(true);
              setTerceraFotoTomada(true);
              setMostrarBotonCamara(false);
            }

            stopCamera();
            setVideoEnabled(false);
            setFotoCapturada(blob);
          })
          .catch((error) => {
            console.log('Error taking photo:', error);
            setCapturing(false);
            setTimer(5);
          });
      }, 5000);
    }
  };

  useEffect(() => {
    if (videoEnabled) {
      startCamera();
      reiniciarConteo(); // Reiniciar el conteo al activar la cámara
    }

    return () => {
      stopCamera();
    };
  }, [videoEnabled]);

  return (
    <div
      className={`registro-Entrada h-screen flex  ${isMobile ? 'flex-col' : 'flex justify-center'
        }`}
    >
      <div className={`seccion-izquierda w-full ${isMobile ? 'mb-4' : 'mr-4'}`}>
        <div className="w-full h-96 rounded-xl bg-slate-950 relative">
          <div className="absolute top-0 left-0 w-full h-full">
            {fotoCapturada ? ( // Mostrar la foto capturada si está disponible
              <img
                src={URL.createObjectURL(fotoCapturada)}
                alt="Foto Capturada"
                className="w-full h-full object-cover"
              />
            ) : (
              videoEnabled ? (
                <video
                  className="w-full h-full object-cover"
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-white text-xl">Cámara desactivada</span>
                </div>
              )
            )}
          </div>
          <div className="absolute bottom-0 mb-4 w-full flex justify-center">
            {mostrarBotonCamara && (<button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: videoEnabled ? "transparent" : "#EF4444",
                color: "#fff",
                width: "3rem",
                height: "3rem",
                border: videoEnabled ? "2px solid #FFFFFF" : "2px solid #EF4444",
              }}
              onClick={toggleCamera}
            >
              {videoEnabled ? (
                <BsFillCameraVideoFill style={{ color: "#FFFFFF" }} />
              ) : (
                <BsFillCameraVideoOffFill style={{ color: "#FFFFFF" }} />
              )}
            </button>)}
          </div>
        </div>

        {videoEnabled && (
          <div className="flex justify-center mb-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
              onClick={handleCapture}
              disabled={capturing || fotoCapturada !== null} // Deshabilitar el botón si ya se capturó una foto
            >
              {capturing ? `Capturando (${timer})` : 'Tomar foto'}
            </button>
          </div>
        )}
      </div>
      <div
        className={`seccion-derecha ${isMobile
          ? 'mt-4 text-center'
          : 'ml-4 flex justify-center'
          }`}
      >
        <div className="flex flex-col items-center">
          <RelojAnalogico hora={horaActual} />
          <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white">
            {horaActual.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })}
          </p>
          {mostrarBotonEntrada && (
            <div className="mb-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleEntrada}
              >
                Marcar asistencia
              </button>
            </div>
          )}
          {entradaMarcada && (
            <p className="text-green-500 font-bold mt-4">Entrada marcada</p>
          )}

          {mostrarBotonSalida && (
            <div className="mb-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleSalida}
              >
                Marcar salida
              </button>
            </div>
          )}

          {salidaMarcada && (
            <p className="text-green-500 font-bold mt-4">Salida marcada</p>
          )}
          {tardanza && (
            <p className="text-red-500 font-bold mt-4">
              Tardanza (marcado después de las 8:10)
            </p>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};