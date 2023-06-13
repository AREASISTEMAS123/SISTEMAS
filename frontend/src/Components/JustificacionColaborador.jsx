import { useState } from "react"


export const JustificacionColaborador = () => {

    const [card, setCard] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showJusti, setShowJusti] = useState(false);
    const [estado, setEstado] = useState();
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
                <h1 className="my-2 text-center font-semibold text-4xl">Justificación</h1>

                <button className="text-white border-2 my-4 mx-5 block" onClick={handleClick}>Agregar</button>

                <input className= "border-2 my-2 mx-5 text-center rounded-md"
                    placeholder="Buscar" />
                {
                    (card >= 1) && (
                        <div className="mx-5 my-2 grid grid-cols-3">

                            <div className=" w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                                <div className=" flex-col items-center ">
                                    <img className="inline-block w-24 h-24 my-1 mx-3 rounded-full shadow-lg" src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg" alt="Bonnie image" />
                                    <h5 className=" ml-10 inline-block mb-1 text-xl font-medium text-gray-900 dark:text-white">Bonnie Green</h5>
                                    <div className=" flex mt-4 space-x-3 md:mt-6">
                                        <ul>
                                            <li className=" items-center px-4 py-2 text-sm font-medium text-center text-black rounded-lg">Razón: </li>
                                            <li className=" items-center px-4 py-2 text-sm font-medium text-center text-black ">Fecha: </li>
                                            
                                        </ul>
                                    </div>
                                    <div className="  px-4 py-2 text-sm font-medium  rounded-tl text-white ">
                                        <p className="rounded-lg  bg-slate-700 p-2">
                                            Estado : 
                                        </p>
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
