import styles from "./DatePicker.module.css";

const DatePicker = ({ onClose, onDateChange, selectedDate }) => {
  const handleChange = (event) => {
    onDateChange(event.target.value);
    onClose();
  };

  return (
    // Datepicker modal component.
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <input
          id="crash-date"
          type="date"
          value={selectedDate}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DatePicker;
