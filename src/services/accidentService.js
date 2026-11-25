const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const getAccidentsByDate = async (date, signal) => {
  const response = await fetch(
    `${API_BASE_URL}/api/accidents?date=${encodeURIComponent(date)}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error(`Failed to retrieve accidents: ${response.status}`);
  }

  return response.json();
};
