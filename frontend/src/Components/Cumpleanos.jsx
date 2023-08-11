import { useMediaQuery } from '@mui/material';
import { AES, enc } from 'crypto-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cumpleanos = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [birthdayList, setBirthdayList] = useState([]);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:768px)");

    useEffect(() => {
        const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
        const token = tokenD.toString(enc.Utf8)
        fetch(import.meta.env.VITE_API_URL + '/birthday', {
            headers: {
                Authorization: `Bearer ${token}`
                // Authorization: `Bearer 6|J2Lph2hLdcCYPWYVBVVznEaW2peo1HBGrhQr4CZC`
            }
        })
            .then(response => response.json())
            .then(data => {
                const people = data.map(user => {
                    const dateOfBirth = new Date(user.birthday);
                    return {
                        birthday: dateOfBirth
                    };
                });
                setBirthdayList(people);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const renderDaysOfWeek = () => {
        const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
        return daysOfWeek.map((day, index) => (
            <div key={index} className="text-center text-gray-700 font-bold rounded-full bg-gray-200 p-2">
                {day}
            </div>
        ));
    };

    const renderCalendarDays = () => {
        const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

        const startDate = new Date(startOfMonth);
        startDate.setDate(startDate.getDate() - startDate.getDay());

        const endDate = new Date(endOfMonth);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

        const calendarDays = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            calendarDays.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return calendarDays.map((date) => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday =
                date.getFullYear() === new Date().getFullYear() &&
                date.getMonth() === new Date().getMonth() &&
                date.getDate() === new Date().getDate();

            const dayClassName = `hover:bg-blue-700 ${isToday ? 'bg-blue-500 text-white hover:bg-sky-700' : isCurrentMonth ? '' : 'text-gray-400 hover:bg-gray-700'
                }`;

            const birthdayPeople = birthdayList.filter((person) => {
                const personMonth = person.birthday.getMonth();
                const personDay = person.birthday.getUTCDate();
                return personMonth === date.getMonth() && personDay === date.getDate();
            });

            const handleClick = () => {
                const people = birthdayPeople.length > 0 ? birthdayPeople : null;
                navigate(`/detallecumpleanos/${date.getMonth() + 1}/${date.getDate()}`, { state: { birthdayPeople: people } });
            };

            return (
                <div
                    key={date.toDateString()}
                    className={`${dayClassName} ${isMobile ? '' : 'p-5'} cursor-pointer rounded-full ${birthdayPeople.length > 0 ? 'bg-red-500 hover:bg-red-700' : ''
                        }`}
                    onClick={handleClick}
                >
                    {date.getDate()}
                </div>
            );
        });
    };

    return (
        <div className=''>
            <h1 className="text-xl font-semibold uppercase text-white mb-2">Cumpleaños</h1>
            <div className={`bg-cv-primary pt-5 ${isMobile ? 'text-xs' : 'text-base'} rounded-2xl`}>
                <div className='mx-5 md:mx-20'> {/* Ajustamos el margen para diseño móvil */}
                    <div className="container text-white pb-10">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-5"> {/* Ajustamos la alineación para diseño móvil */}
                            <button className={`bg-cv-cyan hover:bg-cv-secondary text-cv-primary hover:text-cv-cyan px-6 py-2 rounded-lg ${isMobile ? 'mb-2 md:mb-0' : 'mr-10'}`} onClick={() => setCurrentMonth(new Date())}>
                                Hoy
                            </button>
                            <div className={`text-center md:text-left mb-3 md:mb-0 ${isMobile ? 'md:ml-5' : ''}`}>
                                <h3 className={`${isMobile ? 'text-xs' : 'text-base'} font-bold`}>{currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toLocaleUpperCase('es-ES')}</h3>
                            </div>
                            <div className={`flex justify-center md:justify-end items-center ${isMobile ? 'mt-2 md:mt-0' : ''}`}>
                                <button className="bg-cv-cyan hover:bg-cv-secondary text-cv-primary hover:text-cv-cyan px-5 py-2 rounded-lg mr-2" onClick={() => setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1))}>
                                    &lt;
                                </button>
                                <button className={`bg-cv-cyan hover:bg-cv-secondary text-cv-primary hover:text-cv-cyan px-5 py-2 rounded-lg ${isMobile ? ' md:mt-0' : 'mx-2'}`} onClick={() => setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1))}>
                                    &gt;
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 mb-4">
                            {renderDaysOfWeek()}
                        </div>
                        <div className=''>
                            <div className="grid grid-cols-7 gap-2 text-center">
                                {renderCalendarDays()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};