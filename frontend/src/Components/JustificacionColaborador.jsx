import { useState } from "react"


export const JustificacionColaborador = () => {

    const [card, setCard] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showJusti, setShowJusti] = useState(false);
    const [forms, setforms] = useState({
        fecha: '',
        razon: ''
    });
    const { fecha, razon } = forms;
    const OnInputChange = ({ target }) => { //cuando usamos un event nos sale todo, al usar target
        //disminumos el recurso
        const { name, value } = target
        setforms({
            ...forms,
            [name]: value  ///al name le estoy dando el valor del value
        })
    }
    const handleClick = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setShowJusti(true);
    };
    const addCard = () =>{
        if(closeJusti){
            setCard(1)
        }
    }
    const closeJusti = () => {
        setShowJusti(false);
        addCard();
    }
    
    return (
        <>
            <div className="w-full h-screen ">
                <h1 className="my-2 text-center font-semibold text-4xl text-white">Justificación</h1>
                <button type="button" className="px-3 py-2 text-xs font-medium text-center text-white border-2 rounded-md my-4 mx-5 block" onClick={handleClick}>Agregar</button>
                <input className="border-2 my-2 mx-5 text-center rounded-md"
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
                                            <li className="  px-4 py-2 text-sm font-medium text-start text-black rounded-lg">
                                                <label className="">Razón</label>
                                                <textarea  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" disabled value={razon}></textarea>
                                            </li>
                                            <li className=" text-start px-4 py-2 text-sm font-medium  text-black ">
                                                <label className="">Fecha</label>
                                                <input className="mx-1 border-2" disabled value={fecha} ></input>
                                            </li>

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
                            <h2 className="text-lg  mb-2 text-center ">
                                Agregar Justificacion
                            </h2>
                            <div className="flex-col">
                                <div className="m-2">
                                    <select name="fecha" value={fecha} onChange={OnInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option selected>Elige fecha a justificar</option>
                                        <option value="12/06/2023">12/06/2023</option>
                                        <option value="11/06/2023">11/06/2023</option>
                                        <option value="10/06/2023">10/06/2023</option>
                                        <option value="9/06/2023">09/06/2023</option>
                                    </select>
                                </div>
                                <div className="m-2">
                                    <textarea rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escriba su razón aqui..." name="razon" value={razon} onChange={OnInputChange}></textarea>
                                </div>
                                <div className="m-2">
                                    <input className="block w-full text-sm text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
                                </div>

                            </div>
                            <button
                                className="px-2 py-1 bg-slate-700 hover:bg-slate-800 rounded mt-4 text-white"
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
