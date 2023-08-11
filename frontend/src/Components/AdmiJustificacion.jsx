import { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from 'react-router-dom';
import { PieChart } from '@mui/x-charts';
import { Chart } from "react-google-charts";
import BalanceIcon from '@mui/icons-material/Balance';
import { AES, enc } from "crypto-js";

export const AdmiJustificacion = () => {
    const [faltasList, setFaltasList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [buscador_tipoJustificacion, setbuscador_tipoJustificacion] = useState('')
    const [buscadorStatus, setBuscadorStatus] = useState('')
    const [buscadorFecha, setBuscadorFecha] = useState('')
    const [buscador_tipoArea, setBuscador_tipoArea] = useState('')
    const [buscadorDpto, setBuscadorDpto] = useState('')

    const pieParams = { height: 200, margin: { right: 5 } };


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
            const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
            const token = tokenD.toString(enc.Utf8)
            const response = await fetch(import.meta.env.VITE_API_URL + '/users/justifications', {
                headers: {
                    Authorization: token
                }
            });
            const data = await response.json();
            if (Array.isArray(data.Justifications)) {
                const userApiUrl = import.meta.env.VITE_API_URL + '/profile';
                const userResponse = await fetch(userApiUrl, {
                    headers: {
                        Authorization: token
                    }
                });
                const userData = await userResponse.json();
                // const userShift = userData.Usuario[0].shift;
                const userId = userData.Usuario[0].user_id;
                const filteredData = data.Justifications.filter(
                    (justification) => justification.profile[0].user_id !== userId
                );
                setFaltasList(filteredData);
            } else {
                console.error('Error: No valid justifications data found.');
            }
        } catch (error) {
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
        ["Tipo ", "Cantidad", { role: "style" }],
        ["Falta", calculateBars(faltasList, 'Falta'), "#023e8a"],
        ["Tardanza", calculateBars(faltasList, 'Tardanza'), "#43E8C5"],
    ];

    const options = {
        backgroundColor: '#16232B',
        legend: { position: "none" },
        bar: { groupWidth: "50%" },
        hAxis: {
            title: 'Tipos',
            textStyle: { color: '#ffffff' },
        },
        vAxis: {
            title: 'Cantidad',
            textStyle: { color: '#ffffff' },
        },
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
        textStyle: { color: '#ffffff' },
        gridlines: { color: '#ffffff' },
        viewWindowMode: "pretty",
        viewWindow: {
            min: 0,
            max: maxValue,
        },
    };
    const getFilteredAreas = () => {
        if (buscadorDpto === 'Administrativo') {
            return [
                'Administración',
                'Talento Humano',
            ];
        } else if (buscadorDpto === 'Operativo') {
            return ['Sistemas', 'Comercial', 'Social Media Manager', 'Creativo', 'Medios Audiovisuales', 'Diseño Web'];
        } else if (buscadorDpto === 'Comercial') {
            return ['Comercial'];
        } else {
            return [];
        }
    };

    return (
        <div className="w-full text-white space-y-5">
            <div className="w-full">
                <h1 className="inline-flex items-center text-base font-medium uppercase text-white">
                    <BalanceIcon />
                    <span className='ml-1 text-base font-medium md:ml-2'>Justificaciones</span>
                </h1>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-full bg-cv-primary rounded-2xl p-5 ">
                    <h2 className="mb-5 text-white text-center font-bold text-lg uppercase">Estado de Justificaciones</h2>
                    <div className="flex items-center justify-between gap-4 w-full">
                        <div className="w-full h-auto space-y-2 md:space-y-5">
                            <div className="w-full flex items-center justify-center ">
                                <h2 className="text-lg font-semibold mb-5">Leyenda</h2>
                            </div>
                            <div className="w-full flex items-center justify-between space-x-3">
                                <h3 className="uppercase font-normal">Rechazadas</h3>
                                <div className="w-5 h-5 rounded-full bg-[#FF0000]"></div>
                            </div>
                            <div className="w-full flex items-center justify-between space-x-3">
                                <h3 className="uppercase font-normal">En proceso</h3>
                                <div className="w-5 h-5 rounded-full bg-[#ffee00d7]"></div>
                            </div>
                            <div className="w-full flex items-center justify-between space-x-3">
                                <h3 className="uppercase font-normal">Aceptadas</h3>
                                <div className="w-5 h-5 rounded-full bg-[#24FF00]"></div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center">
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
                                {...pieParams}
                            />
                            {calculateProgress(faltasList, 'Rechazado') === 0 && calculateProgress(faltasList, 'En proceso') === 0 && calculateProgress(faltasList, 'Aceptado') === 0 && (
                                <p className="text-white">No hay datos para mostrar.</p>
                            )}
                        </div>
                    </div>

                </div>
                <div className="w-full bg-cv-primary p-5 rounded-2xl">
                    <h2 className="mb-5 text-white text-center font-bold text-lg uppercase">Tipos de Justificaciones</h2>
                    <div>
                        <Chart chartType="ColumnChart" data={data} options={options} />
                    </div>
                </div>
            </div>


            <div className="mb-3">
                <div className="w-full mb-4 flex flex-col md:flex-row items-center justify-between gap-5">
                    <div className="w-full">
                        <input
                            type="search"
                            className="px-3 py-2 rounded-md outline-none bg-gray-200 placeholder-slate-800 text-cv-primary w-full"
                            placeholder="NOMBRE APELLIDO"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                    {/* Buscador por fecha */}
                    <div className="w-full md:w-64">
                        <input
                            className="px-3 py-2 rounded-md outline-none bg-gray-200 placeholder-slate-800 text-cv-primary w-full"
                            type="date"
                            id="fecha"
                            value={buscadorFecha}
                            onChange={(e) => setBuscadorFecha(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <button
                            type="button"
                            className="w-full px-5 py-3 text-xs md:text-sm font-medium text-center bg-cv-cyan text-cv-primary rounded-md outline-none active:scale-95 ease-in-out duration-300"
                            onClick={onCleanFilter}
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </div>


            <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                {/* Buscador por tipo de justificacion: falta o tardanza */}
                <div className="w-full">
                    <select
                        className="px-3 py-2 rounded-md outline-none bg-gray-200 placeholder-slate-800 text-cv-primary w-full"
                        value={buscador_tipoJustificacion}
                        onChange={(e) => setbuscador_tipoJustificacion(e.target.value)}
                    >
                        <option value="">Tipo de justificación</option>
                        <option value="0">Falta</option>
                        <option value="1">Tardanza</option>
                    </select>
                </div>
                {/* Buscador por tipo de status: en proceso o aceptado */}
                <div className="w-full">
                    <select
                        className="px-3 py-2 rounded-md outline-none bg-gray-200 placeholder-slate-800 text-cv-primary w-full"
                        value={buscadorStatus}
                        onChange={(e) => setBuscadorStatus(e.target.value)}
                    >
                        <option value="">Estado</option>
                        <option value="0">En proceso</option>
                        <option value="1">Aceptado</option>
                        <option value="2">Rechazado</option>
                    </select>
                </div>
                {/* Buscador por departamento */}
                <div className="w-full">
                    <select
                        className="px-3 py-2 rounded-md outline-none bg-gray-200 placeholder-slate-800 text-cv-primary w-full"
                        value={buscadorDpto}
                        onChange={(e) => setBuscadorDpto(e.target.value)}
                    >
                        <option value="">Departamento</option>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Operativo">Operativo</option>
                        <option value="Comercial">Comercial</option>
                    </select>
                </div>
                {/* Buscador por tipo de área */}
                <div className="w-full">
                    <select
                        className="px-3 py-2 rounded-md outline-none bg-gray-200 placeholder-slate-800 text-cv-primary w-full"
                        value={buscador_tipoArea}
                        onChange={(e) => setBuscador_tipoArea(e.target.value)}
                    >
                        <option value="">Núcleo</option>
                        {getFilteredAreas().map((area) => (
                            <option key={area} value={area}>
                                {area}
                            </option>
                        ))}
                    </select>
                </div>

            </div>


            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
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


                    .filter((post) => {
                        const justificationTypeArray = Array.isArray(post.profile[0].department) ? post.profile[0].department : [post.profile[0].department];

                        if (buscadorDpto === "") {
                            return true;
                        } else if (buscadorDpto === "Operativo") {
                            return justificationTypeArray.includes('Operativo');
                        } else if (buscadorDpto === "Administrativo") {
                            return justificationTypeArray.includes('Administrativo');
                        } else if (buscadorDpto === "Comercial") {
                            return justificationTypeArray.includes('Comercial');
                        } else {
                            return false;
                        }
                    })

                    .filter((post) => {
                        if (post.profile && post.profile.length > 0 && post.profile[0].area) {
                            const justificationTypeArray = Array.isArray(post.profile[0].area) ? post.profile[0].area : [post.profile[0].area];
                            if (buscador_tipoArea === "") {
                                return true;
                            } else if (buscador_tipoArea === "Sistemas") {
                                return justificationTypeArray.includes('Sistemas');
                            } else if (buscador_tipoArea === "Creativo") {
                                return justificationTypeArray.includes('Creativo');
                            } else if (buscador_tipoArea === "Diseño Web") {
                                return justificationTypeArray.includes('Diseño Web');
                            } else if (buscador_tipoArea === "Administración") {
                                return justificationTypeArray.includes('Administración');
                            } else if (buscador_tipoArea === "Talento Humano") {
                                return justificationTypeArray.includes('Talento Humano');
                            } else if (buscador_tipoArea === "Social Media Manager") {
                                return justificationTypeArray.includes('Social Media Manager');
                            } else if (buscador_tipoArea === "Medios Audiovisuales") {
                                return justificationTypeArray.includes('Medios Audiovisuales');
                            } else if (buscador_tipoArea === "Comercial") {
                                return justificationTypeArray.includes('Comercial');
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
                            return true;
                        } else if (buscadorStatus === "0") {
                            return justificationTypeArray.includes(0) && post.decline === 0;
                        } else if (buscadorStatus === "1") {
                            return justificationTypeArray.includes(1) && post.decline === 0;
                        } else if (buscadorStatus === "2") {
                            return post.decline === 1;
                        } else {
                            return false;
                        }
                    })

                    .map((post) => (
                        <div className="bg-cv-primary text-white rounded-2xl shadow-2xl" key={post.id}>
                            <div className="w-full flex flex-col items-center justify-between p-4 overflow-hidden">
                                <div className="w-full flex items-center justify-between">
                                    <div className="border-2 border-cv-cyan w-14 h-14 bg-gray-100 rounded-full overflow-hidden">
                                        <img
                                            src={post.user[0].media[0].original_url}
                                            alt="Foto de Perfil"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="text-white font-semibold">
                                        <h2>{post.user[0].name}</h2>
                                        <h2>{post.user[0].surname}</h2>
                                    </div>
                                </div>
                                <div className="w-full flex mt-4 space-x-3 md:mt-6 text-white">
                                    <ul className="w-full space-y-0.5">

                                        <li className="text-sm font-normal flex items-center ">
                                            <p>
                                                <span className="mr-2 uppercase font-semibold mb-1">Area:</span>
                                                <span>
                                                    {post.profile && post.profile[0] && post.profile[0].area}
                                                </span>
                                            </p>
                                        </li>
                                        <li className="text-sm font-normal flex items-center ">
                                            <label className="mr-2 uppercase font-semibold">Fecha:</label>
                                            <div className="w-1/4">
                                                <input
                                                    className="mx-1 bg-transparent"
                                                    disabled
                                                    value={moment(post.justification_date).format("DD/MM/YYYY")}
                                                ></input>
                                            </div>
                                        </li>
                                        <li className="text-sm font-normal flex items-center ">
                                            <p>
                                                <span className="mr-2 uppercase font-semibold mb-1">
                                                    Estado:
                                                </span>
                                                <span>
                                                    {isRechazadoOrAceptado(post)}
                                                    {isRechazadoOrAceptado(post) === 'Aceptado' || isRechazadoOrAceptado(post) === 'Rechazado' ? (
                                                        <span> por {post.action_by_user.name}</span>
                                                    ) : null}
                                                </span>
                                            </p>

                                        </li>
                                        <li className="text-sm font-normal flex items-center ">
                                            <p>
                                                <span className="mr-2 uppercase font-semibold mb-1">
                                                    Tipo:
                                                </span>
                                                <span>{isFaltaOrTardanza(post)}</span>
                                            </p>

                                        </li>
                                        <li className="w-full text-sm font-normal">
                                            <label className="mr-2 uppercase font-semibold mb-1">Motivo:</label>
                                            <div className="whitespace-normal">
                                                <textarea
                                                    className="bg-transparent text-sm align-top w-full h-auto resize-none"
                                                    disabled
                                                    value={post.reason}
                                                ></textarea>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="text-sm font-medium text-cv-primary">
                                <button
                                    className={`block w-full p-4 text-xl text-center uppercase rounded-b-lg ${isRechazadoOrAceptado(post) === 'En proceso' ? 'bg-yellow-500' : 'bg-cv-cyan'
                                        }`}
                                    onClick={() => {
                                        handleClick(post.id);
                                    }}
                                >
                                    Revisar
                                </button>
                            </div>

                        </div>

                    ))}
            </div>
        </div>
    );
};
