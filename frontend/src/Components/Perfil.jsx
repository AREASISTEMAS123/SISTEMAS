import { useState, useEffect } from "react";
import moment from "moment";
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
          <div className="text-2xl font-bold text-white mx-3 text-center">
            DATOS PERSONALES
          </div>

          <div className="flex flex-col md:flex-row mt-6">
            <div className="md:w-3/4">
              <div className="flex flex-col ">
                <label className="font-semibold text-white mx-3 ">
                  NOMBRE COMPLETO
                </label>
                <div className="mx-3  font-semibold bg-input  text-center my-2">
                  <div>
                    <div>{colaborador.Usuario[0].user[0].name} {colaborador.Usuario[0].user[0].surname}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                <div className="flex flex-col ">
                  <label className="font-bold mx-3 text-sm text-white">
                    DNI
                  </label>
                  <input
                    disabled
                    className='mx-3  font-semibold bg-input text-center my-2'
                    value={colaborador.Usuario && colaborador.Usuario[0].dni}

                  />

                </div>
                <div className="flex flex-col ">
                  <label className="font-bold mx-3 text-sm text-white">
                    FECHA DE NACIMIENTO
                  </label>
                  <input
                    disabled
                    className='mx-3  font-semibold bg-input  text-center my-2'
                    value={colaborador.Usuario && moment(colaborador.Usuario[0].birthday).format("DD/MM/YYYY")}

                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                <div className="flex flex-col ">
                  <label className="font-bold mx-3 text-sm text-white">
                    CELULAR
                  </label>
                  <input
                    disabled
                    className='mx-3 bg-input font-semibold  text-center my-2'
                    value={colaborador.Usuario[0].cellphone}
                  />
                </div>

                <div className="flex flex-col ">
                  <label className="font-bold mx-3 text-sm text-white">
                    CORREO ELECTRONICO
                  </label>
                  <input
                    disabled
                    className='mx-3 bg-input font-semibold  text-center my-2'
                    value={colaborador.Usuario[0].user[0].email}
                  />

                </div>
              </div>
            </div>
            <div className="md:w-1/6 md:ml-4 md:mt-6 lg:mt-5 lg:mr-auto order-first md:order-last">
              <img
                className="w-40 h-40 rounded-full mx-auto mb-6 md:mb-0 border-4 border-white"
                src={colaborador.avatar}
                alt=""
                width="384"
                height="512"
              />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mx-3 mt-10 text-center">
            DATOS DE LA EMPRESA
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div className="flex flex-col ">
              <label className="font-bold mx-3 text-sm text-white">
                DEPARTAMENTO
              </label>
              <input
                className='mx-3 bg-input  font-semibold  text-center my-2'
                disabled
                value={colaborador.Usuario && colaborador.Usuario[0].department}
              />

            </div>

            <div className="flex flex-col ">
              <label className="font-bold mx-3 text-sm text-white">
                AREA
              </label>
              <input
                className='mx-3 bg-input  font-semibold  text-center my-2'
                disabled
                value={colaborador.Usuario && colaborador.Usuario[0].area}
              />

            </div>

            <div className="flex flex-col ">
              <label className="font-bold mx-3 text-sm text-white">
                PERFIL
              </label>
              <input
                className='mx-3 bg-input  font-semibold  text-center my-2'
                disabled
                value={colaborador.Usuario && colaborador.Usuario[0].profile_name}
              />

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
            <div className="flex flex-col ">
              <label className="font-bold mx-3 text-sm text-white">
                TURNO
              </label>
              <input
                className='mx-3 bg-input  font-semibold  text-center my-2'
                disabled
                value={colaborador.Usuario && colaborador.Usuario[0].shift}
              />
            </div>

            <div className="flex flex-col ">
              <label className="font-bold mx-3 text-sm text-white">
                ROL
              </label>
              <input
                className='mx-3 bg-input  font-semibold  text-center my-2'
                disabled
                value={colaborador.rol}
              />
            </div>
            <div className="flex flex-col ">
              <label className="font-bold mx-3 text-sm text-white">
                INGRESO
              </label>
              <input
                className='mx-3 bg-input  font-semibold  text-center my-2'
                disabled
                value={colaborador.Usuario && colaborador.Usuario[0].date_start}
              />

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">

            <div className="flex flex-col ">
              <label className="font-bold mx-3 text-sm text-white">
                ESTADO
              </label>
              <input
                className="mx-3 bg-input  font-semibold  text-center my-2"
                value={isChecked ? 'Habilitado' : 'Deshabilitado'}
                disabled
              />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mx-3 mt-10 text-center">
            DATOS DE ASISTENCIA
          </div>
          <div className="grid grid-cols-1 gap-3 mb-20">
            <div className="flex flex-col  items-center">
              <div className="md:w-1/2  mt-6  items-center">
                <div className="bg-cv-primary text-white p-4 mt-4 rounded-xl mx-3 ">
                  <h3 className="border-b pb-5 pt-1 font-bold mb-4 text-center">
                    Información
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className=" p-2 flex flex-col items-center">
                      <div className="font-bold">Faltas</div>
                      <div>{colaborador.Faltas}</div>
                    </div>
                    <div className=" p-2 flex flex-col items-center">
                      <div className="font-bold">Asistencias</div>
                      <div>{colaborador.Asistencia}</div>
                    </div>
                    <div className=" p-2 flex flex-col items-center">
                      <div className="font-bold">Tardanzas</div>
                      <div>{colaborador.Tardanzas}</div>
                    </div>
                    <div className=" p-2 flex flex-col items-center">
                      <div className="font-bold">Justificaciones</div>
                      <div>{colaborador.Justificaciones}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mx-3 mt-10 text-center">
            DATOS DE EVALUACIONES
          </div>
        </div>
      )
      }
    </div >
  );
};