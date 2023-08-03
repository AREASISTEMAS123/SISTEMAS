import React, { useState, useEffect } from 'react';
import { useMediaQuery } from "@mui/material";


export function DetalleEvaluaciones() {
    const isMobile = useMediaQuery("(max-width:1280px)");
    const [evaluationData, setEvaluationData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/evaluations/details/5', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
                // Authorization: `Bearer 6|J2Lph2hLdcCYPWYVBVVznEaW2peo1HBGrhQr4CZC`
            }
        })
            .then(response => response.json())
            .then(data => setEvaluationData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    if (!evaluationData) {
        return <div>Cargando datos...</div>;
    }

    const softSkillsData = evaluationData.softSkills;
    const performanceData = evaluationData.performance;

    return (
        <div>
            <div className='text-white font-bold text-3xl mb-10'>DETALLES EVALUACIONES</div>
            <div className='bg-input w-1/2 mb-5'>
            <div className='text-gray text-xl ml-4'>Andersson Godoy</div>
            </div>
            <div className='flex items-center justify-center'>
                <div className={`inline-block min-w-full py-2 text-white ${isMobile ? '' : 'flex'}`}>
                    <div className="overflow-hidden">
                        <div className='font-bold'>HABILIDADES BLANDAS</div>
                        <table
                            className="min-w-full bg-cv-primary text-center text-sm font-light">
                            <thead className="border font-medium">
                                <tr className='border'>
                                    <th
                                        rowSpan="2"
                                        scope="col"
                                        className="border px-6 py-4 ">
                                        Mes
                                    </th>
                                    <th
                                        rowSpan="2"
                                        scope="col"
                                        className="border px-6 py-4 ">
                                        Semana
                                    </th>
                                    <th
                                        colspan="3"
                                        scope="col"
                                        className=" px-6 py-4">
                                        Promedio
                                    </th>
                                </tr>
                                <tr>
                                    <th
                                        scope="col"
                                        className="border px-6 py-4">
                                        Semanal
                                    </th>
                                    <th
                                        scope="col"
                                        className="border px-6 py-4">
                                        Quincenal
                                    </th>
                                    <th
                                        scope="col"
                                        className="  px-6 py-4">
                                        Mensual
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-cv-tbody text-black  border border'>
                                <tr className="">
                                    <td
                                        rowSpan="12"
                                        className="whitespace-nowrap border border px-6 py-4 font-medium">
                                        SI
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4">
                                        1
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        {softSkillsData.data.note1}
                                    </td>
                                    <td
                                        rowSpan="4"
                                        className="whitespace-nowrap border border px-6 py-4 font-medium ">
                                        {softSkillsData.prom_pr_quincenal}
                                    </td>
                                    <td
                                        rowSpan="12"
                                        className="whitespace-nowrap border border px-6 py-4 font-medium ">
                                        {softSkillsData.data.prom_end}
                                    </td>
                                </tr>
                                <tr className="">
                                </tr>

                                <tr className="">
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        2
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        {softSkillsData.data.note2}
                                    </td>

                                </tr>
                                <tr className=" ">
                                </tr>

                                <tr className="">
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        3
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        {softSkillsData.data.note3}
                                    </td>
                                    <td
                                        rowSpan="4"
                                        className="whitespace-nowrap border border px-6 py-4 font-medium ">
                                        {softSkillsData.prom_sg_quincenal}
                                    </td>
                                </tr>
                                <tr className="">
                                </tr>

                                <tr className="">
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        4
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap px-6 py-4 ">
                                        {softSkillsData.data.note4}
                                    </td>
                                </tr>
                                <tr className=" ">
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className={`overflow-hidden ${isMobile ? '' : 'ml-4'}`}>
                        <div className='font-bold'>DESEMPEÑO</div>
                        <table
                            className="min-w-full bg-cv-primary text-center text-sm font-light ">
                            <thead className="border border-t  font-medium">
                                <tr className='border'>
                                    <th
                                        rowSpan="2"
                                        scope="col"
                                        className="border border-t px-6 py-4 ">
                                        Mes
                                    </th>
                                    <th
                                        rowSpan="2"
                                        scope="col"
                                        className="border px-6 py-4 ">
                                        Semana
                                    </th>
                                    <th
                                        colspan="3"
                                        scope="col"
                                        className=" px-6 py-4">
                                        Promedio
                                    </th>
                                </tr>
                                <tr>
                                    <th
                                        scope="col"
                                        className="border px-6 py-4">
                                        Semanal
                                    </th>
                                    <th
                                        scope="col"
                                        className="border px-6 py-4">
                                        Quincenal
                                    </th>
                                    <th
                                        scope="col"
                                        className="  px-6 py-4">
                                        Mensual
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-cv-tbody text-black  border border'>
                                <tr className="">
                                    <td
                                        rowSpan="12"
                                        className="whitespace-nowrap border border px-6 py-4 font-medium">
                                        SI
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4">
                                        1
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        {performanceData.data.note1}
                                    </td>
                                    <td
                                        rowSpan="4"
                                        className="whitespace-nowrap border border px-6 py-4 font-medium ">
                                        {performanceData.prom_pr_quincenal}
                                    </td>
                                    <td
                                        rowSpan="12"
                                        className="whitespace-nowrap border border px-6 py-4 font-medium ">
                                        {performanceData.data.prom_end}
                                    </td>
                                </tr>
                                <tr className="">
                                </tr>

                                <tr className="">
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        2
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        {performanceData.data.note2}
                                    </td>

                                </tr>
                                <tr className=" ">
                                </tr>

                                <tr className="">
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        3
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        {performanceData.data.note3}
                                    </td>
                                    <td
                                        rowSpan="4"
                                        className="whitespace-nowrap border border px-6 py-4 font-medium ">
                                        {performanceData.prom_sg_quincenal}
                                    </td>
                                </tr>
                                <tr className="">
                                </tr>

                                <tr className="">
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap border border px-6 py-4 ">
                                        4
                                    </td>
                                    <td
                                        rowSpan="2"
                                        className="whitespace-nowrap px-6 py-4 ">
                                        {performanceData.data.note4}
                                    </td>
                                </tr>
                                <tr className=" ">
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}