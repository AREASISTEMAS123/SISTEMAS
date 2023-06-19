import React from 'react';
import { Tabla } from './Tabla';

export const AsistenciaAdmin = () => {
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

        <div className="bg-gray-200 p-4 rounded-md shadow-md w-96">
          <h3 className="text-3xl font-bold mb-2 text-center">Leyenda</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ul className="list-disc">
                <li className="flex justify-between">
                  <span>Falta</span>
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
                <li className="flex justify-between">
                  <span>Día no laborable</span>
                  <span className="ml-4">8</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Tabla />
    </div>
  );
};
