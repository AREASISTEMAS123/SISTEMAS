import { useState } from "react";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
export const JustificacionColaborador = () => {
    const [cards, setCards] = useState([]);
    const [showTerminos, setShowTerminos] = useState(false);
    const [showJusti, setShowJusti] = useState(false);
    const [justification_date, setJustification_date] = useState('');
    const [justification_type, setJustification_type] = useState('');
    const [decline, setDecline] = useState('');
    const [reason, setReason] = useState('');
    const [evidence, setEvidence] = useState(null);
    const [messages, setMessage] = useState('');
    const [showDetalles, setShowDetalles] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const [buscador_tipoJustificacion, setbuscador_tipoJustificacion] = useState('')
    const [buscadorStatus, setBuscadorStatus] = useState('')
    const [buscadorFecha, setBuscadorFecha] = useState('')

    const fetchData = async () => {
        try {
            // Realiza la llamada a tu API para obtener los datos de la base de datos
            const token = `Bearer ${localStorage.getItem('token')}`;
            const response = await fetch('http://127.0.0.1:8000/api/justifications', {
                headers: {
                    Authorization: token
                }
            });
            const data = await response.json();

            // Actualiza el estado "cards" con los datos recibidos de la API
            setCards(data.Justificaciones);
        } catch (error) {
            // Manejo de errores en caso de fallo en la llamada a la API
            console.error('Error al obtener los datos de la API:', error);

        }
    };
    useEffect(() => {
        fetchData();
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        const token = `Bearer ${localStorage.getItem('token')}`;
        const formData = new FormData();
        formData.append('justification_date', justification_date);
        formData.append('reason', reason);
        formData.append('evidence', evidence);
        formData.append('justification_type', justification_type);
        formData.append('decline', decline);
        // Validation
        if (!justification_date || !reason || !evidence || justification_type === null) {
            setMessage("Por favor, complete todos los campos.");
            return;
        }
        fetch('http://127.0.0.1:8000/api/justifications/insert', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: token,
                "Accept": "application/json",
            }
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message);
                    });
                }
                return response.json();
            })
            // eslint-disable-next-line no-unused-vars
            .then((data) => {
            })
            .catch((error) => {
                setMessage(error.message);
            })
            .finally(() => {
                closeJusti();
            });

    };
    const avatar = localStorage.getItem('avatar');


    const onShowTerminos = () => {
        setShowTerminos(true);
    };

    const onAceptTerminos = () => {
        setShowTerminos(false);
        setShowJusti(true);
    };

    const onCloseTerminos = () => {
        setShowTerminos(false);
    };

    const closeJusti = () => {
        setShowJusti(false)
        setJustification_date('');
        setReason('');
        setEvidence(null);
        fetchData();
    };


    const onCancelJusti = () => {
        setShowJusti(false);
        setJustification_date('');
        setReason('');
        setEvidence(null);
    };

    const mostrarDetalles = (id) => {
        setShowDetalles(true);
        setSelectedCard(id);
    }
    const cerrarDetalles = () => {
        setShowDetalles(false);
    }


    const isRechazadoOrAceptado = (prop) => {
        if (prop.decline === '1') {
            return 'Rechazado';
        } else {
            if (prop.justification_status === 0) {
                return 'En proceso'
            } else {
                return 'Aceptado';
            }
        }
    }

    return (
        <div className="h-screen">
            <h1 className="my-2 text-center font-semibold text-4xl text-white">Justificaciones</h1>
            <div className="grid grid-cols-6 gap-4 my-10">
                <div className="col-start-5 col-end-7 justify-self-end">
                    <button
                        type="button"
                        className="px-3 py-2 text-xs font-medium text-center bg-cyan-400 border-2 rounded-md mx-5 border-black"
                        onClick={onShowTerminos}
                    >
                        AGREGAR JUSTIFICACIÓN
                    </button>
                </div>
            </div>

            <div className="col-end-6 col-span-1 flex items-center">
                {/* Buscador por tipo de justificacion: falta o tardanza */}
                <div className="mr-2 ">
                    <select
                        className="px-3 py-2 rounded-md bg-gray-200"
                        value={buscador_tipoJustificacion}
                        onChange={(e) => setbuscador_tipoJustificacion(e.target.value)}
                    >
                        <option value="">Tipo de justificación</option>
                        <option value="0">Falta</option>
                        <option value="1">Tardanza</option>
                    </select>
                </div>
                {/* Buscador por tipo de status: en proceso o aceptado */}
                <div className="mr-2">
                    <select
                        className="px-3 py-2 rounded-md bg-gray-200"
                        value={buscadorStatus}
                        onChange={(e) => setBuscadorStatus(e.target.value)}
                    >
                        <option value="">Estado</option>
                        <option value="0">En proceso</option>
                        <option value="1">Aceptado</option>
                        <option value="2">Rechazado</option>
                    </select>
                </div>
                <div>
                    <input
                        className="px-3 py-2 rounded-md bg-gray-200"
                        type="date"
                        id="fecha"
                        value={buscadorFecha}
                        onChange={(e) => setBuscadorFecha(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 bg-cv-secondary min-w-sm mt-5">
                {cards
                    .filter((post) => {
                        if (buscadorFecha === "") {
                            // Si no se ha seleccionado ninguna fecha, se muestran todos los posts
                            return true;
                        } else {
                            const fechaPost = post.justification_date;
                            const fechaBuscador = buscadorFecha;
                            return fechaPost === fechaBuscador;
                        }
                    })
                    .filter((post) => {
                        const justificationTypeArray = Array.isArray(post.justification_type) ? post.justification_type : [post.justification_type];
                        if (buscador_tipoJustificacion === "") {
                            // Si no se ha seleccionado ningún tipo de justificación, se muestran todos los cards
                            return true;
                        } else {
                            // Filtrar por el tipo de justificación seleccionado
                            return justificationTypeArray.includes(Number(buscador_tipoJustificacion));
                        }
                    })
                    .filter((post) => {
                        const justificationTypeArray = Array.isArray(post.justification_status) ? post.justification_status : [post.justification_status];
                        if (buscadorStatus === "") {
                            // Si no se ha seleccionado ningún tipo de justificación, se muestran todos los cards
                            return true;
                        } else {
                            // Filtrar por el tipo de justificación seleccionado
                            return justificationTypeArray.includes(Number(buscadorStatus));
                        }
                    })
                    .map((card, index) => (
                        <div className="bg-cv-primary  text-white  rounded-lg shadow" key={index}>
                            <div className="flex flex-col items-center pb-10 max-h-[200px] overflow-hidden">
                                {/* Contenido de la tarjeta */}
                                <div className="mt-4 flex items-center">
                                    <div className="justify-start w-15 h-15 bg-gray-100 rounded-full">
                                        <img
                                            src={avatar}
                                            alt="Foto de Perfil"
                                            className="md:w-14 md:h-14 rounded-full shadow-lg border-2 border-white"
                                        />
                                    </div>
                                    <div className="text-white ml-4">
                                        <h1>{card.user[0].name} {card.user[0].surname}</h1>
                                    </div>
                                </div>

                                <div className="flex mt-4 space-x-3 md:mt-6 text-white">
                                    <ul>
                                        <li className="text-sm font-medium flex items-center">
                                            <label className="mr-2">Motivo:</label>
                                            <div className="w-3/4 whitespace-normal"> {/* Agrega la clase 'whitespace-normal' */}
                                                <textarea
                                                    className="bg-transparent text-sm align-top w-full resize-none h-auto"
                                                    disabled
                                                    value={card.reason}
                                                ></textarea>

                                            </div>
                                        </li>
                                        <li className="text-sm font-medium flex items-center ">
                                            <label>Fecha: </label>
                                            <div className="w-1/4">
                                                <input
                                                    className="mx-1 bg-transparent"
                                                    disabled
                                                    value={moment(card.justification_date).format("DD/MM/YYYY")}
                                                ></input>
                                            </div>
                                        </li>
                                        <li className="text-sm font-medium flex items-center ">
                                            <p>
                                                Estado: {isRechazadoOrAceptado(card)}
                                            </p>
                                        </li>
                                        <li className="text-sm font-medium flex items-center ">
                                            <p>
                                                Tipo: {card.justification_type === 0 ? "Falta" : "Tardanza"}
                                            </p>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                            <div className=" text-sm font-medium  text-black">
                                <button className="block w-full px-3 py-2 text-center bg-cyan-400 rounded-b-lg">
                                    <a
                                        onClick={() => mostrarDetalles(card.id)}
                                    >
                                        Ver mas
                                    </a>
                                </button>

                            </div>
                        </div>
                    )
                    )
                }
            </div>



            {showTerminos && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    {/* Modal */}
                    <div className="relative  max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow ">
                            <div className="flex items-center justify-center p-4 border-b rounded-t ">
                                <h3 className="items-center">
                                    <ReportProblemIcon
                                        sx={{ color: "#F3AE37", fontSize: 40 }}
                                    />
                                </h3>
                            </div>
                            <div className="p-6 space-y-6">
                                <p>Estos son los términos de servicio</p>
                            </div>
                            <div className="flex items-center p-6 border-t border-gray-200 rounded-b ">
                                <button
                                    className="text-white bg-cv-secondary hover:bg-slate-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                    onClick={onAceptTerminos}>ACEPTO</button>
                                <button onClick={onCloseTerminos} className="bg-amber-300 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-10">
                                    CERRAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showJusti && (
                <div className="justify-center w-full max-h-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    {/* Formulario */}
                    <div className="relative w-128 my-6 mx-auto  border-2 border-white p-1 rounded-lg rotate-[5deg]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">
                            <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " onClick={onCancelJusti}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h2 className="mb-4 text-xl font-medium text-gray-900 text-center ">
                                    Agregar Justificacion
                                </h2>

                                <form className="justify-center items-center text-center " onSubmit={handleSubmit} >
                                    {messages && <p className="text-red-500">{messages}</p>}
                                    <div className="flex w-full">
                                        <div className="m-2 flex flex-col text-sm ">
                                            <label >Tipo de justificación</label>
                                            <select
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"
                                                defaultValue="Seleccione"
                                                onChange={(event) => {
                                                    const selectedValue = event.target.value;
                                                    let justificationType;

                                                    if (selectedValue === "Falta") {
                                                        justificationType = 0;
                                                    } else if (selectedValue === "Tardanza") {
                                                        justificationType = 1;
                                                    } else {
                                                        // Manejar el caso de "Seleccione" u opciones no reconocidas
                                                        justificationType = null; // O cualquier otro valor por defecto
                                                    }

                                                    setJustification_type(justificationType);
                                                }}
                                            >
                                                <option value="Seleccione">Seleccione</option>
                                                <option value="Tardanza">Tardanza</option>
                                                <option value="Falta">Falta</option>
                                            </select>
                                        </div>

                                        <div className="m-2 flex flex-col text-sm">
                                            <label>Fecha</label>
                                            <input
                                                className="border-gray-300 bg-gray-50 border p-1 rounded-lg"
                                                type="date"
                                                name="justification_date"
                                                value={justification_date}
                                                onChange={(e) => setJustification_date(e.target.value)}

                                            />

                                        </div>
                                    </div>

                                    <div className="flex my-2">
                                        <textarea
                                            rows="4"
                                            type="text"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300   "
                                            placeholder="Describe el motivo de su tardanza o falta"
                                            name="reason"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="flex my-2">
                                        <div className="flex flex-col items-center text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300">
                                            <div className="flex items-center justify-center w-8 h-8 text-gray-500">
                                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                                </svg>
                                            </div>
                                            <div className="text-xs">
                                                <p className="mb-1 font-semibold">Seleccione un archivo o arrastre y suelte aquí</p>
                                                <p className="text-xxs">PNG, JPG or PDF tamaño de archivo no superior a 10mb</p>
                                            </div>
                                            <input
                                                type="file"
                                                name="evidence"
                                                required
                                                onChange={(e) => setEvidence(e.target.files[0])}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex  border-gray-200 mt-4 ">
                                        <button onClick={onCancelJusti} className="border border-black hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-10">
                                            CANCELAR
                                        </button>
                                        <button
                                            className="text-white bg-cv-secondary hover:bg-slate-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                            onClick={handleSubmit}
                                            type="submit"
                                        >
                                            GUARDAR
                                        </button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDetalles && (
                <div className="fixed inset-0 flex items-center justify-center  top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none  z-50">
                            {cards.map((item) => {
                                if (item.id === selectedCard) {
                                    return (
                                        <div key={item.id} className="px-6 py-6 lg:px-8">
                                            <button onClick={cerrarDetalles}>
                                                <CloseIcon />
                                            </button>
                                            <h3 className="mb-4 text-xl font-medium  ">
                                                {item.user[0].name} {item.user[0].surname}
                                            </h3>
                                            <form className="space-y-6" action="#">

                                                <div>
                                                    <label>Fecha de {item.justification_type === 0 ? "Falta" : "Tardanza"}:</label>
                                                    <textarea
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        rows={1}
                                                        disabled
                                                        defaultValue={new Date(item.justification_date).toLocaleDateString("es-ES", { timeZone: "UTC" })}
                                                    ></textarea>
                                                </div>
                                                <div>
                                                    <label>Pruebas Adjuntas:</label>
                                                    <a href="http://localhost:8000/storage/1/conversions/3135768-thumb.jpg" download>
                                                        <button className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                                            Click aquí para descargar
                                                        </button>
                                                    </a>
                                                </div>
                                                <div>
                                                    <label>Razón de {item.justification_type === 0 ? "Falta" : "Tardanza"}:</label>
                                                    <textarea
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                        rows={1}
                                                        disabled
                                                    >{item.reason}
                                                    </textarea>
                                                </div>
                                                <div>
                                                    <label>Razón de {isRechazadoOrAceptado(item)}</label>
                                                    <textarea
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                                        rows={1}
                                                        disabled
                                                    >{item.reason_accept_decline}
                                                    </textarea>
                                                </div>

                                            </form>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};
