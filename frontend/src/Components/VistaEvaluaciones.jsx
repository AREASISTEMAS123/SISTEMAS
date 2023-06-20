
import { useState } from 'react';
import { DynamicSelect } from './commons';
import AddIcon from '@mui/icons-material/Add';
import TablaEvaluaciones from './commons/TablaEvaluaciones';

export const VistaEvaluaciones = () => {

	//Datos para Tabla
	const columns = ['Nombre', 'Nota 1', 'Nota 2', 'Nota 3', 'Promedio'];
	const dataSemanal = [
		{ Nombre: 'Juan', 'Nota 1': 10, 'Nota 2': 0, 'Nota 3': 0, Promedio: 3.3 },
		{ Nombre: 'María', 'Nota 1': 15, 'Nota 2': 0, 'Nota 3': 0, Promedio: 5 },
		{ Nombre: 'Pedro', 'Nota 1': 18, 'Nota 2': 0, 'Nota 3': 0, Promedio: 6 },
	];
	const dataQuincenal = [
		{ Nombre: 'Juan', 'Nota 1': 10, 'Nota 2': 15, 'Nota 3': 0, Promedio: 8.3 },
		{ Nombre: 'María', 'Nota 1': 15, 'Nota 2': 17, 'Nota 3': 0, Promedio: 10.6 },
		{ Nombre: 'Pedro', 'Nota 1': 18, 'Nota 2': 20, 'Nota 3': 0, Promedio: 12.6 },
	];
	const dataMensual = [
		{ Nombre: 'Juan', 'Nota 1': 10, 'Nota 2': 15, 'Nota 3': 17, Promedio: 14 },
		{ Nombre: 'María', 'Nota 1': 15, 'Nota 2': 17, 'Nota 3': 16, Promedio: 16 },
		{ Nombre: 'Pedro', 'Nota 1': 18, 'Nota 2': 20, 'Nota 3': 15, Promedio: 17.6 },
	];

	//Datos tabla todos
	const columnsCategory = ['Nombre', 'Semanal HB', 'Quincenal HB', 'Mensual HB', 'Semanal PT', 'Quincenal PT', 'Mensual PT', 'Semanal O', 'Quincenal O', 'Mensual O', 'Promedio'];
	const dataAll = [
		{ Nombre: 'Juan', 'Semanal HB': 10, 'Quincenal HB': 0, 'Mensual HB': 0, 'Semanal PT': 0, 'Quincenal PT': 0, 'Mensual PT': 0, 'Semanal O': 10, 'Quincenal O': 0, 'Mensual O': 0, Promedio: 3.3 },
		{ Nombre: 'María', 'Semanal HB': 15, 'Quincenal HB': 0, 'Mensual HB': 0, 'Semanal PT': 0, 'Quincenal PT': 0, 'Mensual PT': 0, 'Semanal O': 10, 'Quincenal O': 0, 'Mensual O': 0, Promedio: 5 },
		{ Nombre: 'Pedro', 'Semanal HB': 18, 'Quincenal HB': 0, 'Mensual HB': 0, 'Semanal PT': 0, 'Quincenal PT': 0, 'Mensual PT': 0, 'Semanal O': 10, 'Quincenal O': 0, 'Mensual O': 0, Promedio: 6 },
	];


	//Datos para Select Options
	const skillsOption = [
		{ value: 'all', label: 'Todos' },
		{ value: 'skill', label: 'Habilidades Blanda' },
		{ value: 'works', label: 'Procesos de Trabajo' },
		{ value: 'observation', label: 'Observación' },
	];
	const departaments = [
		{ value: 'estrategico', label: 'Estrategico' },
		{ value: 'opcion', label: 'Opcion' },
		{ value: 'otraopcion', label: 'Otra opcion' },
	];
	const area = [
		{ value: 'sistemas', label: 'Sistemas' },
		{ value: 'diseño', label: 'Diseño Grafico' },
		{ value: 'option', label: 'Otra opcion' },
	];
	const shift = [
		{ value: '1', label: 'Mañana' },
		{ value: '0', label: 'Tarde' }
	];
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

	const [selectedOption, setSelectedOption] = useState('');

	const handleOptionChange = (option) => {
		setSelectedOption(option);
	};



	const [selectedTable, setSelectedTable] = useState('Semanal');

	const handleTableChange = (table) => {
		setSelectedTable(table);
	};

	const [showModal, setShowModal] = useState(false);

	const [modalShow, setModalShow] = useState(false);

	const [modalNotas, setModalNotas] = useState(false);

	const [buttonClicked, setButtonClicked] = useState('');

	const handleButtonClick = (buttonName) => {
		setModalNotas(true),
			setModalShow(false),
			setButtonClicked(buttonName)
	}

	return (
		<>
			<section>
				<div className="text-center my-4">
					<h2 className="text-2xl md:text-5xl text-white font-bold uppercase">Evaluaciones</h2>
				</div>
				<div className='space-y-4'>
					<div className='flex gap-4'>
						<button onClick={() => setShowModal(true)} className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">
							<AddIcon />
							<p className='ml-2'>Agregar</p>
						</button>
						<DynamicSelect options={skillsOption} onChange={handleOptionChange} />
						<DynamicSelect options={departaments} />
						<DynamicSelect options={area} />
						<DynamicSelect options={shift} />
						<DynamicSelect options={months} />
					</div>
					<div className="space-y-4">
						{selectedOption == 'all' ? (
							<div className="space-y-4">
								<div className='flex gap-4'>
									<div className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Habilidades Blandas</div>
									<div className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Procesos de trabajo</div>
									<div className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Observacion</div>
								</div>
								<div className='overflow-x-scroll'>
									<TablaEvaluaciones columns={columnsCategory} data={dataAll} />
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<div className='flex gap-4'>
									<button onClick={() => handleTableChange('Semanal')} className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Semanal</button>
									<button onClick={() => handleTableChange('Quincenal')} className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Quincenal</button>
									<button onClick={() => handleTableChange('Mensual')} className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Mensual</button>
								</div>
								<div>
									{selectedTable === 'Semanal' && (
										<TablaEvaluaciones columns={columns} data={dataSemanal} />
									)}
									{selectedTable === 'Quincenal' && (
										<TablaEvaluaciones columns={columns} data={dataQuincenal} />
									)}
									{selectedTable === 'Mensual' && (
										<TablaEvaluaciones columns={columns} data={dataMensual} />
									)}
								</div>
							</div>
						)}

					</div>
				</div>
			</section>

			{showModal ? (
				<>
					<div>
						<div
							className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">

									<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
										<h3 className="text-3xl font-semibold">
											Elegir Colaborador
										</h3>
									</div>
									<div className="relative p-6 flex-auto">
										<div className='space-y-2 flex flex-col items-center'>
											<select className="w-full border border-gray-300 text-gray-500 text-base rounded-lg block p-2.5 outline-none">
												<option value="">Departamento</option>
												<option>Estrategico</option>
												<option>Clima y Cultura</option>
											</select>
											<select className="w-full border border-gray-300 text-gray-500 text-base rounded-lg block p-2.5 outline-none">
												<option value="">Area</option>
												<option>Sistemas</option>
												<option>Diseño UI/UX</option>
											</select>
											<select className="w-full border border-gray-300 text-gray-500 text-base rounded-lg block p-2.5 outline-none">
												<option value="">Turno</option>
												<option>Mañana</option>
												<option>Tarde</option>
											</select>
											<select className="w-full border border-gray-300 text-gray-500 text-base rounded-lg block p-2.5 outline-none">
												<option value="">Colaborador</option>
												<option>Colaborador 1</option>
												<option>Colaborador 2</option>
												<option>Colaborador 3</option>
												<option>Colaborador 4</option>
												<option>Colaborador 5</option>
												<option>Colaborador 6</option>
											</select>
										</div>

									</div>
									<div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
										<button
											className="py-2 px-4 rounded-md text-gray-500 bg-gray-300 hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
											type="button"
											onClick={() => setShowModal(false)}
										>
											Cancelar
										</button>
										<button
											className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
											type="button"
											onClick={() => { setModalShow(true); setShowModal(false); }}
										>
											Siguiente
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
					</div>

				</>
			) : null}

			{modalShow ? (
				<>
					<div>
						<div
							className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">

									<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
										<h3 className="text-3xl font-semibold">
											Agregar Nota al Colaborador
										</h3>
									</div>
									<div className="relative p-6 flex-auto">
										<div className='space-y-2 flex flex-col items-center'>

											<button
												className="w-full py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
												type="button"
												onClick={() => { handleButtonClick('Habilidades Blandas') }}
											>
												Habilidades Blandas
											</button>
											<button
												className="w-full py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
												type="button"
												onClick={() => handleButtonClick('Procesos de Trabajo')}
											>
												Procesos de Trabajo
											</button>
											<button
												className="w-full py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
												type="button"
												onClick={() => handleButtonClick('Observaciones')}
											>
												Observaciones
											</button>

										</div>

									</div>
									<div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
										<button
											className="py-2 px-4 rounded-md text-gray-500 bg-gray-300 hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
											type="button"
											onClick={() => setModalShow(false)}
										>
											Cancelar
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
					</div>

				</>
			) : null}

			{modalNotas ? (
				<>
					<div>
						<div
							className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative w-96 my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">

									<div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
										{
											buttonClicked === 'Habilidades Blandas' && (
												<h3 className="text-3xl font-semibold">Habilidades Blandas</h3>
											)
										}
										{
											buttonClicked === 'Procesos de Trabajo' && (
												<h3 className="text-3xl font-semibold">Procesos de Trabajo</h3>
											)
										}
										{
											buttonClicked === 'Observaciones' && (
												<h3 className="text-3xl font-semibold">Observaciones</h3>
											)
										}

									</div>
									<div className="relative p-6 flex-auto">
										<div className='space-y-2 flex flex-col items-center'>
											<select className="w-full border border-gray-300 text-gray-500 text-base rounded-lg block p-2.5 outline-none">
												<option value="">Semanal</option>
												<option>Quincenal</option>
												<option>Mensual</option>
											</select>

											<div className='w-full border border-gray-300'>
												<div className='bg-cv-primary p-4'>
													<h3 className="text-3xl font-bold text-white text-center uppercase">NOTAS</h3>
												</div>
												<input type="text" className="text-gray-900 border text-lg font-bold w-full p-4 outline-none" required />
												<input type="text" className="text-gray-900 border text-lg font-bold w-full p-4 outline-none" required />
												<input type="text" className="text-gray-900 border text-lg font-bold w-full p-4 outline-none" required />
												<input type="text" className="text-gray-900 border text-lg font-bold w-full p-4 outline-none" required />
												<button
													className="p-4 w-full text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
													type="button"
													onClick={() => setModalNotas(false)}
												>
													Pedir Correccion
												</button>
											</div>



										</div>

									</div>
									<div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
										<button
											className="py-2 px-4 rounded-md text-gray-500 bg-gray-300 hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
											type="button"
											onClick={() => setModalNotas(false)}
										>
											Cancelar
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
					</div>

				</>
			) : null}

		</>
	)
}
