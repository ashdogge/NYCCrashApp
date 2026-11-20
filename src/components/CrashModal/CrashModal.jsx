import styles from "./CrashModal.module.css";
import { useEffect, useRef } from "react";
import {
  formatDate,
  formatTime,
} from "../../utils/DateTimeFormat/DateTimeFormat";

const CrashModal = ({ accident, onClose }) => {
  const closeButtonRef = useRef(null);
  useEffect(() => {
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-labelledby="crash-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close accident details"
        >
          ×
        </button>

        <h2 id="crash-modal-title">Accident Details</h2>

        <p>
          <strong>Date:</strong> {formatDate(accident.crash_date)}
        </p>

        <p>
          <strong>Time:</strong> {formatTime(accident.crash_time)}
        </p>

        <p>
          <strong>Location:</strong> {accident.on_street_name || "Unknown"}
        </p>
      </div>
    </div>
  );
};

export default CrashModal;
