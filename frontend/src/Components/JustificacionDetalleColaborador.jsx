import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const JustificacionDetalleColaborador = () => {
    const { id, userid } = useParams();
    const [faltasList, setFaltasList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = `Bearer ${localStorage.getItem('token')}`;
                const response = await fetch(import.meta.env.VITE_API_URL + `/justifications/details/${id}`, {
                    headers: {
                        Authorization: token
                    }
                });
                const data = await response.json();
                setFaltasList(data);
                console.log(data)
            } catch (error) {
                console.error('Error al obtener los datos de la API:', error);
            }
        };
        fetchData();
    }, [id, userid]);
    const OnClickRetroceder = () => {
        navigate(`/justificacion`);
    }
    const navigate = useNavigate();

    const isRechazadoOrAceptado = (prop) => {
        if (prop.decline === 1) {
            return 'Rechazado';
        } else if (prop.justification_status === 0 && prop.decline === 0) {
            return 'En proceso';
        } else {
            return 'Aceptado';
        }
    }
    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex items-center mb-4">
                <h3 className="mr-2 text-gray-300">Justificaciones </h3>
                <button className='text-gray-300 ml-auto' style={{ marginLeft: 'auto' }} onClick={OnClickRetroceder} >
                    <KeyboardBackspaceIcon></KeyboardBackspaceIcon>
                </button>
            </div>
            <div className='border border-gray-300 rounded-lg p-3 mt-5'>
                {faltasList.map((item) => (
                    <div key={item.user[0].id} className="justify-item-center">
                        <h1 className='text-center text-white text-lg mb-5' >JUSTIFICACIÓN Nº {item.id}</h1>
                        <form className="md:w-full lg:w-2/3 xl:w-1/2 mx-auto" >
                            <div className='flex  flex-wrap '>
                                <div className='flex flex-col w-full md:w-1/2'>
                                    <label className='font-semibold	 mr-2 text-gray-300' >Estado :</label>
                                    <input
                                        disabled
                                        className=' text-center bg-input my-2'
                                        value={isRechazadoOrAceptado(item)}
                                    ></input>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 ">
                                <label className='text-gray-300' >{isRechazadoOrAceptado(item) === 'Rechazado' ? 'MOTIVO' : null}</label>
                                <p className=' text-center bg-input my-2'>{item.reason_decline}</p>
                            </div>
                            <h1 className='text-center text-white text-lg my-5' >DATOS DE JUSTIFICACIÓN</h1>
                            <div className='flex  flex-wrap w-full"'>
                                <div className='  flex flex-col'>
                                    <label className="font-semibold	 mr-2 text-gray-300"> JUSTIFICACIÓN DE: </label>
                                    <input
                                        type="text"
                                        className="  text-center bg-input my-2"
                                        value={`${item.justification_type === 0 ? "Falta" : "Tardanza"}`.toUpperCase()}
                                        disabled
                                    />
                                </div>
                                <div className='ml-auto   flex flex-col'>
                                    <label className="font-semibold	 mr-2 text-gray-300">FECHA </label>
                                    <input
                                        type="text"
                                        className="  text-center bg-input my-2 "
                                        value={moment(item.justification_date).format("DD/MM/YYYY")}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className=' ml-auto flex flex-col'>
                                <label className='font-semibold  text-gray-300' >Motivo </label>
                                <textarea className=' w-full  bg-input Overflow-hidden text-center my-2 p-2 '
                                    disabled
                                    value={item.reason}
                                    rows={Math.max(2, Math.ceil(item.reason.length / 50))}
                                   
                                ></textarea>
                                
                            </div>
                            <div>
                                <label className='text-gray-300'>EVIDENCIA:</label>
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

                        </form>
                    </div>
                ))}
            </div>
        </div>

    )
}
