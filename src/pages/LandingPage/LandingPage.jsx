import { useState } from "react";
import styles from "./LandingPage.module.css";
import Map from "../../components/Map";
import Toolbar from "../../components/Toolbar/Toolbar";
import DatePicker from "../../components/DatePicker";
import InfoModal from "../../components/InfoModal";
import { Info } from "lucide-react";
const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const handleInfoModalOpen = () => {
    setIsInfoModalOpen((prev) => !prev);
  };

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.mapAndToolbarContainer}>
        <div className={styles.toolbarContainer}>
          <Toolbar
            buttons={[
              {
                label: "Select Date ",
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
        <div className={styles.mapContainer}>
          <Map selectedDate={selectedDate} />
        </div>
      </div>
      <button
        type="button"
        aria-label="Application information"
        onClick={handleInfoModalOpen}
        className={styles.infoButton}
      >
        <Info size={20} strokeWidth={3} />
      </button>
    </div>
  );
};

export default LandingPage;
