// src/components/Map/Map.jsx

import { useEffect, useRef, useState } from "react";
import { importLibrary } from "../../utils/GoogleMapsLoader/GoogleMapsLoader";
import { getAccidentsByDate } from "../../services/accidentService";
import styles from "./Map.module.css";
import LRUCache from "../../utils/LRUCache";
import CrashMarker from "../CrashMarker";
import CrashModal from "../CrashModal";
const NYC_CENTER = {
  lat: 40.7128,
  lng: -74.006,
};

const Map = ({ selectedDate }) => {
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedAccident, setSelectedAccident] = useState(null);
  const mapRef = useRef(null);
  const accidentCache = useRef(null);

  if (accidentCache.current === null) {
    accidentCache.current = new LRUCache(10);
  }
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

  useEffect(() => {
    if (!selectedDate || !mapsLoaded) {
      setAccidents([]);
      return;
    }

    // Check the LRU cache
    const cachedData = accidentCache.current.get(selectedDate);

    if (cachedData !== undefined) {
      console.log(`Cache HIT: ${selectedDate}`);

      setAccidents(cachedData);
      setLoading(false);
      setError(null);
      return;
    }

    console.log(`Cache MISS: ${selectedDate}`);

    const controller = new AbortController();

    const loadAccidents = async () => {
      setLoading(true);
      setError(null);
      setAccidents([]);

      try {
        const data = await getAccidentsByDate(selectedDate, controller.signal);

        if (!controller.signal.aborted) {
          // Save the data in the LRU cache
          accidentCache.current.set(selectedDate, data);

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
  }, [selectedDate, mapsLoaded]);

  useEffect(() => {
    if (!mapsLoaded || !mapRef.current) return;

    mapRef.current.center = NYC_CENTER;
    mapRef.current.zoom = 11;
  }, [mapsLoaded]);
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

  return (
    <div className={styles.Map}>
      {loading && <p>Loading accidents...</p>}
      {error && <p>{error}</p>}

      <gmp-map ref={mapRef} map-id="DEMO_MAP_ID">
        {validAccidents.map((accident) => (
          <CrashMarker
            key={accident.collision_id}
            accident={accident}
            onClick={setSelectedAccident}
          />
        ))}
      </gmp-map>
      <p>Displaying {validAccidents.length} accident locations</p>
      {selectedAccident && (
        <CrashModal
          accident={selectedAccident}
          onClose={() => setSelectedAccident(null)}
        />
      )}
    </div>
  );
};

export default Map;
