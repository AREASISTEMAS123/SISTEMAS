import React from "react";
import { Tabla } from "./Tabla";
import { DynamicSelect } from "./commons";

export const AsistenciaAdmin = () => {
  const colaborador = [{ label: "Artuo Antonio Montejo Soto", value: "1" }];
  const departamento = [
    { label: "Estrategico", value: "estrategico" },
    { label: "Operaciones", value: "operaciones" },
    { label: "Recurso Humanos", value: "recurso_humanos" },
  ];
  const area = [
    { label: "Sistemas", value: "sistemas" },
    { label: "Diseño Grafico", value: "diseno_grafico" },
    { label: "Otra opción", value: "otra_opcion" },
  ];
  const turno = [
    { label: "Mañana", value: "manana" },
    { label: "Tarde", value: "tarde" },
  ];
  const months = [
    { label: "Enero", value: "enero" },
    { label: "Febrero", value: "febrero" },
    { label: "Marzo", value: "marzo" },
    { label: "Abril", value: "abril" },
    { label: "Mayo", value: "mayo" },
    { label: "Junio", value: "junio" },
    { label: "Julio", value: "julio" },
    { label: "Agosto", value: "agosto" },
    { label: "Septiembre", value: "septiembre" },
    { label: "Octubre", value: "octubre" },
    { label: "Noviembre", value: "noviembre" },
    { label: "Diciembre", value: "diciembre" },
  ];

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="bg-gray-200 p-4 rounded-md shadow-md w-96">
          <h3 className="text-3xl font-bold mb-2 text-center">INFORMACIÓN</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ul className="list-disc">
                <li className="flex justify-between">
                  <span>Faltas</span>
                  <span className="ml-4">8</span>
                </li>
                <li className="flex justify-between">
                  <span>Asistencia</span>
                  <span className="ml-4">12</span>
                </li>
                <li className="flex justify-between">
                  <span>Tardanza</span>
                  <span className="ml-4">5</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="list-disc pl-6">
                <li className="flex justify-between">
                  <span>Justificación</span>
                  <span className="ml-4">8</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-4 rounded-md shadow-md w-100">
          <h3 className="text-3xl font-bold mb-2 text-center">Leyenda</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ul className="list-disc">
                <li className="flex justify-between">
                  <span>Falta</span>
                  <span className="ml-4">
                    <div className="w-5 h-5 rounded-full bg-red-600"></div>
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Asistencia</span>
                  <span className="ml-4">
                    <div className="w-5 h-5 rounded-full bg-green-600"></div>
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Tardanza</span>
                  <span className="ml-4">
                    <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="list-disc pl-6">
                <li className="flex justify-between">
                  <span>Justificación</span>
                  <span className="ml-4">
                    <div className="w-5 h-5 rounded-full bg-cyan-500"></div>
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Día no laborable</span>
                  <span className="ml-4">
                    <div className="w-5 h-5 rounded-full bg-slate-500"></div>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 mt-5">
        <DynamicSelect options={colaborador} title={"Colaborador"} />
        <DynamicSelect options={departamento} title={"Departamento"} />
        <DynamicSelect options={area} title={"Area"} />
        <DynamicSelect options={turno} title={"Turno"} />
        <DynamicSelect options={months} title={"Mes"} />
      </div>
      <Tabla />
    </div>
  );
};
