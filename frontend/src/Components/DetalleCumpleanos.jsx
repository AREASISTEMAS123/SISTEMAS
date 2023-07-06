import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import KeyboardBackspaceTwoToneIcon from '@mui/icons-material/KeyboardBackspaceTwoTone';

export const DetalleCumpleanos = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [birthdayUser, setBirthdayUser] = useState([]);
    const { month, day } = useParams();

    const handleGoBack = () => {
        navigate('/cumpleanos');
    };

    useEffect(() => {
        const fetchBirthdayUser = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/birthday/details', {
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
            <button className="text-white font-bold w-12 h-12 md:w-32 md:h-10 hover:bg-gray-700" onClick={handleGoBack}>
                <KeyboardBackspaceTwoToneIcon />
            </button>
            <h2 className="text-2xl md:text-4xl font-bold mt-4 text-white">Personas que cumplen años el {day}/{month}</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex justify-items-start'>
                {birthdayUser && birthdayUser.length > 0 ? (
                    birthdayUser.map(user => (
                        <Card key={user.id} className="my-4 max-w-[90%] min-w-[90%]" sx={{ backgroundColor: '#16232B' }}>
                            <CardContent>
                            <Typography variant="h9" component="div" sx={{ color: '#FFFFFF' }} className="text-2xl md:text-xl lg:text-lg">
                                    <img src={user.media[0].original_url} alt="" />
                                </Typography>
                                <Typography variant="h9" component="div" sx={{ color: '#FFFFFF' }} className="text-2xl md:text-xl lg:text-lg">
                                    {user.name} {user.surname}
                                </Typography>
                                <Typography variant="h9" component="div" sx={{ color: '#FFFFFF' }} className="text-2xl md:text-xl lg:text-lg">
                                    Cumpleaños: {user.profile.birthday}
                                </Typography>
                                <Typography variant="h9" component="div" sx={{ color: '#FFFFFF', wordWrap: 'break-word'}} className="text-2xl md:text-xl lg:text-lg" >
                                    {user.email}
                                </Typography>
                                <Typography variant="h9" component="div" sx={{ color: '#FFFFFF' }} className="text-2xl md:text-xl lg:text-lg">
                                    {user.profile.profile_name}
                                </Typography>
                                <Typography variant="h9" component="div" sx={{ color: '#FFFFFF' }} className="text-2xl md:text-xl lg:text-lg">
                                    Área: {user.profile.area}
                                </Typography>
                                <Typography variant="h9" component="div" sx={{ color: '#FFFFFF' }} className="text-2xl md:text-xl lg:text-lg">
                                    Turno: {user.profile.shift}
                                </Typography>
                                <Typography variant="h9" component="div" sx={{ color: '#FFFFFF' }} className="text-2xl md:text-xl lg:text-lg">
                                    Departamento: {user.profile.department}
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