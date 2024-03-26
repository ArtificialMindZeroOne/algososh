import { IString } from "../../types/my-types";

export const headDisplayConditions = (
  array: IString[],
  current: string | undefined,
  index: number,
  textButton: string,
  head?: string | React.ReactElement | null,
  indexNumber?: number
) => {
  if (current && textButton === "Добавить в head" && index === 0) {
    return head;
  } else if (current &&
    textButton === "Добавить по индексу" &&
    index === indexNumber) {
     return head;
  } else if (current &&
    textButton === "Добавить в tail" &&
    index === array.length - 1) {
    return head;
  }  else if(index === 0){
    return 'head'
  }
};

export const tailDisplayConditions = ( 
  array: IString[],
  index: number,
  textButton: string,
  tail?: string | React.ReactElement | null,
  indexNumber?: number
) => {
  if (index === array.length - 1 &&
    textButton === "Добавить в tail") {
    return 'tail';
  } else if (index === array.length - 1 && textButton === "Добавить в head") {
    return "tail";
  } else if (index === 0 && textButton === "Удалить из head" ) {
    return tail;
  } else if (index === array.length - 1 && textButton === "Добавить по индексу") {
    return 'tail';
  }
  else if (index === array.length - 1 &&
    textButton === "Удалить из head") {
    return "tail";
  }
  else if (index === array.length - 1 &&
    textButton === "Удалить из tail") {
    return tail;
  } else if (index === indexNumber && textButton === "Удалить по индексу") {
    return tail;
  } else if (index === array.length - 1) {
    return "tail";
  }
};
