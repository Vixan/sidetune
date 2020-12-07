export const formatSecondsToHms = (seconds: number) => {
  const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
  const hours = seconds / 3600;
  const minutes = (seconds % 3600) / 60;
  const hmsParts =
    hours >= 1 ? [hours, minutes, seconds % 60] : [minutes, seconds % 60];

  return hmsParts.map(format).join(":");
};
