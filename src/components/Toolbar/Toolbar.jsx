import styles from "./Toolbar.module.css";
import ToolbarButton from "../ToolbarButton";
import { formatDate } from "../../utils/DateTimeFormat/DateTimeFormat";

const Toolbar = ({ buttons, selectedDate }) => {
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

      <div className={styles.selectedDate}>
        {selectedDate ? formatDate(selectedDate) : "No date selected"}
      </div>
    </div>
  );
};

export default Toolbar;
