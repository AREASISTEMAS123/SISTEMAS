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
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChecklistIcon from '@mui/icons-material/Checklist';


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
TablaEvaluaciones.propTypes = {
	data: PropTypes.array.isRequired,
	filterName: PropTypes.string.isRequired,
};

export default function TablaEvaluaciones({ data, filterName }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const Token = localStorage.getItem("token");

	// const [selectedUserData, setSelectedUserData] = React.useState(null);
	// const navigate = useNavigate();

	// const handleEvaluarClick = (userData) => {
	// 	setSelectedUserData(userData);
	// 	localStorage.setItem('selectedUserData', JSON.stringify(userData));
	// 	navigate("/evaluar");
	// };

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

	//quita acentos en los filtros
	function removeAccents(str) {
		return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	}

	//const [userId, setUserId] = React.useState(null);
	const handleButtonClick = (id) => {
		fetch(import.meta.env.VITE_API_URL+`/evaluations/insert/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Token}`
				// Agrega cualquier otra cabecera requerida por la API, como tokens de autenticación
			},
			body: JSON.stringify({
				// Agrega los datos que deseas enviar en el cuerpo de la solicitud
			}),
		})
			.then(response => response.json())
			.then(data => {
				// Maneja la respuesta de la API
				console.log(data);
			})
			.catch(error => {
				console.log('No se pudo obtener los datos' + error)
			});
	};

	return (
		<>
			<div className='bg-white rounded-md overflow-hidden'>
				<TableContainer >
					<Table sx={{ minWidth: 500 }} aria-label="Tabla Evaluaciones">
						<TableHead className='bg-cv-primary'>
							<TableRow >
								<TableCell align="center" style={{ color: "white", width: '150px' }} className='whitespace-nowrap'>DNI</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Colaborador</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Rol</TableCell>
								<TableCell align="center" style={{ color: "white", width: '150px' }} className='whitespace-nowrap'>Estado</TableCell>
								<TableCell align="center" style={{ color: "white", width: '150px' }} className='whitespace-nowrap sticky right-0 bg-cv-primary'>Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody >
							{data.filter((users) => {
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
							}).slice(rowsPerPage > 0 ? page * rowsPerPage : 0, rowsPerPage > 0 ? page * rowsPerPage + rowsPerPage : data.length).map((item) => (
								<TableRow
									key={item.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align="left" width="auto" className='whitespace-nowrap'>{item.dni}</TableCell>
									<TableCell align="left">{item.user && item.user[0]?.name + " " + item.user[0]?.surname}</TableCell>
									<TableCell align="left">{item.user && item.role[0]?.role_id ? roleNames[item.role[0].role_id] : ''}</TableCell>
									<TableCell align="center">
										<div className='flex items-center justify-center'>
											<Link
											to="/evaluar"
											// onClick={() => handleEvaluarClick(item)}
												onClick={() => handleButtonClick(item.user_id)}
											className='p-2 w-full border rounded-md font-semibold bg-cv-cyan text-cv-primary hover:bg-cv-cyan/80 active:scale-95 ease-in-out duration-300'>
												<ChecklistIcon className='sm:mr-2' />
												<span className='hidden sm:inline'>Evaluar</span>
											</Link>
										</div>
									</TableCell>
									<TableCell align="right" className='sticky right-0 p-1 z-10 bg-white'>
										<div className='flex items-center justify-center'>
											<Link to="/evaluacion/detalle" className='p-2 w-full border rounded-md text-center bg-cv-primary text-cv-cyan hover:bg-cv-secondary active:scale-95 ease-in-out duration-300'>
												<VisibilityIcon className='sm:mr-2' />
												<span className='hidden sm:inline'>Ver más</span>
											</Link>
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
			</div>
		</>
	);
}