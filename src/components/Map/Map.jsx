// src/components/Map/Map.jsx

import { useEffect, useState } from "react";
import { importLibrary } from "../../utils/GoogleMapsLoader/GoogleMapsLoader";
import { getAccidentsByDate } from "../../services/accidentService";
import styles from "./Map.module.css";
import CrashMarker from "../CrashMarker";

const NYC_CENTER = {
  lat: 40.7128,
  lng: -74.006,
};

const Map = () => {
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const selectedDate = "2023-01-03";
  // Load Google Maps
  useEffect(() => {
    const loadMaps = async () => {
      try {
        await importLibrary("maps");
        await importLibrary("marker");
        setMapsLoaded(true);
      } catch (error) {
        console.error("Failed to load Google Maps:", error);
        setError("Failed to load Google Maps");
      }
    };

    loadMaps();
  }, []);

  // Fetch accidents whenever the selected date changes
  useEffect(() => {
    if (!selectedDate) {
      setAccidents([]);
      return;
    }

    const controller = new AbortController();

    const loadAccidents = async () => {
      setLoading(true);
      setError(null);
      setAccidents([]);

      try {
        const data = await getAccidentsByDate(selectedDate, controller.signal);

        if (!controller.signal.aborted) {
          setAccidents(data);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error);
          setError("Failed to load accidents");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadAccidents();

    return () => controller.abort();
  }, [selectedDate]);

  // Convert the API records into usable map coordinates
  const validAccidents = accidents.filter((accident) => {
    const lat = Number(accident.latitude);
    const lng = Number(accident.longitude);

    return (
      accident.latitude != null &&
      accident.longitude != null &&
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180 &&
      !(lat === 0 && lng === 0)
    );
  });

  if (!mapsLoaded) {
    return <p>Loading Google Maps...</p>;
  }

  return (
    <div className={styles.Map}>
      {loading && <p>Loading accidents...</p>}
      {error && <p>{error}</p>}

      <p>Displaying {validAccidents.length} accident locations</p>

      <gmp-map center={NYC_CENTER} zoom={11} map-id="DEMO_MAP_ID">
        {validAccidents.map((accident) => (
          <CrashMarker key={accident.collision_id} accident={accident} />
        ))}
      </gmp-map>
    </div>
  );
};

export default Map;
