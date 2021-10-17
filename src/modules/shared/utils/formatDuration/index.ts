const formatDuration = (ms: number): string => {
  if (ms < 0) {
    console.error("formatDuration does not work with negative numbers");
    return "";
  }

  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  if (hours === 0) {
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  } else {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      seconds,
    ).padStart(2, "0")}`;
  }
};

export default formatDuration;
