import styles from "./StatPanel.module.css";

const StatPanel = ({ value, label }) => {
  return (
    <div className={styles.statPanel}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default StatPanel;
