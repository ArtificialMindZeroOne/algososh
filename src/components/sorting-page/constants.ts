import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { INumber } from "../../types/my-types";

export const directionAsc = Direction.Ascending;
export const directionDesc = Direction.Descending;
export const setState = jest.fn() as React.Dispatch<
  React.SetStateAction<INumber[]>
>;
export const loader = jest.fn() as (
  value: React.SetStateAction<boolean>
) => void;
export const disabled = jest.fn() as React.Dispatch<
  React.SetStateAction<boolean>
>;
export const arrEmpty = [] as INumber[];
export const testArrEmpty = [] as INumber[];
export const arrSingle = [{ value: 1, color: ElementStates.Default }];
export const testArrSingle = [{ value: 1, color: ElementStates.Modified }];
export const arrObj = [
  { value: 1, color: ElementStates.Default },
  { value: 2, color: ElementStates.Default },
  { value: 3, color: ElementStates.Default },
];
export const testArr = [
  { value: 3, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 1, color: ElementStates.Modified },
];

export const testArrAsc = [
  { value: 1, color: ElementStates.Modified },
  { value: 2, color: ElementStates.Modified },
  { value: 3, color: ElementStates.Modified },
];
