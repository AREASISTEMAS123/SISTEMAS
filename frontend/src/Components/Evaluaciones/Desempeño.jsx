import { useEffect } from "react";
import { useEvaluation } from "./hooks/useEvaluation";
export const Desempeño = () => {
    const { note1, note2, note3, note4, suma, handleChange,calcularSuma } = useEvaluation();

    useEffect(() => {
        calcularSuma;
    }, [note1, note2, note3, note4]);
    return (
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <div className="bg-cv-primary my-2 space-y-1 p-2 sm:p-6 md:p-8 lg:p-10 xl:p-12">
                <h1 className="text-center text-3xl font-semibold text-white">
                    DESEMPEÑO
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
                            name="semana_one"
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
                            name="semana_two"
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
                            name="semana_three"
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
                            name="semana_four"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-row border-cyan-400 border-2 p-2">
                    <div className="pr-2 my-1">PROMEDIO</div>
                    <div>
                        <input
                            className="ml-1 bg-gray-100 rounded px-2 py-1 w-24 sm:w-32 md:w-40"
                            value={suma}
                            disabled
                        />
                    </div>
                </div>
                <div className="flex flex-row mt-2 ">
                    <button className="bg-cyan-400 border-2 p-2">Guardar</button>
                    <button className="bg-amber-500 border-2 p-2 ml-4">Cancelar</button>
                </div>

            </div>


        </div>
    )
}


