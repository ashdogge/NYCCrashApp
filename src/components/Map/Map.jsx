import { useEffect, useState } from "react";
import { importLibrary } from "../../scripts/GoogleMapsLoader/GoogleMapsLoader.js";
import styles from "./Map.module.css";

const Map = () => {
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const location = {
    lat: 40.71291732788086,
    lng: -74.0060043334961,
  };

  useEffect(() => {
    const loadMaps = async () => {
      try {
        await importLibrary("maps");
        await importLibrary("marker");

        setMapsLoaded(true);
      } catch (error) {
        console.error("Failed to load Google Maps:", error);
      }
    };

    loadMaps();
  }, []);

  if (!mapsLoaded) {
    return <p>Loading map...</p>;
  }

  return (
    <div className={styles.Map}>
      <gmp-map center={location} zoom={14} map-id="DEMO_MAP_ID">
        <gmp-advanced-marker position={location} title="My location" />
      </gmp-map>
    </div>
  );
};

export default Map;
