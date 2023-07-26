import React, { useState, useEffect } from "react";

export const Perfil = () => {
  const [colaborador, setColaborador] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile", {
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

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="min-h-screen">
      {colaborador && colaborador.Usuario && colaborador.Usuario[0] && (
        <div className=" rounded-lg ">
          <div className="text-2xl font-bold text-white mx-3 text-center">
            DATOS PERSONALES
          </div>
          <div className="flex flex-col md:flex-row mt-6">
            <div className="md:w-3/4">
              <div className="flex flex-col ">
                <div className="font-bold mx-3 text-sm text-white">
                  NOMBRE COMPLETO
                </div>
                <div className="text-gray-500 p-4 bg-input rounded-xl mx-3">
                  <div>
                    <div>{colaborador.Usuario[0].user[0].name} {colaborador.Usuario[0].user[0].surname}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                <div className="flex flex-col ">
                  <div className="font-bold mx-3 text-sm text-white">
                    DNI
                  </div>
                  <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                    <div>{colaborador.Usuario && colaborador.Usuario[0].dni}</div>
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div className="font-bold mx-3 text-sm text-white">
                    NACIMIENTO
                  </div>
                  <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                    <div>{colaborador.Usuario && colaborador.Usuario[0].birthday}</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
                <div className="flex flex-col ">
                  <div className="font-bold mx-3 text-sm text-white">
                    CELULAR
                  </div>
                  <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                    <div>{colaborador.Usuario[0].cellphone}</div>
                  </div>
                </div>

                <div className="flex flex-col ">
                  <div className="font-bold mx-3 text-sm text-white">
                    CORREO ELECTRONICO
                  </div>
                  <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                    <div>{colaborador.Usuario[0].user[0].email} </div>
                  </div>
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
              <div className="font-bold mx-3 text-sm text-white">
                DEPARTAMENTO
              </div>
              <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                <div>{colaborador.Usuario && colaborador.Usuario[0].department}</div>
              </div>
            </div>

            <div className="flex flex-col ">
              <div className="font-bold mx-3 text-sm text-white">
                AREA
              </div>
              <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                <div>{colaborador.Usuario && colaborador.Usuario[0].area}</div>
              </div>
            </div>

            <div className="flex flex-col ">
              <div className="font-bold mx-3 text-sm text-white">
                PERFIL
              </div>
              <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                <div>{colaborador.Usuario && colaborador.Usuario[0].profile_name}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
            <div className="flex flex-col ">
              <div className="font-bold mx-3 text-sm text-white">
                TURNO
              </div>
              <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                <div>{colaborador.Usuario && colaborador.Usuario[0].shift}</div>
              </div>
            </div>

            <div className="flex flex-col ">
              <div className="font-bold mx-3 text-sm text-white">
                ROL
              </div>
              <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                <div>{colaborador.rol}</div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="font-bold mx-3 text-sm text-white">
                INGRESO
              </div>
              <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                <div>{colaborador.Usuario && colaborador.Usuario[0].date_start}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
            <div className="flex flex-col ">
              <div className="font-bold mx-3 text-sm text-white">
                RESPONSABLE
              </div>
              <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
                <div>{colaborador.Usuario && colaborador.Usuario[0].responsible}</div>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="font-bold mx-3 text-sm text-white">
                ESTADO
              </div>
              <div className="text-gray-500 p-4 bg-white rounded-xl mx-3">
              {isChecked ? (
                <div>Habilitado</div>
              ) : (
                <div>Deshabilitado</div>
              )}
              </div>
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
      )}
    </div>
  );
};