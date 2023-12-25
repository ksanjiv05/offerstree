export const getCoordinates = (value1: number, value2: number) => {
  const latitude = value1 / 10000000;
  const longitude = value2 / 10000000;

  return {latitude, longitude};
};
