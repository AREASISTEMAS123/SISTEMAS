import React, { useState, useEffect, useRef } from 'react';

export const RegistroAsistencia = () => {
    return (
        <div className="registro-asistencia flex items-center justify-center h-screen">
            <SeccionIzquierda />
            <SeccionDerecha />
        </div>
    );
};

const SeccionDerecha = () => {
    const [horaActual, setHoraActual] = useState(new Date());
    const [marcarAsistencia, setMarcarAsistencia] = useState(false);
    const [tardanza, setTardanza] = useState(false);
    const [fotoCapturada, setFotoCapturada] = useState(false);

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
        } else {
            const hora = horaActual.getHours();
            const minutos = horaActual.getMinutes();

            if (hora === 8 && minutos <= 10) {
                setMarcarAsistencia(true);
                setTardanza(false);
            } else {
                setTardanza(true);
            }
        }
    };

    return (
        <div className="seccion-derecha flex flex-col items-center justify-start ml-4">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 text-white">
                {horaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleAsistencia}
            >
                {marcarAsistencia ? 'Marcar salida' : 'Marcar asistencia'}
            </button>
            {tardanza && (
                <p className="text-red-500 mt-2">Tardanza: Ha marcado la asistencia después de las 8:10 AM</p>
            )}
        </div>
    );
};

const SeccionIzquierda = () => {
    const [fotoUsuario, setFotoUsuario] = useState(null);
    const [cameraStream, setCameraStream] = useState(null);
    const [videoEnabled, setVideoEnabled] = useState(false);
    const videoRef = useRef(null);
    const [timer, setTimer] = useState(10);
    const [capturing, setCapturing] = useState(false);

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
        if (cameraStream) {
            cameraStream.getTracks().forEach((track) => {
                track.stop();
            });
            setCameraStream(null);
            videoRef.current.srcObject = null;
        }
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
            <div className="w-96 h-96 border border-gray-300 relative">
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
                >
                    {capturing ? `Capturando (${timer})` : 'Tomar foto'}
                </button>
            )}
        </div>
    );
};