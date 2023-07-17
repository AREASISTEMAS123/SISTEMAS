import { useState, useEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import moment from 'moment';

export const AdmiJustificacion = () => {
  const [faltasList, setFaltasList] = useState([]);
  const [showDatos, setShowDatos] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardJustificar, setCardJustificar] = useState(false);
  const [cardStatus, setCardStatus] = useState({});
  const [showDetalleButton, setShowDetalleButton] = useState(false);
  const [showDetalleCard, setshowDetalleCard] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const handleClick = (id) => {
    setSelectedCard(id);
    setShowDatos(true);
  };

  const llenarJustificacionAceptar = () => {
    setCardJustificar(true);
    setShowDatos(false);
    cardStatus[selectedCard] = "Aceptado";
  };
  const llenarJustificacionRechazar = () => {
    setCardJustificar(true);
    setShowDatos(false);
    cardStatus[selectedCard] = "Rechazado";
  };
  const closeJustificacion = () => {
    setCardJustificar(false);
    if (cardStatus[selectedCard] === "Aceptado") {
      setCardStatus((prevStatus) => ({
        ...prevStatus,
        [selectedCard]: "Aceptado",
      }));
    } else {
      setCardStatus((prevStatus) => ({
        ...prevStatus,
        [selectedCard]: "Rechazado",
      }));
    }
    setShowDetalleButton((prevShowDetalleCard) => ({
      ...prevShowDetalleCard,
      [selectedCard]: true,
    }));
  };
  const regresar = () => {
    setCardJustificar(false);
    setShowDatos(true);
    if (cardStatus[selectedCard] === "Aceptado") {
      setCardStatus((prevStatus) => ({
        ...prevStatus,
        [selectedCard]: "Rechazado",
      }));
    } else {
      setCardStatus((prevStatus) => ({
        ...prevStatus,
        [selectedCard]: "Rechazado",
      }));
    }
  };
  const closeX = () => {
    if (cardStatus[selectedCard] === "Aceptado") {
      setCardJustificar(false);
    } else {
      setCardJustificar(false);
      setCardStatus((prevStatus) => ({
        ...prevStatus,
        [selectedCard]: "Rechazado",
      }));
    }
  };


  const cerrar = () => {
    setShowDatos(false);
  }
  const onClickDetalle = () => {
    setshowDetalleCard(true);
  };
  const closeDetalle = () => {
    setshowDetalleCard(false);
  };
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
  useEffect(() => {
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
        setFaltasList(people);
        console.log(data);
        console.log(people);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <>
      <div className="text-center font-semibold text-6xl	text-white	mb-5">
        <h1>Justificaciones</h1>
      </div>
      <div className="mb-3 inline-block">
        <div className=" mb-4 flex flex-wrap items-stretch">
          <input
            type="search"
            className="text-white relative m-0 -mr-0.5 bg-gray-50 placeholder-white min-w-0  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] "
            placeholder="Nombre"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

        </div>
      </div>
      <div className="ml-6 mb-3 inline-block">
        <input
          type="date"
          className="text-white relative m-0 -mr-0.5  min-w-0  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] "
          placeholder="Nombre"
        />
      </div>
      <div className="ml-10 mb-3 inline-block">
        <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Elige un Departamento</option>
          <option value="Es">Estrategico</option>
          <option value="Op">Operaciones</option>
          <option value="Re">Recursos Humanos</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-cv-secondary min-w-sm">
        {faltasList
          .filter((post) =>
            post.name.toLowerCase().includes(searchInput.toLowerCase())
          )

          .map((post) => {
            return (
              <div className="bg-cv-primary border border-gray-200 rounded-lg shadow" key={post.id}>
                <div className="flex flex-col items-center pb-10">
                  <div className="flex mt-4">
                    <div className="relative w-15 h-15 overflow-hidden bg-gray-100 rounded-full">
                      <img src="https://images.pexels.com/photos/3579181/pexels-photo-3579181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Foto de Perfil" className="md:w-14 md:h-14 rounded-full shadow-lg border-2 border-white" />
                    </div>
                    <h5 className="ml-10 text-center p-3 text-xl font-medium text-white">{post.name}</h5>
                  </div>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <ul>
                      <li className="px-4 py-2 text-sm font-medium text-start text-white rounded-lg">
                        <label>Razón</label>
                        <textarea
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          disabled
                          value={post.razon}
                        ></textarea>
                      </li>
                      <li className="text-start px-4 py-2 text-sm font-medium text-white">
                        <label>Fecha</label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                          disabled
                          value={post.fecha}
                        ></input>
                      </li>
                    </ul>
                  </div>
                  <div className="px-4 py-2 text-sm font-medium rounded-tl text-white">
                    <button className="rounded-lg bg-slate-700 p-2" onClick={handleDownload}>Descargar archivos adjuntados</button>
                  </div>
                  <div className="px-4 py-2 text-sm font-medium rounded-tl  justify-center">
                    <button
                      className="ml-10 text-white text-center"
                      onClick={() => handleClick(post.id)}>
                      {cardStatus[post.id] || "Rechazado"}
                      <KeyboardArrowRightIcon
                        className=""
                        sx={{ color: "white" }}
                      />
                    </button>
                  </div>
                  <div>
                    {cardStatus[post.id] && showDetalleButton && (
                      <button
                        className="text-white ml-10"
                        onClick={onClickDetalle}>
                        Detalle
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        {showDatos && (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className=" relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg] ">
                {faltasList.map((item) => {
                  if (item.id === selectedCard) {
                    return (
                      <div key={item.id} className="px-6 py-6 lg:px-8">
                        <button onClick={cerrar}>
                          <CloseIcon />
                        </button>
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <form className="space-y-6" action="#">
                          <div>
                            <label>Departamento</label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              disabled
                            />
                          </div>
                          <div>
                            <label>Fecha de falta o tardanza:</label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              disabled

                            />
                          </div>
                          <div>
                            <label>Pruebas Adjuntas:</label>
                            <button
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                              placeholder="haz click para descargar el archivo"
                              onClick={handleDownload}
                            />
                          </div>
                          <div>
                            <label>Razón de la falta o tardanza:</label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              disabled
                            />
                          </div>
                          <div className="flex items-center p-6 border-t border-gray-200 rounded-b ">
                            <button
                              onClick={llenarJustificacionAceptar}
                              className="text-white bg-cv-secondary hover:bg-slate-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                              ACEPTAR
                            </button>
                            <button
                              onClick={llenarJustificacionRechazar}
                              className="bg-amber-300 hover:bg-amber-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-10"
                            >
                              RECHAZAR
                            </button>
                          </div>
                        </form>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        )}
        {cardJustificar && (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">
                {faltasList.map((item) => {
                  if (item.id === selectedCard) {
                    return (
                      <div key={item.id} className="card selected">
                        <button onClick={closeX}>
                          <CloseIcon />
                        </button>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <div className="p-6 space-y-6">
                          <label className="block mb-2 text-l font-medium text-gray-900 dark:text-white">
                            Razón
                          </label>
                          <textarea
                            maxLength={500}
                            className="text-black py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                            rows="3"
                          ></textarea>
                          <p>Maximo 500 caracteres</p>
                        </div>

                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button
                            onClick={closeJustificacion}
                            className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            ACEPTAR
                          </button>
                          <button
                            onClick={regresar}
                            className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            REGRESAR
                          </button>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        )}
        {showDetalleCard && (
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">
                {faltasList.map((item) => {
                  if (item.id === selectedCard) {
                    return (
                      <div key={item.id} className="px-6 py-6 lg:px-8">
                        <button onClick={closeDetalle}>
                          <CloseIcon />
                        </button>
                        <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <form className="space-y-6" action="#">
                          <div>
                            <label>Departamento</label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              disabled
                            />
                          </div>
                          <div>
                            <label>Fecha de falta o tardanza:</label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              disabled
                            />
                          </div>
                          <div>
                            <label>Pruebas Adjuntas:</label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              disabled
                            />
                          </div>
                          <div>
                            <label>Razón de la falta o tardanza:</label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              disabled
                            />
                          </div>
                          <div>
                            <label>Motivo de Aceptación o Rechazo:</label>
                            <input
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              disabled
                            />
                          </div>
                        </form>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
