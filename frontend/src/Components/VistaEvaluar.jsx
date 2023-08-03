import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import AccessibilityNewRoundedIcon from '@mui/icons-material/AccessibilityNewRounded';


export const VistaEvaluar = () => {
	const rol = localStorage.getItem('rol');
	const area = localStorage.getItem('area');

	const hasRole = (targetRole) => {
		return rol === targetRole;
	};
	const hasArea = (targetArea) => {
		return area === targetArea;
	};

	return (
		<>
			<div className="w-full space-y-4">
				<div className=" bg-cv-primary p-4 sm:px-4 sm:py-10 rounded-lg">
					<div className="flex flex-col gap-3 sm:flex-row items-center md:relative">
						<Link to="/evaluaciones" className="bg-cv-cyan text-cv-primary px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-cv-cyan/80 md:absolute active:scale-95 ease-in-out duration-300">
							<ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
							<span>Regresar</span>
						</Link>
						<div className="w-full flex items-center justify-center">
							<h1 className="text-cv-cyan text-center text-3xl font-bold">Lista de evaluaciones para</h1>
						</div>
					</div>
					<div className="w-full flex items-center justify-center">
						<h1 className="text-cv-cyan text-3xl font-bold">aqui va el nombre</h1>
					</div>

				</div>
					
				<div className="w-full grid gap-4 md:grid-cols-2 ">

					{/* AUTOEVALUACIÓN */}
					<div className="w-full flex items-center justify-center">
						<div className="bg-cv-primary overflow-hidden w-full max-w-sm text-white rounded-xl">
							<div className="p-6 space-y-4">
								<div className="flex justify-between items-center">
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
								</div>
								<div className="flex items-center pt-6">
									<p className="text-lg md:text-xl font-semibold uppercase">
										AUTOEVALUACIÓN
									</p>
								</div>

							</div>
							<Link to="" className="p-5 w-full bg-cv-cyan text-cv-primary flex items-center justify-center text-xl font-bold uppercase">
								<span >Evaluar</span>
							</Link>
						</div>
					</div>

					{/* DESEMPEÑO */}
					<div className="w-full flex items-center justify-center">
						<div className="bg-cv-primary overflow-hidden w-full max-w-sm text-white rounded-xl">
							<div className="p-6 space-y-4">
								<div className="flex justify-between items-center">
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
								</div>
								<div className="flex items-center pt-6">
									<p className="text-lg md:text-xl font-semibold uppercase">
										DESEMPEÑO
									</p>
								</div>

							</div>
							<Link to="" className="p-5 w-full bg-cv-cyan text-cv-primary flex items-center justify-center text-xl font-bold uppercase">
								<span >Evaluar</span>
							</Link>
						</div>
					</div>

					{/* DIAGNOSTICO DE LIDERAZGO */}
					{(hasRole('Lider Nucleo') && hasArea('Talento Humano')) || hasRole('Gerencia') ? (
						<div className="w-full flex items-center justify-center">
							<div className="bg-cv-primary overflow-hidden w-full max-w-sm text-white rounded-xl">
								<div className="p-6 space-y-4">
									<div className="flex justify-between items-center">
										<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
											<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
										</div>
										<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
											<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
										</div>
										<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
											<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
										</div>
										<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
											<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
										</div>
									</div>
									<div className="flex items-center pt-6">
										<p className="text-lg md:text-xl font-semibold uppercase">
											DIAGNOSTICO DE LIDERAZGO
										</p>
									</div>

								</div>
								<Link to="" className="p-5 w-full bg-cv-cyan text-cv-primary flex items-center justify-center text-xl font-bold uppercase">
									<span >Evaluar</span>
								</Link>
							</div>
						</div>
					): null}

					{/* HABILIDADES BLANDAS */}
					<div className="w-full flex items-center justify-center">
						<div className="bg-cv-primary overflow-hidden w-full max-w-sm text-white rounded-xl">
							<div className="p-6 space-y-4">
								<div className="flex justify-between items-center">
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
									<div className="w-12 h-12 p-1 bg-white rounded-full flex items-center justify-center">
										<AccessibilityNewRoundedIcon sx={{ fontSize: 40, color: '#16232B' }} />
									</div>
								</div>
								<div className="flex items-center pt-6">
									<p className="text-lg md:text-xl font-semibold uppercase">
										HABILIDADES BLANDAS
									</p>
								</div>

							</div>
							<Link to="" className="p-5 w-full bg-cv-cyan text-cv-primary flex items-center justify-center text-xl font-bold uppercase">
								<span >Evaluar</span>
							</Link>
						</div>
					</div>



				</div>


			</div>
		</>
	)
}
