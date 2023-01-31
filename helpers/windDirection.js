const windDirection = (wind) => {
  if (wind > 22.5 && wind < 67.5) {
    return `NE`;
  } else if (wind > 67.5 && wind < 112.5) {
    return `E`;
  } else if (wind > 112.5 && wind < 158.5) {
    return `SE`;
  } else if (wind > 158.5 && wind < 203.5) {
    return `S`;
  } else if (wind > 203.5 && wind < 248.5) {
    return `SW`;
  } else if (wind > 248.5 && wind < 293.5) {
    return `W`;
  } else if (wind > 293.5 && wind < 338.5) {
    return `NW`;
  } else return `N`;
};

const timeFormatter = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours().toString().padStart(2, 0);
  const minutes = date.getMinutes().toString().padStart(2, 0);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate().toString().padStart(2, 0);

  return `${hours}:${minutes}, ${day}. ${(month + 1)
    .toString()
    .padStart(2, 0)}. ${year}`;
};

const visibilityCalc = (visibility) => {
  return (visibility / 1000).toFixed(1);
};
