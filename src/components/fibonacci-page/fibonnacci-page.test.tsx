import React from "react";
import { getFibonacciNumbers, arrayTimeOut } from "./utils";

describe("Testing Fibonacci Algorithm Functions", () => {
  it("should be the correct operation of the function if the number is greater than 1", () => {
    const testArr = [1, 1, 2, 3, 5, 8, 13, 21];

    expect(getFibonacciNumbers(7)).toEqual(testArr);
  });

  it("should be the correct operation of the function if if number === 0", () => {
    expect(getFibonacciNumbers(0)).toEqual([1]);
  });

  it("should be the correct operation of the numeric array rendering function", async () => {
    const setState = jest.fn() as React.Dispatch<
      React.SetStateAction<string[]>
    >;
    const loader = jest.fn() as (value: React.SetStateAction<boolean>) => void;
    const array = ["1", "2", "3", "4", "5", "6"];
    const arrayNumber = await arrayTimeOut(array, setState, loader);
    expect(arrayNumber).toEqual(array);
  });
});
