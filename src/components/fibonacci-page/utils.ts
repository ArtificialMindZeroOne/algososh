import { timeout } from "../../utils/functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const getFibonacciNumbers = (n: number) => {
  let arr: number[] = [1, 1];
  if (n === 0) {
    return arr = [1];
  }
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

export const arrayTimeOut = async (
  arr: string[],
  setState: React.Dispatch<React.SetStateAction<string[]>>,
  loader: (value: React.SetStateAction<boolean>) => void
) => {
  const { length } = arr;
  let numberArray = [];
  let i = 0;
  for (i; i < length; i++) {
    numberArray.push(arr[i]);
    await timeout(SHORT_DELAY_IN_MS);
    setState(numberArray.map(String));
  }
  loader(false);
  return numberArray;
};
