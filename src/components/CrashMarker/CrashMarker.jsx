import styles from "./CrashMarker.module.css";

const CrashMarker = ({ accident, onClick }) => {
  const injured = Number(accident.number_of_persons_injured);
  const killed = Number(accident.number_of_persons_killed);
  return (
    <gmp-advanced-marker
      position={{
        lat: Number(accident.latitude),
        lng: Number(accident.longitude),
      }}
      title={`Collision ${accident.collision_id}`}
      onClick={() => onClick(accident)}
    >
      <div
        className={`${styles.marker} ${killed > 0 ? styles.fatal : injured > 0 ? styles.injury : styles.normal}`}
      />
    </gmp-advanced-marker>
  );
};

export default CrashMarker;
