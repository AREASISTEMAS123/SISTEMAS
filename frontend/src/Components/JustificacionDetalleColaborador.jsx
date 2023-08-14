import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
import moment from "moment";
import BalanceIcon from '@mui/icons-material/Balance';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AES, enc } from 'crypto-js';

export const JustificacionDetalleColaborador = () => {
  const { id, userid } = useParams();
  const [faltasList, setFaltasList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
        const token = tokenD.toString(enc.Utf8)
        const response = await fetch(import.meta.env.VITE_API_URL + `/justifications/details/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <div className="rounded-lg mt-5">
        {faltasList.map((item) => (
          <div key={item.user[0].id} className="mb-6">
            <div className="flex flex-col md:flex-row gap-6">

              <div className="bg-cv-primary text-white flex flex-col p-6 rounded-2xl md:w-1/2 ">
                <h2 className="text-xl font-semibold text-center">JUSTIFICACIÓN Nº {item.id}</h2>
                <div className="mt-6 bg-cv-primary text-white rounded">
                  <div className="w-full flex flex-col md:flex-row md:space-x-12 items-center justify-between">
                    <div className="w-full md:w-auto">
                      <div className="text-sm font-medium">
                        <label className='text-slate-400 text-base'>Tipo:</label>
                        <p className='capitalize text-lg'>{`${item.justification_type === 0 ? "Falta" : "Tardanza"}`}</p>
                      </div>
                    </div>
                    <div className="w-full md:w-auto">
                      <div className="text-sm font-medium">
                        <label className='text-slate-400 text-base'>Fecha:</label>
                        <p className='text-lg'>{moment(item.justification_date).format("DD/MM/YYYY")}</p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 text-sm font-medium'>
                    <label className='text-slate-400 text-base'>Motivo:</label>
                    <p>{item.reason}</p>
                  </div>
                </div>
              </div>

              <div className="bg-cv-primary text-white flex flex-col p-6 rounded-2xl md:w-1/2">
                <h2 className="text-xl font-semibold text-center">Información</h2>
                <div className="mt-6 space-y-4 bg-cv-primary text-white rounded">
                  <div className="w-full md:w-auto">
                    <div className="text-sm font-medium">
                      <label className='font-medium text-slate-400 text-base'>Estado:</label>
                      <p className="capitalize text-lg">{isRechazadoOrAceptado(item)}</p>
                    </div>
                  </div>
                  {isRechazadoOrAceptado(item) === 'Rechazado' && (
                    <div className="w-full md:w-auto">
                      <label className='font-medium text-slate-400 text-base'>Motivo:</label>
                      <p className="text-left mt-2">{item.reason_decline}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-cv-primary mt-3 rounded-2xl p-8">
              <div className="font-semibold text-center text-white mb-8">
                <p className='uppercase text-xl'>Evidencia</p>
              </div>
              <div className="flex items-center justify-center">
                {item.evidence.endsWith('.jpg') || item.evidence.endsWith('.png') || item.evidence.endsWith('.jpeg') ? (
                  <img src={import.meta.env.VITE_BACKEND_SERVER_URL + `/archivos/${item.evidence}`} alt="Image" />
                ) : item.evidence.endsWith('.pdf') ? (
                  <embed src={import.meta.env.VITE_BACKEND_SERVER_URL + `/archivos/${item.evidence}`} type="application/pdf" width="100%" height="600px" />
                ) : (
                  <div>Unsupported file format</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


  )
}
