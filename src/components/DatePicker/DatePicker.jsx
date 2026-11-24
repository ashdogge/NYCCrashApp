import { useState } from "react";
import styles from "./DatePicker.module.css";

const DatePicker = ({ onClose, onDateChange, selectedDate }) => {
  const [tempDate, setTempDate] = useState(selectedDate ?? "");

  const handleChange = (event) => {
    setTempDate(event.target.value);
  };

  const handleClose = () => {
    onDateChange(tempDate);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <label htmlFor="crash-date">Select accident date</label>

        <input
          id="crash-date"
          type="date"
          value={tempDate}
          onChange={handleChange}
        />
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Apply selected date and close"
        >
          ✔
        </button>
      </div>
    </div>
  );
};

export default DatePicker;
