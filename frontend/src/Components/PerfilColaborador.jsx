import React from "react";

export const PerfilColaborador = () => {
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
              <div>Arturo Antonio Montejo Soto</div>
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
              <div>Operaciones</div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Area
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>Sistemas</div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Perfil
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>Desarrollador Frontend</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-10">
          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Dni
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>75098945</div>
            </div>
          </div>
          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Turno
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>Mañana</div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Rol
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>Colaborador</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Ingreso
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>05/04/2023</div>
            </div>
          </div>

          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Nacimiento
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>03/07/2003</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-10 mb-20">
          <div>
            <h2 className="font-bold mx-3 text-white text-lg md:text-3xl lg:text-3xl">
              Responsable
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3 text-lg md:text-2xl lg:text-2xl">
              <div>Gustavo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
