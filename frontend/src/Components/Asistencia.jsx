import React, { useState, useEffect, useRef } from 'react';
import { RelojAnalogico } from './commons/RelojAnalogico';
import { useMediaQuery } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill } from "react-icons/bs";

export const Asistencia = () => {
  const [horaActual, setHoraActual] = useState(new Date());
  const [mostrarBotonEntrada, setMostrarBotonEntrada] = useState(false);
  const [mostrarBotonSalida, setMostrarBotonSalida] = useState(false);
  const [entradaMarcada, setEntradaMarcada] = useState(false);
  const [salidaMarcada, setSalidaMarcada] = useState(false);
  const [tardanza, setTardanza] = useState(false);
  const [fotoUsuario, setFotoUsuario] = useState(null);
  const [fotoCapturada, setFotoCapturada] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [timer, setTimer] = useState(3);
  const [capturing, setCapturing] = useState(false);
  const [segundaFotoTomada, setSegundaFotoTomada] = useState(false);
  const [mostrarBotonCamara, setMostrarBotonCamara] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const interval = setInterval(() => {
      setHoraActual(new Date());
    }, 1000);

    const fecha = new Date().toISOString().slice(0, 10);
    const entradaMarcadaLocal = localStorage.getItem(`entrada_${fecha}`);
    const salidaMarcadaLocal = localStorage.getItem(`salida_${fecha}`);
    setEntradaMarcada(entradaMarcadaLocal === 'true');
    setSalidaMarcada(salidaMarcadaLocal === 'true');

    const existeSalidaMarcada = salidaMarcadaLocal === 'true';

    setMostrarBotonCamara(!existeSalidaMarcada);

    const existeEntradaMarcada = entradaMarcadaLocal == 'true';
    setSegundaFotoTomada(existeEntradaMarcada)

    fetch(import.meta.env.VITE_API_URL +'/attendance/id', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const asistenciasHoy = data.attendance.filter((asistencia) => asistencia.date === fecha);
        if (asistenciasHoy.length === 0) {
          setSegundaFotoTomada(false)
        } else {
          setSegundaFotoTomada(true)
        }
      })
      .catch((error) => {
        console.error('Error al obtener las asistencias:', error);
      });

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleRegistroAsistencia = (tipo) => {
    const fecha = new Date().toISOString().slice(0, 10);

    const formData = new FormData();
    formData.append('date', fecha);
    formData.append(`${tipo}_time`, horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

    const shift = localStorage.getItem('shift');
    const iduser = localStorage.getItem('iduser');
    const photoName = `${shift.charAt(0)}-${iduser}-${tipo === 'admission' ? 'e' : 's'}-${fecha}.jpg`;
    formData.append(`${tipo}_image`, fotoCapturada, photoName);

    fetch(import.meta.env.VITE_API_URL + '/attendance/insert', {
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
        if (tipo === 'admission') {
          setMostrarBotonEntrada(false)
          setFotoUsuario(null);
          setFotoCapturada(null);
          setMostrarBotonCamara(true);
          setVideoEnabled(false)

          // Marcar entrada en Local Storage para este día
          localStorage.setItem(`entrada_${fecha}`, 'true');

          toast.success('Entrada marcada exitosamente');
        } else {
          setMostrarBotonSalida(false)
          setMostrarBotonCamara(false)
          setFotoUsuario(null);
          setFotoCapturada(null);
          setVideoEnabled(false);
          setCameraStream(null);

          // Marcar salida en Local Storage para este día
          localStorage.setItem(`salida_${fecha}`, 'true');

          toast.success('Salida marcada correctamente');
        }
      })
      .catch((error) => {
        console.error('Error al enviar la solicitud:', error);
      });
  };

  // Función para verificar si el usuario está dentro del horario permitido
  const verificarHorario = () => {
    const hora = horaActual.getHours();
    const minutos = horaActual.getMinutes();
    const turno = localStorage.getItem('shift');

    if (
      (turno === 'Mañana' && (hora < 8 || (hora === 8 && minutos < 10)) || hora >= 13) ||
      (turno === 'Tarde' && (hora < 14 || (hora === 14 && minutos < 10)) || hora >= 19)
    ) {
      setTardanza(true);
    } else {
      setTardanza(false);
    }
  };

  useEffect(() => {
    // Verificar el horario cada vez que cambie la horaActual
    verificarHorario();
  }, [horaActual]);

  const reiniciarConteo = () => {
    setTimer(3);
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
    reiniciarConteo();
  };

  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  const handleCapture = () => {
    if (cameraStream) {
      setCapturing(true);
      const videoTrack = cameraStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      clearInterval(intervalRef.current);

      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      intervalRef.current = countdown;

      setTimeout(() => {
        clearInterval(countdown);

        imageCapture
          .takePhoto()
          .then((blob) => {
            setFotoUsuario(URL.createObjectURL(blob));
            setCapturing(false);
            setTimer(5);

            if (!segundaFotoTomada) {
              setMostrarBotonEntrada(true);
              setMostrarBotonCamara(false);
              setSegundaFotoTomada(true);
            } else {
              setMostrarBotonSalida(true)
              setMostrarBotonCamara(false)
            }

            stopCamera();
            setVideoEnabled(false);
            setFotoCapturada(blob);
          })
          .catch((error) => {
            console.log('Error taking photo:', error);
            setCapturing(false);
            setTimer(3);
          });
      }, 3000);
    }
  };

  useEffect(() => {
    if (videoEnabled) {
      startCamera();
      reiniciarConteo();
    }

    return () => {
      stopCamera();
    };
  }, [videoEnabled]);

  //Loginca Click Una vez
  const [buttonClickedAdmission, setButtonClickedAdmission] = useState(false);

  const handleButtonClickAdmission = () => {
    setButtonClickedAdmission(true);
    handleRegistroAsistencia('admission');
  };

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setButtonClicked(true);
    handleRegistroAsistencia('departure');
  };
  


  return (
    <div className={`registro-Entrada min-h-screen flex ${isMobile ? 'flex-col' : 'justify-center'}`}>
      <div className={`seccion-izquierda w-full ${isMobile ? 'mb-4' : ''}`}>
        <div className={`w-full rounded-xl bg-slate-950 relative ${isMobile ? 'h-96' : 'h-4/6'}`}>
          <div className="absolute top-0 left-0 w-full h-full">
            {fotoUsuario && (
              <img src={fotoUsuario} alt="Foto capturada" className="w-full h-full object-cover" />
            )}
            {!fotoUsuario && (
              (videoEnabled ? (
                <video
                  className="w-full h-full object-cover"
                  ref={videoRef}
                  style={{ display: videoEnabled ? 'block' : 'none' }}
                  autoPlay
                  playsInline
                  muted
                />
              ) : (<div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-xl">Cámara desactivada</span>
              </div>)
              ))}
          </div>
          <div className="absolute bottom-0 mb-4 w-full flex items-center justify-center">
            {mostrarBotonCamara && (
              <button
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
              </button>
            )}
          </div>
        </div>
        <div className='grid justify-items-center'>
          {videoEnabled && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleCapture}
              disabled={capturing}
            >
              {capturing ? `Capturando (${timer})` : 'Tomar foto'}
            </button>
          )}
        </div>
      </div>
      <div className="seccion-derecha flex flex-col items-center justify-start ml-4 rounded-xl">
        <RelojAnalogico hora={horaActual}/>
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white">
          {horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </p>
        {mostrarBotonEntrada && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            // onClick={() => handleRegistroAsistencia('admission')}
            onClick={handleButtonClickAdmission} disabled={buttonClickedAdmission}
          >
            Marcar entrada
          </button>
        )}
        {entradaMarcada && <p className="text-green-500 font-bold mt-4">Entrada marcada</p>}
        {mostrarBotonSalida && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            // onClick={() => handleRegistroAsistencia('departure')}
            onClick={handleButtonClick} disabled={buttonClicked}
          >
            Marcar salida
          </button>
        )}
        {buttonClicked && <p className='text-blue-500 font-semibold mt-4'>¡Ya has marcado asistencia!</p>}
        {salidaMarcada && <p className="text-green-500 font-bold mt-4">Salida marcada</p>}
        {tardanza && (
          <p className="text-red-500 font-bold mt-4">Tardanza (marcado después de las 8:10)</p>
        )}
      </div>
      <Toaster/>
    </div>
  );
};