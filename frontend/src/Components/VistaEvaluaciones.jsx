
import { useState } from 'react';
import { DynamicTable, DynamicSelect } from './commons';
import AddIcon from '@mui/icons-material/Add';

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

	//Datos para Select Options
	const skillsOptions = ['Habilidades Blandas', 'Procesos de Trabajo', 'Observación'];
	const departaments = ['Estrategico', 'Opcion', 'Otra opcion'];
	const area = ['Sistemas', 'Diseño Grafico', 'Otra opcion'];
	const shift = ['Mañana', 'Tarde'];
	const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];



	const [selectedTable, setSelectedTable] = useState('Semanal');

	const handleTableChange = (table) => {
		setSelectedTable(table);
	};

	return (
		<>
			<section>
				<div className="text-center my-4">
					<h2 className="text-2xl md:text-5xl text-white font-bold uppercase">Evaluaciones</h2>
				</div>
				<div className='space-y-4'>
					<div className='flex gap-4'>
						<button className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">
							<AddIcon />
							<p className='ml-2'>Agregar</p>
						</button>
						<DynamicSelect options={skillsOptions} />
						<DynamicSelect options={departaments} />
						<DynamicSelect options={area} />
						<DynamicSelect options={shift} />
						<DynamicSelect options={months} />
					</div>
					<div className="space-y-4">
						<div className='flex gap-4'>
							<button onClick={() => handleTableChange('Semanal')} className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Semanal</button>
							<button onClick={() => handleTableChange('Quincenal')} className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Quincenal</button>
							<button onClick={() => handleTableChange('Mensual')} className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">Mensual</button>
						</div>
						{selectedTable === 'Semanal' && (
							<DynamicTable  columns={columns} data={dataSemanal} />
						)}
						{selectedTable === 'Quincenal' && (
							<DynamicTable  columns={columns} data={dataQuincenal} />
						)}
						{selectedTable === 'Mensual' && (
							<DynamicTable  columns={columns} data={dataMensual} />
						)}
					</div>
				</div>
			</section>
		</>
	)
}
