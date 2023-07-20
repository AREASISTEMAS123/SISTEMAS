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
                const response = await fetch(`http://127.0.0.1:8000/api/justifications/details/${id}`, {
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
        <div>
            <div className="flex items-center mb-4">
                <h3 className="mr-2 text-gray-300">Justificaciones </h3>
                <button className='text-gray-300' style={{ marginLeft: 'auto' }} onClick={OnClickRetroceder} ><KeyboardBackspaceIcon></KeyboardBackspaceIcon></button>
            </div>
            <div className='border border-gray-300 rounded-lg p-3 mt-5'>
                {faltasList.map((item) => (
                    <div key={item.user[0].id}>
                        <h1 className='text-center text-white text-lg mb-5' >JUSTIFICACIÓN Nº {item.id}</h1>
                        <form className="space-y-6" >
                            <div>
                                <label className='text-gray-300' >Estado :</label>
                                <div className='text-white'>
                                   <p>{isRechazadoOrAceptado(item)}</p>
                                </div>
                            </div>
                            <div>
                                <label className='text-gray-300' >{isRechazadoOrAceptado(item)==='Rechazado' ? 'MOTIVO' :null}</label>
                                <p className='text-white'>{ item.reason_decline}</p>
                            </div>
                            <h1 className='text-center text-white text-lg mb-5' >DATOS DE JUSTIFICACIÓN</h1>
                            <div className="flex items-center mb-4">
                                <h3 className="mr-2 text-gray-300">NOMBRE COMPLETO: <span className='text-white'>{item.user[0].name.toUpperCase()} {item.user[0].surname.toUpperCase()}</span> </h3>
                                <label className='text-gray-300' style={{ marginLeft: 'auto' }} >DNI:</label>
                                <h1 className='text-white'>{item.user[0].username}</h1>
                            </div>
                            <div className="flex items-center mb-4">
                                <label className='text-gray-300'>JUSTIFICACIÓN DE: <span className='text-white'>{item.justification_type === 0 ? "Falta".toUpperCase() : "Tardanza".toUpperCase()}</span></label>
                            </div>
                            <div>
                                <p className='text-gray-300'  >FECHA:  </p>
                                <p className='text-white'>{moment(item.justification_date).format("DD/MM/YYYY")}</p>
                            </div>
                            <div>
                                <label className='text-gray-300' >MOTIVO :</label>
                                <p className='text-white'>{item.reason}</p>
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
