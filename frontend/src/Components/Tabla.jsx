import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "day", label: "", minWidth: 100 },
  { id: "1", label: "L", minWidth: 100 },
  { id: "2", label: "M", minWidth: 100 },
  { id: "3", label: "M", minWidth: 100 },
  { id: "4", label: "J", minWidth: 100 },
  { id: "5", label: "V", minWidth: 100 },
  { id: "6", label: "S", minWidth: 100 },
  { id: "7", label: "D", minWidth: 100 },
  { id: "8", label: "L", minWidth: 100 },
  { id: "9", label: "M", minWidth: 100 },
  { id: "10", label: "M", minWidth: 100 },
  { id: "11", label: "J", minWidth: 100 },
  { id: "12", label: "S", minWidth: 100 },
  { id: "13", label: "D", minWidth: 100 },
  { id: "14", label: "L", minWidth: 100 },
  { id: "15", label: "M", minWidth: 100 },
  { id: "16", label: "M", minWidth: 100 },
  { id: "17", label: "J", minWidth: 100 },
  { id: "18", label: "V", minWidth: 100 },
  { id: "19", label: "S", minWidth: 100 },
  { id: "20", label: "D", minWidth: 100 },
  { id: "21", label: "L", minWidth: 100 },
  { id: "22", label: "M", minWidth: 100 },
];

const days = [
  { id: "day", label: "Nombre y Apellidos", minWidth: 350 },
  { id: "1", label: "1", minWidth: 100 },
  { id: "2", label: "2", minWidth: 100 },
  { id: "3", label: "3", minWidth: 100 },
  { id: "4", label: "4", minWidth: 100 },
  { id: "5", label: "5", minWidth: 100 },
  { id: "6", label: "6", minWidth: 100 },
  { id: "7", label: "7", minWidth: 100 },
  { id: "8", label: "8", minWidth: 100 },
  { id: "9", label: "9", minWidth: 100 },
  { id: "10", label: "10", minWidth: 100 },
  { id: "11", label: "11", minWidth: 100 },
  { id: "12", label: "12", minWidth: 100 },
  { id: "13", label: "13", minWidth: 100 },
  { id: "14", label: "14", minWidth: 100 },
  { id: "15", label: "15", minWidth: 100 },
  { id: "16", label: "16", minWidth: 100 },
  { id: "17", label: "17", minWidth: 100 },
  { id: "18", label: "18", minWidth: 100 },
  { id: "19", label: "19", minWidth: 100 },
  { id: "20", label: "20", minWidth: 100 },
  { id: "21", label: "21", minWidth: 100 },
  { id: "22", label: "22", minWidth: 100 },
];

function createData(day, name, population, size) {
  const density = population / size;
  return { day, name, population, size, density };
}

const nameValues = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
];

const rows = [
  createData("Arturo Antonio Montejo Soto", "dsf", 0, 0), // Fila para los días de la semana
  ...nameValues.map((value) => createData("", value, 0, 0)), // Agrega las filas adicionales aquí
  createData("India", 1324171354, 3287263),
  createData("China", 1403500365, 9596961),
  createData("Italy", 60483973, 301340),
  createData("United States", 327167434, 9833520),
  createData("Canada", 37602103, 9984670),
  createData("Australia", 25475400, 7692024),
  createData("Germany", 83019200, 357578),
  createData("Ireland", 4857000, 70273),
  createData("Mexico", 126577691, 1972550),
  createData("Japan", 126317000, 377973),
  createData("France", 67022000, 640679),
  createData("United Kingdom", 67545757, 242495),
  createData("Russia", 146793744, 17098246),
  createData("Nigeria", 200962417, 923768),
  createData("Brazil", 210147125, 8515767),
];

export const Tabla = () => {
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
    <div className="max-w-screen-xl m-auto">
      <Paper sx={{ width: "100%" }} className="mt-5">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{
                      minWidth: column.minWidth,
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                {days.map((day) => (
                  <TableCell
                    key={day.id}
                    align="center"
                    style={{
                      minWidth: day.minWidth,
                      position: "sticky",
                      top: 56,
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    {day.label}
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
                          <TableCell key={column.id} align="center">
                            {value}
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
    </div>
  );
};