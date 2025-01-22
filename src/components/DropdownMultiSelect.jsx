/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "../styles/dropdown.module.css";

const DropdownMultiSelect = ({
  options,
  selectedOptions,
  handleSelect,
  handleAddNewOption,
}) => {
  const [newOption, setNewOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle selection for each option (add or remove)
  const toggleOptionSelection = (option) => {
    const updatedSelections = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    handleSelect(updatedSelections);
  };

  // Add a new custom option to the list
  const handleAddOption = () => {
    if (newOption && !options.includes(newOption)) {
      handleAddNewOption(newOption);
      setNewOption(""); // Clear the input field after adding
    }
  };

  // Toggle the visibility of the dropdown
  const toggleDropdownVisibility = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.dropdownWrapper}>
      <div
        className={styles.selectedOptions}
        onClick={toggleDropdownVisibility}
      >
        <span>
          {selectedOptions.length > 0
            ? selectedOptions.join(", ")
            : "Select options"}
        </span>
        <span className={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
      </div>
      
      {/* Dropdown options list */}
      {isDropdownOpen && (
        <div className={styles.optionsList}>
          {options.map((option, index) => (
            <div key={index} className={styles.option}>
              <input
                type="checkbox"
                id={`checkbox-${index}`} // Unique id for each checkbox
                checked={selectedOptions.includes(option)}
                onChange={() => toggleOptionSelection(option)}
              />
              <label htmlFor={`checkbox-${index}`}>{option}</label> {/* Associate label with the checkbox */}
            </div>
          ))}
        </div>
      )}

      {/* New option input field */}
      {isDropdownOpen && (
        <div className={styles.addOptionWrapper}>
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add a new item"
            className={styles.addOptionInput}
          />
          <button onClick={handleAddOption} className={styles.addOptionButton}>
            <span>+</span>
            <span>Add</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMultiSelect;
