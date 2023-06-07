import React from "react";

export const PerfilColaborador = () => {
  return (
    <div className="bg-slate-900 p-4">
      <div className="bg-slate-900 rounded-lg p-4">
        <h1 className="text-5xl font-bold text-white mx-3 mt-5">
          Perfil Colaborador
        </h1>
        <img
          className="w-44 h-44 rounded-full mx-auto md:float-right md:mx-4 md:my-9"
          src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg"
          alt=""
          width="384"
          height="512"
        />

        <div class="grid grid-cols-1 gap-3 mt-24">
          <div className="bg-slate-900">
            <h2 className="text-4xl font-bold mx-3 text-white">
              Nombres y Apellidos
            </h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>Arturo Antonio Montejo Soto</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mt-10">
          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Departamento</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>Operaciones</div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Area</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>Sistemas</div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Perfil</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>Desarrollador Fontend</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 mt-10">
          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Dni</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>75098945</div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Turno</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>Mañana</div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Rol</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>Colaborador</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-10">
          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Ingreso</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>05/04/2023</div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Nacimiento</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>03/07/2003</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-3 mt-10 mb-20">
          <div>
            <h2 className="text-4xl font-bold mx-3 text-white">Responsable</h2>
            <div className="bg-white p-4 mt-4 rounded-xl mx-3">
              <div>Gustavo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
