/* eslint-disable react/prop-types */

import styles from "../styles/dropdown.module.css";

const DropdownSingleSelect = ({ options, selectedValue, handleSelect, toggleDropdown }) => {
  return (
    <div>
      <select
        className={styles.dropdownWrapper}
        value={selectedValue}
        onChange={(e) => handleSelect(e.target.value)}
        onClick={toggleDropdown}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownSingleSelect;