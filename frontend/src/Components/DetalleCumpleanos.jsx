import React from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';

export const DetalleCumpleanos = () => {
    const navigate = useNavigate();
    const { month, day } = useParams();
    const location = useLocation();
    const { birthdayPeople } = location.state || [];

    const handleGoBack = () => {
        navigate('/cumpleanos');
    };

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
                            <CardContent >
                                <Typography variant="body2" sx={{ color: '#FFFFFF' }} className="flex justify-center" >
                                    <img src={person.photo} alt="" />
                                </Typography>
                                <Typography variant="h5" component="div" sx={{ color: '#FFFFFF' }}>
                                    Nombre: {person.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                    Fecha de cumpleaños: {person.birthday.toLocaleDateString()}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ color: '#FFFFFF' }}>
                                    Ciudad: {person.city}
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