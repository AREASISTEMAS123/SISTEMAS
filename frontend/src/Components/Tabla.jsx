import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'name', label: 'Nombre', minWidth: 170 },
  { id: 'code', label: '1', minWidth: 100 },
  { id: 'code', label: '2', minWidth: 100 },
  { id: 'code', label: '3', minWidth: 100 },
  { id: 'code', label: '4', minWidth: 100 },
  { id: 'code', label: '5', minWidth: 100 },
  { id: 'code', label: '6', minWidth: 100 },
  { id: 'code', label: '7', minWidth: 100 },
  { id: 'code', label: '8', minWidth: 100 },
  { id: 'code', label: '9', minWidth: 100 },
  { id: 'code', label: '10', minWidth: 100 },
  { id: 'code', label: '11', minWidth: 100 },
  { id: 'code', label: '12', minWidth: 100 },
  { id: 'code', label: '13', minWidth: 100 },
  { id: 'code', label: '14', minWidth: 100 },
  { id: 'code', label: '15', minWidth: 100 },
  { id: 'code', label: '16', minWidth: 100 },
  { id: 'code', label: '16', minWidth: 100 },
  { id: 'code', label: '18', minWidth: 100 },
  { id: 'code', label: '19', minWidth: 100 },
  { id: 'code', label: '20', minWidth: 100 },
  { id: 'code', label: '21', minWidth: 100 },
  { id: 'code', label: '22', minWidth: 100 },

  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const columnsDos = [
  { id: 'name', label: 'Nombre', minWidth: 170 },
  { id: 'code', label: '1', minWidth: 100 },
  { id: 'code', label: '2', minWidth: 100 },
  { id: 'code', label: '3', minWidth: 100 },
  { id: 'code', label: '4', minWidth: 100 },
  { id: 'code', label: '5', minWidth: 100 },
  { id: 'code', label: '6', minWidth: 100 },
  { id: 'code', label: '7', minWidth: 100 },
  { id: 'code', label: '8', minWidth: 100 },
  { id: 'code', label: '9', minWidth: 100 },
  { id: 'code', label: '10', minWidth: 100 },
  { id: 'code', label: '11', minWidth: 100 },
  { id: 'code', label: '12', minWidth: 100 },
  { id: 'code', label: '13', minWidth: 100 },
  { id: 'code', label: '14', minWidth: 100 },
  { id: 'code', label: '15', minWidth: 100 },
  { id: 'code', label: '16', minWidth: 100 },
  { id: 'code', label: '16', minWidth: 100 },
  { id: 'code', label: '18', minWidth: 100 },
  { id: 'code', label: '19', minWidth: 100 },
  { id: 'code', label: '20', minWidth: 100 },
  { id: 'code', label: '21', minWidth: 100 },
  { id: 'code', label: '22', minWidth: 100 },

  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export const  Tabla = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (

    <Paper sx={{ width: '100%' }} className="mt-5 ">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
               L
              </TableCell>
              <TableCell align="center" colSpan={1}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>

            <TableRow>
              {columnsDos.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>


          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}