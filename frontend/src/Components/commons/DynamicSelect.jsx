import { useState } from "react";
import PropTypes from 'prop-types';



export const DynamicSelect = ({ options, onChange }) => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedOption(selectedValue);
		onChange(selectedValue);
	};

	DynamicSelect.propTypes = {
		options: PropTypes.array.isRequired,
		onChange: PropTypes.func.isRequired,
	}
	
	return (
		<>
			<select value={selectedOption} onChange={handleChange} className="bg-cv-secondary border-2 border-cv-primary text-white text-base rounded-lg block p-2.5 outline-none">
				<option value="">Selecciona una opción</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</>
	)
}
export default DynamicSelect;