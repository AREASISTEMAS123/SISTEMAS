
import { useEffect, useState } from 'react';
import moment from 'moment';
import { Tabla } from "./Tabla";
import { DynamicSelect } from "./commons";
import CircularProgressBar from './commons/CircularProgressBar';

export const AsistenciaAdmin = () => {

  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DD');
    setSelectedDate(currentDate);
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const formatSelectedDate = (dateValue) => {
    if (!dateValue) return '';

    const date = moment(dateValue, 'YYYY-MM-DD').toDate();
    const formattedDate = moment(date).locale('es').format('LL');
    return formattedDate;
  };
console.log(selectedDate)

  const colaborador = [{ label: "Artuo Antonio Montejo Soto", value: "1" }];
  const departamento = [
    { label: "Estrategico", value: "estrategico" },
    { label: "Operaciones", value: "operaciones" },
    { label: "Recurso Humanos", value: "recurso_humanos" },
  ];
  const area = [
    { label: "Sistemas", value: "sistemas" },
    { label: "Diseño Grafico", value: "diseno_grafico" },
    { label: "Otra opción", value: "otra_opcion" },
  ];
  const turno = [
    { label: "Mañana", value: "manana" },
    { label: "Tarde", value: "tarde" },
  ];
  const months = [
    { label: "Enero", value: "enero" },
    { label: "Febrero", value: "febrero" },
    { label: "Marzo", value: "marzo" },
    { label: "Abril", value: "abril" },
    { label: "Mayo", value: "mayo" },
    { label: "Junio", value: "junio" },
    { label: "Julio", value: "julio" },
    { label: "Agosto", value: "agosto" },
    { label: "Septiembre", value: "septiembre" },
    { label: "Octubre", value: "octubre" },
    { label: "Noviembre", value: "noviembre" },
    { label: "Diciembre", value: "diciembre" },
  ];



  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-full mb-3">
          <h2 className="text-2xl text-white">Asistencia</h2>
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between space-y-3 md:space-x-5">
          <div className="w-full md:w-1/3 space-y-4 bg-cv-primary p-5 rounded-lg">
            <h2 className="text-white text-center text-xl uppercase font-semibold">Leyenda</h2>
            <div className="w-full flex items-center justify-between space-x-3">
              <h3 className="text-white uppercase font-normal">Asistencia</h3>
              <div className="w-5 h-5 rounded-full bg-[#24FF00]"></div>
            </div>
            <div className="w-full flex items-center justify-between space-x-3">
              <h3 className="text-white uppercase font-normal">Tardanza</h3>
              <div className="w-5 h-5 rounded-full bg-[#FAFF00]"></div>
            </div>
            <div className="w-full flex items-center justify-between space-x-3">
              <h3 className="text-white uppercase font-normal">Falta</h3>
              <div className="w-5 h-5 rounded-full bg-[#FF0000]"></div>
            </div>
            <div className="w-full flex items-center justify-between space-x-3">
              <h3 className="text-white uppercase font-normal">Justificado</h3>
              <div className="w-5 h-5 rounded-full bg-[#57F3FF]"></div>
            </div>
            <div className="w-full flex items-center justify-between space-x-3">
              <h3 className="text-white uppercase font-normal">Dia no Laborable</h3>
              <div className="w-5 h-5 rounded-full bg-[#9A9A9A]"></div>
            </div>
          </div>

          <div className="w-full">
            <div className="w-full bg-cv-primary rounded-lg">
              
              <div className="w-full flex items-center justify-between p-2 space-x-3">
                <h2 className="text-white text-center text-xl uppercase font-semibold">Fecha:</h2>
                <div className="w-full flex items-center justify-between relative">
                  <input type="date" defaultValue={selectedDate}
                    onChange={handleDateChange} className='date w-full p-1 outline-none font-semibold text-cv-primary bg-cv-primary rounded-lg' />
                  <p className="text-white bg-cv-primary text-center text-xl uppercase font-semibold absolute">{formatSelectedDate(selectedDate)}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-x-5">
              <div className="flex flex-col items-center justify-center">
                <h2 className="mb-4 text-lg font-bold uppercase text-white">Ingresos</h2>
                <CircularProgressBar progress={75} color={'#24FF00'} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="mb-4 text-lg font-bold uppercase text-white">Tardanzas</h2>
                <CircularProgressBar progress={20} color={'#FAFF00'} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <h2 className="mb-4 text-lg font-bold uppercase text-white">Faltas</h2>
                <CircularProgressBar progress={5} color={'#FF0000'} />
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="flex flex-col sm:flex-row space-x-4 mt-5">
        <div className="mb-4 sm:mb-0">
          <DynamicSelect options={colaborador} title={"Colaborador"} />
        </div>
        <div className="flex mb-4 sm:mb-0">
          <div>
            <DynamicSelect options={departamento} title={"Departamento"} />
          </div>
        </div>
        <div className="flex mb-4 sm:mb-0">
          <div>
            <DynamicSelect options={area} title={"Area"} />
          </div>
        </div>
        <div className="flex mb-4 sm:mb-0">
          <div>
            <DynamicSelect options={turno} title={"Turno"} />
          </div>
        </div>
        <div className="flex mb-4 sm:mb-0">
          <div>
            <DynamicSelect options={months} title={"Mes"} />
          </div>
        </div>
      </div>

      <Tabla />
    </div>
  );
};
