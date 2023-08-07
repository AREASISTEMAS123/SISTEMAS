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
        const response = await fetch(import.meta.env.VITE_API_URL +`/users/justifications/${id}`, {
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

    fetch(import.meta.env.VITE_API_URL +`/users/justifications/${id}/accept/${userid}`, {
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


    if (!reason_decline) {
      setMessage('Por favor, proporciona un motivo de rechazo');
      return;
    }


    fetch(import.meta.env.VITE_API_URL + `/users/justifications/${id}/decline/${userid}`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
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
        <h3 className="mr-2 text-gray-300 text-2xl">JUSTIFICACIONES </h3>
        <button className='text-gray-300' style={{ marginLeft: 'auto' }} onClick={OnClickRetroceder} ><KeyboardBackspaceIcon></KeyboardBackspaceIcon></button>
      </div>
      <div className=' rounded-lg p-3 mt-5'>

        {faltasList.map((item) => (
          <div key={item.user[0].id}>
            <div className='flex flex-col md:flex-row  space-x-0 md:space-x-8'>
              <div className='bg-cv-primary text-white  flex flex-col p-4 rounded md:w-1/2'>
                <h2 className='text-xl font-semibold text-center'>Justificación Nº {item.id}</h2>
                <div className='mt-6 p-4 bg-cv-primary text-white rounded'>
                  <div className='flex flex-col md:flex-row md:space-x-12 items-start'>
                    <div className='w-full md:w-auto'>
                      <div className='text-sm font-medium'>
                        <label>Tipo</label>
                        <p className='capitalize'>{`${item.justification_type === 0 ? "Falta" : "Tardanza"}`}</p>
                      </div>
                    </div>
                    <div className='w-full md:w-auto '>
                      <div className='text-sm font-medium'>
                        <label>Fecha</label>
                        <p>{moment(item.justification_date).format("DD/MM/YYYY")}</p>
                      </div>
                    </div>
                    <div className='w-full md:w-auto '>
                      <div className='text-sm font-medium'>
                        <label>Estado</label>
                        <p className='capitalize'>{isRechazadoOrAceptado(item)}</p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-4'>
                    <label className='text-sm font-medium'>Motivo</label>
                    <p>{item.reason}</p>
                  </div>
                </div>
              </div>

              <div className='bg-cv-primary text-white text-center flex flex-col p-6 rounded-md md:w-1/2 '>
                <h2 className='text-xl font-semibold'>Datos Usuario</h2>
                <div className='mt-4'>
                  <label className='text-sm font-medium'>Nombre</label>
                  <p className='text-lg'>{item.user[0].name} {item.user[0].surname}</p>

                  <div className='flex flex-col md:flex-row justify-between border-black mt-2 space-y-2 md:space-y-0 md:space-x-4'>
                    <div>
                      <label className='text-sm font-medium'>DNI</label>
                      <p className='text-lg'>{item.user[0].username}</p>
                    </div>
                    <div>
                      <label className='text-sm font-medium'>Teléfono</label>
                      <p className='text-lg'>99999999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="bg-cv-primary mt-3 rounded-md">
              <div className="mx-auto ">
                <div className="font-semibold text-white p-4">
                  <label>Evidencia:</label>
                </div>

                <div className="flex items-center justify-center p-8">
                  {item.evidence.endsWith('.jpg') || item.evidence.endsWith('.png') || item.evidence.endsWith('.jpeg') ? (
                    <img src={import.meta.env.VITE_BACKEND_SERVER_URL +`/archivos/${item.evidence}`} alt="Image" className="mx-auto" />
                  ) : item.evidence.endsWith('.pdf') ? (
                      <embed src={import.meta.env.VITE_BACKEND_SERVER_URL +`/archivos/${item.evidence}`} type="application/pdf" width="100%" height="600px" />
                  ) : (
                    <div>Unsupported file format</div>
                  )}
                </div>

                <div className="flex items-center justify-center p-6 rounded-b">
                  {item.decline === 0 && item.justification_status === 0 && (
                    <>
                      <button
                        className="border-2 hover:bg-slate-500 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2 md:mx-10 bt-rechazar"
                        onClick={(e) => onOpenModalRechazo(e, item)}
                      >
                        RECHAZAR
                      </button>

                      <button
                        className="bt-aceptar hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={(e) => onOpenModalAceptado(e, item)}
                      >
                        ACEPTAR
                      </button>
                    </>
                  )}
                </div>
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
