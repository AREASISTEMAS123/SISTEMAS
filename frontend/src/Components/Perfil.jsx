import { useState, useEffect } from "react";
import moment from "moment";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export const Perfil = () => {
  const [colaborador, setColaborador] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
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
    <div className="min-h-screen">
      {colaborador && colaborador.Usuario && colaborador.Usuario[0] && (

        <div className=" ">
          <div className="flex flex-col md:flex-row">
            {/* SECCION PERSONAL */}
            <div className="w-full md:w-3/5 p-4 bg-cv-primary rounded-2xl">
              <div className="flex flex-col ">
                <div className="text-2xl font-bold text-white mx-3 text-center mb-5">
                  DATOS PERSONALES
                </div>
                <label className="font-semibold text-xs text-gray-500 mx-3 ">
                  NOMBRE COMPLETO
                </label>
                <div className="mx-3 text-white text-xl font-semibold my-2">
                  <div>
                    <div>{colaborador.Usuario[0].user[0].name} {colaborador.Usuario[0].user[0].surname}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    DNI
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.Usuario && colaborador.Usuario[0].dni}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    FECHA DE NACIMIENTO
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.Usuario && moment(colaborador.Usuario[0].birthday).format("DD/MM/YYYY")}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    CELULAR
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.Usuario[0].cellphone}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mt-10">
                

                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    CORREO ELECTRONICO
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2 truncate">
                    <div>
                      <div>{colaborador.Usuario[0].user[0].email}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* SECCION IMAGEN */}
            <div className="w-full md:w-2/5 p-4 bg-cv-primary rounded-2xl mx-0 md:mx-5">
              <div className="w-4/5 m-10 order-first md:order-last">
                <img
                  className=" rounded-full mx-auto mb-6 md:mb-0 border-4 border-white"
                  src={colaborador.avatar}
                  alt=""
                  width="250"
                  height="250"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            {/* SECCION EMPRESA */}
            <div className="w-full md:w-3/5 p-4 bg-cv-primary rounded-2xl my-5">
              <div className="text-2xl font-bold text-white mx-3 text-center mb-5">
                DATOS DE LA EMPRESA
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    DEPARTAMENTO
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.Usuario && colaborador.Usuario[0].department}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    NUCLEO
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.Usuario && colaborador.Usuario[0].area}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    PERFIL
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.Usuario && colaborador.Usuario[0].profile_name}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    TURNO
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.Usuario && colaborador.Usuario[0].shift}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    ROL
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.rol}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    INGRESO
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{colaborador.Usuario && colaborador.Usuario[0].date_start}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                <div className="flex flex-col ">
                  <label className="font-semibold text-xs text-gray-500 mx-3">
                    ESTADO
                  </label>
                  <div className="mx-3 text-white text-xl font-semibold my-2">
                    <div>
                      <div>{isChecked ? 'Habilitado' : 'Deshabilitado'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* SECCION ASISTENCIA */}
            <div className="w-full md:w-2/5 p-4 bg-cv-primary rounded-2xl my-5 md:mx-5">
              <div className="text-2xl font-bold text-white mx-3 text-center">
                DATOS ASISTENCIA
              </div>
              <div className="mt-6">
                <ResponsiveContainer width="100%" height={300} className="mx-auto">
                  <BarChart
                    data={[
                      { name: 'A', Asistencias: colaborador.Asistencia },
                      { name: 'T', Tardanzas: colaborador.Tardanzas },
                      { name: 'J', Justificaciones: colaborador.Justificaciones },
                      { name: 'F', Faltas: colaborador.Faltas },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
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
        </div>
      )
      }
    </div >
  );
};