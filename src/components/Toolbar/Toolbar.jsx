import styles from "./Toolbar.module.css";

const Toolbar = ({ buttons }) => {
  return (
    <div className={styles.toolbar}>
      {buttons.map((button, index) => (
        <div className={styles.buttonWrapper} key={index}>
          <button onClick={button.onClick}>{button.label}</button>

          {button.content && (
            <div className={styles.dropdown}>{button.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
