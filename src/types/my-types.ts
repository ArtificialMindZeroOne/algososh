import { ElementStates } from "./element-states";

export interface IString {
  value?: string;
  color?: ElementStates;
}

export interface INumber {
  value: number;
  color?: ElementStates;
}
