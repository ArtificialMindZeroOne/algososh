import { selectionSort, bubbleSort } from "./utils";
import { directionAsc, directionDesc, setState, loader, disabled, arrSingle, arrObj, testArr, testArrAsc, testArrSingle, arrEmpty, testArrEmpty } from "./constants"

describe("Testing selection and bubble sort algorithms", () => {

  it("should be the selection sort function working correctly with an empty array", async () => {
    const sortArr = await selectionSort(
      arrEmpty,
      setState,
      loader,
      directionAsc,
      disabled
    );
    expect(sortArr).toEqual(testArrEmpty);
  });

  it("should be the bubble sort function working correctly with an empty array", async () => {
    const sortArr = await bubbleSort(
      arrEmpty,
      setState,
      loader,
      directionAsc,
      disabled
    );
    expect(sortArr).toEqual(testArrEmpty);
  });

  it("should be the correct operation of the selection sort function with one element in descending order", async () => {
    const sortArr = await selectionSort(
      arrSingle,
      setState,
      loader,
      directionAsc,
      disabled
    );
    expect(sortArr).toEqual(testArrSingle);
  });
  it("should be the correct operation of the selection sort function with one element in ascending order", async () => {
    const sortArr = await selectionSort(
      arrSingle,
      setState,
      loader,
      directionDesc,
      disabled
    );
    expect(sortArr).toEqual(testArrSingle);
  });
  it("should be the correct operation of the bubble sort function with one element in descending order", async () => {
    const sortArr = await bubbleSort(
      arrSingle,
      setState,
      loader,
      directionAsc,
      disabled
    );
    expect(sortArr).toEqual(testArrSingle);
  });
  it("should be the correct operation of the bubble sort function with one element in ascending order", async () => {
    const sortArr = await bubbleSort(
      arrSingle,
      setState,
      loader,
      directionDesc,
      disabled
    );
    expect(sortArr).toEqual(testArrSingle);
  });

  it("should be the correct operation of the selection sort function with multiple elements in descending order", async () => {
    const sortArr = await selectionSort(
      arrObj,
      setState,
      loader,
      directionAsc,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });
  it("should be the correct operation of the selection sort function with multiple ascending elements", async () => {
    const sortArr = await selectionSort(
      arrObj,
      setState,
      loader,
      directionDesc,
      disabled
    );
    expect(sortArr).toEqual(testArrAsc);
  });

  it("should be the correct operation of the bubble sort function with multiple elements in descending order", async () => {
    const sortArr = await bubbleSort(
      arrObj,
      setState,
      loader,
      directionAsc,
      disabled
    );
    expect(sortArr).toEqual(testArr);
  });
  it("should be the correct operation of the bubble sort function with multiple ascending elements", async () => {
    const sortArr = await bubbleSort(
      arrObj,
      setState,
      loader,
      directionDesc,
      disabled
    );
    expect(sortArr).toEqual(testArrAsc);
  });
});
