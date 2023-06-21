import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';

export const DetalleCumpleanos = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [birthdayPeople, setBirthdayPeople] = useState([]);
    const { month, day } = useParams();

    const handleGoBack = () => {
        navigate('/cumpleanos');
    };

    useEffect(() => {
        const fetchBirthdayPeople = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/birthday/details', {
                    headers: {
                        Authorization: 'Bearer 6|J2Lph2hLdcCYPWYVBVVznEaW2peo1HBGrhQr4CZC'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const filteredBirthdayPeople = data.filter(person => {
                        const personMonth = new Date(person.birthday).getUTCMonth() + 1;
                        const personDay = new Date(person.birthday).getUTCDate();
                        return personMonth === parseInt(month) && personDay === parseInt(day);
                    });
                    setBirthdayPeople(filteredBirthdayPeople);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchBirthdayPeople();
    }, [month, day]);

    return (
        <div className="container mx-auto mt-4">
            <button className="text-white font-bold w-32 h-10 hover:bg-gray-700" onClick={handleGoBack}>
                <KeyboardBackspaceTwoToneIcon />
            </button>
            <h2 className="text-2xl font-bold mt-4 text-white">Personas que cumplen años el {day}/{month}</h2>
            <div className='grid grid-cols-3 gap-4 flex justify-items-start'>
                {birthdayPeople && birthdayPeople.length > 0 ? (
                    birthdayPeople.map(person => (
                        <Card key={person.id} className="my-4 max-w-[90%] min-w-[90%]" sx={{ backgroundColor: '#16232B' }}>
                            <CardContent>
                                <Typography variant="body2" sx={{ color: '#FFFFFF' }} className="flex justify-center" >
                                    <img src={person.user[0].photo} alt="" />
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ color: '#FFFFFF' }}>
                                    Nombre: {person.user[0].name} {person.user[0].surname}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                    Fecha de cumpleaños: {person.birthday}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                    Correo electrónico: {person.user[0].email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                    Teléfono: {person.cellphone}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                    Área: {person.area}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                    Turno: {person.shift}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                    Departamento: {person.department}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <Typography variant="body1" color="text.secondary" sx={{ color: '#FFFFFF' }} className='col-span-2'>
                        No hay personas que cumplan años en esta fecha.
                    </Typography>
                )}
            </div>
        </div>
    );
};