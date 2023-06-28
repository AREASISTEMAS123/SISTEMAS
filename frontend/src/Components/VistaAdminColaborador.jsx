import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import TablaListaColaboradores from './commons/TablaListaColaboradores';
import { useEffect, useState } from 'react';
export const VistaAdminColaborador = () => {
	const [users, setUsers] = useState([]);
	

	const apiURL = 'http://127.0.0.1:8000/api';
	const Token = localStorage.getItem("token");

	useEffect(() => {
		ListarUsuarios();
	}, []);
	const ListarUsuarios = async () => {
		try {
			const response = await fetch(apiURL + '/users',{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Token}`
				}
			});
			const data = await response.json();
			setUsers(data);
		} catch (error) {
			console.log('Error al obtener los usuarios:', error);
		}
	};







	return (
		<>
			<section className='w-full'>
				<div className="text-center my-4">
					<h2 className="text-2xl md:text-5xl text-white font-bold uppercase">Colaboradores</h2>
				</div>
				<div className='space-y-4'>
					<div className='flex gap-4'>
						<button className="py-2 px-4 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase">
							<PersonAddIcon />
							<p className='ml-2'>Agregar Colaborador</p>
						</button>
						<div className='flex items-center justify-center p-1 rounded-md bg-slate-300'>
							<input type="date" name="" id="" className='bg-slate-300 p-1 outline-none text-cv-primary'/>
							<button className='ml-1 p-1 rounded-sm text-cv-primary bg-slate-300 hover:bg-slate-400'><SearchIcon/></button>
						</div>
						<div className='flex items-center justify-center p-1 rounded-md bg-slate-300'>
							<input type="text" name="" id="" placeholder='Buscar por departamento' className='bg-slate-300 p-1 outline-none text-cv-primary' />
							<button className='ml-1 p-1 rounded-sm text-cv-primary bg-slate-300 hover:bg-slate-400'><SearchIcon /></button>
						</div>
						<div className='flex items-center justify-center p-1 rounded-md bg-slate-300'>
							<input type="text" name="" id="" placeholder='Buscar por nombre' className='bg-slate-300 p-1 outline-none text-cv-primary' />
							<button className='ml-1 p-1 rounded-sm text-cv-primary bg-slate-300 hover:bg-slate-400'><SearchIcon /></button>
						</div>
					</div>
					<div>
						<TablaListaColaboradores data={users} />
					</div>
				</div>
			</section>
		</>
	)
}
