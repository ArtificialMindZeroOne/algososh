import { IString } from "../types/my-types";
import { INumber } from "../types/my-types";

export const timeout = (delay: number) => {
  return new Promise<() => void>((res) => setTimeout(res, delay));
};

export const swap = (
  arr: IString[] | INumber[] | number[],
  firstIndex: number,
  secondIndex: number
) => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
  return arr;
};
