import { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
export const AdmiJustificacion = () => {
    const [faltasList, setFaltasList] = useState([]);
    const [showDatos, setShowDatos] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [cardJustificar, setCardJustificar] = useState(false);
    const [filteredNames, setFilteredNames] = useState([]);
    const [cardStatus, setCardStatus] = useState({});


    const handleClick = (id) => {
        setSelectedCard(id);
        setShowDatos(true);
    };
    const closeDatos = () => {
        setShowDatos(false)
        setCardStatus((prevStatus) => ({
            ...prevStatus,
            [selectedCard]: 'En proceso',
        }));

    };

    const handleSearch = (e) => {
        const search = e.target.value;
        setSearch(search);

        const filteredNames = faltasList.filter((persona) =>
            persona.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredNames(filteredNames);
    };

    const llenarJustificacion = () => {
        setCardJustificar(true);
        setShowDatos(false);
        setCardStatus((prevStatus) => ({
            ...prevStatus,
            [selectedCard]: 'Finalizado',
        }));
    };
    const closeJustificacion = () => {
        setCardJustificar(false);
        setCardStatus((prevStatus) => ({
            ...prevStatus,
            [selectedCard]: 'Finalizado',
        }));
    }
    const regresar = () => {
        setCardJustificar(false);
        setShowDatos(true);
        setCardStatus((prevStatus) => ({
            ...prevStatus,
            [selectedCard]: 'En proceso',
        }));

    }
    const closeX = () =>{
        setCardJustificar(false);
        setCardStatus((prevStatus) => ({
            ...prevStatus,
            [selectedCard]: 'En proceso',
        }));
    }

    useEffect(() => {

        fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(data => {
                const results = data.results;
                const people = results.map(user => {
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
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <>
            <div className="mb-3">
                <div className=" mb-4 flex flex-wrap items-stretch">
                    <input
                        type="search"
                        className="text-white relative m-0 -mr-0.5  min-w-0  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] "
                        placeholder="Nombre"
                        value={search}
                        onChange={handleSearch}
                    />
                    <button>
                        <SearchIcon sx={{ color: 'white' }} />
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-3">
                {faltasList.map((post) => {
                    return (
                        <Grid key={post.id} container spacing={5}>
                            <Grid item xs={12}>
                                <Card className="my-4 max-w-[90%] min-w-[90%]" sx={{ backgroundColor: '#16232B' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div" sx={{ color: '#FFFFFF' }}>
                                            {post.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                            Fecha: {post.fecha}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                            Razón: {post.razon}
                                        </Typography>
                                        <div className="mt-2">
                                            <hr></hr>
                                        </div>
                                        <div className="flex pt-3">
                                            <button className="ml-10 text-white" onClick={() => handleClick(post.id)}>
                                                {cardStatus[post.id] || 'En proceso'}
                                                <KeyboardArrowRightIcon className="" sx={{ color: 'white' }} />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    );
                })}
                {showDatos && (
                    <div className="fixed inset-0 flex items-center justify-center z-10">
                        <div className="bg-slate-500 p-4 shadow max-w-md text-white">
                            {faltasList.map((item) => {
                                if (item.id === selectedCard) {
                                    return (
                                        <div key={item.id} className="card selected">
                                            <button onClick={closeDatos}>
                                                <CloseIcon />
                                            </button>
                                            <h5 className="ml-10 mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                                                {item.name}
                                            </h5>
                                            <div className="mt-4 space-x-3 md:mt-6">
                                                <ul>
                                                    <li className="inline-block px-4 py-1 text-sm font-medium text-black rounded-lg">
                                                        <label>Departamento</label>
                                                        <input className="mx-1 border-2" disabled></input>
                                                    </li>
                                                    <li className="inline-block px-4 py-1 text-sm font-medium text-black rounded-lg">
                                                        <label>Fecha de falta o tardanza:</label>
                                                        <input className="mx-1 border-2" disabled></input>
                                                    </li>
                                                    <li className="inline-block px-4 py-1 text-sm font-medium text-black rounded-lg">
                                                        <label>Pruebas adjuntas:</label>
                                                        <input className="mx-1 border-2" disabled></input>
                                                    </li>
                                                    <li className="inline-block px-4 py-1 text-sm font-medium text-black rounded-lg">
                                                        <label>Razon: </label>
                                                        <input className="mx-1 border-2" disabled></input>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="px-4 py-2 text-sm font-medium rounded-tl text-white mx-3 text-center">
                                                <button className="bg-slate-700 p-2" onClick={llenarJustificacion}>
                                                    Aceptar
                                                </button>
                                                <button className="bg-slate-700 p-2 ml-2" onClick={llenarJustificacion}>
                                                    Rechazar
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
                )}
                {cardJustificar && (
                    <div className="fixed inset-0 flex items-center justify-center z-10 ">
                        <div className="bg-slate-500 p-4  max-w-md text-white card w-96 bg-base-100 shadow-xl">
                            {faltasList.map((item) => {
                                if (item.id === selectedCard) {
                                    return (
                                        <div key={item.id} className="card selected">
                                            <button onClick={closeX}>
                                                <CloseIcon />
                                            </button>
                                            <h5 className="ml-10 mb-1 text-xl text-center font-medium text-gray-900 dark:text-white">
                                                {item.name}
                                            </h5>
                                            <div className="mb-6">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razón</label>
                                                <textarea maxLength={500} className="text-black py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" rows="3"></textarea>
                                                <p>Maximo 500 caracteres</p>
                                            </div>
                                            <div className="px-4 py-2 text-sm font-medium rounded-tl text-white mx-3 text-center">
                                                <button className="bg-slate-700 p-2" onClick={closeJustificacion}>
                                                    Aceptar
                                                </button>
                                                <button className="bg-slate-700 p-2 ml-2" onClick={regresar}>
                                                    Regresar
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
                )}
            </div>
        </>

    );
}
