import { timeout, swap } from "./functions";
import {
  stringObjArr,
  numberObjArr,
  numberArr,
  testStringObjArr,
  testNumberObjArr,
  testNumberArr,
} from "./constants";

describe("Тестирование утилитарной функции swap", () => {
  it("Функция swap работает без ошибок со строковым массивом", () => {
    expect(swap(stringObjArr, 0, 2)).toEqual(testStringObjArr); // Ок
  });

  it("Функция swap работает без ошибок со числовым массивом", () => {
    expect(swap(numberObjArr, 0, 2)).toEqual(testNumberObjArr); // Ок
  });

  it("Функция swap работает без ошибок с числами массива", () => {
    expect(swap(numberArr, 0, 2)).toEqual(testNumberArr); // Ок
  });
});

describe("Тестирование утилитарной функции timeout", () => {
  it("Функция timeout", async () => {
    jest.useFakeTimers(); //создала фейк
    const myFunction = async () => {
      await timeout(500);
      return true;
    }; //если функция отработала, возвращается колбек
    const resultPromise = myFunction();

    jest.runAllTimers(); //запустила все таймеры

    const result = await resultPromise;

    expect(result).toBe(true);
  });
});
