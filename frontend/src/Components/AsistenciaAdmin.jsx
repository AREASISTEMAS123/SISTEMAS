
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TablaAsistencias from './commons/TablaAsistencias'
import CircularProgressBar from './commons/CircularProgressBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import defaultImage from '/defaultImage.svg'

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

  const Token = localStorage.getItem("token");
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isInputReady, setIsInputReady] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  //Filters
  const [filterDate, setFilterDate] = useState(selectedDate || '')
  const [filterEmployee, setFilterEmployee] = useState('')
  const [filterDepartment, setfilterDepartment] = useState('')
  const [filterArea, setFilterArea] = useState('')
  const [filterShift, setFilterShift] = useState('')


  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DD');
    setSelectedDate(currentDate);
  }, []);

  useEffect(() => {
    setFilterDate(selectedDate || '');
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
    setSelectedDate(event.target.value);
  };

  const formatSelectedDate = (dateValue) => {
    if (!dateValue) return '';

    const date = moment(dateValue, 'YYYY-MM-DD').toDate();
    const formattedDate = moment(date).locale('es').format('LL');
    return formattedDate;
  };
  console.log(selectedDate)

  const openImageModal = () => {
    setShowImageModal(true)
  }
  const closeImageModal = () => {
    setShowImageModal(false)
  }

  const clearFilterEmployee = () => {
    setFilterEmployee("");

  }

  const clearFilterDepartment = () => {
    setfilterDepartment("");
  }

  const clearFilterArea = () => {
    setFilterArea("")
  }

  const clearFilterShift = () => {
    setFilterShift("");
  };

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


  //Listar Usuarios
  useEffect(() => {
    obtenerAsistencia();
  }, []);

  const obtenerAsistencia = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + `/attendance`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        });
      const data = await response.json();
      if (response.ok) {
        setAttendance(data.attendance);
      } else {
        console.error('Error al obtener los usuarios:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  const handleFilter = (value) => {
    setFilterEmployee(value);
  };

  return (
    <div className='h-screen bg-cv-secondary'>
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

        <div className="flex flex-col space-y-2">
          <div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0'>
            <div className="relative w-full">
              <input
                type="text"
                id=""
                value={filterEmployee}
                onChange={(e) => setFilterEmployee(e.target.value)}
                onFocus={() => setIsInputReady(true)}
                placeholder="Ingresa nombres y/o apellidos del colaborador"
                className="block w-full p-3 pr-10 text-sm border border-gray-300 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
              />
              <button onClick={clearFilterEmployee} className="absolute inset-y-0 right-0 flex items-center px-3 py-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                <CloseIcon />
              </button>
            </div>
            <button onClick={() => handleFilter(filterEmployee)} className='w-full sm:w-40 bg-cv-cyan rounded-lg py-3 px-8 text-cv-primary font-bold'>Buscar</button>
          </div>

          {isInputReady && (
            <div className="flex flex-col items-end space-y-4 md:flex-row md:space-y-0 md:space-x-4">
              <div className="w-full">
                <label
                  htmlFor="filterDepartment"
                  className="block mb-1 text-sm font-thin text-cv-cyan"
                >
                  Filtrar por Departamento
                </label>
                <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                  <select
                    id="filterDepartment"
                    value={filterDepartment} onChange={(e) => setfilterDepartment(e.target.value)}
                    className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                  >
                    <option>Selecciona</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Operativo">Operativo</option>
                  </select>
                  <button onClick={clearFilterDepartment} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                    <CloseIcon />
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="filterArea"
                  className="block mb-1 text-sm font-thin text-cv-cyan"
                >
                  Filtrar por Núcleo
                </label>
                <div className="flex items-center justify-between w-full rounded-md bg-slate-300">

                  <input
                    type="text"
                    id="filterNames"
                    value={filterArea}
                    onChange={(e) => setFilterArea(e.target.value)}
                    placeholder="Ingresa el nombre del núcleo"
                    className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                  />
                  <button onClick={clearFilterArea} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                    <CloseIcon />
                  </button>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="filterRole"
                  className="block mb-1 text-sm font-thin text-cv-cyan"
                >
                  Filtrar por Turno
                </label>
                <div className="flex items-center justify-between w-full rounded-md bg-slate-300">
                  <select
                    id="filterRole"
                    value={filterShift} onChange={(e) => setFilterShift(e.target.value)}
                    className="w-full p-2 text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-md placeholder-cv-primary font-semibold"
                  >
                    <option>Selecciona</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                  </select>
                  <button onClick={clearFilterShift} className="p-2 rounded-md text-cv-primary hover:bg-cv-cyan">
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>


        <TablaAsistencias data={attendance} openImageModal={openImageModal} setImageUrl={setImageUrl} filterDate={filterDate} filterEmployee={filterEmployee} filterDepartment={filterDepartment} filterArea={filterArea} filterShift={filterShift} />

        {showImageModal && (
          <div>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none p-2"
            >
              <div className="relative w-full my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">

                  <div className="flex items-center justify-center p-2.5 md:p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl md:text-3xl font-semibold">
                      Fotografías de asistencia
                    </h3>
                  </div>
                  <div className="relative p-3 md:p-6 flex-auto">
                    {imageUrl && (
                      <div className='flex flex-col md:flex-row items-center justify-between space-y-2 md:space-x-2 md:space-y-0'>
                        <div className='w-full flex flex-col items-center justify-center space-y-2 text-center'>
                          <h4 className='font-semibold text-lg'>Fotografía de Entrada</h4>
                          <img className='rounded-lg w-4/5 md:w-full border' src={imageUrl.admission_image ? import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.admission_image : defaultImage} alt="Fotografía de entrada" />
                        </div>
                        <div className='w-full flex flex-col items-center justify-center space-y-2 text-center'>
                          <h4 className='font-semibold text-lg'>Fotografía de Salida</h4>
                          <img className='rounded-lg w-4/5 md:w-full border' src={imageUrl.departure_image ? import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.departure_image : defaultImage} alt="Fotografía de salida" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase active:scale-95 ease-in-out duration-300"
                      type="button"
                      onClick={closeImageModal}
                    >Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        )}
        
      </div>
    </div>
  );
};
