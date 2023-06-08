import React, { useState, useEffect, useRef } from 'react';

export const RegistroAsistencia = () => {
    return (
        <div className="registro-asistencia flex items-center justify-center h-screen">
            <SeccionIzquierda />
            <SeccionDerecha />
        </div>
    );
};

const SeccionIzquierda = () => {
    const [fotoUsuario, setFotoUsuario] = useState(null);
    const [cameraStream, setCameraStream] = useState(null);
    const videoRef = useRef(null);

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
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

    const handleCapture = () => {
        if (cameraStream) {
            const videoTrack = cameraStream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(videoTrack);

            imageCapture.takePhoto()
                .then((blob) => {
                    setFotoUsuario(URL.createObjectURL(blob));
                })
                .catch((error) => {
                    console.log('Error taking photo:', error);
                });
        }
    };

    useEffect(() => {
        startCamera();

        return () => {
            stopCamera();
        };
    }, []);

    return (
        <div className="seccion-izquierda flex flex-col items-center justify-center mr-4">
            <div className="w-64 h-48 border border-gray-300 relative">
                <video className="w-full h-full object-cover" ref={videoRef} autoPlay playsInline muted />
                {fotoUsuario && (
                    <img src={fotoUsuario} alt="Foto capturada" className="absolute inset-0 object-cover" />
                )}
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleCapture}
                disabled={!cameraStream}
            >
                Tomar foto
            </button>
        </div>
    );
};

const SeccionDerecha = () => {
    const [horaActual, setHoraActual] = useState(new Date());
    const [marcarAsistencia, setMarcarAsistencia] = useState(false);
    const [marcadoEntrada, setMarcadoEntrada] = useState(false);
    const [marcadoSalida, setMarcadoSalida] = useState(false);
    const [tardanza, setTardanza] = useState(false);
    const [falta, setFalta] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setHoraActual(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleAsistencia = () => {
        const hora = horaActual.getHours();
        const minutos = horaActual.getMinutes();

        if (hora === 8 && minutos >= 0 && minutos <= 10) {
            setMarcadoEntrada(true);
            setTardanza(false);
            setFalta(false);
        } else if (hora === 12 && minutos >= 45 && minutos <= 55) {
            setMarcadoSalida(true);
            setTardanza(false);
            setFalta(false);
        } else {
            setTardanza(true);
            setFalta(false);
        }
        setMarcarAsistencia(true);
    };

    return (
        <div className="seccion-derecha flex flex-col items-center justify-center ml-4">
            <p className="text-center mb-4">
                Horario del trabajador: 8:00am - 1:00pm | 2:00pm - 7:00pm
            </p>
            <p className="mb-4">
                {marcadoEntrada ? 'Marcado entrada' : tardanza ? 'Tardanza' : falta ? 'Falta' : ''}
                {marcadoSalida && ' | Marcado salida'}
            </p>
            <p className="mb-4">
                Hora actual: {horaActual.toLocaleTimeString()}
            </p>
            {!marcarAsistencia && (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAsistencia}
                >
                    Marcar asistencia
                </button>
            )}
            {marcarAsistencia && (
                <button
                    className="bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed"
                    disabled
                >
                    Asistencia marcada
                </button>
            )}
        </div>
    );
};