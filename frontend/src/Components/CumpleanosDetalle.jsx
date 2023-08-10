import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';

export const CumpleanosDetalle = () => {
    const navigate = useNavigate();
    const [birthdayUser, setBirthdayUser] = useState([]);
    const { month, day } = useParams();

    const handleGoBack = () => {
        navigate('/cumpleanos');
    };

    useEffect(() => {
        const fetchBirthdayUser = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + '/birthday/details', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const filteredBirthdayUser = data.users.filter(user => {
                        const userMonth = new Date(user.profile.birthday).getUTCMonth() + 1;
                        const userDay = new Date(user.profile.birthday).getUTCDate();
                        return userMonth === parseInt(month) && userDay === parseInt(day);
                    });
                    setBirthdayUser(filteredBirthdayUser);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBirthdayUser();
    }, [month, day]);

    return (
        <div className="container mx-auto mt-4 min-h-screen">
            <button className="bg-cv-cyan hover:bg-cv-primary text-cv-primary hover:text-cv-cyan font-bold w-12 h-12 md:w-32 md:h-10" onClick={handleGoBack}>
                <KeyboardBackspaceTwoToneIcon />
            </button>
            <h2 className="text-2xl md:text-4xl font-bold mt-4 text-white">Personas que cumplen años el {day}/{month}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 b mt-4 gap-4">
                {birthdayUser && birthdayUser.length > 0 ? (
                    birthdayUser.map((user) => (
                        <div className="flex flex-col bg-cv-primary rounded-lg shadow-lg" key={user.id}>
                            <div className='grid justify-items-center'>
                            <img
                                className="h-48 md:h-64 w-48 md:w-64 rounded-full"
                                src={user.media[0].original_url}
                                alt="Imagen del usuario"
                            />
                            </div>
                            <div className="p-4 flex flex-col justify-between text-white flex-1">
                                <div>
                                    <p className="text-sm flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                            <path d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1 0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4l0 0 0 0 .1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8l0 0 0 0 0 0 .1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9V288c0-35.3-28.7-64-64-64V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H128V176zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V394.6z" />
                                        </svg>
                                        &nbsp; &nbsp;
                                        {user.profile.birthday}
                                    </p>
                                    <div className="font-bold text-center text-xl mb-2">
                                        {user.name} {user.surname}
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 ">
                                        <div className="flex flex-col ">
                                            <div className="mx-3 text-white text-base font-semibold my-2">
                                                <div>
                                                    <div>Departamento:</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col ">
                                            <div className="mx-3 text-white text-base font-semibold my-2">
                                                <div>
                                                    <div>{user.profile.department}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 ">
                                        <div className="flex flex-col ">
                                            <div className="mx-3 text-white text-base font-semibold my-2">
                                                <div>
                                                    <div>Area:</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col ">
                                            <div className="mx-3 text-white text-base font-semibold my-2">
                                                <div>
                                                    <div>{user.profile.area}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 ">
                                        <div className="flex flex-col ">
                                            <div className="mx-3 text-white text-base font-semibold my-2">
                                                <div>
                                                    <div>Perfil:</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col ">
                                            <div className="mx-3 text-white text-base font-semibold my-2">
                                                <div>
                                                    <div>{user.profile.profile_name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 ">
                                        <div className="flex flex-col ">
                                            <div className="mx-3 text-white text-base font-semibold my-2">
                                                <div>
                                                    <div>Turno:</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col ">
                                            <div className="mx-3 text-white text-base font-semibold my-2">
                                                <div>
                                                    <div>{user.profile.shift}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ color: '#FFFFFF' }} className="col-span-2">
                        No hay personas que cumplan años en esta fecha.
                    </Typography>
                )}
            </div>
        </div>
    );
};