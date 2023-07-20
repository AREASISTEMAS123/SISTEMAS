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
import VisibilityIcon from '@mui/icons-material/Visibility';


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
TablaAsistencias.propTypes = {
  data: PropTypes.array.isRequired,
  filterName: PropTypes.string.isRequired,
  filterDepartment: PropTypes.string.isRequired,
  filterDate: PropTypes.string.isRequired,
};
//export default function TablaAsistencias({ data, filterName, filterDepartment, filterDate })
export default function TablaAsistencias({data}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //quita acentos en los filtros
  //function removeAccents(str) {
  //  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  //}


  return (
    <>
      <div className='bg-white rounded-md overflow-hidden'>
        <TableContainer >
          <Table sx={{ minWidth: 500 }} aria-label="Tabla Evaluaciones">
            <TableHead className='bg-cv-primary'>
              <TableRow >
                <TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Departamento</TableCell>
                <TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Area</TableCell>
                <TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Turno</TableCell>
                <TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Colaborador</TableCell>
                <TableCell align="center" style={{ color: "white" }} className='whitespace-nowrap'>Asistencia</TableCell>
                <TableCell align="center" style={{ color: "white", width: '150px' }} className='whitespace-nowrap sticky right-0 bg-cv-primary'>Acciones</TableCell>                
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                /*.filter((users) => {
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
                  users.date_start.toLowerCase().includes(filterDate.toLowerCase())
                )*/
                
                .slice(rowsPerPage > 0 ? page * rowsPerPage : 0, rowsPerPage > 0 ? page * rowsPerPage + rowsPerPage : data.length).map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left" width="auto" className='whitespace-nowrap'>{item.profile[0].department}</TableCell>
                    <TableCell align="right">{item.profile[0].area}</TableCell>
                    <TableCell align="right">{item.profile[0].shift}</TableCell>
                    <TableCell align="right">{item.user.name}</TableCell>
                    <TableCell align="right">{item.attendance}</TableCell>
                    <TableCell align="right" className='sticky right-0 p-1 z-10 bg-white'>
                      <div className='flex items-center justify-center'>
                        <button onClick="" className='p-2 w-full border rounded-md text-green-500 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out'>
                          <VisibilityIcon className='sm:mr-2'/>
                          <span className='hidden sm:inline'>Ver mas</span>
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