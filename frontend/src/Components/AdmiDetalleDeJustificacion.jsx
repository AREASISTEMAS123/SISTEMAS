import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from "moment";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import '../css/detalleJustificacionAdmi.css'
export const AdmiDetalleDeJustificacion = () => {
    const { id, userid } = useParams();
    const [faltasList, setFaltasList] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [messages, setMessage] = useState('');
    const [showModalAceptado, setShowModalAceptado] = useState(false);
    const [showModalRechazado, setShowModalRechazado] = useState(false);

    const [reason_decline, setReason_decline] = useState('')
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = `Bearer ${localStorage.getItem('token')}`;
                const response = await fetch(`http://127.0.0.1:8000/api/users/justifications/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });
                const data = await response.json();
                setFaltasList(data);
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };
        fetchData();
    }, [id, userid]);
    const navigate = useNavigate();

    const OnClickRetroceder = () => {
        navigate(`/justificaciones`);
    }
    const onCloseModalRechazo = () => {
        setShowModalRechazado(false);
    }

    const onOpenModalRechazo = (e, item) => {
        e.preventDefault();
        setSelectedItem(item);
        setShowModalRechazado(true);
    };
    const onOpenModalAceptado = (e, item) => {
        e.preventDefault();
        setSelectedItem(item);
        setShowModalAceptado(true);
    }
    const onCloseModalAceptado = () => {
        setShowModalAceptado(false);
    }


    const onClickAceptar = (e, id, userid) => {
        e.preventDefault();

        const token = `Bearer ${localStorage.getItem('token')}`;

        console.log('id ', id)
        console.log('userid ', userid)
        fetch(`http://127.0.0.1:8000/api/users/justifications/${id}/accept/${userid}`, {
            method: 'POST',
            headers: {
                Authorization: token,
            },

        })

            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log("data", data);
                // Maneja la respuesta exitosa si es necesario
                // Aquí puedes actualizar el estado en la interfaz de usuario si deseas reflejarlo de inmediato
            })
            .catch((error) => {
                setMessage(error.message);
            });

        setShowModalAceptado(false);
        navigate(`/justificaciones`);
    };


    const onClickRechazar = (e, id, userid) => {
        e.preventDefault();
        const token = `Bearer ${localStorage.getItem('token')}`;
        console.log('id ', id);
        console.log('userid ', userid);
        console.log('Estamos rechazando');

        if (!reason_decline) {
            // El campo del motivo está vacío, puedes mostrar un mensaje de error o tomar otra acción
            setMessage('Por favor, proporciona un motivo de rechazo');
            return;
        }

        console.log(reason_decline); // Agregar esta línea para imprimir el motivo en la consola

        fetch(import.meta.env.VITE_API_URL + `/users/justifications/${id}/decline/${userid}`, {
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json', // Asegurarse de incluir el encabezado Content-Type
            },
            body: JSON.stringify({ reason_decline }),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message);
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                setMessage(error.message);
            });
        setShowModalRechazado(false);
        navigate(`/justificaciones`);
    };

    const definiendo_rol = (role_id) => {
        if (role_id === 1) {
            return "Gerencia";
        } else if (role_id === 2) {
            return "Lider de nucleo";
        } else if (role_id === 3) {
            return "Colaborador";
        } else {
            return;
        }
    }
    return (
        <div>
            <div className="flex items-center mb-4">
                <h3 className="mr-2 text-gray-300 text-2xl">JUSTIFICACIONES </h3>
                <button className='text-gray-300' style={{ marginLeft: 'auto' }} onClick={OnClickRetroceder} ><KeyboardBackspaceIcon></KeyboardBackspaceIcon></button>
            </div>
            <div className='border border-gray-300 rounded-lg p-3 mt-5'>

                {faltasList.map((item) => (
                    <div key={item.user[0].id}>
                        <div className=" md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto" >
                            
                            <h1 className=' text-white mb-10 text-xl md:w-full lg:w-2/3 xl:w-1/2 mx-auto font-semibold'> DATOS DEL {definiendo_rol(item.user[0].role[0].role_id).toUpperCase()}</h1>

                            <div className="flex flex-col ">
                                <label className="font-semibold text-white">
                                    NOMBRE COMPLETO
                                </label>
                                <div className="text-black font-semibold bg-input rounded-lg text-center my-2">
                                    <div>
                                        <div>{item.user[0].name} {item.user[0].surname}</div>
                                    </div>
                                </div>
                            </div>


                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-10'>
                                <div className=' flex flex-col'>
                                    <label className='font-semibold text-white'>DNI </label>
                                    <input
                                        disabled
                                        className=' text-black font-semibold bg-input rounded-lg text-center my-2'
                                        value={item.user[0].username}
                                    />
                                </div>

                                <div className=' flex flex-col'>
                                    <label className="font-semibold	 mr-2 text-white">Perfil </label>
                                    <input
                                        className='text-black font-semibold bg-input rounded-lg text-center my-2'
                                        value={item.user[0].profile.profile_name}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-10'>
                                <div className=' flex flex-col'>
                                    <label className='font-semibold mr-2 text-white'>Razón de justificación </label>
                                    <input
                                        disabled
                                        className=' bg-input font-semibold rounded-lg text-center my-2'
                                        value={`${item.justification_type === 0 ? "Falta".toUpperCase() : "Tardanza".toUpperCase()}`}
                                    />
                                </div>

                                <div className=' flex flex-col'>
                                    <label className="font-semibold	 mr-2 text-white">Fecha </label>
                                    <input
                                        className=' bg-input  font-semibold rounded-lg text-center my-2'
                                        value={moment(item.justification_date).format("DD/MM/YYYY")}
                                        disabled
                                    />
                                </div>
                            </div>



                            
                            <div className=' ml-auto flex flex-col'>
                                <label className='font-semibold  text-white' >Motivo </label>
                                <textarea className=' w-full font-semibold  bg-input rounded-lg overflow-hidden text-center my-2 p-2 '
                                    disabled
                                    value={item.reason}
                                    rows={Math.max(2, Math.ceil(item.reason.length / 50))}

                                ></textarea>

                            </div>


                            <div>
                                <label className='font-semibold text-white'>Evidencia:</label>
                            </div>

                            <div className='flex items-center justify-center'>
                                {item.evidence.endsWith('.jpg') || item.evidence.endsWith('.png') || item.evidence.endsWith('.jpeg') ? (
                                    <img src={`http://localhost:8000/archivos/${item.evidence}`} alt="Image" />
                                ) : item.evidence.endsWith('.pdf') ? (
                                    <embed src={`http://localhost:8000/archivos/${item.evidence}`} type="application/pdf" width="100%" height="600px" />
                                ) : (
                                    <div>Unsupported file format</div>
                                )}
                            </div>
                            <div className="flex items-center justify-center p-6 border-t border-gray-200 rounded-b ">

                                {item.decline === 0 && item.justification_status === 0 && (
                                    <>
                                        <button
                                            className="border-2 hover:bg-slate-500 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-10 bt-rechazar"
                                            onClick={(e) => onOpenModalRechazo(e, item)}
                                        >
                                            RECHAZAR
                                        </button>

                                        <button
                                            className="bt-aceptar hover:bg-slate-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                            onClick={(e) => onOpenModalAceptado(e, item)}
                                        >
                                            ACEPTAR
                                        </button>
                                    </>
                                )}


                            </div>
                        </div>
                    </div>
                ))}


            </div>

            {showModalAceptado && selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex flex-col items-center justify-center p-4 border-b rounded-t">
                                <h1 className="uppercase text-center mb-4">Aceptando la justificacion</h1>
                                <h3 className="inline-block">
                                    <CheckCircleIcon sx={{ color: "#3F8116", fontSize: 40 }} />
                                </h3>
                            </div>

                            <div className="flex items-center p-6 border-t border-gray-200 rounded-b">
                                <button
                                    onClick={(e) => onClickAceptar(e, selectedItem.id, selectedItem.user_id)}
                                    className="text-white bg-cv-secondary hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Aceptar
                                </button>
                                <button
                                    onClick={onCloseModalAceptado}
                                    className="bg-amber-300 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-10"
                                >
                                    CERRAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalRechazado && selectedItem && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="relative max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex flex-col items-center justify-center p-4 border-b rounded-t">
                                <h1 className="uppercase text-center mb-4">Rechazando la justificacion</h1>
                                <h3 className="inline-block">
                                    <ReportProblemIcon sx={{ color: "#F3AE37", fontSize: 40 }} />
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                {messages && <p className='text-red-500'>{messages}</p>}
                                <p>Motivo</p>
                                <textarea
                                    value={reason_decline}
                                    onChange={(e) => setReason_decline(e.target.value)}
                                    className="bg-gray-300 p-2 rounded-md w-full placeholder:text-gray-400 placeholder:text-sm"
                                    placeholder="Describa el motivo del RECHAZO de la justificación"
                                ></textarea>
                            </div>
                            <div className="flex items-center p-6 border-t border-gray-200 rounded-b">
                                <button
                                    onClick={(e) => onClickRechazar(e, selectedItem.id, selectedItem.user_id)}
                                    className="text-white bg-cv-secondary hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    RECHAZAR
                                </button>
                                <button
                                    onClick={onCloseModalRechazo}
                                    className="bg-amber-300 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-10"
                                >
                                    CERRAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>


    );
};
