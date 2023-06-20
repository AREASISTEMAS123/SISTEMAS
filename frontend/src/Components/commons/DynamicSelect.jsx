import { useState } from "react";

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
        className="box-border  w-50 h-50 right-664 bottom-503 bg-gray-100 border border-gray-500 rounded-md p-2 outline-none"
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
