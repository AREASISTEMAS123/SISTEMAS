import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from "moment";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { AES, enc } from 'crypto-js';

export const VistaPerfil = () => {
	const { id } = useParams();
	const tokenD = AES.decrypt(localStorage.getItem("token"), import.meta.env.VITE_KEY)
    const token = tokenD.toString(enc.Utf8)
	const [user, setUser] = useState(null);

	useEffect(() => {
		Profile();
	}, [])

	const Profile = () => {
		fetch(import.meta.env.VITE_API_URL + '/users/' + id, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => response.json())
			.then(data => {
				setUser(data);
			})
			.catch(error => {
				console.error('Error al obtener datos:', error);
			});
	}

	console.log(user)

	return (
		<>
			<div className="w-full mb-5">

				<nav className="flex" >
					<ol className="inline-flex items-center space-x-1 md:space-x-3 uppercase">
						<li className="inline-flex items-center">
							<Link to="/colaboradores" className="inline-flex items-center text-base font-medium text-gray-400 hover:text-white">
								<Diversity3Icon />
								<span className='ml-1 text-base font-medium md:ml-2'>Colaboradores</span>
							</Link>
						</li>
						<li >
							<div className="flex items-center text-gray-400 ">
								<ChevronRightIcon />
								<span className="ml-1 text-base font-medium md:ml-2 text-gray-500">Perfil</span>
							</div>
						</li>
					</ol>
				</nav>

			</div>
			{user && (

				<div className="grid grid-cols-1 md:grid-cols-5 grid-rows-8 gap-4 text-white">
					<div className="col-span-1 md:col-span-3 row-span-5 bg-cv-primary rounded-2xl p-5 order-2 md:order-1">
						<h2 className='text-xl mb-5 font-semibold text-center uppercase'>Datos Personales</h2>
						<div className='space-y-5'>
							<div className='w-full'>
								<span className="text-sm text-gray-400">Nombres completos:</span>
								<p className='text-base md:text-xl font-semibold leading-tight'>{user.usuario[0].user[0].name} {user.usuario[0].user[0].surname}</p>
							</div>
							<div className='w-full flex items-center justify-center gap-5'>
								<div className='w-full'>
									<span className="text-sm text-gray-400">DNI:</span>
									<p className='text-base md:text-xl font-semibold leading-tight'>
										{user.usuario[0].dni}
									</p>
								</div>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Fecha de nacimiento:</span>
									<p className='text-base md:text-xl font-semibold leading-tight'>
										{moment(user.usuario[0].birthday).format("DD/MM/YYYY")}
									</p>
								</div>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Teléfono:</span>
									<p className='text-base md:text-xl font-semibold leading-tight'>
										{user.usuario[0].cellphone}
									</p>
								</div>
							</div>
							<div className='w-full'>
								<span className="text-sm text-gray-400">Correo electrónico</span>
								<p className='text-base md:text-xl font-semibold leading-tight'>
									{user.usuario[0].user[0].email}
								</p>
							</div>
						</div>
					</div>
					<div className="col-span-1 md:col-span-2 row-span-5 md:col-start-4 bg-cv-primary rounded-2xl p-5 order-1 md:order-2">
						<div className='w-full h-full flex items-center justify-center'>
							<img src={user.avatar[0].media[0].original_url} alt="" className='w-60 h-60 flex items-center justify-center rounded-full ring ring-cv-cyan object-cover bg-cv-primary' />
						</div>
					</div>
					<div className="col-span-1 md:col-span-3 row-span-3 md:row-start-6  bg-cv-primary rounded-2xl p-5 order-3 md:order-3">
						<h2 className='text-xl mb-5 font-semibold text-center uppercase'>Datos de la empresa</h2>
						<div className='space-y-5'>

							<div className='w-full flex items-center justify-center gap-5'>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Departamento:</span>
									<p className='text-base md:text-lg font-semibold leading-tight'>
										{user.usuario[0].department}
									</p>
								</div>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Núcleo:</span>
									<p className='text-base md:text-lg font-semibold leading-tight'>
										{user.usuario[0].area}
									</p>
								</div>
							</div>
							<div className='w-full flex items-center justify-center gap-5'>

								<div className='w-full'>
									<span className="text-sm text-gray-400">Perfil:</span>
									<p className='text-base md:text-lg font-semibold leading-tight'>
										{user.usuario[0].profile_name}
									</p>
								</div>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Rol:</span>
									<p className='text-base md:text-lg font-semibold leading-tight'>
										{user.rol}
									</p>
								</div>

							</div>
							<div className='w-full flex items-center justify-center md:gap-5'>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Fecha de ingreso:</span>
									<p className='text-base md:text-lg font-semibold leading-tight'>
										{user.usuario[0].date_start}
									</p>
								</div>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Fecha de salida:</span>
									<p className='text-base md:text-lg font-semibold leading-tight'>
										{user.usuario[0].date_end}
									</p>
								</div>
							</div>
							<div className='w-full flex items-center justify-center gap-5'>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Turno:</span>
									<p className='text-base md:text-lg font-semibold leading-tight'>
										{user.usuario[0].shift}
									</p>
								</div>
								<div className='w-full'>
									<span className="text-sm text-gray-400">Estado:</span>
									<p className='text-base md:text-lg font-semibold leading-tight'>
										{`${user.usuario[0].user[0].status === 1 ? 'Activo' : 'Inactivo'} ${user.usuario[0].user[0].status !== 1 ? user.usuario[0].user[0].status_description : ''}`}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-1 md:col-span-2 row-span-3 md:col-start-4 md:row-start-6 bg-cv-primary rounded-2xl text-white p-5 order-4 md:order-4">
						<h2 className='text-xl mb-5 font-semibold text-center uppercase'>Datos de Asistencia</h2>
						<div className='w-full'>
							<ResponsiveContainer width="100%" height={270} className="mx-auto">
								<BarChart
									data={[
										{ name: 'A', Asistencias: user.Asistencia },
										{ name: 'T', Tardanzas: user.Tardanzas },
										{ name: 'J', Justificaciones: user.Justificaciones },
										{ name: 'F', Faltas: user.Faltas },
									]}
									barSize={40}
								>
									<XAxis dataKey="name" />
									<YAxis />
									<CartesianGrid strokeDasharray="0 1" />
									<Tooltip />
									<Legend />
									<Bar dataKey="Asistencias" fill="#4CAF50" />
									<Bar dataKey="Tardanzas" fill="#FFC300" />
									<Bar dataKey="Justificaciones" fill="#36A2EB" />
									<Bar dataKey="Faltas" fill="#FF5733" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>

			)}
		</ >

	)
}
