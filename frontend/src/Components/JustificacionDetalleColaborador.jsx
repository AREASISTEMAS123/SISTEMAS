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
        <button className="text-gray-300 ml-auto" style={{ marginLeft: 'auto' }} onClick={OnClickRetroceder}>
          <KeyboardBackspaceIcon />
        </button>
      </div>
      <div className="rounded-lg p-3 mt-5">
        {faltasList.map((item) => (
          <div key={item.user[0].id} className="mb-6">
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-8">
              <div className="bg-cv-primary text-white flex flex-col p-4 rounded md:w-1/2">
                <h2 className="text-center text-white text-lg mb-5">JUSTIFICACIÓN Nº {item.id}</h2>
                <div className="mt-6 p-4 bg-cv-primary text-white rounded">
                  <div className="flex flex-col md:flex-row md:space-x-12 items-start">
                    <div className="w-full md:w-auto">
                      <div className="text-sm font-medium">
                        <label>Tipo</label>
                        <p className="capitalize">{`${item.justification_type === 0 ? "Falta" : "Tardanza"}`}</p>
                      </div>
                    </div>
                    <div className="w-full md:w-auto">
                      <div className="text-sm font-medium">
                        <label>Fecha</label>
                        <p>{moment(item.justification_date).format("DD/MM/YYYY")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label>Motivo</label>
                    <p>{item.reason}</p>
                  </div>
                </div>
              </div>
              <div className="bg-cv-primary text-white text-center flex flex-col p-6 rounded-md md:w-1/2">
                <h2 className="text-xl font-semibold">Información</h2>
                <div className="mt-6 p-4 bg-cv-primary text-white rounded">
                  <div className="flex flex-col md:flex-row md:space-x-12 items-start">
                    <div className="w-full md:w-auto">
                      <div className="text-sm font-medium">
                        <label>Estado</label>
                        <p className="capitalize">{isRechazadoOrAceptado(item)}</p>
                      </div>
                    </div>
                  </div>
                  {isRechazadoOrAceptado(item) === 'Rechazado' && (
                    <div className="flex flex-col md:flex-row justify-start  mt-4 pt-4 md:space-x-4">
                      <div className="w-full md:w-auto">
                        <label className="text-gray-300">MOTIVO</label>
                        <p className="text-left mt-2">{item.reason_decline}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-cv-primary text-white text-center mt-6">
              <h2>Evidencia</h2>
              <div className="flex items-center justify-center p-8">
                {item.evidence.endsWith('.jpg') || item.evidence.endsWith('.png') || item.evidence.endsWith('.jpeg') ? (
                  <img src={`http://localhost:8000/archivos/${item.evidence}`} alt="Image" />
                ) : item.evidence.endsWith('.pdf') ? (
                  <embed src={`http://localhost:8000/archivos/${item.evidence}`} type="application/pdf" width="100%" height="600px" />
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
