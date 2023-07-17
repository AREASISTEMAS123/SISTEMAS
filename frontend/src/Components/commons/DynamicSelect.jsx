import { useState } from "react";
import PropTypes from 'prop-types';

export const DynamicSelect = ({ title, options, onChange }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <>
      <select value={selectedOption} onChange={handleChange} className="w-full box-border w-50 h-50 mt-5 right-664 bottom-503 bg-gray-100 border border-gray-500 rounded-md p-2 outline-none">

        <option value="">{title}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
};

DynamicSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DynamicSelect;



