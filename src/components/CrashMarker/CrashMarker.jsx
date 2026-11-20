import styles from "./CrashMarker.module.css";
import {
  formatDate,
  formatTime,
} from "../../utils/DateTimeFormat/DateTimeFormat";
const CrashMarker = ({ accident, onClick }) => {
  const injured = Number(accident.number_of_persons_injured);
  const killed = Number(accident.number_of_persons_killed);
  const tooltipContent = `${formatDate(accident.crash_date)} ${formatTime(accident.crash_time)}\nLocation: ${accident.on_street_name || "Unknown"}\nInjured: ${injured}\nKilled: ${killed}`;
  return (
    <gmp-advanced-marker
      position={{
        lat: Number(accident.latitude),
        lng: Number(accident.longitude),
      }}
      title={tooltipContent}
      onClick={() => onClick(accident)}
    >
      <div
        className={`${styles.marker} ${killed > 0 ? styles.fatal : injured > 0 ? styles.injury : styles.normal}`}
      />
    </gmp-advanced-marker>
  );
};

export default CrashMarker;
