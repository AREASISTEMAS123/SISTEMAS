import React, { useState, useEffect, useRef } from 'react';
import { RelojAnalogico } from './commons/RelojAnalogico';

export const RegistroAsistencia = () => {
    const [mostrarBotonAsistencia, setMostrarBotonAsistencia] = useState(false);

    return (
        <div className="registro-asistencia flex items-center justify-center h-screen">
            <SeccionIzquierda setMostrarBotonAsistencia={setMostrarBotonAsistencia} />
            <SeccionDerecha mostrarBotonAsistencia={mostrarBotonAsistencia} setMostrarBotonAsistencia={setMostrarBotonAsistencia} />
        </div>
    );
};

const SeccionDerecha = ({ mostrarBotonAsistencia, setMostrarBotonAsistencia }) => {
    const [horaActual, setHoraActual] = useState(new Date());
    const [marcarAsistencia, setMarcarAsistencia] = useState(false);
    const [tardanza, setTardanza] = useState(false);
    const [asistenciaMarcada, setAsistenciaMarcada] = useState(false); // Nuevo estado
    const [salidaMarcada, setSalidaMarcada] = useState(false);
    const [botonDesactivado, setBotonDesactivado] = useState(false); // Nuevo estado
    const [fotoUsuario, setFotoUsuario] = useState(null); // Nueva variable

    useEffect(() => {
        const interval = setInterval(() => {
            setHoraActual(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleAsistencia = () => {
        if (marcarAsistencia) {
            // Lógica para marcar la salida
            setMarcarAsistencia(false);
            setAsistenciaMarcada(false);
            setSalidaMarcada(true); // Marcar la salida
            setBotonDesactivado(true); // Desactivar el botón después de marcar la salida

            // Aquí puedes enviar la foto de salida al backend
            const formData = new FormData();
            formData.append('nombre', nombreUsuario);
            formData.append('foto_salida', fotoUsuario); // Suponiendo que ya tienes la foto de salida capturada

            fetch('http://ruta-de-tu-api/marcar-salida', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Maneja la respuesta del backend
                })
                .catch(error => {
                    console.error('Error al marcar la salida:', error);
                });
            // Limpiar la foto de usuario después de marcar la salida
            setFotoUsuario(null);

            // Activar la cámara nuevamente después de marcar la asistencia
            startCamera();
            setVideoEnabled(true);
        } else {
            const hora = horaActual.getHours();
            const minutos = horaActual.getMinutes();

            if (hora === 8 && minutos >= 0 && minutos <= 10 && !asistenciaMarcada && !salidaMarcada) {
                setMarcarAsistencia(true);
                setTardanza(false);
                setAsistenciaMarcada(true);
                setBotonDesactivado(true); // Desactivar el botón después de marcar la asistencia
            } else {
                setTardanza(true);
                setMarcarAsistencia(true)
            }

            // Aquí puedes enviar la foto de asistencia al backend
            const formData = new FormData();
            formData.append('nombre', nombreUsuario);
            formData.append('foto_asistencia', fotoUsuario); // Suponiendo que ya tienes la foto de asistencia capturada

            fetch('http://ruta-de-tu-api/marcar-asistencia', {
                method: 'POST', body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Maneja la respuesta del backend
                })
                .catch(error => {
                    console.error('Error al marcar la asistencia:', error);
                });
        }
    };

    return (
        <div className="seccion-derecha flex flex-col items-center justify-start ml-4 -mt-36">
            <RelojAnalogico hora={horaActual} />
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white">
                {horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            {mostrarBotonAsistencia && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleAsistencia}
                    disabled={botonDesactivado} // Desactivar el botón si está marcada la asistencia o salida
                >
                    {marcarAsistencia ? 'Marcar salida' : 'Marcar asistencia'}
                </button>
            )}
            {tardanza && (
                <p className="text-red-500 mt-2">Tardanza: Ha marcado la asistencia después de las 8:10 AM</p>
            )}
        </div>
    );
};

const SeccionIzquierda = ({ setMostrarBotonAsistencia }) => {
    const [fotoUsuario, setFotoUsuario] = useState(null);
    const [cameraStream, setCameraStream] = useState(null);
    const [videoEnabled, setVideoEnabled] = useState(false);
    const videoRef = useRef(null);
    const [timer, setTimer] = useState(10);
    const [capturing, setCapturing] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState(''); // Nuevo estado para el nombre de usuario

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
        }
        setCameraStream(null);
    };

    const toggleCamera = () => {
        if (videoEnabled) {
            stopCamera();
        } else {
            startCamera();
        }
        setVideoEnabled(!videoEnabled);
    };

    const handleCapture = () => {
        if (cameraStream) {
            setCapturing(true);
            const videoTrack = cameraStream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(videoTrack);

            const countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            setTimeout(() => {
                imageCapture
                    .takePhoto()
                    .then((blob) => {
                        setFotoUsuario(URL.createObjectURL(blob));
                        setCapturing(false);
                        setTimer(10);
                        setMostrarBotonAsistencia(true); // Mostrar el botón de asistencia después de tomar la foto
                        stopCamera(); // Desactivar la cámara después de tomar la foto
                        setVideoEnabled(false); // Deshabilitar el estado de videoEnabled
                        // Aquí puedes enviar la foto al backend
                        const formData = new FormData();
                        formData.append('nombre', nombreUsuario); // Agrega el nombre de usuario al formulario
                        formData.append('foto', blob); // Agrega la foto al formulario

                        fetch('http://ruta-de-tu-api/subir-foto', {
                            method: 'POST',
                            body: formData
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data); // Maneja la respuesta del backend
                            })
                            .catch(error => {
                                console.error('Error al subir la foto:', error);
                            });
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
        }

        return () => {
            stopCamera();
        };
    }, [videoEnabled]);

    return (
        <div className="seccion-izquierda flex flex-col items-center justify-center mr-4">
            <div className="w-96 h-96 border border-gray-300 ">
                {fotoUsuario ? (
                    <img src={fotoUsuario} alt="Foto capturada" className="w-full h-full object-cover" />
                ) : (
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
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={toggleCamera}
            >
                {videoEnabled ? 'Desactivar cámara' : 'Activar cámara'}
            </button>
            {videoEnabled && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={handleCapture}
                    disabled={capturing}
                >{capturing ? `Capturando (${timer})` : 'Tomar foto'}
                </button>
            )}
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="mt-4 w-48 px-2 py-1 border border-gray-300 rounded"
            />
        </div>
    );
};