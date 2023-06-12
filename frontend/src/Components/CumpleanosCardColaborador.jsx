import WavingHandIcon from '@mui/icons-material/WavingHand';
export const CumpleanosCardColaborador = () => {
	return (
		<>
			<div className="bg-cv-primary overflow-hidden w-full max-w-md text-white rounded-xl">
				<div className="p-4 space-y-4">
					<div className="flex justify-between items-center flex-col md:flex-row">
						<img src="https://images.pexels.com/photos/3579181/pexels-photo-3579181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Foto de Perfil" className="w-20 h-20 md:w-14 md:h-14 rounded-full shadow-lg border-2 border-white" />
						<p className="text-xl font-medium text-white md:text-2xl ">Bonnie Green</p>
					</div>
					<div className="space-y-2">
						<div className="flex items-center flex-col md:flex-row">
							<p className="text-lg md:text-xl font-semibold">Cumpleaños:</p>
							<p className="text-base md:text-lg font-light md:ml-5">12 de Junio, 2023</p>
						</div>
						<div className="flex items-center flex-col md:flex-row">
							<p className="text-lg md:text-xl font-semibold">Departamento:</p>
							<p className="text-base md:text-lg font-light md:ml-5">Operativo</p>
						</div>
						<div className="flex items-center md:justify-between md:space-x-4 flex-col md:flex-row">
							<div className="md:w-1/2 flex items-center">
								<p className="text-lg md:text-xl font-semibold">Area:</p>
								<p className="text-base md:text-lg font-light ml-5 whitespace-nowrap">Diseño Web</p>
							</div>
							<div className="md:w-1/2 flex items-center">
								<p className="text-lg md:text-xl font-semibold">Turno:</p>
								<p className="text-base md:text-lg font-light ml-5">Mañana</p>
							</div>
						</div>
					</div>
				</div>
				<button className="p-5 w-full bg-white text-cv-primary flex items-center justify-center text-xl font-bold uppercase">
					<WavingHandIcon/>
					<p className='ml-2'>Saludar</p>
				</button>
			</div>
		</>
	)
}
