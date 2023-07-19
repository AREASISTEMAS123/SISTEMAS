
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TablaAsistencias from './commons/TablaAsistencias'
import { DynamicSelect } from "./commons";
import CircularProgressBar from './commons/CircularProgressBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CloseIcon from '@mui/icons-material/Close';
const ProgressBar = ({ title, progress, color }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h2 className="mb-4 text-lg font-bold uppercase text-white">{title}</h2>
      <CircularProgressBar progress={progress} color={color} />
    </div>
  );
};
ProgressBar.propTypes = {
  title: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};


export const AsistenciaAdmin = () => {

  const [selectedDate, setSelectedDate] = useState('');
  const [isInputReady, setIsInputReady] = useState(false);


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


  const departamento = [
    { label: "Estrategico", value: "Estratégico" },
    { label: "Operaciones", value: "operaciones" },
    { label: "Recurso Humanos", value: "Recurso Humanos" },
  ];
  const area = [
    { label: "Sistemas", value: "sistemas" },
    { label: "Diseño Grafico", value: "Diseño Gráfico" },
    { label: "Otra opción", value: "otra_opcion" },
  ];
  const turno = [
    { label: "Mañana", value: "manana" },
    { label: "Tarde", value: "tarde" },
  ];


  const data = ['Operativo', 'Sistemas', 'Mañana', 'Cristian Vasquez', 1];

  const items = [
    { title: 'Ingresos', progress: 75, color: '#24FF00' },
    { title: 'Tardanzas', progress: 20, color: '#FAFF00' },
    { title: 'Faltas', progress: 5, color: '#FF0000' },
  ];

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  };
  //onBlur = {() => setIsInputReady(false)}
  return (
    <div className="max-w-screen-lg mx-auto space-y-3">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="w-full mb-3">
          <h2 className="text-2xl text-white">Asistencia</h2>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between space-y-3 md:space-x-5 md:space-y-0">
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

          <div className="w-full space-y-3">
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
            <div className="flex w-full px-5 overflow-x-auto items-end justify-center md:space-x-5">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={`w-full flex flex-col items-center justify-center ${index !== currentItemIndex ? 'hidden md:flex' : ''
                    }`}
                >
                  <ProgressBar {...item} />
                </div>
              ))}
              <button
                className="block md:hidden w-12 h-12 p-2 rounded-full bg-cv-primary text-cv-cyan"
                onClick={handleNextItem}
              >
                <div className='flex items-end justify-center '>
                <ArrowForwardIosIcon sx={{ fontSize: 24 }} />
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col">
        <div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0'>
          <div className="relative w-full">
            <input
              type="text"
              id=""
              value=""
              onChange=""
              onFocus={() => setIsInputReady(true)}
              placeholder="Ingresa nombres y/o apellidos del colaborador"
              className="block w-full p-3 pr-10 text-sm border border-gray-300 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
            />
            <button onClick="" className="absolute inset-y-0 right-0 flex items-center px-3 py-2 rounded-md text-cv-primary hover:bg-cv-cyan">
              <CloseIcon />
            </button>
          </div>
          <button onClick="" className='w-full sm:w-40 bg-cv-cyan rounded-lg py-3 px-8 text-cv-primary font-bold'>Buscar</button>
        </div>


        {isInputReady && (
          <div className='w-full flex flex-col md:flex-row items-center justify-between space-y-3 sm:space-x-3 sm:space-y-0'>
            <div className="w-full">
              <DynamicSelect options={departamento} title={"Departamento"} />
            </div>
            <div className="w-full">
              <DynamicSelect options={area} title={"Area"} />
            </div>
            <div className="w-full">
              <DynamicSelect options={turno} title={"Turno"} />
            </div>
          </div>
        )}
      </div>
        

      <TablaAsistencias data={data} />
    </div>
  );
};
