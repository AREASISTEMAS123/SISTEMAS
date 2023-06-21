import { useState, useEffect } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
export const AdmiJustificacion = () => {
    const [faltasList, setFaltasList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [filteredNames, setFilteredNames] = useState([]);

    const handleClick = (id) => {
        setSelectedCard(id);
        setShowModal(true);
    };
    const closeJusti = () => {
        setShowModal(false);
    };

    const handleSearch = (e) => {
        const search = e.target.value;
        setSearch(search);

        const filteredNames = faltasList.filter((persona) =>
            persona.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredNames(filteredNames);
    };


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
                                    <CardContent >
                                        <Typography variant="h5" component="div" sx={{ color: '#FFFFFF' }}>
                                            {post.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                            Fecha: {post.fecha}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                            Razón: {post.razon}
                                        </Typography>
                                        <div className='mt-2'>
                                            <hr></hr>
                                        </div>
                                        <div className="flex  pt-3">
                                            <dt className="mb-1  md:text-lg text-white  mx-8">En proceso</dt>
                                            <button className="ml-10"
                                                onClick={() => handleClick(post.id)}>
                                                <KeyboardArrowRightIcon sx={{ color: 'white' }} />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>

                    )
                })
                }
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-slate-500 p-4 shadow max-w-md text-white">
                      {faltasList.map((item) => {
                        if (item.id === selectedCard) {
                          return (
                            <div key={item.id} className="card selected">
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
                                <button className="bg-slate-700 p-2" onClick={closeJusti}>
                                  Aceptar
                                </button>
                                <button className="bg-slate-700 p-2 mx-4">Rechazar</button>
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
