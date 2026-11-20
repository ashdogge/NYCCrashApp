export const formatDate = (dateString) => {
  if (!dateString) return "Unknown";

  const datePart = dateString.slice(0, 10);
  const date = new Date(`${datePart}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) return "Unknown";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
};

export const formatTime = (timeString) => {
  if (!timeString) return "Unknown";

  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(timeString);

  if (!match) return "Unknown";

  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const seconds = Number(match[3] ?? 0);

  if (hours > 23 || minutes > 59 || seconds > 59) {
    return "Unknown";
  }

  const date = new Date(Date.UTC(2000, 0, 1, hours, minutes, seconds));

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(date);
};
