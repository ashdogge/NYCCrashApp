import { useState } from "react";
import styles from "./DatePicker.module.css";

const DatePicker = ({ onClose, onDateChange, selectedDate }) => {
  const [tempDate, setTempDate] = useState(selectedDate ?? "");
  const today = new Date().toLocaleDateString("en-CA");
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
          min="2014-01-01"
          max={today}
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
