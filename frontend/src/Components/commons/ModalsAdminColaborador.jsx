import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";



export const ModalAddUser = ({ agregarUsuario, cerrarAgregarModal }) => {
	ModalAddUser.propTypes = {
		agregarUsuario: PropTypes.func,
		cerrarAgregarModal: PropTypes.func,
	}

	const [mensajeError, setMensajeError] = useState('');

	// Usesate de campos a insertar
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [profile, setProfile] = useState('');
	const [dni, setDni] = useState('');
	const [departament, setDepartament] = useState('');
	const [area, setArea] = useState('');
	const [shift, setShift] = useState('');
	const [birthday, setBirthday] = useState('');
	const [dateStart, setDateStart] = useState('');
	const [dateEnd, setDateEnd] = useState('');
	//const [responsible, setResponsible] = useState('');
	const [avatar, setAvatar] = useState(null);
	const [avatarLocal, setAvatarLocal] = useState(null);

	const [selectAreaDisabled, setSelectAreaDisabled] = useState(true);
	const [selectProfileDisabled, setSelectProfileDisabled] = useState(true);
	const [inputText, setInputText] = useState(false);

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleSurnameChange = (event) => {
		setSurname(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleDniChange = (event) => {
		setDni(event.target.value);
	};

	const handleDepartamentChange = (event) => {
		setDepartament(event.target.value);
		setArea('')
		setProfile('')
		setSelectAreaDisabled(false)
	};

	const handleAreaChange = (event) => {
		setArea(event.target.value);
		setProfile('')
		setSelectProfileDisabled(false)
		if (event.target.options[event.target.selectedIndex].id === 'otro') {
			setInputText(true)
			setArea('')
		} else {
			console.log()
		}

	};

	const handleProfileChange = (event) => {
		setProfile(event.target.value);
	};

	const handleShiftChange = (event) => {
		setShift(event.target.value);
	};

	const handleBirthdayChange = (event) => {
		setBirthday(event.target.value);
	};

	const handleDateStartChange = (event) => {
		setDateStart(event.target.value);
	};

	const handleDateEndChange = (event) => {
		setDateEnd(event.target.value);
	}

	//const handleResponsibleChange = (event) => {
	//	setResponsible(event.target.value);
	//};

	const handleAvatarChange = (event) => {
		const file = event.target.files[0];
		setAvatar(file);
		setAvatarLocal(file)
	};

	const handleSubmit = (event) => {
		if (
			!name ||
			!surname ||
			!email ||
			!profile ||
			!dni ||
			!departament ||
			!area ||
			!shift ||
			!birthday ||
			!dateStart ||
			//!responsible ||
			!avatar ||
			name.trim() === '' ||
			surname.trim() === '' ||
			email.trim() === '' ||
			profile.trim() === '' ||
			dni.trim() === '' ||
			departament.trim() === '' ||
			area.trim() === '' ||
			shift.trim() === '' ||
			birthday.trim() === '' ||
			dateStart.trim() === '' ||
			dateEnd.trim() === ''
			//responsible.trim() === ''
		) {
			setMensajeError('Rellene todos los campos');
			return;
		}
		event.preventDefault();

		const nuevoUsuario = {
			name,
			surname,
			email,
			profile,
			dni,
			departament,
			area,
			shift,
			birthday,
			dateStart,
			dateEnd,
			//responsible,
			avatar,
		};

		agregarUsuario(nuevoUsuario);
	};

	// Validar SelectBox

	const renderAreaOptions = () => {
		switch (departament) {
			case 'Administrativo':
				return (
					<>
						<option value="Administración">Administración</option>
						<option value="Talento Humano">Talento Humano</option>
					</>
				);
			case 'Comercial':
				return (
					<>
						<option value="Comercial">Comercial</option>
					</>
				);
			case 'Operativo':
				return (
					<>
						<option value="Creativo">Creativo</option>
						<option value="Diseño Web">Diseño Web</option>
						<option value="Ejecutivo de Cuenta">Ejecutivo de Cuenta</option>
						<option value="Medios Audiovisuales">Medios Audiovisuales</option>
						<option value="Sistemas">Sistemas</option>
						<option value="Otro" id='otro'>Otro</option>
					</>
				);
			default:
				return (
					<option value="">Selecciona</option>
				);
		}
	};

	const renderPositionOptions = () => {
		switch (area) {
			case 'Administración':
				return (
					<>
						<option value="Líder de Perfil Asistente Administrativo">Líder de Perfil Asistente Administrativo</option>
						<option value="Asistente Administrativo">Asistente Administrativo</option>
					</>
				);
			case 'Talento Humano':
				return (
					<>
						<option value="Líder de Perfil de Talento Humano">Líder de Perfil de Talento Humano</option>
						<option value="Asistente de Talento Humano">Asistente de Talento Humano</option>
					</>
				);
			case 'Comercial':
				return (
					<>
						<option value="Asistente Comercial">Asistente Comercial</option>
						<option value="Asistente de Logística">Asistente de Logística</option>
						<option value="Cerradores">Cerradores</option>
						<option value="Ejecutivo de Cuentas">Ejecutivo de Cuentas</option>
						<option value="Líder de Perfil de Asistencia Logística">Líder de Perfil de Asistencia Logística</option>
						<option value="Líder de Perfil Ejecutivo de Cuentas">Líder de Perfil Ejecutivo de Cuentas</option>
					</>
				);
			case 'Creativo':
				return (
					<>
						<option value="Líder de Núcleo Creativo">Líder de Núcleo Creativo</option>
						<option value="Diseñador Gráfico">Diseñador Gráfico</option>
					</>
				);
			case 'Diseño Web':
				return (
					<>
						<option value="Líder de Núcleo de Diseño Web">Líder de Núcleo de Diseño Web</option>
						<option value="Maquetador Web">Maquetador Web</option>
						<option value="Desarrollador Web - Wordpress">Desarrollador Web - Wordpress</option>
					</>
				);

			case 'Ejecutivo de Cuenta':
				return (
					<>
						<option value="Coordinador de Marca">Coordinador de Marca</option>
					</>
				);
			case 'Medios Audiovisuales':
				return (
					<>
						<option value="Líder de Núcleo Medios Visuales">Líder de Núcleo Medios Visuales</option>
						<option value="Asistente de Medios Visuales">Asistente de Medios Visuales</option>
					</>
				);
			case 'Sistemas':
				return (
					<>
						<option value="Líder de Perfil de Sistemas">Líder de Perfil de Sistemas</option>
						<option value="Analista de Documentación">Analista de Documentación</option>
						<option value="Frontend">Frontend</option>
						<option value="Backend">Backend</option>
						<option value="Base de Datos">Base de Datos</option>
					</>
				);
			default:
				return (
					<>
						<option value="Coordinador de Marca">Coordinador de Marca</option>
						<option value="Líder de Marca">Líder de Marca</option>
						<option value="Ejecutivo de Cuentas">Ejecutivo de Cuentas</option>
						<option value="Community Manager">Community Manager</option>
						<option value="Publicidad Digital">Publicidad Digital</option>
					</>
				);
		}
	};









	return (
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
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="w-full flex flex-col space-y-1">
									<div className="w-full">
										<label
											htmlFor="names"
											className="block mb-1 font-medium text-gray-900"
										>
											Nombres
										</label>
										<input
											type="text"
											id="names"
											value={name} onChange={handleNameChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresar nombres completos"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="lastname"
											className="block mb-1 font-medium text-gray-900"
										>
											Apellidos
										</label>
										<input
											type="text"
											id="lastname"
											value={surname} onChange={handleSurnameChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresar ambos apellidos"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="dni"
											className="block mb-1 font-medium text-gray-900"
										>
											DNI
										</label>
										<input
											type="text"
											id="dni"
											value={dni} onChange={handleDniChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresar número de DNI"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="birthday"
											className="block mb-1 font-medium text-gray-900"
										>
											Fecha de nacimiento
										</label>
										<input
											type="date"
											id="birthday"
											value={birthday} onChange={handleBirthdayChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="email"
											className="block mb-1 font-medium text-gray-900"
										>
											Dirección de correo electrónico
										</label>
										<input
											type="email"
											id="email"
											value={email} onChange={handleEmailChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresa el e-mail"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="rol"
											className="block mb-1 font-medium text-gray-900"
										>
											Turno
										</label>
										<select
											id="rol"
											value={shift} onChange={handleShiftChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										>
											<option>Selecciona</option>
											<option value="Mañana">Mañana</option>
											<option value="Tarde">Tarde</option>
										</select>
									</div>

								</div>
								<div className="w-full flex flex-col space-y-1">
									<div className="w-full">
										<label
											htmlFor="departament"
											className="block mb-1 font-medium text-gray-900"
										>
											Departamento
										</label>
										<select
											id="departament"
											value={departament}
											onChange={handleDepartamentChange} className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										>
											<option>Selecciona</option>
											<option value="Administrativo">Administrativo</option>
											<option value="Comercial">Comercial</option>
											<option value="Operativo">Operativo</option>
										</select>
									</div>
									<div className="w-full">
										<label
											htmlFor="area"
											className="block mb-1 font-medium text-gray-900"
										>
											Núcleo
										</label>
										<select
											id="area"
											value={area}
											onChange={handleAreaChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											disabled={selectAreaDisabled}
										>
											<option>Selecciona</option>
											{departament && (
												renderAreaOptions()
											)}
										</select>

										{inputText && (
											<input
												type="text"
												id="area"
												value={area} onChange={handleAreaChange}
												className="w-full mt-1 p-2 text-gray-900 rounded-md border-2 border-green-600  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
												placeholder="Ingresa el núcleo"
											/>
										)}




									</div>
									<div className="w-full">
										<label
											htmlFor="profile"
											className="block mb-1 font-medium text-gray-900"
										>
											Perfil
										</label>
										<select
											id="profile"
											value={profile}
											onChange={handleProfileChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											disabled={selectProfileDisabled}
										>
											<option>Selecciona</option>
											{area && (
												renderPositionOptions()
											)}
										</select>

									</div>

									{/*<div className="w-full">
										<label
											htmlFor="responsable"
											className="block mb-1 font-medium text-gray-900"
										>
											Responsable
										</label>
										<input
											type="text"
											id="responsable"
											value={responsible} onChange={handleResponsibleChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresa el nombre completo"
										/>
									</div>*/}
									<div className="w-full">
										<label
											htmlFor="startDate"
											className="block mb-1 font-medium text-gray-900"
										>
											Fecha de ingreso
										</label>
										<input
											type="date"
											id="startDate"
											value={dateStart} onChange={handleDateStartChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="startDate"
											className="block mb-1 font-medium text-gray-900"
										>
											Fecha de Finalizacion
										</label>
										<input
											type="date"
											id="startDate"
											value={dateEnd} onChange={handleDateEndChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										/>
									</div>
								</div>
							</div>

							<div className="mx-auto w-full">
								<label
									htmlFor="fileImage"
									className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
								>
									<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center">

										{avatarLocal ? (
											<img src={URL.createObjectURL(avatarLocal)} className="rounded-md w-16 h-16" name="avatar" alt="" />
										) : (
											<CloudUploadIcon
												className="text-cv-secondary hover:text-cv-primary"
												sx={{ fontSize: 70 }}
											/>
										)}

										<div className="text-gray-600 text-center md:text-start">
											<p className="text-xs md:text-base font-medium text-cv-secondary hover:text-cv-primary">
												{avatar ? avatar.name : "Seleccione un archivo de imagen"}
											</p>
											<p className="text-xs md:text-sm text-gray-500">
												{avatar ? '' : "Formatos permitidos: JPG, JPEG, PNG"}
											</p>
										</div>
										<button>
											<label
												htmlFor="fileImage"
												className="py-2 px-4 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-sm font-semibold uppercase ease-linear transition-all duration-150"
											>
												Seleccionar
											</label>
										</button>
									</div>
									<input id="fileImage" accept="image/png,image/jpeg,image/jpg" type="file" className="sr-only" onChange={handleAvatarChange} />
								</label>
							</div>
							<p className='text-red-500 font-semibold'>{mensajeError}</p>
						</div>
						<div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-slate-200 rounded-b space-y-2 md:space-x-4 md:space-y-0">
							<button
								className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl font-semibold uppercase ease-linear transition-all duration-150"
								type="button"
								onClick={cerrarAgregarModal}
							>
								Cancelar
							</button>
							<button
								className="w-full py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
								type="button" onClick={handleSubmit}
							>
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
		</div>
	)
}


import FormControlLabel from '@mui/material/FormControlLabel';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
//import { SelectBoxModalAdd } from './SelectBoxModalColaborador';

const CvSwitch = styled(Switch)(({ theme }) => ({
	'& .MuiSwitch-switchBase.Mui-checked': {
		color: '#57F3FF',
		'&:hover': {
			backgroundColor: alpha('#57F3FF', theme.palette.action.hoverOpacity),
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
		backgroundColor: '#57F3FF',
	},
}));

export const ModalUpdateUser = ({ usuario, editarUsuario, cerrarEditarModal }) => {

	ModalUpdateUser.propTypes = {
		usuario: PropTypes.object,
		editarUsuario: PropTypes.func,
		cerrarEditarModal: PropTypes.func,
	}

	// Usesate de campos a editar
	const [Name, setName] = useState('');
	const [Surname, setSurname] = useState('');
	const [Email, setEmail] = useState('');
	const [Status, setStatus] = useState(0)
	const [Profile, setProfile] = useState('');
	const [Dni, setDni] = useState('');
	const [Departament, setDepartament] = useState('');
	const [Area, setArea] = useState('');
	const [Shift, setShift] = useState('');
	const [Birthday, setBirthday] = useState('');
	const [DateStart, setDateStart] = useState('');
	const [DateEnd, setDateEnd] = useState('');
	//const [Responsible, setResponsible] = useState('');
	const [Role, setRole] = useState('')
	const [Avatar, setAvatar] = useState(null);
	const [avatarLocal, setAvatarLocal] = useState(null);

	const [inputText, setInputText] = useState(false);

	useEffect(() => {
		setName(usuario.user[0].name);
		setSurname(usuario.user[0].surname);
		setEmail(usuario.user[0].email);
		setStatus(usuario.user[0].status);
		setProfile(usuario.profile_name);
		setDni(usuario.dni);
		setDepartament(usuario.department);
		setArea(usuario.area);
		setShift(usuario.shift);
		setBirthday(usuario.birthday);
		setDateStart(usuario.date_start);
		setDateEnd(usuario.date_end);
		//setResponsible(usuario.responsible);
		setRole(usuario.role[0].role_id);
		setAvatar(usuario.user[0].media[0].original_url);
	}, [usuario]);

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleSurnameChange = (event) => {
		setSurname(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handleStatusChange = (event) => {
		setStatus(event.target.checked ? 1 : 0);
	};

	const handleDniChange = (event) => {
		setDni(event.target.value);
	};

	const handleDepartamentChange = (event) => {
		setDepartament(event.target.value);
		setArea('')
		setProfile('')
	};

	const handleAreaChange = (event) => {
		setArea(event.target.value);
		setProfile('')
		if (event.target.options[event.target.selectedIndex].id === 'otro') {
			setInputText(true)
			setArea('')
		} else {
			console.log()
		}

	};

	const handleProfileChange = (event) => {
		setProfile(event.target.value);
	};

	const handleShiftChange = (event) => {
		setShift(event.target.value);
	};

	const handleBirthdayChange = (event) => {
		setBirthday(event.target.value);
	};

	const handleDateStartChange = (event) => {
		setDateStart(event.target.value);
	};

	const handleDateEndChange = (event) => {
		setDateEnd(event.target.value);
	}

	//const handleResponsibleChange = (event) => {
	//	setResponsible(event.target.value);
	//};

	const handleRoleChange = (event) => {
		setRole(event.target.value);
	};

	const handleAvatarChange = (event) => {
		const file = event.target.files[0];
		setAvatar(file);
		setAvatarLocal(file)
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const usuarioEditado = {
			...usuario,
			Name,
			Surname,
			Email,
			Status,
			Profile,
			Dni,
			Departament,
			Area,
			Shift,
			Birthday,
			DateStart,
			DateEnd,
			//Responsible,
			Role,
			Avatar,
		};


		editarUsuario(usuarioEditado);
	};




	// Validar SelectBox

	const renderAreaOptions = () => {
		switch (Departament) {
			case 'Administrativo':
				return (
					<>
						<option value="Administración">Administración</option>
						<option value="Talento Humano">Talento Humano</option>
					</>
				);
			case 'Comercial':
				return (
					<>
						<option value="Comercial">Comercial</option>
					</>
				);
			case 'Operativo':
				return (
					<>
						<option value="Creativo">Creativo</option>
						<option value="Diseño Web">Diseño Web</option>
						<option value="Ejecutivo de Cuenta">Ejecutivo de Cuenta</option>
						<option value="Medios Audiovisuales">Medios Audiovisuales</option>
						<option value="Sistemas">Sistemas</option>
						<option value="Otro" id='otro'>Otro</option>
					</>
				);
			default:
				return (
					<option value="">Selecciona</option>
				);
		}
	};

	const renderPositionOptions = () => {
		switch (Area) {
			case 'Administración':
				return (
					<>
						<option value="Líder de Perfil Asistente Administrativo">Líder de Perfil Asistente Administrativo</option>
						<option value="Asistente Administrativo">Asistente Administrativo</option>
					</>
				);
			case 'Talento Humano':
				return (
					<>
						<option value="Líder de Perfil de Talento Humano">Líder de Perfil de Talento Humano</option>
						<option value="Asistente de Talento Humano">Asistente de Talento Humano</option>
					</>
				);
			case 'Comercial':
				return (
					<>
						<option value="Asistente Comercial">Asistente Comercial</option>
						<option value="Asistente de Logística">Asistente de Logística</option>
						<option value="Cerradores">Cerradores</option>
						<option value="Ejecutivo de Cuentas">Ejecutivo de Cuentas</option>
						<option value="Líder de Perfil de Asistencia Logística">Líder de Perfil de Asistencia Logística</option>
						<option value="Líder de Perfil Ejecutivo de Cuentas">Líder de Perfil Ejecutivo de Cuentas</option>
					</>
				);
			case 'Creativo':
				return (
					<>
						<option value="Líder de Núcleo Creativo">Líder de Núcleo Creativo</option>
						<option value="Diseñador Gráfico">Diseñador Gráfico</option>
					</>
				);
			case 'Diseño Web':
				return (
					<>
						<option value="Líder de Núcleo de Diseño Web">Líder de Núcleo de Diseño Web</option>
						<option value="Maquetador Web">Maquetador Web</option>
						<option value="Desarrollador Web - Wordpress">Desarrollador Web - Wordpress</option>
					</>
				);

			case 'Ejecutivo de Cuenta':
				return (
					<>
						<option value="Coordinador de Marca">Coordinador de Marca</option>
					</>
				);
			case 'Medios Audiovisuales':
				return (
					<>
						<option value="Líder de Núcleo Medios Visuales">Líder de Núcleo Medios Visuales</option>
						<option value="Asistente de Medios Visuales">Asistente de Medios Visuales</option>
					</>
				);
			case 'Sistemas':
				return (
					<>
						<option value="Líder de Perfil de Sistemas">Líder de Perfil de Sistemas</option>
						<option value="Analista de Documentación">Analista de Documentación</option>
						<option value="Frontend">Frontend</option>
						<option value="Backend">Backend</option>
						<option value="Base de Datos">Base de Datos</option>
					</>
				);
			default:
				return (
					<>
						<option value="Coordinador de Marca">Coordinador de Marca</option>
						<option value="Líder de Marca">Líder de Marca</option>
						<option value="Ejecutivo de Cuentas">Ejecutivo de Cuentas</option>
						<option value="Community Manager">Community Manager</option>
						<option value="Publicidad Digital">Publicidad Digital</option>
					</>
				);
		}
	};


	return (
		<div>
			<div className="fixed top-0 left-0 z-50 w-full h-full p-2 overflow-x-hidden overflow-y-auto">
				<div className="relative w-full h-auto md:w-1/2 my-6 mx-auto border-2 border-white p-1 rounded-lg rotate-[5deg]">
					<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none rotate-[-5deg] p-2 md:p-0">
						<div className="flex items-center justify-center p-5 border-b border-solid border-slate-200 rounded-t">
							<h3 className="text-lg md:text-3xl font-semibold uppercase">
								Editar Colaborador
							</h3>
						</div>

						<div className="relative p-2 md:p-6 flex-auto space-y-4">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
								<div className="w-full flex flex-col space-y-1">
									<div className="w-full">
										<label
											htmlFor="names"
											className="block mb-1 font-medium text-gray-900"
										>
											Nombres
										</label>
										<input
											type="text"
											id="names"
											value={Name}
											onChange={handleNameChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresar nombres completos"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="lastname"
											className="block mb-1 font-medium text-gray-900"
										>
											Apellidos
										</label>
										<input
											type="text"
											id="lastname"
											value={Surname}
											onChange={handleSurnameChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresar ambos apellidos"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="dni"
											className="block mb-1 font-medium text-gray-900"
										>
											DNI
										</label>
										<input
											type="text"
											id="dni"
											value={Dni}
											onChange={handleDniChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresar número de DNI"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="birthday"
											className="block mb-1 font-medium text-gray-900"
										>
											Fecha de nacimiento
										</label>
										<input
											type="date"
											id="birthday"
											value={Birthday}
											onChange={handleBirthdayChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="email"
											className="block mb-1 font-medium text-gray-900"
										>
											Dirección de correo electrónico
										</label>
										<input
											type="email"
											id="email"
											value={Email}
											onChange={handleEmailChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresa el e-mail"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="shift"
											className="block mb-1 font-medium text-gray-900"
										>
											Turno
										</label>
										<select
											id="shift"
											value={Shift}
											onChange={handleShiftChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										>
											<option>Selecciona</option>
											<option value="Mañana">Mañana</option>
											<option value="Tarde">Tarde</option>
										</select>
									</div>
									<div className="w-full">
										<span
											className="block mb-1 font-medium text-gray-900"
										>
											Estado
										</span>
										<FormControlLabel
											control={<CvSwitch defaultChecked={Status} />}
											checked={Status}
											onChange={handleStatusChange}
											label={Status === 1 ? 'Activo' : 'Inactivo'}
										/>

									</div>
								</div>
								<div className="w-full flex flex-col space-y-1">
									<div className="w-full">
										<label
											htmlFor="departament"
											className="block mb-1 font-medium text-gray-900"
										>
											Departamento
										</label>
										<select
											id="departament"
											value={Departament}
											onChange={handleDepartamentChange} className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										>
											<option value="">Selecciona</option>
											<option value="Administrativo">Administrativo</option>
											<option value="Comercial">Comercial</option>
											<option value="Operativo">Operativo</option>
										</select>
									</div>
									<div className="w-full">
										<label
											htmlFor="area"
											className="block mb-1 font-medium text-gray-900"
										>
											Núcleo
										</label>
										<select
											id="area"
											value={Area}
											onChange={handleAreaChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										>
											<option>Selecciona</option>
											{Departament && (
												renderAreaOptions()
											)}
										</select>

										{inputText && (
											<input
												type="text"
												id="area"
												value={Area} onChange={handleAreaChange}
												className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
												placeholder="Ingresa el núcleo"
											/>
										)}
									</div>
									<div className="w-full">
										<label
											htmlFor="profile"
											className="block mb-1 font-medium text-gray-900"
										>
											Perfil
										</label>
										<select
											id="profile"
											value={Profile}
											onChange={handleProfileChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										>
											<option>Selecciona</option>
											{Area && (
												renderPositionOptions()
											)}
										</select>
									</div>

									<div className="w-full">
										<label
											htmlFor="rol"
											className="block mb-1 font-medium text-gray-900"
										>
											Rol
										</label>
										<select
											id="rol"
											value={Role}
											onChange={handleRoleChange} className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										>
											<option value="">Selecciona</option>
											<option value="1">Gerencia</option>
											<option value="2">Líder Núcleo</option>
											<option value="3">Colaborador</option>
										</select>
									</div>
									{/*<div className="w-full">
										<label
											htmlFor="responsable"
											className="block mb-1 font-medium text-gray-900"
										>
											Responsable
										</label>
										<input
											type="text"
											id="responsable"
											value={Responsible}
											onChange={handleResponsibleChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
											placeholder="Ingresa el nombre completo"
										/>
									</div> */}
									<div className="w-full">
										<label
											htmlFor="startDate"
											className="block mb-1 font-medium text-gray-900"
										>
											Fecha de ingreso
										</label>
										<input
											type="date"
											id="startDate"
											value={DateStart}
											onChange={handleDateStartChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										/>
									</div>
									<div className="w-full">
										<label
											htmlFor="endDate"
											className="block mb-1 font-medium text-gray-900"
										>
											Fecha de Finalización
										</label>
										<input
											type="date"
											id="endDate"
											value={DateEnd} onChange={handleDateEndChange}
											className="w-full p-2 text-gray-900 rounded-md border-b-2 border-gray-300  bg-white drop-shadow-md outline-none sm:text-md placeholder-gray-700 font-semibold"
										/>
									</div>
								</div>
							</div>

							<div className="mx-auto w-full">
								<label
									htmlFor="fileImage"
									className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300"
								>
									<div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 items-center justify-center">

										<img src={avatarLocal ? URL.createObjectURL(avatarLocal) : Avatar} className="rounded-md w-16 h-16" name="avatar" alt="" />
										<div className="text-gray-600 text-center md:text-start">
											<p className="text-xs md:text-base font-medium text-cv-secondary hover:text-cv-primary">
												{avatarLocal ? avatarLocal.name : "Seleccione una nueva imagen"}
											</p>
											<p className="text-xs md:text-sm text-gray-500">
												{avatarLocal ? '' : "Formatos permitidos: JPG, JPEG, PNG"}
											</p>
										</div>
										<button>
											<label
												htmlFor="fileImage"
												className="py-2 px-4 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-sm font-semibold uppercase ease-linear transition-all duration-150"
											>
												Seleccionar
											</label>
										</button>
									</div>
									<input id="fileImage" accept="image/png,image/jpeg,image/jpg" type="file" className="sr-only" onChange={handleAvatarChange} />
								</label>
							</div>
						</div>

						<div className="flex flex-col md:flex-row items-center justify-between p-2 md:p-6 border-t border-solid border-slate-200 rounded-b space-y-2 md:space-x-4 md:space-y-0">
							<button
								className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border-2 border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl font-semibold uppercase ease-linear transition-all duration-150"
								type="button"
								onClick={cerrarEditarModal}
							>
								Cancelar
							</button>
							<button
								className="w-full py-2 px-8 rounded-md text-white bg-cv-primary flex items-center justify-center text-xl uppercase ease-linear transition-all duration-150"
								type="button" onClick={handleSubmit}
							>
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
		</div >
	)
}
