export const getRandomNumbers = (numNumbers: number) => {
  const min = 1;
  const max = 9;

  const randomNumbers: number[] = [];

  while (randomNumbers.length < numNumbers) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!randomNumbers.includes(num)) {
      randomNumbers.push(num);
    }
  }
  return randomNumbers;
};
