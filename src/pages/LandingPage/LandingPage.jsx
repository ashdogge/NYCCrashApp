import { useState } from "react";
import styles from "./LandingPage.module.css";
import Map from "../../components/Map";
import Toolbar from "../../components/Toolbar/Toolbar";
import DatePicker from "../../components/DatePicker/";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2023-01-03");
  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.landingPage}>
      <h1>Landing page placeholder!</h1>
      <p>Main entry point for project!</p>

      <Map selectedDate={selectedDate} />

      <div className={styles.ToolbarContainer}>
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
            {
              label: "Button 2",
              onClick: () => console.log("Button 2 clicked"),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default LandingPage;
