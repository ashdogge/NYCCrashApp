import { useState, useEffect, useRef } from "react";
import { getAccidentsByDate } from "../services/accidentService";
import LRUCache from "../utils/LRUCache";

const useAccidents = (selectedDate) => {
  const [result, setResult] = useState(null);

  const accidentCache = useRef(null);

  if (accidentCache.current === null) {
    accidentCache.current = new LRUCache(10);
  }

  useEffect(() => {
    if (!selectedDate) return;

    const controller = new AbortController();

    const loadAccidents = async () => {
      try {
        const cached = accidentCache.current.get(selectedDate);

        const data =
          cached !== undefined
            ? cached
            : await getAccidentsByDate(selectedDate, controller.signal);

        if (controller.signal.aborted) return;

        if (cached === undefined) {
          accidentCache.current.set(selectedDate, data);
        }

        setResult({
          date: selectedDate,
          accidents: data,
          error: null,
        });
      } catch (error) {
        if (controller.signal.aborted) return;

        setResult({
          date: selectedDate,
          accidents: [],
          error: error.message,
        });
      }
    };

    Promise.resolve().then(() => {
      if (!controller.signal.aborted) {
        return loadAccidents();
      }
    });

    return () => controller.abort();
  }, [selectedDate]);

  const currentResult =
    selectedDate && result?.date === selectedDate ? result : null;

  return {
    accidents: currentResult?.accidents ?? [],
    loading: Boolean(selectedDate && !currentResult),
    error: currentResult?.error ?? null,
  };
};

export default useAccidents;
