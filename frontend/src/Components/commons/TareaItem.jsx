import { useEffect, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
				} else if (diff > 60000) {
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

	const handleDeleteClick = (card) => {
		eliminarTarea(card)
	}

	moment.locale('es');
	const lettersDate = (fecha) => {
		const date = moment(fecha, 'YYYY-MM-DD HH:mm:ss');
		return date.format('DD [de] MMMM, YYYY HH:mm');
	};


	// Acordeon
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleAccordion = (index) => {
		if (activeIndex === index) {
			setActiveIndex(null);
		} else {
			setActiveIndex(index);
		}
	};

	return (
		<div className='flex flex-col items-center gap-3'>
			{timeRemaining.map((card, index) => (
				<div key={index}>
					<button
						className="w-full flex items-center justify-between py-2 gap-5 bg-cv-primary"
						onClick={() => toggleAccordion(index)}
					>
						<div className='w-full max-w-lg flex items-center justify-between gap-5'>
							<p className="w-full max-w-xs text-base text-start font-semibold text-white leading-none">{card.tittle}</p>
							<div className='w-full'>
								<p className="text-sm text-end font-light truncate text-white">{lettersDate(card.limit_date)}</p>
								<p className={`text-sm text-end font-extralight truncate ${card.timeColor}`}>
									{card.timeRemaining}
								</p>
							</div>
						</div>
						<KeyboardArrowDownIcon sx={{ fontSize: 24 }} className={` ${activeIndex === index ? 'transform rotate-180' : ''
							}`} />
					</button>
					{activeIndex === index && (
						<div className='space-y-3'>
							<div className='p-1 bg-cv-secondary rounded'>
								<p className="text-lg text-justify leading-tight">{card.description}</p>
							</div>
							<div className='flex items-center justify-evenly px-4 gap-5'>
								<button onClick={() => handleDeleteClick(card.id)} className='w-full py-2 px-8 border border-cv-secondary text-red-500 bg-cv-primary flex items-center justify-center rounded-lg text-base hover:bg-red-500 hover:text-cv-primary active:scale-95 ease-in-out duration-300'>
									<DeleteIcon sx={{ fontSize: 20 }} className='mr-1'/>
									<span>Eliminar</span>
								</button>
								<button onClick={() => handleCardClick(card)} className='w-full py-2 px-8 border border-cv-secondary text-green-500 bg-cv-primary flex items-center justify-center rounded-lg text-base hover:bg-green-500 hover:text-cv-primary active:scale-95 ease-in-out duration-300'>
									<EditIcon sx={{ fontSize: 20 }} className='mr-1'/>
									<span>Editar</span>
								</button>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	)
}
