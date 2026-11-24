import { useState, useEffect, useRef } from "react";
import { getAccidentsByDate } from "../services/accidentService";
import LRUCache from "../utils/LRUCache";

const useAccidents = (selectedDate) => {
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const accidentCache = useRef(null);

  if (accidentCache.current === null) {
    accidentCache.current = new LRUCache(10);
  }

  useEffect(() => {
    setError(null);

    if (!selectedDate) {
      setAccidents([]);
      setLoading(false);
      return;
    }

    const cached = accidentCache.current.get(selectedDate);

    if (cached !== undefined) {
      setAccidents(cached);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);
    setAccidents([]);

    const fetchAccidents = async () => {
      try {
        const data = await getAccidentsByDate(selectedDate, controller.signal);

        if (controller.signal.aborted) return;

        accidentCache.current.set(selectedDate, data);
        setAccidents(data);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchAccidents();

    return () => controller.abort();
  }, [selectedDate]);

  return { accidents, loading, error };
};

export default useAccidents;
