import styles from "./Toolbar.module.css";
import ToolbarButton from "../ToolbarButton/ToolbarButton";
const Toolbar = ({ buttons }) => {
  return (
    // Toolbar component for controlling the map, specifying a date, etc
    <div className={styles.toolbar}>
      {buttons.map((button, index) => (
        <ToolbarButton
          key={index}
          label={button.label}
          onClick={button.onClick}
        />
      ))}
    </div>
  );
};

export default Toolbar;
