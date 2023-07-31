import { useState } from "react";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useEffect } from "react";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle';
export const JustificacionColaborador = () => {
    const [cards, setCards] = useState([]);
    const [showTerminos, setShowTerminos] = useState(false);
    const [showJusti, setShowJusti] = useState(false);
    const [justification_date, setJustification_date] = useState('');
    const [justification_type, setJustification_type] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [decline, setDecline] = useState('');
    const [reason, setReason] = useState('');
    const [evidence, setEvidence] = useState(null);
    const [messages, setMessage] = useState('');
    const [dateError, setDateError] = useState('');

    const [buscador_tipoJustificacion, setbuscador_tipoJustificacion] = useState('')
    const [buscadorStatus, setBuscadorStatus] = useState('')
    const [buscadorFecha, setBuscadorFecha] = useState('')

    const fetchData = async () => {
        try {
            // Realiza la llamada a tu API para obtener los datos de la base de datos
            const token = `Bearer ${localStorage.getItem('token')}`;
            const response = await fetch(import.meta.env.VITE_API_URL + '/justifications', {
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


    const isRechazadoOrAceptado = (prop) => {
        if (prop.decline === 1) {
            return 'Rechazado';
        } else if (prop.justification_status === 0 && prop.decline === 0) {
            return 'En proceso';
        } else {
            return 'Aceptado';
        }
    }
    const colorIcon = (prop) => {
        if (isRechazadoOrAceptado(prop) === 'Rechazado') {
            return 'red'
        }
        if (isRechazadoOrAceptado(prop) === 'En proceso') {
            return 'yellow'
        }
        if (isRechazadoOrAceptado(prop) === 'Aceptado') {
            return 'green'
        }
    }
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
        fetch(import.meta.env.VITE_API_URL + '/justifications/insert', {
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

    const onClearFilter = () => {
        setBuscadorFecha('')
        setBuscadorStatus('')
        setbuscador_tipoJustificacion('')
    }
    const onCancelJusti = () => {
        setShowJusti(false);
        setJustification_date('');
        setReason('');
        setEvidence(null);
    };
    const navigate = useNavigate();

    const mostrarDetalles = (id) => {
        navigate(`/details/${id}`);
    }
    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const currentDate = new Date();

        const minDate = new Date();
        minDate.setDate(currentDate.getDate() - 3);

        const maxDate = new Date();
        maxDate.setDate(currentDate.getDate() + 3);

        if (selectedDate >= minDate && selectedDate <= maxDate) {
            setJustification_date(e.target.value);
            setDateError('');
        } else {
            setDateError('Solo puedes seleccionar 3 días antes o 3 días después del día de hoy.');
        }
    };
    const handleTextChange = (e) => {
        const textArea = e.target.value;
        if (textArea.length <= 255) { // Establecer el valor mínimo permitido (por ejemplo, 50 caracteres)
            setReason(textArea);
        }
    }

    return (
        <div className="min-h-screen">
            <h1 className="my-2 uppercase font-semibold text-4xl text-white">Justificaciones</h1>
            <div className="flex flex-wrap justify-center my-8">
                <button
                    type="button"
                    className="px-3 py-2 text-xs font-medium text-center bg-cyan-400 border-2 rounded-md mx-5 border-black"
                    onClick={onShowTerminos}
                >
                    AGREGAR JUSTIFICACIÓN
                </button>

            </div>

            <div className="flex justify-center">
                {/* Buscador por tipo de justificacion: falta o tardanza */}
                <div className="w-full md:w-auto mr-2 mb-2 md:mb-0 md:mr-2 ">
                    <select
                        className="px-3 py-2 rounded-md bg-gray-200 w-full md:w-auto"
                        value={buscador_tipoJustificacion}
                        onChange={(e) => setbuscador_tipoJustificacion(e.target.value)}
                    >
                        <option value="">Tipo de justificación</option>
                        <option value="0">Falta</option>
                        <option value="1">Tardanza</option>
                    </select>
                </div>
                {/* Buscador por tipo de status: en proceso o aceptado */}
                <div className="w-full md:w-auto mr-2 mb-2 md:mb-0 md:mr-2">
                    <select
                        className="px-3 py-2 rounded-md bg-gray-200 w-full md:w-auto"
                        value={buscadorStatus}
                        onChange={(e) => setBuscadorStatus(e.target.value)}
                    >
                        <option value="">Estado</option>
                        <option value="0">En proceso</option>
                        <option value="1">Aceptado</option>
                        <option value="2">Rechazado</option>
                    </select>
                </div>
                <div className="w-full md:w-auto mr-2 mb-2 md:mb-0 md:mr-2">
                    <input
                        className="px-3 py-2 rounded-md bg-gray-200 w-full md:w-auto"
                        type="date"
                        id="fecha"
                        value={buscadorFecha}
                        onChange={(e) => setBuscadorFecha(e.target.value)}
                    />
                </div>
                <div className="">
                    <button
                        className="px-3 py-2 text-xs font-medium text-center bg-cyan-400 border-2 rounded-md mx-5 border-black"
                        onClick={onClearFilter}
                    >
                        Limpiar
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-cv-secondary min-w-sm mt-5">
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
                        } else if (buscadorStatus === "0") {
                            // Filtrar por "En proceso"
                            return justificationTypeArray.includes(0) && post.decline === 0;
                        } else if (buscadorStatus === "1") {
                            // Filtrar por "Aceptado"
                            return justificationTypeArray.includes(1) && post.decline === 0;
                        } else if (buscadorStatus === "2") {
                            // Filtrar por "Rechazado"
                            return post.decline === 1;
                        } else {
                            return false; // Valor de búsqueda inválido, no se muestra ningún card
                        }
                    })
                    .map((card, index) => (
                        <div className="bg-cv-primary  text-white  rounded-lg shadow" key={index}>
                            <div className="flex flex-col items-center pb-10  overflow-hidden">
                                {/* Contenido de la tarjeta */}
                                <div className="mt-4 flex items-center">
                                    <div className="text-white ml-4">
                                        <h1>JUSTIFICACIÓN Nº{card.id}</h1>
                                    </div>
                                </div>

                                <div className="flex mt-4 space-x-3 md:mt-6 text-white">
                                    <ul>
                                        <div className="text-sm font-medium flex  ">
                                            <p >
                                                <span className="uppercase">Estado: </span>  {isRechazadoOrAceptado(card)}
                                            </p>
                                            <div className="" style={{ marginLeft: 'auto' }}>
                                                <CircleIcon sx={{ color: colorIcon(card) }}></CircleIcon>
                                            </div>
                                        </div>
                                        <li className="text-sm font-medium flex  ">
                                            <label className="uppercase">Fecha: </label>
                                            <div className="w-1/4">
                                                <input
                                                    className="mx-1 bg-transparent"
                                                    disabled
                                                    value={moment(card.justification_date).format("DD/MM/YYYY")}
                                                ></input>
                                            </div>
                                        </li>
                                        <li className="text-sm font-medium flex  ">
                                            <p>
                                                <span className="uppercase"> Tipo: </span> {card.justification_type === 0 ? "Falta" : "Tardanza"}
                                            </p>
                                        </li>
                                        <li className="text-sm font-medium">
                                            <label className="mr-2">Motivo:</label>
                                            <div className="whitespace-normal">
                                                <textarea
                                                    className="bg-transparent text-sm align-top w-full h-auto resize-none"
                                                    disabled
                                                    value={card.reason}
                                                ></textarea>
                                            </div>
                                        </li>

                                    </ul>
                                </div>


                            </div>
                            <div className=" text-sm font-medium  text-black">
                                <button className="block w-full px-3 py-2 text-center bg-cyan-400 rounded-b-lg">
                                    <a
                                        onClick={() => mostrarDetalles(card.id)}
                                    >
                                        Ver más
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
                                <h1 className="text-center uppercase">Estos son los términos de servicio</h1>
                                <ol>
                                    <li>1. Solo podrá justificar hasta 3 días despues de la falta o tardanza.</li>
                                    <li>2. Toda justificación debera contar con las pruebas necesarias.</li>
                                    <li>3. Deberá esperar hasta 72 horas para visualizar la respuesta de su justificación. </li>
                                </ol>
                            </div>
                            <div className="flex  justify-center items-center p-2 border-t border-gray-200  ">
                                <button
                                    className="text-white mx-2 bg-cv-secondary hover:bg-slate-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                    onClick={onAceptTerminos}>ACEPTO</button>
                                <button onClick={onCloseTerminos} className="bg-amber-300 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-2">
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
                    <div className="relative w-full md:max-w-2xl my-6 mx-auto border-2 border-white p-1 rounded-lg rotate-[5deg]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">
                            <button
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 md:p-2.5 inline-flex items-center"
                                onClick={onCancelJusti}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <h2 className="mb-4 text-xl font-medium text-gray-900 text-center ">
                                    Agregar Justificacion
                                </h2>

                                <form className="justify-center items-center text-center " onSubmit={handleSubmit} >
                                    {messages && <p className="text-red-500">{messages}</p>}
                                    <div className="flex flex-col md:flex-row w-full">
                                        <div className="m-2 flex flex-col text-sm ">
                                            <label >Tipo de justificación</label>
                                            <select
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-1"
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
                                                onChange={handleDateChange}
                                            />
                                            {dateError && <p className="text-red-500">{dateError}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row my-2">
                                        <textarea

                                            type="text"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300   "
                                            placeholder="Describe el motivo de su tardanza o falta"
                                            name="reason"
                                            value={reason}
                                            onChange={handleTextChange}
                                            minLength={255}
                                        ></textarea>
                                        <p>Caracteres restantes: {255 - reason.length}</p>
                                    </div>
                                    <div className="flex flex-col md:flex-row my-2">
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

                                    <div className="flex justify-center md:justify-end border-gray-200 mt-4">
                                        <button onClick={onCancelJusti} className="border border-black hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 md:my-0 md:mx-2">
                                            CANCELAR
                                        </button>
                                        <button
                                            className="text-white bg-cv-secondary hover:bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 md:my-0 md:mx-2 "
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
        </div>
    );
};
