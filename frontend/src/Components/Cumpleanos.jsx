import { useMediaQuery } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Cumpleanos = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [birthdayList, setBirthdayList] = useState([]);
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:1024px)");

    useEffect(() => {
        // Llamar a la API para obtener la lista de personas con sus fechas de cumpleaños
        fetch(import.meta.env.VITE_API_URL + '/birthday', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
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
        const startOfMonth = new Date(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth(), 1);
        const endOfMonth = new Date(currentMonth.getUTCFullYear(), currentMonth.getUTCMonth() + 1, 0);

        const startDate = new Date(startOfMonth);
        startDate.setUTCDate(startDate.getUTCDate() - startDate.getUTCDay());

        const endDate = new Date(endOfMonth);
        endDate.setUTCDate(endDate.getUTCDate() + (6 - endDate.getUTCDay()));

        const calendarDays = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            calendarDays.push(new Date(currentDate));
            currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }

        return calendarDays.map((date) => {
            const isCurrentMonth = date.getUTCMonth() === currentMonth.getUTCMonth();
            const isToday =
                date.getUTCFullYear() === new Date().getUTCFullYear() &&
                date.getUTCMonth() === new Date().getUTCMonth() &&
                date.getUTCDate() === new Date().getUTCDate();

            const dayClassName = `text-center hover:bg-blue-700 ${isToday ? 'bg-blue-500 text-white hover:bg-sky-700' : isCurrentMonth ? '' : 'text-gray-400 hover:bg-gray-700'
                }`;

            const birthdayPeople = birthdayList.filter((person) => {
                const personMonth = person.birthday.getUTCMonth();
                const personDay = person.birthday.getUTCDate();
                return personMonth === date.getUTCMonth() && personDay === date.getUTCDate();
            });

            const handleClick = () => {
                const people = birthdayPeople.length > 0 ? birthdayPeople : null;
                navigate(`/detallecumpleanos/${date.getUTCMonth() + 1}/${date.getUTCDate()}`, { state: { birthdayPeople: people } });
            };

            return (
                <div
                    key={date.toDateString()}
                    className={`${dayClassName} cursor-pointer p-5 rounded-full ${birthdayPeople.length > 0 ? 'bg-red-500 hover:bg-red-700' : ''
                        }`}
                    onClick={handleClick}
                >
                    {date.getUTCDate()}
                </div>
            );
        });
    };

    return (
        <div className=''>
            <h1 className="text-xl font-semibold uppercase text-white">Cumpleaños</h1>
        <div className='bg-cv-primary pt-5 rounded-2xl'>
        <div className='mx-20'>
            <div className="container text-white pb-10">
                <div className="flex justify-between items-center mb-5">
                    <button className={`bg-cv-cyan hover:bg-cv-secondary text-cv-primary hover:text-cv-cyan px-10 py-3 rounded-lg ${isMobile ? 'mr-10' : ''}`} onClick={() => setCurrentMonth(new Date())}>
                        Hoy
                    </button>
                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold">{currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toLocaleUpperCase('es-ES')}</h3>
                    <div className={`font-bold ${isMobile ? 'ml-10' : ''}`}>
                        <button className="bg-cv-cyan hover:bg-cv-secondary text-cv-primary hover:text-cv-cyan px-10 py-2" onClick={() => setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1))}>
                            &lt;
                        </button>
                        <button className={`bg-cv-cyan hover:bg-cv-secondary text-cv-primary hover:text-cv-cyan px-10 py-2 ${isMobile ? 'mt-2' : 'mx-2'}`} onClick={() => setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1))}>
                            &gt;
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {renderDaysOfWeek()}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {renderCalendarDays()}
                </div>
            </div>
        </div>
        </div>
        </div>
    );
};