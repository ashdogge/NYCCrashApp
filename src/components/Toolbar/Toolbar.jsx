import styles from "./Toolbar.module.css";
import ToolbarButton from "../ToolbarButton";
const Toolbar = ({ buttons }) => {
  return (
    <div className={styles.toolbar}>
      {buttons.map((button, index) => (
        <div className={styles.buttonWrapper} key={index}>
          <ToolbarButton onClick={button.onClick} label={button.label} />
          {button.content && (
            <div className={styles.dropdown}>{button.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
