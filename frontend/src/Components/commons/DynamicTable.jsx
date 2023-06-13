
export const DynamicTable = ({ columns, data }) => {
	return (
		<>
			<div className="overflow-x-auto">
				<table className="w-full text-sm text-left text-white">
					<thead className="text-xs bg-cv-primary uppercase">
						<tr>
							{columns.map((column, index) => (
								<th key={index} scope="col" className="px-6 py-3">{column}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{data.map((row, index) => (
							<tr key={index} className="bg-gray-800 border-b border-gray-700">
								{columns.map((column, colIndex) => (
									<td key={colIndex} className="px-6 py-4">{row[column]}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}
export default DynamicTable;
