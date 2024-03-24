import { DELAY_IN_MS } from "../../constants/delays";
import { IString } from "../../types/my-types";
import { ElementStates } from "../../types/element-states";
import { swap, timeout } from "../../utils/functions";

export const sortArray = async (
  arr: IString[],
  setState: React.Dispatch<React.SetStateAction<IString[]>>,
  loader: (value: React.SetStateAction<boolean>) => void
) => {
  const { length } = arr;
  if (arr.length === 0) {
    return arr;
  }
  let start = 0;
  let end;
  let mid = Math.floor(length / 2);
  for (start; start < mid; start++) {
    end = length - 1 - start
    if (start < end) {
      arr[start].color = ElementStates.Changing;
      arr[end].color = ElementStates.Changing;
      setState([...arr]);
    }
    swap(arr, start, end);
    arr[start].color = ElementStates.Modified;
    arr[end].color = ElementStates.Modified;
    await timeout(DELAY_IN_MS);
  }
  arr[start].color = ElementStates.Modified;
  setState([...arr]);
  loader(false);
  return arr;
};