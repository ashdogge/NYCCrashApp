import styles from "./ToolbarButton.module.css";

const ToolbarButton = ({ label, onClick }) => {
  return (
    // Button component.
    <div>
      <button className={styles.button} onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default ToolbarButton;
