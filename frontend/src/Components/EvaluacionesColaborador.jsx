import React, { useState } from 'react';
import { Card, CardContent, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

// Estilos personalizados para el Select
const CustomSelect = styled(Select)`
    color: #FFFFFF;
    .MuiSelect-select {
        background-color: #283C4C !important;
    }
    .MuiSelect-icon {
        color: #FFFFFF;
    }
    .MuiSelect-root:hover .MuiSelect-icon {
        color: #FFFFFF;
    }
    .MuiSelect-root.Mui-focused .MuiSelect-icon {
        color: #FFFFFF;
    }`;

export function EvaluacionesColaborador() {
    const [selectedMonth, setSelectedMonth] = useState(1); // Valor inicial del mes seleccionado

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    return (
        <div className="h-screen">
            <div className="flex justify-center">
                <Card className="max-w-2xl w-full" sx={{ backgroundColor: '#16232B' }}>
                    <CardContent className="flex flex-row items-center text-white">
                        <img
                            src="https://images.pexels.com/photos/3579181/pexels-photo-3579181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Foto del colaborador"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <div className="flex flex-col ml-4">
                            <Typography variant="h6" className="text-center mb-2" sx={{ color: '#FFFFFF' }}>
                                Andersson Godoy Garcia
                            </Typography>
                            <FormControl sx={{ minWidth: 120, marginBottom: 4 }}>
                                <CustomSelect
                                    value={selectedMonth}
                                    onChange={handleMonthChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Mes' }}
                                >
                                    <MenuItem value={1}>Enero</MenuItem>
                                    <MenuItem value={2}>Febrero</MenuItem>
                                    <MenuItem value={3}>Marzo</MenuItem>
                                    <MenuItem value={4}>Abril</MenuItem>
                                    <MenuItem value={5}>Mayo</MenuItem>
                                    <MenuItem value={6}>Junio</MenuItem>
                                    <MenuItem value={7}>Julio</MenuItem>
                                    <MenuItem value={8}>Agosto</MenuItem>
                                    <MenuItem value={9}>Septiembre</MenuItem>
                                    <MenuItem value={10}>Octubre</MenuItem>
                                    <MenuItem value={11}>Noviembre</MenuItem>
                                    <MenuItem value={12}>Diciembre</MenuItem>
                                </CustomSelect>
                            </FormControl>
                        </div>
                    </CardContent>

                    <CardContent className="grid md:grid-cols-3 gap-4 text-white">
                        <div className="border p-4">
                            <Typography variant="h6" className="mb-2">
                                Habilidades blandas
                            </Typography>
                            <Typography>Semanal: 8</Typography>
                            <Typography>Quincenal: 7</Typography>
                            <Typography>Mensual: 7.5</Typography>
                        </div>
                        <div className="border p-4">
                            <Typography variant="h6" className="mb-2">
                                Procesos de trabajo
                            </Typography>
                            <Typography>Semanal: 9</Typography>
                            <Typography>Quincenal: 8</Typography>
                            <Typography>Mensual: 8.5</Typography>
                        </div>
                        <div className="border p-4">
                            <Typography variant="h6" className="mb-2">
                                Observación
                            </Typography>
                            <Typography>Semanal: 7</Typography>
                            <Typography>Quincenal: 6</Typography>
                            <Typography>Mensual: 6.5</Typography>
                        </div>
                    </CardContent>

                    <CardContent className="border p-4 mt-4 text-white">
                        <Typography variant="h6" className="mb-2">
                            Promedio
                        </Typography>
                        <Typography>Mensual: 7.5</Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}