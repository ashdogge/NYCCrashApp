import { useEffect, useRef } from "react";
import styles from "./CrashMarker.module.css";
import {
  formatDate,
  formatTime,
} from "../../utils/DateTimeFormat/DateTimeFormat";

const CrashMarker = ({ accident, onClick }) => {
  const markerRef = useRef(null);

  const injured = Number(accident.number_of_persons_injured) || 0;
  const killed = Number(accident.number_of_persons_killed) || 0;

  const tooltipContent = `${formatDate(accident.crash_date)} ${formatTime(accident.crash_time)}
Location: ${accident.on_street_name || "Unknown"}
Injured: ${injured}
Killed: ${killed}`;

  useEffect(() => {
    const marker = markerRef.current;
    if (!marker) return;

    const handleClick = () => {
      onClick(accident);
    };

    marker.addEventListener("gmp-click", handleClick);

    return () => {
      marker.removeEventListener("gmp-click", handleClick);
    };
  }, [accident, onClick]);

  return (
    <gmp-advanced-marker
      ref={markerRef}
      position={{
        lat: Number(accident.latitude),
        lng: Number(accident.longitude),
      }}
      title={tooltipContent}
      gmp-clickable
    >
      <div
        className={`${styles.marker} ${
          killed > 0
            ? styles.fatal
            : injured > 0
              ? styles.injury
              : styles.normal
        }`}
      />
    </gmp-advanced-marker>
  );
};

export default CrashMarker;
