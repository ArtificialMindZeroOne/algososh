export const calcFibonacciArray = (index: number, initialArray: number[]) => {
  for (let i = 2; i <= index; i++) {
    initialArray[i] = initialArray[i - 1] + initialArray[i - 2];
  }

  return initialArray;
};
