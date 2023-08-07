import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useTheme } from '@mui/material/styles';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import { useState } from 'react';


function TablePaginationActions(props) {
	const theme = useTheme();
	const { count, page, rowsPerPage, onPageChange } = props;

	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5 }}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="Primera Pagina"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="Atras"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Siguiente"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="Ultima Pagina"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
TablaListaColaboradores.propTypes = {
	data: PropTypes.array.isRequired,
	abrirEditarModal: PropTypes.func.isRequired,
	deleteUser: PropTypes.func.isRequired,
	filterName: PropTypes.string.isRequired,
	filterDepartment: PropTypes.string.isRequired,
	filterDate: PropTypes.string.isRequired,
	filterShift: PropTypes.string.isRequired,
};
export default function TablaListaColaboradores({ data, abrirEditarModal, deleteUser, filterName, filterDepartment, filterDate, filterShift }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const [showWarning, setShowWarning] = useState(false);
	const [rowDelete, setRowDelete] = useState(null)


	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const roleNames = {
		1: 'Gerencia',
		2: 'Lider Nucleo',
		3: 'Colaborador',
	};

	const showModalWarning = (row) => {
		setRowDelete(row);
		setShowWarning(true);
	};

	const confirmDelete = () => {
		deleteUser(rowDelete)
		setShowWarning(false);
	};

	const cancelDelete = () => {
		setShowWarning(false);
	};

	//quita acentos en los filtros
	function removeAccents(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}


	return (
		<>
			<div className='bg-white rounded-md overflow-hidden'>
				<TableContainer >
					<Table sx={{ minWidth: 500 }} aria-label="Tabla Evaluaciones">
						<TableHead className='bg-cv-primary'>
							<TableRow >
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Nombre</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Teléfono</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Email</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>DNI</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Departamento</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Núcleo</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Perfil</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Turno</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>F. Ingreso</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>F. Finalización</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>F. Nacimiento</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Rol</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Estado</TableCell>
								<TableCell align="center" style={{ color: "white", width: '200px' }} className='whitespace-nowrap sticky right-0 bg-cv-primary'>Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data
								.filter((users) => {
									const normalizedFilter = removeAccents(filterName.toLowerCase());
									const normalizedName = users.user && users.user[0] ? removeAccents(users.user[0].name.toLowerCase()) : '';
									const normalizedSurname = users.user && users.user[0] ? removeAccents(users.user[0].surname.toLowerCase()) : '';

									if (filterName.includes(' ')) {
										const [firstName, lastName] = filterName.split(' ');
										const normalizedFirstName = removeAccents(firstName.toLowerCase());
										const normalizedLastName = removeAccents(lastName.toLowerCase());

										return (
											(normalizedName.includes(normalizedFirstName) && normalizedSurname.includes(normalizedLastName)) ||
											(normalizedName.includes(normalizedLastName) && normalizedSurname.includes(normalizedFirstName))
										);
									} else {
										return (
											normalizedName.includes(normalizedFilter) ||
											normalizedSurname.includes(normalizedFilter)
										);
									}
								})
								.filter((users) =>
									(users.department && users.department.toLowerCase().includes(filterDepartment.toLowerCase())) &&
									users.date_start.toLowerCase().includes(filterDate.toLowerCase()) &&
									(users.shift && users.shift.toLowerCase().includes(filterShift.toLowerCase()))
								)
								.slice(rowsPerPage > 0 ? page * rowsPerPage : 0, rowsPerPage > 0 ? page * rowsPerPage + rowsPerPage : data.length).map((users) => (
									<TableRow
										key={users.id}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell align="left" width="auto" className='whitespace-nowrap'>{users.user && users.user[0]?.name + " " + users.user[0]?.surname}</TableCell>
										<TableCell align="left">{users.cellphone}</TableCell>
										<TableCell align="left">{users.user && users.user[0]?.email}</TableCell>
										<TableCell align="right">{users.dni}</TableCell>
										<TableCell align="right">{users.department}</TableCell>
										<TableCell align="right" className='whitespace-nowrap'>{users.area}</TableCell>
										<TableCell align="left" className='whitespace-nowrap'>{users.profile_name}</TableCell>
										<TableCell align="right">{users.shift}</TableCell>
										<TableCell align="right" className='whitespace-nowrap'>{users.date_start}</TableCell>
										<TableCell align="left" className='whitespace-nowrap'>{users.date_end}</TableCell>
										<TableCell align="right" className='whitespace-nowrap'>{users.birthday}</TableCell>
										<TableCell align="left" className='whitespace-nowrap'>{users.user && users.role[0]?.role_id ? roleNames[users.role[0].role_id] : ''}</TableCell>
										<TableCell align="center" className='whitespace-nowrap'>
											{users.user && users.user[0].status === 1 ?
												<p>Activo</p> :
												<div className='text-center'>
													<p>Inactivo</p>
													<p className=''>{users.user[0].status_description}</p>
												</div>
											}
										</TableCell>
										<TableCell align="right" className='sticky right-0 p-1 z-10 bg-white'>
											<div className='flex items-center justify-center flex-row space-x-2'>
												<button onClick={() => abrirEditarModal(users)} className='p-2 border rounded-md text-green-500 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out'>
													<EditIcon className="mr-1" />
												</button>
												<button onClick={() => showModalWarning(users.id)} className='p-2 border rounded-md text-red-500 hover:bg-red-500 hover:text-white transition duration-300 ease-in-out'>
													<DeleteIcon className="ml-1" />
												</button>
											</div>
										</TableCell>
									</TableRow>
								))}
							{emptyRows > 0 && (
								<TableRow style={{ height: 53 * emptyRows }}>
									<TableCell colSpan={12} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<div className='flex justify-end'>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25,
						//{ label: 'Todos', value: -1 }
					]}
						colSpan={3}
						count={data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						SelectProps={{
							inputProps: {
								'aria-label': 'Filas por Pagina',
							},
							native: true,
						}}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						ActionsComponent={TablePaginationActions}
					/>
				</div>

				{showWarning ? (
					<div>
						<div
							className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative w-96 md:w-auto my-6 mx-auto max-w-3xl border-2 border-white p-1 rounded-lg rotate-[5deg]">

								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rotate-[-5deg]">
									<div className="relative p-6 flex-auto">
										<div className='space-y-2 flex flex-col items-center'>
											<div className='w-full flex flex-col items-center justify-center text-red-500 p-5 border-b border-solid border-slate-200 rounded-t'>
												<ErrorIcon sx={{ fontSize: 125 }} />
												<h2 className="text-4xl whitespace-nowrap font-bold">¡Atención!</h2>
											</div>
											<div className='flex flex-col justify-center text-cv-primary'>
												<p className='text-2xl text-red-500 text-center'>Estás a punto de eliminar a un colaborador.</p>
												<p>Por favor, asegúrate de que estás seguro de esta acción antes de proceder.</p>
												<p>Si deseas continuar con la eliminación, haz clic en el botón <strong>Eliminar</strong>.</p>
												<p>Si prefieres cancelar esta acción, haz clic en el botón <strong>Cancelar</strong>.</p>
												<p className='text-2xl font-bold text-center'>¿Estas seguro que quieres Eliminar?</p>
											</div>
										</div>

									</div>
									<div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b space-x-2">

										<button
											className="w-full py-2 px-8 rounded-md text-cv-primary bg-white border border-cv-primary hover:text-white hover:bg-cv-primary flex items-center justify-center text-xl font-bold uppercase active:scale-95 ease-in-out duration-300"
											type="button"
											onClick={cancelDelete}
										>
											Cancelar
										</button>
										<button
											className="w-full py-2 px-8 rounded-md text-white bg-red-600 border border-red-500 hover:border-red-700 hover:bg-red-700 flex items-center justify-center text-xl uppercase active:scale-95 ease-in-out duration-300"
											type="button" onClick={confirmDelete}
										>
											Eliminar
										</button>
									</div>
								</div>
							</div>
						</div>
						<div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
					</div>
				) : null}

			</div>
		</>
	);
}