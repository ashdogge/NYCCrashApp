import styles from "./LandingPage.module.css";
import Map from "../../components/Map";
const LandingPage = () => {
  return (
    <div className={styles.landingPage}>
      <h1>Landing page placeholder!</h1>
      <p>Main entry point for project!</p>
      <div>
        <Map />
      </div>
    </div>
  );
};

export default LandingPage;
