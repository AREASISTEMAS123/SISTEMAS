import React, { useState, useEffect } from "react";

export const PerfilColaborador = () => {

  //export const PerfilColaborador = ({ datosColaborador })

  //   const datosColaborador = {
  //     nombres: "Arturo Antonio",
  //     apellidos: "Montejo Soto",
  //     departamento: "Operaciones",
  //     area: "Sistemas",
  //     perfil: "Desarrollador Frontend",
  //     dni: "75098945",
  //     turno: "Mañana",
  //     rol: "Colaborador",
  //     ingreso: "05/04/2023",
  //     nacimiento: "03/07/2003",
  //     responsable: "Gustavo",
  //     faltas: 0,
  //     asistencias: 8,
  //     tardanzas: 3,
  //     justificaciones: 6,
  //   };


  // <div>
  //   <PerfilColaborador datosColaborador={datosColaborador} />
  // </div>
  const datosColaborador = {
    nombres: "Arturo Antonio",
    apellidos: "Montejo Soto",
    departamento: "Operaciones",
    area: "Sistemas",
    perfil: "Desarrollador Frontend",
    dni: "75098945",
    turno: "Mañana",
    rol: "Colaborador",
    ingreso: "05/04/2023",
    nacimiento: "03/07/2003",
    responsable: "Gustavo",
    faltas: 0,
    asistencias: 8,
    tardanzas: 3,
    justificaciones: 6,
  };

  const [colaborador, setColaborador] = useState(null);

  useEffect(() => {
    setColaborador(datosColaborador);
  }, []);

  if (!colaborador) {
    // Mostrar un estado de carga mientras se obtienen los datos
    return <div>Cargando...</div>;
  }



  return (
    <div className="bg-slate-900 p-4">
      <div className="bg-slate-900 mx-auto max-w-6xl rounded-lg p-4">
        <h1 className="text-4xl font-bold text-white mx-3 mt-5 text-center md:text-left">
          Perfil Colaborador
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-6">
          <div className="md:w-3/4">
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Nombres y Apellidos
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.nombres} {colaborador.apellidos}</div>
            </div>
          </div>
          <div className="md:w-1/6 md:ml-4 md:mt-6 lg:mt-5 lg:mr-auto order-first md:order-last">
            <img
              className="w-40 h-40 rounded-full mx-auto mb-6 md:mb-0 border-4 border-white"
              src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg"
              alt=""
              width="384"
              height="512"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Departamento
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.departamento}</div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Área
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.area}</div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Perfil
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.perfil}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              DNI
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.dni}</div>
            </div>
          </div>
          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Turno
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.turno}</div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Rol
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.rol}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Ingreso
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.ingreso}</div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Nacimiento
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>{colaborador.nacimiento}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-10 mb-20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/4">
              <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
                Responsable
              </h2>
              <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
                <div>{colaborador.responsable}</div>
              </div>
            </div>
            <div className="md:w-1/4 mt-6 md:mt-0 md:ml-4">
              <div className="bg-white p-4 mt-4 rounded-xl mx-3">
                <h3 className="text-lg font-bold mb-4 text-center">
                  Información
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-300 p-2 flex flex-col items-center">
                    <div className="text-sm font-bold">Faltas</div>
                    <div className="text-4xl">{colaborador.faltas}</div>
                  </div>
                  <div className="border border-gray-300 p-2 flex flex-col items-center">
                    <div className="text-sm font-bold">Asistencias</div>
                    <div className="text-4xl">{colaborador.asistencias}</div>
                  </div>
                  <div className="border border-gray-300 p-2 flex flex-col items-center">
                    <div className="text-sm font-bold">Tardanzas</div>
                    <div className="text-4xl">{colaborador.tardanzas}</div>
                  </div>
                  <div className="border border-gray-300 p-2 flex flex-col items-center">
                    <div className="text-sm font-bold">Justificaciónes</div>
                    <div className="text-4xl">{colaborador.justificaciones}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
