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
};
export default function TablaListaColaboradores({data }) {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	// Avoid a layout jump when reaching the last page with empty rows.
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
		2: 'Lider Departamento',
		3: 'Lider Area',
		4: 'Colaborador',
	};

	return (
		<>
			<div className='bg-white rounded-md overflow-hidden'>
				<TableContainer >
					<Table sx={{ minWidth: 500 }} aria-label="Tabla Evaluaciones">
						<TableHead className='bg-cv-primary'>
							<TableRow >
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Nombre</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>DNI</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Departamento</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Area</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Perfil</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Turno</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Responsable</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>F. Ingreso</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>F. Nacimiento</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Rol</TableCell>
								<TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Estado</TableCell>
								<TableCell align="center" style={{ color: "white", width: '200px' }} className='whitespace-nowrap sticky right-0 bg-cv-primary'>Acciones</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{(rowsPerPage > 0
								? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								: data
							).map((users) => (
								<TableRow
									key={users.id}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell align="left" width="auto" className='whitespace-nowrap'>{users.user[0].name + " " + users.user[0].surname}</TableCell>
									<TableCell align="right">{users.dni}</TableCell>
									<TableCell align="right">{users.department}</TableCell>
									<TableCell align="right">{users.area}</TableCell>
									<TableCell align="right">{users.profile_name}</TableCell>
									<TableCell align="right">{users.shift}</TableCell>
									<TableCell align="left" className='whitespace-nowrap'>{users.responsible}</TableCell>
									<TableCell align="right" className='whitespace-nowrap'>{users.date_start}</TableCell>
									<TableCell align="right" className='whitespace-nowrap'>{users.birthday}</TableCell>
									<TableCell align="right">{roleNames[users.role[0].role_id]}</TableCell>
									<TableCell align="right">{users.user[0].status === 1 ? 'Activo' : 'Inactivo'}</TableCell>
									<TableCell align="right" className='sticky right-0 p-1 z-10 bg-white'>
										<div className='flex items-center justify-center flex-row space-x-2'>
											<button className='p-2 border rounded-md'>
												<EditIcon className="mr-1 text-green-500" />
											</button>
											<button className='p-2 border rounded-md'>
												<DeleteIcon className="ml-1 text-red-500" />
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
						rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
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