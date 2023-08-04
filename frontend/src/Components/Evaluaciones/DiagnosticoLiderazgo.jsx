import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DiagnosticoLiderazgo = () => {
    const { id } = useParams();

    const [notas, setNotas] = useState({
        note1: 0,
        note2: 0,
        note3: 0,
        note4: 0,
        prom: 0
    });
    const navigate = useNavigate();
    const onClickRetroceder = () => {
        navigate("/evaluar")
    }
    const { note1, note2, note3, note4 } = notas;
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + `/evaluations/softskills/1`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
            .then(response => response.json())
            .then(data => {
                setNotas({
                    note1: data.note1 || 0,
                    note2: data.note2 || 0,
                    note3: data.note3 || 0,
                    note4: data.note4 || 0,
                    prom_end: data.prom_end || 0,
                });
                console.log(data)
            })

            .catch(error => console.error('Error al obtener los datos:', error));
    }, []);

    const handleChange = ({ target }) => {
        console.log("handleChange called"); // Add this line
        const { name, value } = target;
        setNotas(prevNotas => ({
            ...prevNotas,
            [name]: value
        }));
    };


    const saveNotes = async () => {
        try {
            const token = `Bearer ${localStorage.getItem('token')}`;
            const response = await fetch(import.meta.env.VITE_API_URL + `/evaluations/softskills/1/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({
                    note1: notas.note1,
                    note2: notas.note2,
                    note3: notas.note3,
                    note4: notas.note4,
                })
            });

            if (response.ok) {
                console.log("Notes saved successfully!");

            } else {
                console.error("Failed to save notes:", response.status);

            }
        } catch (error) {
            console.error('Error al guardar los datos en la API:', error);
        }
    }

    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="bg-cv-primary my-2 space-y-1 p-2 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <h1 className="text-center text-3xl font-semibold text-white">
                    Diagnostico de liderazgo
                </h1>
                <h3 className="text-center text-2xl font-medium text-white">
                    Anaiz Rojas
                </h3>
            </div>

            <div className="flex flex-col justify-center items-center  p-2 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <div className="flex flex-row border-cyan-400 border-2 p-2">
                    <div className="pr-2 my-1">SEMANA 1</div>
                    <div>
                        <input
                            className="ml-2 bg-gray-100 rounded px-2 py-1 w-24 sm:w-32 md:w-40"
                            placeholder="Ingrese valor"
                            value={note1}
                            type="number"
                            name="note1"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-row border-cyan-400 border-2 p-2">
                    <div className="pr-2 my-1">SEMANA 2</div>
                    <div>
                        <input
                            className="ml-2 bg-gray-100 rounded px-2 py-1 w-24 sm:w-32 md:w-40"
                            placeholder="Ingrese valor"
                            type="number"
                            value={note2}
                            name="note2"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-row border-cyan-400 border-2 p-2">
                    <div className="pr-2 my-1">SEMANA 3</div>
                    <div>
                        <input
                            className="ml-2 bg-gray-100 rounded px-2 py-1 w-24 sm:w-32 md:w-40"
                            placeholder="Ingrese valor"
                            type="number"
                            value={note3}
                            name="note3"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-row border-cyan-400 border-2 p-2">
                    <div className="pr-2 my-1">SEMANA 4</div>
                    <div>
                        <input
                            className="ml-2 bg-gray-100 rounded px-2 py-1 w-24 sm:w-32 md:w-40"
                            placeholder="Ingrese valor"
                            type="number"
                            value={note4}
                            name="note4"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-row border-cyan-400 border-2 p-2">
                    <div className="pr-2 my-1">PROMEDIO</div>
                    <div>
                        <input
                            className="ml-1 bg-gray-100 rounded px-2 py-1 w-24 sm:w-32 md:w-40"
                            
                            disabled
                            value={notas.prom_end}
                            name="prom_end"
                        />
                    </div>
                </div>
                <div className="flex flex-row mt-2 ">
                    <button className="bg-cyan-400 border-2 p-2" onClick={saveNotes}>Guardar</button>
                    <button className="bg-amber-500 border-2 p-2 ml-4" onClick={onClickRetroceder}>Cancelar</button>
                </div>
            </div>


        </div>
    )
}


