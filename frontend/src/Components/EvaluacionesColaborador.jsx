import React, { useState } from 'react';


export function EvaluacionesColaborador() {

    const meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ];

    const [mesSeleccionado, setMesSeleccionado] = useState('');
    return (
        <div className='flex items-center justify-center'>
            <div className="inline-block min-w-full py-2 text-white sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <div className="mb-4 flex items-center">
                        <label htmlFor="mes" className="mr-2">Selecciona un mes:</label>
                        <select
                            id="mes"
                            className="border rounded px-2 py-1 text-black"
                            value={mesSeleccionado}
                            onChange={(e) => setMesSeleccionado(e.target.value)}
                        >
                            <option value="">Todos los meses</option>
                            {meses.map((mes) => (
                                <option key={mes} value={mes}>{mes}</option>
                            ))}
                        </select>
                    </div>
                    <table
                        className="min-w-full border text-center text-sm font-light dark:border">
                        <thead className="border-b font-medium dark:border">
                            <tr>
                                <th
                                    rowSpan="2"
                                    scope="col"
                                    className="border-r px-6 py-4 ">
                                    Mes
                                </th>
                                <th
                                    rowSpan="2"
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border">
                                    Semana
                                </th>
                                <th
                                    rowSpan="2"
                                    scope="col"
                                    className="border-r px-6 py-4 dark:border">
                                    Puntos a Evaluar
                                </th>
                                <th
                                    rowSpan="2"
                                    scope="col"
                                    className="border-r px-6 py-4">
                                    Calificación
                                </th>
                                <th
                                    colspan="2"
                                    scope="col"
                                    className="border-r px-6 py-4">
                                    Promedio
                                </th>
                            </tr>
                            <tr>
                                <th
                                    scope="col"
                                    className="border-r border-t px-6 py-4">
                                    Semanal
                                </th>
                                <th
                                    scope="col"
                                    className="border-r border-t px-6 py-4">
                                    Mensual
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border">
                                <td
                                    rowSpan="12"
                                    className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border">
                                    {mesSeleccionado}
                                </td>
                                <td
                                    rowSpan="3"
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    1
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Habilidades Blandas
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4">
                                    10
                                </td>
                                <td
                                    rowSpan="3"
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                                <td
                                    rowSpan="12"
                                    className="whitespace-nowrap border-r px-6 py-4 font-medium dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Procesos de Trabajo
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Observaciones
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    rowSpan="3"
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    2
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Habilidades Blandas
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4">
                                    10
                                </td>
                                <td
                                    rowSpan="3"
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Procesos de Trabajo
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Observaciones
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    rowSpan="3"
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    3
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Habilidades Blandas
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4">
                                    10
                                </td>
                                <td
                                    rowSpan="3"
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Procesos de Trabajo
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Observaciones
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    rowSpan="3"
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    4
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Habilidades Blandas
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4">
                                    10
                                </td>
                                <td
                                    rowSpan="3"
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Procesos de Trabajo
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                            <tr className="border-b dark:border">
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    Observaciones
                                </td>
                                <td
                                    className="whitespace-nowrap border-r px-6 py-4 dark:border">
                                    10
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}