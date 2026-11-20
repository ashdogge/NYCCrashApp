import { useState } from "react";
import styles from "./LandingPage.module.css";
import Map from "../../components/Map";
import Toolbar from "../../components/Toolbar/Toolbar";
import DatePicker from "../../components/DatePicker";
import InfoModal from "../../components/InfoModal";
import ToolbarButton from "../../components/ToolbarButton";
import { Button } from "storybook/internal/components";
const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const handleInfoModalOpen = () => {
    setIsInfoModalOpen((prev) => !prev);
  };

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.row}>
        <h1 className={styles.pageTitle}>Landing page placeholder!</h1>
      </div>
      <div className={styles.row}>
        <p>Main entry point for project!</p>
      </div>
      <div className={styles.mapContainer}>
        <Map selectedDate={selectedDate} />
      </div>
      <div className={styles.toolbarContainer}>
        <Toolbar
          buttons={[
            {
              label: "Select Date",
              onClick: handleModalOpen,
              content: isModalOpen && (
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  onClose={() => setIsModalOpen(false)}
                />
              ),
            },
          ]}
        />
        {isInfoModalOpen && (
          <InfoModal onClose={() => setIsInfoModalOpen(false)} />
        )}
      </div>
      <button
        label="Info"
        onClick={handleInfoModalOpen}
        className={styles.infoButton}
      >
        🛈
      </button>
    </div>
  );
};

export default LandingPage;
