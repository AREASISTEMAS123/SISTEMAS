import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts';
import { Chart } from "react-google-charts";

export const AdmiJustificacion = () => {
    const [faltasList, setFaltasList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [buscador_tipoJustificacion, setbuscador_tipoJustificacion] = useState('')
    const [buscadorStatus, setBuscadorStatus] = useState('')
    const [buscadorFecha, setBuscadorFecha] = useState('')
    const [buscador_tipoArea, setBuscador_tipoArea] = useState('')
    const [buscadorDpto, setBuscadorDpto] = useState('')
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/detalles/${id}`);

    };

    const onCleanFilter = () => {
        setBuscadorFecha('');
        setBuscadorStatus('')
        setBuscador_tipoArea('')
        setSearchInput('')
        setbuscador_tipoJustificacion('')
        setBuscadorDpto('')
    }

    const fetchData = async () => {
        try {
            // Realiza la llamada a tu API para obtener los datos de la base de datos
            const token = `Bearer ${localStorage.getItem('token')}`;
            const response = await fetch('http://127.0.0.1:8000/api/users/justifications', {
                headers: {
                    Authorization: token
                }
            });
            const data = await response.json();

            // Actualiza el estado "cards" con los datos recibidos de la API
            setFaltasList(data.Justifications);
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
    const isFaltaOrTardanza = (prop) => {
        //post.justification_type === 0 ? "Falta" : "Tardanza"
        if (prop.justification_type == 0) {
            return 'Falta'
        } else {
            return 'Tardanza';
        }
    }
    const calculateProgress = (faltasList, estado) => {
        const totalFaltas = faltasList.length;
        const totalEstado = faltasList.filter((post) => isRechazadoOrAceptado(post) === estado).length;

        if (totalFaltas === 0) {
            return 0;
        }

        return Math.round(totalEstado);
    };

    const calculateBars = (faltasList, type) => {
        const totalFaltas = faltasList.length;
        const totalTipo = faltasList.filter((post) => isFaltaOrTardanza(post) === type).length;
        if (totalFaltas === 0) {
            return;
        }
        return totalTipo;
    };



    const data = [
        ["Tipo ", "Cantidad"],
        ["Falta", calculateBars(faltasList, 'Falta')],
        ["Tardanza", calculateBars(faltasList, 'Tardanza')],
    ];

    const options = {
        legend: { position: "none" },
        bar: { groupWidth: "50%" },
        chartArea: { width: "50%", height: "50%" },
        colors: ["#b0120a", "#ffab91"],
        title: 'Tipos de justificación',
        hAxis: { title: 'Tipos' },
        vAxis: { title: 'Cantidad' },

    };

    // Obtén el rango de valores en tus datos
    let minValue = Infinity;
    let maxValue = -Infinity;

    for (let i = 1; i < data.length; i++) {
        const value = data[i][1];
        minValue = Math.min(minValue, value);
        maxValue = Math.max(maxValue, value);
    }

    // Configura el rango de valores en el vAxis
    options.vAxis = {
        viewWindowMode: "pretty",
        viewWindow: {
            min: 0,
            max: maxValue,
        },
    };

    return (
        <div >
            <div className="flex items-center justify-center">
                <div className="bg-cv-primary p-4 inline-flex mr-4 mx-4">
                    <div className="text-white text-center ">
                        <ul className="my-4">
                            <li className="my-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-5 h-5 rounded-full bg-[#FF0000]"></div>
                                    <h3 className="uppercase font-normal">Rechazadas</h3>
                                </div>
                            </li>
                            <li className="my-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-5 h-5 rounded-full bg-[#ffee00d7]"></div>
                                    <h3 className="uppercase font-normal">En proceso</h3>
                                </div>
                            </li>
                            <li className="my-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-5 h-5 rounded-full bg-[#24FF00]"></div>
                                    <h3 className="uppercase font-normal">Aceptadas</h3>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: calculateProgress(faltasList, 'Rechazado'), color: '#FF0000' },
                                        { id: 1, value: calculateProgress(faltasList, 'En proceso'), color: '#ffee00d7' },
                                        { id: 2, value: calculateProgress(faltasList, 'Aceptado'), color: '#24FF00' },
                                    ],
                                    highlightScope: { faded: 'global', highlighted: 'item' },
                                    faded: { innerRadius: 30, additionalRadius: -30 },
                                },
                            ]}
                            width={300}
                            height={200}
                        />
                        {calculateProgress(faltasList, 'Rechazado') === 0 && calculateProgress(faltasList, 'En proceso') === 0 && calculateProgress(faltasList, 'Aceptado') === 0 && (
                            <p className="text-white">No hay datos para mostrar.</p>
                        )}
                    </div>
                </div>
                <div className="  inline-flex mr-4 mx-4">

                    <Chart chartType="ColumnChart" data={data} options={options} />

                </div>
            </div>






            <div className="text-center font-semibold text-6xl	text-white	mb-5">
                <h1>Justificaciones</h1>
            </div>

            <div className="mb-3 inline">
                <div className=" mb-4 flex flex-wrap items-stretch">
                    <input
                        type="search"
                        className="px-3 py-2 rounded-md bg-gray-200 "
                        placeholder="NOMBRE APELLIDO"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div style={{ marginLeft: 'auto' }}>
                        <button type="button"
                            className="px-3 py-2 text-xs font-medium text-center bg-cyan-400 border-2 rounded-md mx-5 border-black"
                            onClick={onCleanFilter}
                        >
                            Limpiar

                        </button>
                    </div>
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
                <div className="mr-2">
                    <select
                        className="px-3 py-2 rounded-md bg-gray-200"
                        value={buscadorDpto}
                        onChange={(e) => {
                            setBuscadorDpto(e.target.value);
                        }}
                    >
                        <option value="">Departamento</option>
                        <option value="Sistemas">Sistemas</option>
                        <option value="Creativo">Creativo</option>
                        <option value="Diseño Web">Diseño Web</option>
                    </select>
                </div>
                <div className="mr-2">
                    <select
                        className="px-3 py-2 rounded-md bg-gray-200"
                        value={buscador_tipoArea}
                        onChange={(e) => {
                            setBuscador_tipoArea(e.target.value);
                        }}
                    >
                        <option value="">Area</option>
                        <option value="Sistemas">Sistemas</option>
                        <option value="Creativo">Creativo</option>
                        <option value="Diseño Web">Diseño Web</option>
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
            <div className="grid grid-cols-3 gap-4 bg-cv-secondary  mt-5">
                {faltasList
                    .filter((post) => {
                        if (searchInput === "") {
                            // Si no se ha ingresado un nombre en el buscador, se muestran todos los posts
                            return true;
                        } else {
                            const nombrePost = post.user[0].name.toLowerCase(); // Convertir el nombre del post a minúsculas para comparar sin distinción de mayúsculas/minúsculas
                            const nombreBuscador = searchInput.toLowerCase(); // Convertir el nombre del buscador a minúsculas para comparar sin distinción de mayúsculas/minúsculas
                            return nombrePost.includes(nombreBuscador);
                        }
                    })

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
                    //revisar porque solo aparecen 3 
                    .filter((post) => {
                        if (post.profile && post.profile.length > 0 && post.profile[0].area) {
                            const justificationTypeArray = Array.isArray(post.profile[0].area) ? post.profile[0].area : [post.profile[0].area];
                            console.log('post ', post.profile[0].area);
                            if (buscador_tipoArea === "") {
                                return true;
                            } else if (buscador_tipoArea === "Sistemas") {
                                // Filtrar por "Sistemas"
                                return justificationTypeArray.includes('Sistemas');
                            } else if (buscador_tipoArea === "Creativo") {
                                // Filtrar por "Sistemas"
                                return justificationTypeArray.includes('Creativo');
                            } else if (buscador_tipoArea === "Diseño Web") {
                                // Filtrar por "Sistemas"
                                return justificationTypeArray.includes('Diseño Web');
                            } else {
                                return false;
                            }
                        } else {
                            return false;
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

                    .map((post, index) => {

                        return (
                            <div className="bg-cv-primary  text-white  rounded-lg shadow" key={index}>
                                <div className="flex flex-col items-center pb-10  overflow-hidden">
                                    <div className="mt-4 flex items-center">
                                        <div className="justify-start w-15 h-15 overflow-hidden bg-gray-100 rounded-full">
                                            <img
                                                src={post.user[0].media[0].original_url}
                                                alt="Foto de Perfil"
                                                className="md:w-14 md:h-14 rounded-full shadow-lg border-2 border-white"
                                            />
                                        </div>
                                        <div className="text-white ml-4">
                                            <h1>{post.user[0].name} {post.user[0].surname}</h1>
                                        </div>
                                    </div>
                                    <div className="flex mt-4 space-x-3 md:mt-6 text-white">
                                        <ul>
                                            <li className="text-sm font-medium ">
                                                <label className="mr-2">Motivo:</label>
                                                <div className="whitespace-normal">
                                                    <textarea
                                                        className="bg-transparent text-sm align-top w-full h-full resize-none"
                                                        disabled
                                                        value={post.reason}
                                                    ></textarea>
                                                </div>

                                            </li>
                                            <li className="text-sm font-medium flex items-center ">
                                                <p>
                                                    Area: {post.profile && post.profile[0] && post.profile[0].area}

                                                </p>
                                            </li>
                                            <li className="text-sm font-medium flex items-center ">
                                                <label>Fecha: </label>
                                                <div className="w-1/4">
                                                    <input
                                                        className="mx-1 bg-transparent"
                                                        disabled
                                                        value={moment(post.justification_date).format("DD/MM/YYYY")}
                                                    ></input>
                                                </div>
                                            </li>
                                            <li className="text-sm font-medium flex items-center ">
                                                <p>
                                                    Estado: {isRechazadoOrAceptado(post)}
                                                </p>
                                            </li>
                                            <li className="text-sm font-medium flex items-center ">
                                                <p>
                                                    Tipo: {isFaltaOrTardanza(post)}
                                                </p>

                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-black">
                                    <button
                                        className={`block w-full px-3 py-2 text-center rounded-b-lg ${isRechazadoOrAceptado(post) === 'En proceso' ? 'bg-yellow-500' : 'bg-cyan-400'
                                            }`}
                                        onClick={() => {
                                            handleClick(post.id);
                                        }}
                                    >
                                        Revisar
                                    </button>
                                </div>

                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
