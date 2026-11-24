import { useState } from "react";
import styles from "./LandingPage.module.css";
import Map from "../../components/Map";
import Toolbar from "../../components/Toolbar/Toolbar";
import DatePicker from "../../components/DatePicker";
import InfoModal from "../../components/InfoModal";
import StatPanel from "../../components/StatPanel";
import useAccidents from "../../hooks/useAccidents";
import { Info } from "lucide-react";
const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const { accidents, loading, error } = useAccidents(selectedDate);

  const stats = accidents.reduce(
    (totals, accident) => {
      totals.crashes += 1;
      totals.fatalities += Number(accident.number_of_persons_killed) || 0;
      totals.injuries += Number(accident.number_of_persons_injured) || 0;

      return totals;
    },
    {
      crashes: 0,
      fatalities: 0,
      injuries: 0,
    },
  );

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const handleInfoModalOpen = () => {
    setIsInfoModalOpen((prev) => !prev);
  };

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.statPanelContainer}>
        <StatPanel
          value={loading || error || !selectedDate ? "—" : stats.crashes}
          label="Total Crashes"
        />

        <StatPanel
          value={loading || error || !selectedDate ? "—" : stats.fatalities}
          label="Total Fatalities"
        />

        <StatPanel
          value={loading || error || !selectedDate ? "—" : stats.injuries}
          label="Total Injuries"
        />
      </div>
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
          <Map accidents={accidents} loading={loading} error={error} />
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
