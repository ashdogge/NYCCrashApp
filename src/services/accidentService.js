export const getAccidentsByDate = async (date) => {
  const response = await fetch(
    `/api/collisions?date=${encodeURIComponent(date)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch accidents");
  }

  return response.json();
};