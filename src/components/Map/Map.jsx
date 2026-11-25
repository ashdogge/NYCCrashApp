// src/components/Map/Map.jsx

import { useEffect, useRef, useState } from "react";
import { importLibrary } from "../../utils/GoogleMapsLoader/GoogleMapsLoader";

import styles from "./Map.module.css";

import CrashMarker from "../CrashMarker";
import CrashModal from "../CrashModal";
const NYC_CENTER = {
  lat: 40.7128,
  lng: -74.006,
};

const Map = ({ accidents, loading, error }) => {
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [selectedAccident, setSelectedAccident] = useState(null);
  const mapRef = useRef(null);

  // Load Google Maps
  useEffect(() => {
    const loadMaps = async () => {
      try {
        await importLibrary("maps");
        await importLibrary("marker");
        setMapsLoaded(true);
      } catch (error) {
        console.error("Failed to load Google Maps:", error);
        setMapError("Failed to load Google Maps");
      }
    };

    loadMaps();
  }, []);

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
      {error && <p role="alert">{error}</p>}
      {mapError && <p role="alert">{mapError}</p>}

      <gmp-map ref={mapRef} map-id={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}>
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
