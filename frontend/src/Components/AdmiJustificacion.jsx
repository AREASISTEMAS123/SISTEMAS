import { useState } from "react";

export const AdmiJustificacion = () => {
    const [card, setCard] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showJusti, setShowJusti] = useState(false);
    const handleClick = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setShowJusti(true);
    };
    const closeJusti = () =>{
        setShowJusti(false);
    }
    return (
        <>
            <div className="w-full h-screen bg-slate-700">
                <h1 className="my-2 text-center font-semibold text-4xl">Justificaciones</h1>
                <input className= "border-2 my-2 mx-5 text-center rounded-md"
                    placeholder="Buscar" />
                {
                    (card >= 1) && (
                        <div className="mx-5 my-2 grid grid-cols-3">

                            <div className=" w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                <div >
                                    <h5 className=" ml-10  mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                                    <div className="  mt-4 space-x-3 md:mt-6">
                                        <ul>
                                            <li className=" inline-block px-4 py-1 text-sm font-medium  text-black rounded-lg">
                                                <label>Departamento</label>
                                                <input className="mx-1 border-2" disabled></input>
                                            </li>
                                            <li className=" inline-block px-4 py-1 text-sm font-medium  text-black rounded-lg">
                                                <label>Fecha de falta o tardanza:</label>
                                                <input className="mx-1 border-2" disabled></input>
                                            </li>
                                            <li className=" inline-block px-4 py-1 text-sm font-medium  text-black rounded-lg">
                                                <label>Pruebas adjuntas:</label>
                                                <input className="mx-1 border-2" disabled></input>
                                            </li>
                                            <li className=" inline-block px-4 py-1 text-sm font-medium  text-black rounded-lg">
                                                <label>Razon: </label>
                                                <input className="mx-1 border-2" disabled></input>
                                            </li>
                                         
                                        </ul>
                                    </div>
                                    <div className="  px-4 py-2 text-sm font-medium  rounded-tl text-white mx-3 text-center">
                                        <button className="bg-slate-700 p-2">Aceptar</button>
                                        <button className="bg-slate-700 p-2 mx-4">Rechazar</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }
                {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-slate-500 p-4 shadow max-w-md text-white">
                        <h2 className="text-lg font-bold mb-2">
                            
                        </h2>
                        <p>
                            Estos son los terminos y condiciones que tiene que poner el area de administración para la justificación
                        </p>
                        <button
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-800 rounded mt-4"
                            onClick={closeModal}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
            {showJusti && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="bg-slate-500 p-4  max-w-md ">
                        <h2 className="text-lg  mb-2 text-center">
                            Agregar Justificacion
                        </h2>
                        <div className="flex-col">
                            <div className="m-2">
                                <input placeholder="Fecha o falta de tardanza"></input>
                            </div>
                            <div className="m-2">
                                <input type="text" placeholder="Razón"></input>
                            </div>
                            <div className="m-2">
                                <input type="file" className="file:border file:border-solid" placeholder="Pruebas adjuntas"></input>
                            </div>
                           
                        </div>
                        <button
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-800 rounded mt-4"
                            onClick={closeJusti}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}

            </div>






        </>

    )
}
