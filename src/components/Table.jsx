import { useState } from "react";
import DropdownSingleSelect from "./DropdownSingleSelect";
import DropdownMultiSelect from "./DropdownMultiSelect";
import styles from "../styles/table.module.css";

const Table = () => {
  const [rows, setRows] = useState([]);
  const [singleSelectOptions] = useState(["Option 1", "Option 2", "Option 3"]);
  const [multiSelectOptions, setMultiSelectOptions] = useState([...singleSelectOptions]);

  // Function to add a new row
  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        singleSelectValue: "",
        multiSelectValues: [],
      },
    ]);
  };

  // Update singleSelect value for a specific row
  const handleSingleSelectChange = (index, value) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, singleSelectValue: value } : row
    );
    setRows(updatedRows);
  };

  // Update multiSelect values for a specific row
  const handleMultiSelectChange = (index, values) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, multiSelectValues: values } : row
    );
    setRows(updatedRows);
  };

  // Add a new option to the multiSelect dropdown
  const handleAddNewOption = (item) => {
    if (!multiSelectOptions.includes(item)) {
      setMultiSelectOptions((prevOptions) => [...prevOptions, item]);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <DropdownSingleSelect
                  options={singleSelectOptions}
                  selectedValue={row.singleSelectValue}
                  handleSelect={(value) => handleSingleSelectChange(index, value)}
                />
              </td>
              <td>
                <DropdownMultiSelect
                  options={multiSelectOptions}
                  selectedOptions={row.multiSelectValues}
                  handleSelect={(values) => handleMultiSelectChange(index, values)}
                  handleAddNewOption={handleAddNewOption}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.addButtonContainer}>
        <button onClick={handleAddRow} className={styles.addRowButton}>
          <span>+</span>
          <span>Add Row</span>
        </button>
      </div>
    </div>
  );
};

export default Table;
