import React, { useState, useEffect } from 'react';

const Cumpleaños = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [birthdayList, setBirthdayList] = useState([]);

    useEffect(() => {
    // Llamar a la API para obtener la lista de personas con sus fechas de cumpleaños
    fetch('https://randomuser.me/api/?results=30')
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            const people = results.map(user => {
                const { dob } = user;
                const dateOfBirth = new Date(dob.date);
                console.log(dateOfBirth);
                return { name: user.name.first, birthday: dateOfBirth };
            });
            setBirthdayList([...birthdayList, ...people]);
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

        return calendarDays.map(date => {
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
            const isToday =
                date.getFullYear() === new Date().getFullYear() &&
                date.getMonth() === new Date().getMonth() &&
                date.getDate() === new Date().getDate();

            // Verificar si hay personas que cumplan años en la fecha actual
            const birthdayPeople = birthdayList.filter(person => {
                const birthdayDate = new Date(person.birthday);
                return (
                    birthdayDate.getMonth() === date.getMonth() &&
                    birthdayDate.getDate() === date.getDate()
                );
            });

            const dayClassName = `text-center ${isToday ? 'bg-blue-500 text-white' : isCurrentMonth ? '' : 'text-gray-400'
                } ${birthdayPeople.length > 0 ? 'bg-red-500 text-white' : ''}`;

            const dayHoverClassName = `${isToday ? 'bg-blue-500' : 'hover:bg-gray-300'
                } cursor-pointer p-2 rounded-full`;

            const handleClick = () => {
                setSelectedDate(date);
                setShowModal(true);
            };

            return (
                <div
                    key={date.toDateString()}
                    className={`${dayClassName} ${dayHoverClassName}`}
                    onClick={handleClick}
                >
                    {date.getDate()}
                </div>
            );
        });
    };
    const goToPreviousMonth = () => {
        const previousMonth = new Date(currentMonth);
        previousMonth.setMonth(previousMonth.getMonth() - 1);
        setCurrentMonth(previousMonth);
    };

    const goToNextMonth = () => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <div className="container mx-auto bg-white p-4 shadow max-w-md">
                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        <button
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded mr-2"
                            onClick={goToPreviousMonth}
                        >
                            &lt;
                        </button>
                        <div className="text-xl font-bold">
                            {currentMonth.toLocaleString('default', { month: 'long' })}
                        </div>
                        <div className="text-gray-600 mx-2">
                            {currentMonth.getFullYear()}
                        </div>
                    </div>
                    <button
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        onClick={goToNextMonth}
                    >
                        &gt;
                    </button>
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {renderDaysOfWeek()}
                    {renderCalendarDays()}
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="bg-white p-4 shadow max-w-md">
                        <h2 className="text-lg font-bold mb-2">
                            Nombres de personas que cumplen años:
                        </h2>
                        <ul className="list-disc pl-6">
                            {birthdayList
                                .filter(person => {
                                    const birthdayDate = new Date(person.birthday);
                                    return (
                                        selectedDate &&
                                        birthdayDate.getMonth() === selectedDate.getMonth() &&
                                        birthdayDate.getDate() === selectedDate.getDate()
                                    );
                                })
                                .map(person => (
                                    <li key={person.id}>{person.name}</li>
                                ))}
                        </ul>
                        <button
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded mt-4"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cumpleaños;