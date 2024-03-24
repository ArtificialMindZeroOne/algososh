import { sortArray } from "./utils";
import { ElementStates } from "../../types/element-states";
import { IString } from "../../types/my-types";
import { setState, loader } from "./constants"

describe("Testing correct line reversal", () => {

  it("should be the correct operation of the function with an even number of characters", async () => {
    const stringArray = Array.from("test");
    const testStringArray = Array.from("tset");
    const arrayObj = stringArray.map((value) => ({
      value,
      color: ElementStates.Default,
    })) as IString[];
    const arrayTestObj = testStringArray.map((value) => ({
      value,
      color: ElementStates.Modified,
    })) as IString[];
    const sortingArr = await sortArray(arrayObj, setState, loader);

    expect(sortingArr).toEqual(arrayTestObj); // Ок
  });

  it("should be the correct operation of the function with an odd number of characters", async () => {
    const stringArray = Array.from("testing");
    const testString = Array.from("gnitset");
    const arrayObj = stringArray.map((value) => ({
      value,
      color: ElementStates.Default,
    })) as IString[];
    const arrayTestObj = testString.map((value) => ({
      value,
      color: ElementStates.Modified,
    })) as IString[];
    const sortingArr = await sortArray(arrayObj, setState, loader);

    expect(sortingArr).toEqual(arrayTestObj); // Ок
  });

  it("should be the correct operation of the function with one character working", async () => {
    const stringArray = Array.from("t");
    const testString = Array.from("t");
    const arrayObj = stringArray.map((value) => ({
      value,
      color: ElementStates.Default,
    })) as IString[];
    const arrayTestObj = testString.map((value) => ({
      value,
      color: ElementStates.Modified,
    })) as IString[];
    const sortingArr = await sortArray(arrayObj, setState, loader);

    expect(sortingArr).toEqual(arrayTestObj); // Ок
  });

  it("should be the function working correctly with an empty string", async () => {
    const stringArray = [] as IString[];
    const sortingArr = await sortArray(stringArray, setState, loader);

    expect(sortingArr).toEqual(stringArray); // Ок
  });
});
