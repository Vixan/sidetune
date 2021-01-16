export const getRandomNumber = (max: number) => Math.floor(Math.random() * max);

export const getShuffledArray = (array: any[]) => {
  const arrayCopy = array.slice();

  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = getRandomNumber(i);
    const temp = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = temp;
  }

  return arrayCopy;
};
