export const EvaluacionesCard = () => {
	return (
		<div className="max-w-sm bg-slate-950 text-white rounded-lg p-4">
			<div className="flex justify-between items-center mb-4">
				<img src="https://images.pexels.com/photos/3745429/pexels-photo-3745429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Foto de Perfil" className="w-20 h-20 rounded-full shadow-lg" />
				<h5 className="mb-1 text-2xl font-medium text-white">Bonnie Green</h5>
			</div>
			<div className="space-y-2">
				<h2 className="text-4xl font-bold text-white text-center mb-4 uppercase">Junio</h2>
				<div className="border border-slate-800 rounded-lg p-2">
					<h3 className="text-xl text-white text-center mb-2">Habilidades Blandas</h3>
					<div className="grid grid-cols-3 gap-2">
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Semanal</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Quincenal</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Mensual</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
					</div>
				</div>

				<div className="border border-slate-800 rounded-lg p-2">
					<h3 className="text-xl text-white text-center mb-2">Procesos de trabajo</h3>
					<div className="grid grid-cols-3 gap-2">
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Semanal</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Quincenal</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Mensual</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
					</div>
				</div>

				<div className="border border-slate-800 rounded-lg p-2">
					<h3 className="text-xl text-white text-center mb-2">Observacion</h3>
					<div className="grid grid-cols-3 gap-2">
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Semanal</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Quincenal</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
						<div className="bg-slate-800 p-2 rounded-lg flex flex-col items-center justify-center">
							<p className="text-lg text-white">Mensual</p>
							<span className="text-2xl font-semibold text-white">10</span>
						</div>
					</div>
				</div>

				<div className="border border-slate-800 rounded-lg p-2 flex flex-col items-center justify-center">
					<h3 className="text-xl text-white text-center mb-2">Promedio</h3>
					<span className="text-2xl font-semibold text-white">10</span>
				</div>

			</div>

		</div>
	)
}
