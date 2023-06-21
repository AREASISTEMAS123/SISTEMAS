import { useState } from "react";
import PropTypes from 'prop-types';

<<<<<<< HEAD
export const DynamicSelect = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <select
        value={selectedOption}
        onChange={handleChange}
        className="bg-cv-secondary border-2 border-cv-primary text-white text-base rounded-lg block p-2.5 outline-none"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
};
export default DynamicSelect;
