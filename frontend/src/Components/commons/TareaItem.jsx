import { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const dataPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
	})
);

export const TareaItem = ({data, onclick}) => {

	TareaItem.propTypes = {
		data: dataPropTypes.isRequired,
		onclick: PropTypes.func.isRequired,
	}

	const [timeRemaining, setTimeRemaining] = useState([]);
	const [sortedCards, setSortedCards] = useState([]);

	useEffect(() => {
		const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
		setSortedCards(sorted);
	}, [data]);


	useEffect(() => {
		const interval = setInterval(() => {
			const now = moment();

			const updatedData = sortedCards.map((card) => {
				const taskDate = moment(card.date, 'YYYY-MM-DD HH:mm:ss');

				const diff = taskDate.diff(now);

				let formattedDiff = '';

				if (diff <= 0) {
					formattedDiff = 'Tiempo terminado';
				} else if (diff > 86400000) {
					const duration = moment.duration(diff);
					const days = Math.floor(duration.asDays());
					formattedDiff = 'Falta ' + days + (days === 1 ? ' día' : ' días');
				} else if (diff > 3600000) {
					const duration = moment.duration(diff);
					const hours = Math.floor(duration.asHours());
					formattedDiff = 'Falta ' + hours + (hours === 1 ? ' hora' : ' horas');
				} else if (diff > 60000){
					const duration = moment.duration(diff);
					const minutes = Math.floor(duration.asMinutes());
					formattedDiff = 'Falta ' + minutes + (minutes === 1 ? ' minuto' : ' minutos');
				} else {
					const duration = moment.duration(diff);
					const seconds = Math.floor(duration.asSeconds());
					formattedDiff = 'Falta ' + seconds + (seconds === 1 ? ' segundo' : ' segundos');
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

	return (
		<ul className='divide-y divide-gray-700'>
			{timeRemaining.map((card) => (
				<li key={card.id} className="px-2 py-3 sm:py-4 cursor-pointer hover:bg-cv-secondary" onClick={onclick}>
					<div className="flex items-center space-x-4">
						<div className="flex-1 min-w-0">
							<div className='w-full flex items-center justify-between space-x-6'>
								<div className='flex items-end space-x-4'>
									<p className="text-lg font-semibold truncate text-white">{card.title}</p>
									<p className="text-sm font-light truncate text-white">{card.date}</p>
								</div>
								<p className="text-sm font-extralight truncate text-white">
									{card.timeRemaining}
								</p>
							</div>
							<p className="text-lg w-80 text-ellipsis text-white truncate">{card.description}</p>
						</div>
						<button className='p-3 w-full border border-cv-secondary text-green-500 bg-cv-primary flex items-center justify-center rounded-lg text-xl hover:bg-green-500 hover:text-cv-primary'>
							<TaskAltIcon fontSize="large" />
						</button>
					</div>
				</li>
			))}
		</ul>
	)
}
