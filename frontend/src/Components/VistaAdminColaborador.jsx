import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import TablaListaColaboradores from './commons/TablaListaColaboradores';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useEffect, useState } from 'react';
export const VistaAdminColaborador = () => {
	const [showModal, setShowModal] = useState(false);
	const [users, setUsers] = useState([]);


	const apiURL = 'http://127.0.0.1:8000/api';
	const Token = localStorage.getItem("token");

	useEffect(() => {
		ListarUsuarios();
	}, []);
	const ListarUsuarios = async () => {
		try {
			const response = await fetch(apiURL + '/users', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${Token}`
				}
			});
			const data = await response.json();
			setUsers(data.profile);
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
					<div className='flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4'>
						<button onClick={() => setShowModal(true)} className="py-2 px-4 rounded-md text-cv-primary bg-cv-cyan font-semibold flex items-center justify-center text-xl uppercase">
							<PersonAddIcon />
							<p className='ml-2'>Agregar Colaborador</p>
						</button>
						<div className='flex items-center justify-between p-1 rounded-md bg-slate-300'>
							<input type="date" name="" id="" className='bg-slate-300 p-1 outline-none text-cv-primary' />
							<button className='ml-1 p-1 rounded-sm text-cv-primary bg-slate-300 hover:bg-slate-400'><SearchIcon /></button>
						</div>
						<div className='flex items-center justify-between p-1 rounded-md bg-slate-300'>
							<input type="text" name="" id="" placeholder='Buscar por departamento' className='bg-slate-300 p-1 outline-none text-cv-primary' />
							<button className='ml-1 p-1 rounded-sm text-cv-primary bg-slate-300 hover:bg-slate-400'><SearchIcon /></button>
						</div>
						<div className='flex items-center justify-between p-1 rounded-md bg-slate-300'>
							<input type="text" name="" id="" placeholder='Buscar por nombre' className='bg-slate-300 p-1 outline-none text-cv-primary' />
							<button className='ml-1 p-1 rounded-sm text-cv-primary bg-slate-300 hover:bg-slate-400'><SearchIcon /></button>
						</div>
					</div>
					<div>
						<TablaListaColaboradores data={users} />
					</div>
				</div>
			</section>

			{showModal ? (
				<div>
					<div className="fixed top-0 left-0 z-50 w-full h-full p-2 overflow-x-hidden overflow-y-auto">
						<div className="relative w-full h-auto md:w-1/2 my-6 mx-auto border-2 border-white p-1 rounded-lg rotate-[5deg]">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none rotate-[-5deg] p-2 md:p-0">

								<div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
									<h3 className="text-lg md:text-3xl font-semibold uppercase">
										Agregar Colaborador
									</h3>
								</div>
								<div className="relative p-2 md:p-6 flex-auto space-y-4">
									<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
										<div className='w-full flex flex-col space-y-1'>
											<div className='w-full'>
												<label htmlFor="names" className="block mb-1 font-medium text-gray-900">Nombres</label>
												<input type="text" id="names" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Ingresar nombres completos' />
											</div>
											<div className='w-full'>
												<label htmlFor="lastname" className="block mb-1 font-medium text-gray-900">Apellidos</label>
												<input type="text" id="lastname" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Ingresar ambos apellidos' />
											</div>
											<div className='w-full'>
												<label htmlFor="dni" className="block mb-1 font-medium text-gray-900">DNI</label>
												<input type="text" id="dni" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Ingresar número de DNI' />
											</div>
											<div className='w-full'>
												<label htmlFor="birthday" className="block mb-1 font-medium text-gray-900">Fecha de nacimiento</label>
												<input type="date" name="" id="birthday" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" />
											</div>
											<div className='w-full'>
												<label htmlFor="email" className="block mb-1 font-medium text-gray-900">Dirección de correo electrónico</label>
												<input type="email" id="email" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Ingresa el e-mail' />
											</div>
											<div className='w-full'>
												<label htmlFor="departament" className="block mb-1 font-medium text-gray-900">Departamento</label>
												<input type="text" id="departament" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Ingresa el departamento' />
											</div>
										</div>
										<div className='w-full flex flex-col space-y-1'>
											<div className='w-full'>
												<label htmlFor="area" className="block mb-1 font-medium text-gray-900">Area</label>
												<input type="text" id="area" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Ingresa el area' />
											</div>
											<div className='w-full'>
												<label htmlFor="profile" className="block mb-1 font-medium text-gray-900">Perfil</label>
												<input type="text" id="profile" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Ingresa el perfil' />
											</div>
											<div className='w-full'>
												<label htmlFor="rol" className="block mb-1 font-medium text-gray-900">Turno</label>
												<select id="rol" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold">
													<option>Selecciona</option>
													<option value="Mañana">Mañana</option>
													<option value="Tarde">Tarde</option>
												</select>
											</div>
											<div className='w-full'>
												<label htmlFor="responsable" className="block mb-1 font-medium text-gray-900">Responsable</label>
												<input type="text" id="responsable" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" placeholder='Ingresa el nombre completo' />
											</div>
											<div className='w-full'>
												<label htmlFor="startDate" className="block mb-1 font-medium text-gray-900">Fecha de ingreso</label>
												<input type="date" name="" id="startDate" className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold" />
											</div>
										</div>

									</div>

									<div className="mx-auto w-full">
										<label htmlFor="fileImage" className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
											<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center">
												<CloudUploadIcon className='text-cv-secondary hover:text-cv-primary' sx={{ fontSize: 70 }} />
												<div className="text-gray-600 text-center md:text-start">
													<p className="text-xs md:text-base font-medium text-cv-secondary hover:text-cv-primary">Seleccione un archivo o arrastre y suelte aquí</p>
													<p className="text-xs md:text-sm text-gray-500">JPG o PNG, máximo 10MB (800 X 800 px)</p>
												</div>
												<button>
													<label htmlFor="fileImage" className="py-2 px-4 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-sm font-semibold uppercase ease-linear transition-all duration-150">Seleccionar
													</label>
												</button>
											</div>
											<input id="fileImage" type="file" className="sr-only" />
										</label>
									</div>

								</div>
								<div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-slate-200 rounded-b space-y-2 md:space-x-4 md:space-y-0">
									<button
										className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl font-semibold uppercase ease-linear transition-all duration-150"
										type="button"
										onClick={() => setShowModal(false)}>
										Cancelar
									</button>
									<button className="w-full py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150" type="button">Guardar</button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
				</div>
			) : null}



		</>
	)
}
