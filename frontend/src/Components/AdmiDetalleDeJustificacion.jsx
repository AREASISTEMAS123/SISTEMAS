import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from "moment";
import BalanceIcon from '@mui/icons-material/Balance';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import '../css/detalleJustificacionAdmi.css'
import { AES, enc } from 'crypto-js';
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
        const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
        const token = tokenD.toString(enc.Utf8)
        const response = await fetch(import.meta.env.VITE_API_URL + `/users/justifications/${id}`, {
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

    const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
    const token = tokenD.toString(enc.Utf8)

    fetch(import.meta.env.VITE_API_URL + `/users/justifications/${id}/accept/${userid}`, {
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
      // .then((data) => {

      //   // Maneja la respuesta exitosa si es necesario
      //   // Aquí puedes actualizar el estado en la interfaz de usuario si deseas reflejarlo de inmediato
      // })
      .catch((error) => {
        setMessage(error.message);
      });

    setShowModalAceptado(false);
    navigate(`/justificaciones`);
  };


  const onClickRechazar = (e, id, userid) => {
    e.preventDefault();
    const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
    const token = tokenD.toString(enc.Utf8)


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
      // .then((data) => {

      // })
      .catch((error) => {
        setMessage(error.message);
      });
    setShowModalRechazado(false);
    navigate(`/justificaciones`);
  };

  // const definiendo_rol = (role_id) => {
  //   if (role_id === 1) {
  //     return "Gerencia";
  //   } else if (role_id === 2) {
  //     return "Lider de nucleo";
  //   } else if (role_id === 3) {
  //     return "Colaborador";
  //   } else {
  //     return;
  //   }
  // }
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
      <div className="w-full flex flex-col md:flex-row items-center text-white relative">
        <nav className="flex" >
          <ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
            <li className="inline-flex items-center">
              <Link to="/justificaciones" className="inline-flex items-center text-base font-medium text-gray-400 hover:text-white">
                <BalanceIcon />
                <span className='ml-1 text-base font-medium md:ml-2'>Justificaciones</span>
              </Link>
            </li>
            <li >
              <div className="flex items-center text-gray-500 ">
                <ChevronRightIcon />
                <span className="ml-1 text-base font-medium md:ml-2">Detalle justificacion</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className=' rounded-lg mt-5'>

        {faltasList.map((item) => (
          <div key={item.user[0].id}>
            <div className='flex flex-col md:flex-row gap-6'>

              <div className='bg-cv-primary text-white  flex flex-col p-6 rounded-2xl md:w-1/2'>
                <h2 className='text-xl font-semibold text-center'>Justificación Nº {item.id}</h2>
                <div className='mt-6 bg-cv-primary text-white rounded'>
                  <div className='w-full flex flex-col md:flex-row md:space-x-12 items-center justify-between'>
                    <div className='w-full md:w-auto'>
                      <div className='text-sm font-medium'>
                        <label className='text-slate-400 text-base'>Tipo:</label>
                        <p className='capitalize text-lg'>{`${item.justification_type === 0 ? "Falta" : "Tardanza"}`}</p>
                      </div>
                    </div>
                    <div className='w-full md:w-auto '>
                      <div className='text-sm font-medium'>
                        <label className='text-slate-400 text-base'>Fecha:</label>
                        <p className='text-lg'>{moment(item.justification_date).format("DD/MM/YYYY")}</p>
                      </div>
                    </div>
                    <div className='w-full md:w-auto '>
                      <div className='text-sm font-medium'>
                        <label className='text-slate-400 text-base'>Estado:</label>
                        <p className='capitalize text-lg'>{isRechazadoOrAceptado(item)}</p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 text-sm font-medium'>
                    <label className='text-slate-400 text-base'>Motivo:</label>
                    <p>{item.reason}</p>
                  </div>
                </div>
              </div>

              <div className='bg-cv-primary text-white flex flex-col p-6 rounded-2xl md:w-1/2 '>
                <h2 className='text-xl font-semibold text-center'>Datos Usuario</h2>
                <div className='w-full mt-4'>
                  <div className='w-full text-start'>
                    <label className='font-medium text-slate-400 text-base'>Nombre:</label>
                    <p className='text-lg'>{item.user[0].name} {item.user[0].surname}</p>
                  </div>

                  <div className='flex flex-col md:flex-row justify-between border-black mt-4 space-y-2 md:space-y-0 md:space-x-4'>
                    <div className='text-start'>
                      <label className='font-medium text-slate-400 text-base'>DNI:</label>
                      <p className='text-lg'>{item.user[0].username}</p>
                    </div>
                    <div className='text-start'>
                      <label className='font-medium text-slate-400 text-base'>Teléfono:</label>
                      <p className='text-lg'>99999999</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="bg-cv-primary mt-6 rounded-2xl p-6">
              <div className="mx-auto ">
                <div className="font-semibold text-center text-white mb-6">
                  <p className='uppercase text-xl'>Evidencia</p>
                </div>

                <div className="flex items-center justify-center">
                  {item.evidence.endsWith('.jpg') || item.evidence.endsWith('.png') || item.evidence.endsWith('.jpeg') ? (
                    <img src={import.meta.env.VITE_BACKEND_SERVER_URL + `/archivos/${item.evidence}`} alt="Image" className="mx-auto" />
                  ) : item.evidence.endsWith('.pdf') ? (
                    <embed src={import.meta.env.VITE_BACKEND_SERVER_URL + `/archivos/${item.evidence}`} type="application/pdf" width="100%" height="600px" />
                  ) : (
                    <div>Unsupported file format</div>
                  )}
                </div>

                {item.decline === 0 && item.justification_status === 0 && (
                  <div className="flex items-center justify-center mt-8 rounded-b">
                    <button
                      className="border-2 hover:bg-cv-cyan hover:text-cv-primary font-medium rounded-lg text-sm px-8 py-2.5 text-center mx-2 md:mx-10 bt-rechazar"
                      onClick={(e) => onOpenModalRechazo(e, item)}
                    >
                      RECHAZAR
                    </button>

                    <button
                      className="bg-cv-cyan text-cv-primary hover:bg-cv-cyan/75 font-medium rounded-lg text-sm px-8 py-2.5 text-center"
                      onClick={(e) => onOpenModalAceptado(e, item)}
                    >
                      ACEPTAR
                    </button>
                  </div>
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
                <h1 className="uppercase text-center font-bold text-xl mb-4">Aceptando la justificación</h1>
                <h3 className="inline-block">
                  <CheckCircleIcon sx={{ color: "#3F8116", fontSize: 90 }} />
                </h3>
              </div>

              <div className="flex items-center justify-evenly p-4 border-t border-gray-200 rounded-b">

                <button
                  onClick={onCloseModalAceptado}
                  className=" uppercase border-2 border-cv-primary hover:bg-cv-primary hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300"
                >
                  CERRAR
                </button>
                <button
                  onClick={(e) => onClickAceptar(e, selectedItem.id, selectedItem.user_id)}
                  className="text-white uppercase  border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300"
                >
                  Aceptar
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
                <h1 className="uppercase text-center font-bold text-xl mb-4">Rechazando la justificación</h1>
              </div>
              <div className="w-full p-6 space-y-4">
                <div className='flex items-center justify-center'>
                  <ReportProblemIcon sx={{ color: "#F3AE37", fontSize: 90 }} />
                </div>
                {messages && <p className='text-red-500'>{messages}</p>}
                <p className='text-cv-primary text-base font-semibold'>Motivo</p>
                <textarea
                  value={reason_decline}
                  onChange={(e) => setReason_decline(e.target.value)}
                  className="bg-gray-300 outline-none border-2 border-cv-primary text-cv-primary p-2 rounded-md w-full placeholder:text-gray-400 placeholder:text-sm"
                  placeholder="Describa el motivo del RECHAZO de la justificación"
                ></textarea>
              </div>
              <div className="flex items-center justify-evenly p-4 border-t border-gray-200 rounded-b">

                <button
                  onClick={onCloseModalRechazo}
                  className="uppercase border-2 border-cv-primary hover:bg-cv-primary hover:text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300"
                >
                  CERRAR
                </button>
                <button
                  onClick={(e) => onClickRechazar(e, selectedItem.id, selectedItem.user_id)}
                  className="text-white uppercase border-2 border-cv-primary bg-cv-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center active:scale-95 ease-in-out duration-300"
                >
                  Rechazar
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>


  );
};
