import styles from "./DatePicker.module.css";

const DatePicker = ({ onClose, onSelect }) => {
  return (
    // Datepicker modal component.
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <input type="date" onChange={(e) => onSelect(e.target.value)} />
      </div>
    </div>
  );
};

export default DatePicker;
