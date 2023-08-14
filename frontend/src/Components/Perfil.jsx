import { useState, useEffect } from "react";
import moment from "moment";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AES, enc } from "crypto-js";

export const Perfil = () => {
  const [colaborador, setColaborador] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
        const token = tokenD.toString(enc.Utf8)
        const response = await fetch(import.meta.env.VITE_API_URL + "/profile", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setColaborador(data);
          setIsChecked(data?.Usuario[0]?.user[0]?.status === 1);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      {colaborador && colaborador.Usuario && colaborador.Usuario[0] && (

        <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-8 gap-4 text-white">
          <div className="col-span-1 md:col-span-3 row-span-5 bg-cv-primary rounded-2xl p-5 order-2 md:order-1">
            <h2 className='text-xl mb-5 font-semibold text-center uppercase'>Datos Personales</h2>
            <div className='space-y-5'>
              <div className='w-full'>
                <span className="text-sm text-gray-400">Nombres completos:</span>
                <p className='text-base md:text-xl font-semibold leading-tight'>{colaborador.Usuario[0].user[0].name} {colaborador.Usuario[0].user[0].surname}</p>
              </div>
              <div className='w-full flex items-center justify-center gap-5'>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">DNI:</span>
                  <p className='text-base md:text-xl font-semibold leading-tight'>
                    {colaborador.Usuario && colaborador.Usuario[0].dni}
                  </p>
                </div>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Fecha de nacimiento:</span>
                  <p className='text-base md:text-xl font-semibold leading-tight'>
                    {colaborador.Usuario && moment(colaborador.Usuario[0].birthday).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Teléfono:</span>
                  <p className='text-base md:text-xl font-semibold leading-tight'>
                    {colaborador.Usuario[0].cellphone}
                  </p>
                </div>
              </div>
              <div className='w-full'>
                <span className="text-sm text-gray-400">Correo electrónico</span>
                <p className='text-base md:text-xl font-semibold leading-tight'>
                  {colaborador.Usuario[0].user[0].email}
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 row-span-5 md:col-start-4 bg-cv-primary rounded-2xl p-5 order-1 md:order-2">
            <div className='w-full h-full flex items-center justify-center'>
              <img src={colaborador.avatar} alt="" className='w-60 h-60 flex items-center justify-center rounded-full ring ring-cv-cyan object-cover bg-cv-primary' />
            </div>
          </div>
          <div className="col-span-1 md:col-span-3 row-span-3 md:row-start-6  bg-cv-primary rounded-2xl p-5 order-3 md:order-3">
            <h2 className='text-xl mb-5 font-semibold text-center uppercase'>Datos de la empresa</h2>
            <div className='space-y-5'>

              <div className='w-full flex items-center justify-center gap-5'>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Departamento:</span>
                  <p className='text-base md:text-lg font-semibold leading-tight'>
                    {colaborador.Usuario && colaborador.Usuario[0].department}
                  </p>
                </div>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Núcleo:</span>
                  <p className='text-base md:text-lg font-semibold leading-tight'>
                    {colaborador.Usuario && colaborador.Usuario[0].area}
                  </p>
                </div>
              </div>
              <div className='w-full flex items-center justify-center gap-5'>

                <div className='w-full'>
                  <span className="text-sm text-gray-400">Perfil:</span>
                  <p className='text-base md:text-lg font-semibold leading-tight'>
                    {colaborador.Usuario && colaborador.Usuario[0].profile_name}
                  </p>
                </div>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Rol:</span>
                  <p className='text-base md:text-lg font-semibold leading-tight'>
                    {colaborador.rol}
                  </p>
                </div>

              </div>
              <div className='w-full flex items-center justify-center md:gap-5'>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Fecha de ingreso:</span>
                  <p className='text-base md:text-lg font-semibold leading-tight'>
                    {colaborador.Usuario && colaborador.Usuario[0].date_start}
                  </p>
                </div>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Fecha de salida:</span>
                  <p className='text-base md:text-lg font-semibold leading-tight'>
                    {colaborador.Usuario[0].date_end}
                  </p>
                </div>
              </div>
              <div className='w-full flex items-center justify-center gap-5'>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Turno:</span>
                  <p className='text-base md:text-lg font-semibold leading-tight'>
                    {colaborador.Usuario && colaborador.Usuario[0].shift}
                  </p>
                </div>
                <div className='w-full'>
                  <span className="text-sm text-gray-400">Estado:</span>
                  <p className='text-base md:text-lg font-semibold leading-tight'>
                    {colaborador?.Usuario[0]?.user[0]?.status === 1 ? 'Activo' : 'Inactivo'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 row-span-3 md:col-start-4 md:row-start-6 bg-cv-primary rounded-2xl text-white p-5 order-4 md:order-4">
            <h2 className='text-xl mb-5 font-semibold text-center uppercase'>Datos de Asistencia</h2>
            <div className='w-full'>
              <ResponsiveContainer width="100%" height={270} className="mx-auto">
                <BarChart
                  data={[
                    { name: 'A', Asistencias: colaborador.Asistencia },
                    { name: 'T', Tardanzas: colaborador.Tardanzas },
                    { name: 'J', Justificaciones: colaborador.Justificaciones },
                    { name: 'F', Faltas: colaborador.Faltas },
                  ]}
                  barSize={40}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="0 1" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Asistencias" fill="#4CAF50" />
                  <Bar dataKey="Tardanzas" fill="#FFC300" />
                  <Bar dataKey="Justificaciones" fill="#36A2EB" />
                  <Bar dataKey="Faltas" fill="#FF5733" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )
      }
    </ >
  );
};