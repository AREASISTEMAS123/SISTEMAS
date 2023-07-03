import { useState } from "react";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useEffect } from "react";
import moment from 'moment';


export const JustificacionColaborador = () => {
    const [card, setCard] = useState([]);
    const [showTerminos, setShowTerminos] = useState(false);
    const [showJusti, setShowJusti] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const [forms, setForms] = useState({
        fecha: '',
        razon: ''
    });

    const { fecha, razon } = forms;

    const onInputChange = ({ target: { name, value } }) => {
        setForms({
            ...forms,
            [name]: value
        });
    };

    useEffect(() => {
        // Fetch data from the API
        fetch("https://randomuser.me/api/?results=10")
            .then((response) => response.json())
            .then((data) => {
                const results = data.results;
                const people = results.map((user) => {
                    const { registered, name, gender } = user;
                    const formattedDate = moment(registered.date).format('DD/MM/YYYY'); // Formato de fecha deseado

                    return {
                        id: user.login.uuid,
                        name: `${name.first} ${name.last}`,
                        fecha: formattedDate,
                        razon: gender,
                    };
                });
                setCard(people);
                console.log(data);
                console.log(people);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    /*mostrar card de terminos*/
    const onShowTerminos = () => {
        setShowTerminos(true);
    };
    /*presionar aceptar a los terminos */
    const onAceptTerminos = () => {
        setShowTerminos(false);
        setShowJusti(true);
    };

    /*cerrar card de terminos*/
    const onCloseTerminos = () => {
        setShowTerminos(false);
    }

    const closeJusti = () => {
        setShowJusti(false);
        setCard(prevCards => [
            ...prevCards,
            { fecha: forms.fecha, razon: forms.razon }
        ]);
        setForms({ fecha: '', razon: '' }); // Reset the form inputs
    };

    const onCancelJusti = () => {
        setShowJusti(false);
    }
    const handleDownload = () => {
        // Crear contenido del archivo
        const fileContent = "Contenido del archivo que deseas descargar";

        // Crear objeto Blob a partir del contenido del archivo
        const blob = new Blob([fileContent], { type: "text/plain" });

        // Crear URL del objeto Blob
        const url = URL.createObjectURL(blob);

        // Crear un enlace temporal y simular un clic para descargar el archivo
        const link = document.createElement("a");
        link.href = url;
        link.download = "archivo.txt";
        link.click();

        // Liberar el objeto URL
        URL.revokeObjectURL(url);
    };


    return (
        <>
            <div className="min-w-sm ">
                <h1 className="my-2 text-center font-semibold text-4xl text-white">Justificaciones</h1>
                <div className="grid grid-cols-6 gap-4 my-10">
                    <div className="col-start-1 col-end-3">
                        <button
                            type="button"
                            className="px-3  py-2 text-xs font-medium text-center bg-cyan-400  border-2 rounded-md  mx-5  border-black"
                            onClick={onShowTerminos}>
                            AGREGAR JUSTIFICACIÓN
                        </button>
                    </div>
                    <div className="col-end-7 col-span-2">
                        <input
                            className="border-2  text-center rounded-md  bg-gray-200 placeholder-black"
                            placeholder="BUSCAR"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />

                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-cv-secondary min-w-sm">
                    {card
                        .filter((post) =>
                            post.name.toLowerCase().includes(searchInput.toLowerCase())
                        )

                        .map((post) => (
                            <div className="bg-white border border-gray-200 rounded-lg shadow" key={post.id}>
                                <div className="flex flex-col items-center pb-10">
                                    {/* Contenido de la tarjeta */}
                                    <div className="flex mt-4">
                                        <div className="relative w-15 h-15 overflow-hidden bg-gray-100 rounded-full">
                                            <img src="https://images.pexels.com/photos/3579181/pexels-photo-3579181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Foto de Perfil" className="md:w-14 md:h-14 rounded-full shadow-lg border-2 border-white" />
                                        </div>
                                        <h5 className="ml-10 text-center p-3 text-xl font-medium text-gray-900">{post.name}</h5>
                                    </div>

                                    <div className="flex mt-4 space-x-3 md:mt-6">
                                        <ul>
                                            <li className="px-4 py-2 text-sm font-medium text-start text-black rounded-lg">
                                                <label>Razón</label>
                                                <textarea
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    disabled
                                                    value={post.razon}
                                                ></textarea>
                                            </li>
                                            <li className="text-start px-4 py-2 text-sm font-medium text-black">
                                                <label>Fecha</label>
                                                <input
                                                    className="mx-1 border-2"
                                                    disabled
                                                    value={post.fecha}
                                                ></input>
                                            </li>
                                        </ul>

                                    </div>
                                    <div className="px-4 py-2 text-sm font-medium rounded-tl text-white">
                                        <button className="rounded-lg bg-slate-700 p-2" onClick={handleDownload}>Descargar archivos adjuntados</button>
                                    </div>
                                    <div className="px-4 py-2 text-sm font-medium rounded-tl justify-start ">
                                        <p>
                                            Estado:
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                    <div className="fixed inset-0 flex items-center justify-center  top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        {/* Formulario */}
                        <div className="relative w-full max-w-md max-h-full">
                            <div className="bg-white relative  rounded-lg shadow">
                                <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " onClick={onCancelJusti}>
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" ></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="px-6 py-6 lg:px-8">
                                    <h2 className="mb-4 text-xl font-medium text-gray-900 text-center ">
                                        Agregar Justificacion
                                    </h2>
                                    <form className="space-y-6">
                                        <div className="m-2">
                                            <select
                                                name="fecha"
                                                value={fecha}
                                                onChange={onInputChange}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                <option value="">Elige fecha a justificar</option>
                                                <option value="12/06/2023">12/06/2023</option>
                                                <option value="11/06/2023">11/06/2023</option>
                                                <option value="10/06/2023">10/06/2023</option>
                                                <option value="9/06/2023">09/06/2023</option>
                                            </select>
                                        </div>
                                        <div className="m-2">
                                            <textarea
                                                rows="4"
                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Escriba su razón aqui..."
                                                name="razon"
                                                value={razon}
                                                onChange={onInputChange}
                                            ></textarea>
                                        </div>
                                        <div className="m-2">
                                            <input
                                                className="block w-full text-sm text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                type="file"
                                                multiple
                                            />
                                        </div>
                                    </form>
                                </div>

                                <div className="flex justify-center p-6  border-gray-200 rounded-b ">
                                    <button
                                        className="text-white bg-cv-secondary hover:bg-slate-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                        onClick={closeJusti}>ACEPTO</button>
                                    <button onClick={onCancelJusti} className="bg-amber-300 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-10">
                                        CERRAR
                                    </button>
                                </div>



                            </div>
                        </div>


                    </div>
                )}

            </div>


        </>
    );
};
