import { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import 'moment/locale/es';

const dataPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.number.isRequired,
		tittle: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		limit_date: PropTypes.string.isRequired,
	})
);

export const TareaItem = ({ data, update, setSelectedCard, eliminarTarea }) => {

	TareaItem.propTypes = {
		data: dataPropTypes.isRequired,
		update: PropTypes.func.isRequired,
		setSelectedCard: PropTypes.func.isRequired,
		eliminarTarea: PropTypes.func.isRequired,
	}

	const [timeRemaining, setTimeRemaining] = useState([]);
	const [sortedCards, setSortedCards] = useState([]);

	useEffect(() => {
		const sorted = [...data].sort((a, b) => new Date(a.limit_date) - new Date(b.limit_date));
		setSortedCards(sorted);
	}, [data]);


	useEffect(() => {
		const interval = setInterval(() => {
			const now = moment();

			const updatedData = sortedCards.map((card) => {
				const taskDate = moment(card.limit_date, 'YYYY-MM-DD hh:mm:ss');
				

				const diff = taskDate.diff(now);

				let formattedDiff = '';

				if (diff <= 0) {
					formattedDiff = 'Tiempo terminado';
					card.timeColor = 'text-red-500'
				} else if (diff > 86400000) {
					const duration = moment.duration(diff);
					const days = Math.floor(duration.asDays());
					formattedDiff = 'Falta ' + days + (days === 1 ? ' día' : ' días');
					card.timeColor = 'text-white'
				} else if (diff > 3600000) {
					const duration = moment.duration(diff);
					const hours = Math.floor(duration.asHours());
					formattedDiff = 'Falta ' + hours + (hours === 1 ? ' hora' : ' horas');
					card.timeColor = 'text-green-500'
				} else if (diff > 60000){
					const duration = moment.duration(diff);
					const minutes = Math.floor(duration.asMinutes());
					formattedDiff = 'Falta ' + minutes + (minutes === 1 ? ' minuto' : ' minutos');
					card.timeColor = 'text-yellow-500'
				} else {
					const duration = moment.duration(diff);
					const seconds = Math.floor(duration.asSeconds());
					formattedDiff = 'Falta ' + seconds + (seconds === 1 ? ' segundo' : ' segundos');
					card.timeColor = 'text-orange-500'
				}

				return {
					...card,
					timeRemaining: formattedDiff,
				};
			});

			setTimeRemaining(updatedData);
		}, 1000);

		return () => clearInterval(interval);
	}, [sortedCards]);


	const handleCardClick = (card) => {
		update();
		setSelectedCard(card);
	};

	const handleDeleteClick = (card) =>{
		eliminarTarea(card)
	}

	moment.locale('es');
	const lettersDate = (fecha) => {
    const date = moment(fecha, 'YYYY-MM-DD HH:mm:ss');
	return date.format('DD [de] MMMM, YYYY HH:mm');
  };

	return (
		<ul className='divide-y divide-gray-700'>
			{timeRemaining.map((card) => (
				<li key={card.id} className="px-2 py-3 sm:py-4 cursor-pointer hover:bg-cv-secondary">
					<div className="flex items-center space-x-4" >
						<div className="flex-1 min-w-0" onClick={() => handleCardClick(card)}>
							<div className='flex items-center justify-between space-x-6'>
								<div className='flex items-end space-x-4'>
									<p className="text-lg w-56 font-semibold truncate text-white text-ellipsis">{card.tittle}</p>
									{/*<p className="text-sm font-light truncate text-white">{card.limit_date}</p>*/}
									<p className="text-sm font-light truncate text-white">{lettersDate(card.limit_date)}</p>
								</div>
								<p className={`text-sm font-extralight truncate ${card.timeColor}`}>
									{card.timeRemaining}
								</p>
							</div>
							<p className="text-lg w-80 text-ellipsis text-white truncate">{card.description}</p>
						</div>
						<button onClick={()=>handleDeleteClick(card.id)} className='p-3 w-20 border border-cv-secondary text-green-500 bg-cv-primary flex items-center justify-center rounded-lg text-xl hover:bg-green-500 hover:text-cv-primary'>
							<TaskAltIcon fontSize="large" />
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}
