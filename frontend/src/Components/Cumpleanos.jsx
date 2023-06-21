import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Cumpleanos = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [birthdayList, setBirthdayList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Llamar a la API para obtener la lista de personas con sus fechas de cumpleaños
        fetch('http://127.0.0.1:8000/api/birthday', {
            headers: {
                Authorization: `Bearer 6|J2Lph2hLdcCYPWYVBVVznEaW2peo1HBGrhQr4CZC`
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
        <div className="container mx-auto text-white -mt-8">
            <div className="flex justify-between items-center mt-4 mb-2">
                <button className="text-white-500 font-bold bg-indigo-500 px-10 py-3 rounded-lg drop-shadow-2xl hover:bg-indigo-700" onClick={() => setCurrentMonth(new Date())}>
                    Hoy
                </button>
                <h3 className="text-5xl font-bold">{currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }).toLocaleUpperCase('es-ES')}</h3>
                <div className='font-bold'>
                    <button className="text-white-500 px-10 py-4 rounded-lg hover:bg-gray-700" onClick={() => setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() - 1))}>
                        &lt;
                    </button>
                    <button className="text-white-500 px-10 py-4 rounded-lg hover:bg-gray-700" onClick={() => setCurrentMonth(prevMonth => new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1))}>
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
    );
};