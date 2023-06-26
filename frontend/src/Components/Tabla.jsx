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
  { id: "name", label: "", minWidth: 350 },
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
  { id: "11", label: "M", minWidth: 100 },
  { id: "12", label: "J", minWidth: 100 },
  { id: "13", label: "V", minWidth: 100 },
  { id: "14", label: "S", minWidth: 100 },
  { id: "15", label: "D", minWidth: 100 },
  { id: "16", label: "L", minWidth: 100 },
  { id: "17", label: "M", minWidth: 100 },
  { id: "18", label: "M", minWidth: 100 },
  { id: "19", label: "J", minWidth: 100 },
  { id: "20", label: "V", minWidth: 100 },
  { id: "21", label: "S", minWidth: 100 },
  { id: "22", label: "D", minWidth: 100 },
];

const nameValues = [
  "Arturo Antonio Montejo Soto",
  "Luisa Gabriela Vargas Flores",
  "Javier Alonso Herrera Rojas",
  "Ana Sofía Torres Gómez",
  "Diego Alejandro Ríos Cordero",
  "María Fernanda Luna Medina",
  "Carlos Andrés Ortega Ruiz",
  "Laura Valentina Guzmán Mendoza",
  "José Miguel Delgado Chávez",
  "Sara Isabel Cáceres León",
  "Pedro Pablo Vásquez Huerta",
  "Camila Valeria Ayala Castro",
  "Gabriel Eduardo Sánchez Paredes",
  "Valentina Nicole Mendoza Guerra",
  "Daniel Alejandro Ramírez Cáceres",
  "Carolina Daniela Huamaní Vargas",
  "Sebastián Ignacio Rojas Cordero",
  "Isabella Camila Guzmán Luna",
  "Jorge Alberto Paredes Ayala",
  "Mariana Alejandra Medina Delgado",
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

const generateCellContent = (color) => (
  <div
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      backgroundColor: color,
      display: "inline-block",
      marginTop: "calc(50% - 5px)",
    }}
  />
);

const rows = nameValues.map((name) => {
  const row = { name };
  for (let i = 1; i <= 22; i++) {
    const randomNumber = Math.floor(Math.random() * 5);
    let color;
    switch (randomNumber) {
      case 0:
        color = "red";
        break;
      case 1:
        color = "green";
        break;
      case 2:
        color = "yellow";
        break;
      case 3:
        color = "skyblue";
        break;
      case 4:
        color = "gray";
        break;
      default:
        color = "white";
        break;
    }
    row[i] = generateCellContent(color);
  }
  return row;
});

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
      <Paper className="mt-5">
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
                      backgroundColor: "#16232B",
                      color: "white"
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {days.map((day) => (
                  <TableCell
                    key={day.id}
                    align="center"
                    style={{
                      minWidth: day.minWidth,
                      position: "sticky",
                      top: 56,
                      backgroundColor: "#16232B",
                      color: "white",
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
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align="center"
                            style={{ minWidth: column.minWidth }}
                          >
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
