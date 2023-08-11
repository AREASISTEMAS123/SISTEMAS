
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TablaAsistencias from './commons/TablaAsistencias'
import CircularProgressBar from './commons/CircularProgressBar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
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
  // const [attendanceReport, setAttendanceReport] = useState([]);
  const attendanceReport = useState([])[0];
  const [ShowReport, setShowReport] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isInputReady, setIsInputReady] = useState(false);

  const [showImageModal, setShowImageModal] = useState(false)
  const [imageUrl, setImageUrl] = useState(null)

  //Filters
  const [filterDate, setFilterDate] = useState(selectedDate || '')
  const [filterEmployee, setFilterEmployee] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('')
  const [filterArea, setFilterArea] = useState('')
  const [filterShift, setFilterShift] = useState('')

  //Porcentaje de Asistencias
  const [percentageAttendance, setPercentageAttendance] = useState(0)
  const [percentageDelay, setPercentageDelay] = useState(0)
  const [percentageAbsences, setPercentageAbsences] = useState(0)
  const [percentageJustifications, setPercentageJustifications] = useState(0)


  useEffect(() => {
    const currentDate = moment().format('YYYY-MM-DD');
    setSelectedDate(currentDate);
  }, []);

  useEffect(() => {
    obtenerAsistencia();
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
    setFilterDepartment("");
  }

  const clearFilterArea = () => {
    setFilterArea("")
  }

  const clearFilterShift = () => {
    setFilterShift("");
  };

  // const reporteAsistencia = async () => {
  //   try {
  //     const response = await fetch(import.meta.env.VITE_API_URL + `/attendance/report`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${Token}`,
  //         },
  //       });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setAttendanceReport(data);
  //     } else {
  //       console.error('Error al obtener el reporte:', data.error);
  //     }
  //   } catch (error) {
  //     console.error('Error al obtener el reporte:', error);
  //   }
  // };

  //Reporte asistencia
  // const handleClick = () => {
  //   reporteAsistencia();
  // };


  // Función crear reporte a la 1:00 pm automáticamente
  // useEffect(() => {
  //   const targetTime = new Date();
  //   targetTime.setHours(13, 1, 0, 0);

  //   const currentTime = new Date();
  //   const timeDifference = targetTime.getTime() - currentTime.getTime();

  //   if (timeDifference > 0) {
  //     setTimeout(() => {
  //       reporteAsistencia();
  //     }, timeDifference);
  //   }
  // }, []);


  useEffect(() => {
    if (attendanceReport.attendance && attendanceReport.total) {
      setPercentageAttendance((attendanceReport.attendance / attendanceReport.total) * 100);
    }

    if (attendanceReport.delays && attendanceReport.total) {
      setPercentageDelay((attendanceReport.delays / attendanceReport.total) * 100);
    }

    if (attendanceReport.absences && attendanceReport.total) {
      setPercentageAbsences((attendanceReport.absences / attendanceReport.total) * 100);
    }

    if (attendanceReport.justifications && attendanceReport.total) {
      setPercentageJustifications((attendanceReport.justifications / attendanceReport.total) * 100);
    }
  }, [attendanceReport]);

  // Mostrar estadísticas de los progressbar
  // ASISTENCIAS
  const filtered = ShowReport.filter(report => report.date === selectedDate);
  useEffect(() => {
    if (filtered.length > 0) {
      const attendanceSum = filtered.reduce((sum, report) => sum + report.attendances, 0);
      const totalSum = filtered.reduce((sum, report) => sum + report.total, 0);
      const percentage = totalSum !== 0 ? (attendanceSum / totalSum) * 100 : 0;
      setPercentageAttendance(isNaN(percentage) ? 0 : percentage);
    } else {
      setPercentageAttendance(0);
    }
  }, [filtered]);

  // TARDANZAS
  useEffect(() => {
    if (filtered.length > 0) {
      const delaysSum = filtered.reduce((sum, report) => sum + report.delays, 0);
      const totalSum = filtered.reduce((sum, report) => sum + report.total, 0);
      const percentage = totalSum !== 0 ? (delaysSum / totalSum) * 100 : 0;
      setPercentageDelay(isNaN(percentage) ? 0 : percentage);
    } else {
      setPercentageDelay(0);
    }
  }, [filtered]);

  // FALTAS
  useEffect(() => {
    if (filtered.length > 0) {
      const absencesSum = filtered.reduce((sum, report) => sum + report.absences, 0);
      const totalSum = filtered.reduce((sum, report) => sum + report.total, 0);
      const percentage = totalSum !== 0 ? (absencesSum / totalSum) * 100 : 0;
      setPercentageAbsences(isNaN(percentage) ? 0 : percentage);
    } else {
      setPercentageAbsences(0);
    }
  }, [filtered]);

  // JUSTIFICACIONES
  useEffect(() => {
    if (filtered.length > 0) {
      const justificationsSum = filtered.reduce((sum, report) => sum + report.justifications, 0);
      const totalSum = filtered.reduce((sum, report) => sum + report.total, 0);
      const percentage = totalSum !== 0 ? (justificationsSum / totalSum) * 100 : 0;
      setPercentageJustifications(isNaN(percentage) ? 0 : percentage);
    } else {
      setPercentageJustifications(0);
    }
  }, [filtered]);

  // Circular Progressbar
  const items = [
    { title: 'Asistencias', progress: percentageAttendance, color: '#24FF00' },
    { title: 'Tardanzas', progress: percentageDelay, color: '#FAFF00' },
    { title: 'Faltas', progress: percentageAbsences, color: '#FF0000' },
    { title: 'Justificaciones', progress: percentageJustifications, color: '#57F3FF' },
  ];

  // Slide Circular Progressbar
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleNextItem = () => {
    setCurrentItemIndex((prevIndex) => (prevIndex + 1) % items.length);
  };
  //onBlur = {() => setIsInputReady(false)}


  //Listar Usuarios

  const obtenerAsistencia = async () => {
    try {
      const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
    const token = tokenD.toString(enc.Utf8)
      const response = await fetch(import.meta.env.VITE_API_URL + `/attendance`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = await response.json();
      if (response.ok) {
        setShowReport(data.reports);
        setAttendance(data.attendance);
      } else {
        console.error('Error al obtener las asistencias:', data.error);
      }
    } catch (error) {
      console.error('Error al obtener las asistencias:', error);
    }
  };

  // Mostrar botón de marcar asistencia
  // const [showButton, setShowButton] = useState(false);

  // useEffect(() => {
  //   const currentTime = new Date();
  //   const targetTimeStart = new Date();
  //   targetTimeStart.setHours(13, 1, 0, 0);
  //   const targetTimeEnd = new Date();
  //   targetTimeEnd.setHours(13, 30, 0, 0);

  //   if (currentTime >= targetTimeStart && currentTime <= targetTimeEnd) {
  //     setShowButton(true);
  //   } else {
  //     setShowButton(false);
  //   }
  // }, []);

  return (
    <div className='h-full bg-cv-secondary'>
      <div className="space-y-3">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-full flex flex-col md:flex-row justify-between items-center mb-3">
            <Link to="/asistencia" className='w-full md:w-1/3 text-center bg-cv-cyan rounded-lg py-3 px-6 text-cv-primary font-bold uppercase whitespace-nowrap'>Marcar Asistencia</Link>
            {/* <div className='w-full'>
              <h2 className="text-2xl text-center text-white">Administrar asistencias</h2>
            </div> */}
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between gap-3">
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

            <div className="w-full md:w-4/6 space-y-3">
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
            {/* {showButton && (
            <button onClick={handleClick} className='w-full sm:w-64 bg-cv-cyan rounded-lg py-3 px-8 text-cv-primary font-bold whitespace-nowrap'>Generar Reporte</button>
            )} */}
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
                    value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}
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
                  {imageUrl && (
                    <div>
                      <div className='text-center text-cv-primary uppercase'>
                        {imageUrl.attendance === 1 && (
                          <p className='space-x-2 text-lg font-bold bg-[#24FF00] p-2'>
                            <span>{imageUrl.user.name.split(" ")[0] + ' '+ imageUrl.user.surname.split(" ")[0]}</span>
                            <span>Asistió</span>
                          </p>
                        )}
                        {imageUrl.delay === 1 && imageUrl.justification === 1 ? (
                          <p className='space-x-2 text-lg font-bold bg-[#57F3FF] p-2'>
                            <span>{imageUrl.user.name.split(" ")[0] + ' '+ imageUrl.user.surname.split(" ")[0]}</span>
                            <span>Justifico por Tardanza</span>
                          </p>
                        ) : imageUrl.delay === 1 && (
                          <p className='space-x-2 text-lg font-bold bg-[#FAFF00] p-2'>
                              <span>{imageUrl.user.name.split(" ")[0] + ' '+ imageUrl.user.surname.split(" ")[0]}</span>
                            <span>Ingreso Tarde</span>
                          </p>
                        )}
                        {imageUrl.absence === 1 && imageUrl.justification === 1 ? (
                          <p className='space-x-2 text-lg font-bold bg-[#57F3FF] p-2'>
                            <span>{imageUrl.user.name.split(" ")[0] + ' '+ imageUrl.user.surname.split(" ")[0]}</span>
                            <span>Justifico por Falta</span>
                          </p>
                        ) : imageUrl.absence === 1 && (
                          <p className='space-x-2 text-lg font-bold text-white bg-[#FF0000] p-2'>
                              <span>{imageUrl.user.name.split(" ")[0] + ' '+ imageUrl.user.surname.split(" ")[0]}</span>
                            <span>Falto</span>
                          </p>
                        )}
                      </div>
                      <div className="relative p-3 md:p-6 flex-auto">
                        <div className='flex flex-col md:flex-row items-center justify-between space-y-2 md:space-x-2 md:space-y-0'>
                          <div className='w-full flex flex-col items-center justify-center space-y-2 text-center'>
                            <h4 className='font-semibold text-lg'>Fotografía de Entrada</h4>
                            {imageUrl.admission_image ? (
                              <img className='rounded-lg w-4/5 md:w-full border' src={import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.admission_image} alt="Fotografía de entrada" />
                            ) : (
                              <div className='rounded-lg w-4/5 md:w-full border'>
                                <DefaultImage />
                              </div>
                            )}
                            {/* <img className='rounded-lg w-4/5 md:w-full border' src={imageUrl.admission_image ? import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.admission_image : defaultImage} alt="Fotografía de entrada" /> */}
                            {(imageUrl.attendance === 1 || imageUrl.delay === 1) && (
                              <p className='text-lg font-semibold text-cv-primary space-x-3'>
                                <span>Hora de Entrada:</span>
                                <span>{imageUrl.admission_time ? imageUrl.admission_time : 'No registrada'}</span>
                              </p>
                            )}
                          </div>
                          <div className='w-full flex flex-col items-center justify-center space-y-2 text-center'>
                            <h4 className='font-semibold text-lg'>Fotografía de Salida</h4>
                            {imageUrl.departure_image ? (
                              <img className='rounded-lg w-4/5 md:w-full border' src={import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.departure_image} alt="Fotografía de salida" /> 
                            ) : (
                              <div className='rounded-lg w-4/5 md:w-full border'>
                                <DefaultImage />
                              </div>
                            )}
                            {/* <img className='rounded-lg w-4/5 md:w-full border' src={imageUrl.departure_image ? import.meta.env.VITE_BACKEND_SERVER_URL + '/' + imageUrl.departure_image : defaultImage} alt="Fotografía de salida" /> */}
                            {(imageUrl.attendance === 1 || imageUrl.delay === 1) && (
                              <p className='text-lg font-semibold text-cv-primary space-x-3'>
                                <span>Hora de Salida:</span>
                                <span>{imageUrl.departure_time ? imageUrl.departure_time : 'No registrada'}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
    </div >
  );
};


export const DefaultImage = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="350"
      height="263"
      viewBox="0 0 350 263"
    >
      <g>
        <path fill="#FFF" d="M0 0H350V263H0z"></path>
        <path
          fill="gray"
          d="M94.23 251.262c-9.777-1.176-17.64-7.864-20.808-17.7-1.07-3.316-1.184-4.703-1.11-13.476.094-11.656.922-16.395 3.922-22.465 1.5-3.039 3.063-5.176 5.536-7.578 6.765-6.578 12.109-9.555 32.851-18.297 7.379-3.105 18.05-7.89 23.715-10.625 11.496-5.55 12.437-6.34 13.824-11.582 1.442-5.457 1.434-5.476-4.715-11.492-8.742-8.55-14.363-18.297-17.511-30.36-.407-1.55-.938-2.32-1.774-2.57-3.504-1.047-7.433-5.793-9.058-10.933-1.227-3.875-1.293-9.914-.145-13.23.945-2.731 4.39-6.196 6.164-6.196 1.02 0 1.07-.188.668-2.508-.727-4.195-.375-17.41.61-22.86 1.015-5.632 2.863-11.445 4.882-15.37 5.555-10.797 28.781-22.754 44.207-22.754 15.91 0 38.535 12.078 44.528 23.77 3.87 7.55 5.722 18.554 5.273 31.331-.277 7.844-.234 8.371.711 8.668 1.535.48 4.547 4.223 5.246 6.52.992 3.261.766 9.195-.488 12.863-1.805 5.277-5.465 9.66-8.938 10.7-.84.25-1.367 1.015-1.765 2.57-.989 3.863-3.282 10.03-4.95 13.312-3.972 7.813-11.43 17.188-16.234 20.41-1.547 1.035-1.875 1.586-1.879 3.13-.004 2.937 1.524 7.956 3 9.87 1.617 2.086 17.074 9.727 33.485 16.55 21.386 8.9 28.308 12.696 34.777 19.09 2.36 2.333 4.027 4.634 5.488 7.579 3.028 6.098 3.899 11.156 3.957 22.988.043 9.266-.027 9.969-1.347 13.528-3.688 9.94-10.653 15.742-20.508 17.082-4.805.652-156.211.687-161.614.035zm0 0"
        ></path>
      </g>
    </svg>
  )
}
