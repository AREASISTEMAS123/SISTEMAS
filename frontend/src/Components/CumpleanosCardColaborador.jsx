import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import WavingHandIcon from '@mui/icons-material/WavingHand';


export const CumpleanosCardColaborador = ({ data }) => {
	CumpleanosCardColaborador.propTypes = {
		data: PropTypes.array.isRequired,
	}

	const [filteredBirthdays, setFilteredBirthdays] = useState([]);

	const transformDate = (dateString) => {
		const date = new Date(dateString);
		const timezoneOffset = date.getTimezoneOffset() * 60000;
		const adjustedDate = new Date(date.getTime() + timezoneOffset);
		const options = { day: 'numeric', month: 'long'};
		const formattedDate = adjustedDate.toLocaleDateString('es-ES', options);
		const currentYear = new Date().getFullYear();
		return `${formattedDate}, ${currentYear}`;
	};

	// const counterDate = (dateString) => {
	// 	const birthday = new Date(dateString);
	// 	const today = new Date();
	// 	today.setHours(0, 0, 0, 0); // Establecer horas, minutos, segundos y milisegundos a cero

	// 	const currentYear = today.getFullYear();
	// 	const birthdayThisYear = new Date(currentYear, birthday.getMonth(), birthday.getDate());

	// 	const timeDiff = birthdayThisYear.getTime() - today.getTime();
	// 	const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

	// 	if (daysDiff === 0) {
	// 		return "Hoy es el cumpleaños";
	// 	} else if (daysDiff === 1) {
	// 		return "Mañana es el cumpleaños";
	// 	} else if (daysDiff < 0) {
	// 		return `Ya pasaron ${Math.abs(daysDiff)} día(s)`;
	// 	} else {
	// 		return `Faltan ${daysDiff} día(s)`;
	// 	}
	// };



	useEffect(() => {
		const currentMonth = new Date().getMonth();
		const filteredData = data.filter(user => {
			const userBirthdayMonth = new Date(user.profile.birthday).getMonth();
			return userBirthdayMonth === currentMonth;
		});
		setFilteredBirthdays(filteredData);
	}, [data]);


	return (
		<>
			{filteredBirthdays.map((item, index) => (
				<div key={index} className="bg-cv-primary overflow-hidden w-full max-w-md text-white rounded-xl">
					<div className="p-4 space-y-4">
						<div className="flex justify-between items-center flex-col md:flex-row">
							<img src={item.media[0].original_url} alt="Foto de Perfil" className="w-20 h-20 md:w-14 md:h-14 rounded-full shadow-lg ring-2 ring-cv-cyan" />
							<p className="text-xl font-medium text-white md:text-2xl ">{item.name}</p>
						</div>
						<div className="space-y-2">
							{/* <div className="flex items-center flex-col md:flex-row">
								<p className="text-lg md:text-xl font-semibold">Cumpleaños:</p>
								<p className="text-base md:text-lg font-light md:ml-5">{
									counterDate(item.profile.birthday)
								}</p>
							</div> */}
							<div className="flex items-center flex-col md:flex-row">
								<p className="text-lg md:text-xl font-semibold">Cumpleaños:</p>
								<p className="text-base md:text-lg font-light md:ml-5">{
									transformDate(item.profile.birthday)
								}</p>
							</div>
							<div className="flex items-center flex-col md:flex-row">
								<p className="text-lg md:text-xl font-semibold">Departamento:</p>
								<p className="text-base md:text-lg font-light md:ml-5">{item.profile.department}</p>
							</div>
							<div className="flex items-center md:justify-between md:space-x-4 flex-col md:flex-row">
								<div className="md:w-1/2 flex items-center">
									<p className="text-lg md:text-xl font-semibold">Núcleo:</p>
									<p className="text-base font-light ml-2 whitespace-nowrap">
										{
											item.profile.area.split(" ")[0] + ' ' +
											(item.profile.area.split(" ")[1] ? item.profile.area.split(" ")[1].charAt(0) : '')
										}
									</p>
								</div>
								<div className="md:w-1/2 flex items-center">
									<p className="text-lg md:text-xl font-semibold">Turno:</p>
									<p className="text-base md:text-lg font-light ml-5">{item.profile.shift}</p>
								</div>
							</div>
						</div>
					</div>
					<button className="p-5 w-full bg-cv-cyan text-cv-primary flex items-center justify-center text-xl font-bold uppercase">
						<WavingHandIcon />
						<p className='ml-2'>Saludar</p>
					</button>
				</div>
			))
			}
		</>
	)
}
