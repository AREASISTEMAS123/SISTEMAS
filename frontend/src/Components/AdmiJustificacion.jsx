import { useState, useEffect } from "react";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
export const AdmiJustificacion = () => {
  const [faltasList, setFaltasList] = useState([]);
  const [showDatos, setShowDatos] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardJustificar, setCardJustificar] = useState(false);
  const [filteredNames, setFilteredNames] = useState([]);
  const [cardStatus, setCardStatus] = useState({});
  const [showDetalleButton, setShowDetalleButton] = useState(false);
  const [showDetalleCard, setshowDetalleCard] = useState(false);

  const handleClick = (id) => {
    setSelectedCard(id);
    setShowDatos(true);
  };
  const closeDatos = () => {
    setShowDatos(false);
    if (cardStatus[selectedCard] === "Aceptado") {
      setShowDatos(false);
    } else {
      setShowDatos(false);
      setCardStatus((prevStatus) => ({
        ...prevStatus,
        [selectedCard]: "Rechazado",
      }));
    }
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filteredNames = faltasList.filter((persona) =>
      persona.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredNames(filteredNames);
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
        [selectedCard]: "Aceptado",
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

  const onClickDetalle = () => {
    setshowDetalleCard(true);
  };
  const closeDetalle = () => {
    setshowDetalleCard(false);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => {
        const results = data.results;
        const people = results.map((user) => {
          const { registered, name, gender } = user;
          return {
            id: user.login.uuid,
            name: `${name.first} ${name.last}`,
            fecha: registered.age,
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
            value={search}
            onChange={handleSearch}
          />
          <button>
            <SearchIcon sx={{ color: "white" }} />
          </button>
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

      <div className="grid grid-cols-3">
        {faltasList.map((post) => {
          return (
            <Grid key={post.id} container spacing={5}>
              <Grid item xs={12}>
                <Card
                  className="my-4 max-w-[90%] min-w-[90%]"
                  sx={{ backgroundColor: "#16232B" }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ color: "#FFFFFF" }}
                    >
                      {post.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#FFFFFF" }}
                    >
                      Fecha: {post.fecha}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ color: "#FFFFFF" }}
                    >
                      Razón: {post.razon}
                    </Typography>
                    <div className="mt-2">
                      <hr></hr>
                    </div>
                    <div className="flex pt-3">
                      <button
                        className="ml-10 text-white"
                        onClick={() => handleClick(post.id)}
                      >
                        {cardStatus[post.id] || "Rechazado"}
                        <KeyboardArrowRightIcon
                          className=""
                          sx={{ color: "white" }}
                        />
                      </button>
                      {cardStatus[post.id] && showDetalleButton && (
                        <button
                          className="text-white ml-10"
                          onClick={onClickDetalle}
                        >
                          Detalle
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          );
        })}
        {showDatos && (
          <div className="fixed inset-0 flex items-center justify-center z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className=" bg-slate-500 relative w-full max-w-md max-h-full">
              <div className="relative bg-slate-500 p-4  max-w-md rounded-lg shadow dark:bg-gray-700">
                {faltasList.map((item) => {
                  if (item.id === selectedCard) {
                    return (
                      <div key={item.id} className="px-6 py-6 lg:px-8">
                        <button onClick={closeDatos}>
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

                          <button
                            onClick={llenarJustificacionAceptar}
                            className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            ACEPTAR
                          </button>
                          <button
                            onClick={llenarJustificacionRechazar}
                            className="w-full text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            RECHAZAR
                          </button>
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
          <div className="fixed inset-0 flex items-center justify-center z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-md max-h-full">
              <div className="bg-slate-500 p-4  max-w-md text-white card w-96 bg-base-100 shadow-xl">
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
          <div className="fixed inset-0 flex items-center justify-center z-10 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative w-full max-w-md max-h-full">
              <div className="bg-slate-500 p-4  max-w-md text-white card w-96 bg-base-100 shadow-xl">
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
