import styles from "./InfoModal.module.css";

const InfoModal = ({ onClose }) => {
  return (
    <div className={styles.infoModalBackdrop} onClick={onClose}>
      <div
        className={styles.infoModalContent}
        onClick={(event) => event.stopPropagation()}
      >
        <p>
          Created using the City of New York's{" "}
          <a
            href="https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95/data_preview"
            target="_blank"
            rel="noopener noreferrer"
          >
            Motor Vehicle Collisions database and API
          </a>
          . This site is not affiliated with the City of New York or any other
          related institution.
        </p>
        <p>
          This map does not represent <i>all</i> motor vehicle collisions in the
          City of New York. Incidents displayed are recorded by police only in
          collisions where there is an injury, death, or where there was at
          least $1000 worth of damage. For more information and methodology,
          please see the City of New York's{" "}
          <a
            href="https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95/about_data"
            target="_blank"
            rel="noopener noreferrer"
          >
            website
          </a>
          .
        </p>
        <p>
          For contact & inquiries:{" "}
          <a
            href="https://www.ashdev.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ashdev.io
          </a>
        </p>
      </div>
    </div>
  );
};

export default InfoModal;
