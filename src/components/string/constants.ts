import { IString } from "../../types/my-types";

export const setState = jest.fn() as React.Dispatch<React.SetStateAction<IString[]>>;
export const loader = jest.fn() as (value: React.SetStateAction<boolean>) => void;
