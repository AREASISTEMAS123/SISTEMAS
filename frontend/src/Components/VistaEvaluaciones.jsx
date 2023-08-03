import { useEffect, useState } from 'react';
import TablaEvaluaciones from './commons/TablaEvaluaciones';

export const VistaEvaluaciones = () => {
	const [users, setUsers] = useState([]);
	const [selectedOption, setSelectedOption] = useState('');

	//UseState Filtar
	const [filterName, setFilterName] = useState('');

	const Token = localStorage.getItem("token");

	const handleChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedOption(selectedValue);
	};
	const months = [
		{ value: 'enero', label: 'Enero' },
		{ value: 'febrero', label: 'Febrero' },
		{ value: 'marzo', label: 'Marzo' },
		{ value: 'abril', label: 'Abril' },
		{ value: 'mayo', label: 'Mayo' },
		{ value: 'junio', label: 'Junio' },
		{ value: 'julio', label: 'Julio' },
		{ value: 'agosto', label: 'Agosto' },
		{ value: 'septiembre', label: 'Septiembre' },
		{ value: 'octubre', label: 'Octubre' },
		{ value: 'noviembre', label: 'Noviembre' },
		{ value: 'diciembre', label: 'Diciembre' }
	];


	useEffect(() => {
		obtenerUsuarios();
	}, []);

	const obtenerUsuarios = async () => {
		try {
			const response = await fetch(import.meta.env.VITE_API_URL + "/users", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${Token}`,
				},
			});
			const data = await response.json();
			if (response.ok) {
				setUsers(data.profile);
			} else {
				console.error('Error al obtener los usuarios:', data.error);
			}
		} catch (error) {
			console.error('Error al obtener los usuarios:', error);
		}
	};

	const clearFilter = () => {
		setFilterName("");
	};

	return (
		<>
			<div className='space-y-4'>
				<div className="bg-cv-primary px-4 py-14 rounded-lg">
					<h2 className="text-lg text-center md:text-4xl font-semibold uppercase text-white">Evaluaciones</h2>
				</div>
				<div className='flex flex-col items-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0'>
					<div className="w-full">
						<input
							type="text"
							id="searchName"
							value={filterName}
							onChange={(e) => setFilterName(e.target.value)}
							placeholder="Ingresa el DNI o apellidos del colaborador"
							className="block w-full p-3 pr-10 text-sm border-none text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-lg placeholder-cv-primary font-semibold"
						/>
					</div>
					<div className='w-full'>
						<select value={selectedOption} onChange={handleChange} id="selectMonth" className="block w-full p-3 pr-10 text-sm border-none text-cv-primary rounded-md bg-slate-300 drop-shadow-md outline-none sm:text-lg placeholder-cv-primary font-semibold">

							<option value="">Mes</option>
							{months.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>

					<button onClick={clearFilter} className='w-full sm:w-64 bg-cv-cyan rounded-lg py-3 px-8 text-cv-primary font-bold whitespace-nowrap'>Limpiar Filtros</button>

				</div>
				<div>
					<TablaEvaluaciones data={users} filterName={filterName} />
				</div>
			</div>
		</>
	)
}
