import React, { useState, useEffect, useRef } from 'react';
import { RelojAnalogico } from './commons/RelojAnalogico';

export const RegistroAsistencia = () => {
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
    const [timer, setTimer] = useState(10);
    const [capturing, setCapturing] = useState(false);
    const [mostrarBotonEntrada, setMostrarBotonEntrada] = useState(false);
    const [mostrarBotonSalida, setMostrarBotonSalida] = useState(false);
    const [mostrarBotonCamara, setMostrarBotonCamara] = useState(true);
    const [segundaFotoTomada, setSegundaFotoTomada] = useState(false);
    const [terceraFotoTomada, setTerceraFotoTomada] = useState(true);

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

        if (hora === 8 && minutos >= 0 && minutos <= 10) {
            setTardanza(false);
            setEntradaMarcada(true);
            setBotonDesactivado(true);
            setMostrarBotonEntrada(false);
            setFotoUsuario(null);
            setFotoCapturada(null);

        } else {
            setTardanza(true);
            setEntradaMarcada(true);
            setBotonDesactivado(true);
            setMostrarBotonEntrada(false);
            setFotoUsuario(null);
            setFotoCapturada(null);
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
    };

    const reiniciarConteo = () => {
        setTimer(10);
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
                        setTimer(10);

                        if (!segundaFotoTomada ) {
                            setMostrarBotonEntrada(true);
                            setSegundaFotoTomada(true);
                        } else if (segundaFotoTomada ){
                            setMostrarBotonSalida(true);
                            setTerceraFotoTomada(true);
                            setMostrarBotonCamara(false)
                        }

                        stopCamera();
                        setVideoEnabled(false);
                        setFotoCapturada(blob);
                    })
                    .catch((error) => {
                        console.log('Error taking photo:', error);
                        setCapturing(false);
                        setTimer(10);
                    });
            }, 10000);
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
        <div className="registro-Entrada flex items-center justify-center h-screen">
            <div className="seccion-izquierda flex flex-col items-center justify-center mr-4">
                <div className="w-96 h-96 border border-gray-300">
                    {fotoUsuario && (
                        <img src={fotoUsuario} alt="Foto capturada" className="w-full h-full object-cover" />
                    )}
                    {!fotoUsuario && (
                        <video
                            className="w-full h-full object-cover"
                            ref={videoRef}
                            style={{ display: videoEnabled ? 'block' : 'none' }}
                            autoPlay
                            playsInline
                            muted
                        />
                    )}
                </div>
                {mostrarBotonCamara && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={toggleCamera}
                >
                    {videoEnabled ? 'Desactivar cámara' : 'Activar cámara'}
                </button>
                )}
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
            <div className="seccion-derecha flex flex-col items-center justify-start ml-4 ">
                <RelojAnalogico hora={horaActual} />
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white">
                    {horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </p>
                {mostrarBotonEntrada && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleEntrada}
                    >
                        Marcar entrada
                    </button>
                )}
                {entradaMarcada && <p className="text-green-500 font-bold mt-4">Entrada marcada</p>}
                {mostrarBotonSalida && (
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                        onClick={handleSalida}
                    >
                        Marcar salida
                    </button>
                )}
                {salidaMarcada && <p className="text-green-500 font-bold mt-4">Salida marcada</p>}
                {tardanza && (
                    <p className="text-red-500 font-bold mt-4">Tardanza (marcado después de las 8:10)</p>
                )}
            </div>
        </div>
    );
};