export const getAccidentsByDate = async (date) => {
  const response = await fetch(
    `/api/accidents?date=${encodeURIComponent(date)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to retrieve accidents");
  }

  return response.json();
};
