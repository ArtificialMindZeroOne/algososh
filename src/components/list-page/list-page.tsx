import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import { useForm } from "../../hooks/hooks";
import { useState, SyntheticEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./list";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { timeout } from "../../utils/functions";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { headDisplayConditions, tailDisplayConditions } from "./utils";
import { IString } from "../../types/my-types";

export const ListPage: React.FC = () => {
  const initialArray: IString[] = [
    { value: "0", color: ElementStates.Default },
    { value: "34", color: ElementStates.Default },
    { value: "8", color: ElementStates.Default },
    { value: "1", color: ElementStates.Default },
  ];
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [indexValue, setIndex] = useState<{
    value: string;
  }>({ value: "" });
  const [list, setList] = useState(new LinkedList<IString>(initialArray));
  const [stringArr, setStringArr] = useState<IString[]>(list.toArray());
  const [textButton, setTextButton] = useState<string>("");
  const [isLoader, setIsLoader] = useState(false);
  const [head, setHead] = useState<
    string | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  >("");
  const [tail, setTail] = useState<
    string | React.ReactElement<any, string | React.JSXElementConstructor<any>>
  >("");
  const [current, setCurrent] = useState<string>();

  const handleChangeInputIndex = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value, name } = event.target as HTMLInputElement;
    setIndex({ ...indexValue, [name]: value });
  };

  let indexNumber = Number(indexValue.value);

  const onClick = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (list.toArray().length < 6) {
      setIsLoader(true);
      setCurrent("Добавить в head");
      await timeout(SHORT_DELAY_IN_MS);
      list.prepend({ value: values.value, color: ElementStates.Modified });
      await timeout(SHORT_DELAY_IN_MS);
      setTextButton("Добавить в head");
      setHead(
        <Circle
          letter={values.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
      setList(list);
      await timeout(SHORT_DELAY_IN_MS);
      setStringArr([...list.toArray()]);
      setHead("head");
      await timeout(SHORT_DELAY_IN_MS);

      list.toArray()[0].color = ElementStates.Default;
      setList(list);
      setStringArr([...list.toArray()]);
      setCurrent("");
      setIsLoader(false);
      setValues({ value: "" });
    }
  };

  const onClickDelHead = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    setIsLoader(true);
    setCurrent("Удалить из head");
    setTextButton("Удалить из head");
    setTail(
      <Circle
        letter={list.toArray()[0].value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    list.toArray()[0].value = "";
    await timeout(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setList(list);
    await timeout(SHORT_DELAY_IN_MS);
    setStringArr([...list.toArray()]);
    setTail("");
    setTextButton("");
    setCurrent("");
    setIsLoader(false);
  };

  const onClickDelTail = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    setIsLoader(true);
    setCurrent("Удалить из tail");
    setTextButton("Удалить из tail");
    setTail(
      <Circle
        letter={list.toArray()[stringArr.length - 1].value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    list.toArray()[stringArr.length - 1].value = "";
    await timeout(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setList(list);
    //await timeout(500);
    setStringArr([...list.toArray()]);
    setTail("tail");
    setTextButton("");
    setCurrent("");
    setIsLoader(false);
  };

  const onClickTail = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (list.toArray().length < 6) {
    setIsLoader(true);
    setCurrent("Добавить в tail");
    await timeout(SHORT_DELAY_IN_MS);
    list.append({ value: values.value, color: ElementStates.Modified });
    await timeout(SHORT_DELAY_IN_MS);
    setTextButton("Добавить в tail");
    setHead(
      <Circle
        letter={values.value}
        state={ElementStates.Changing}
        isSmall={true}
      />
    );
    setList(list);
    await timeout(SHORT_DELAY_IN_MS);
    setStringArr([...list.toArray()]);
    setHead("");
    await timeout(SHORT_DELAY_IN_MS);
    list.toArray()[stringArr.length].color = ElementStates.Default;
    setList(list);
    setStringArr([...list.toArray()]);
    setCurrent("");
    setIsLoader(false);
    setValues({ value: "" });
    }
  };

  const onClickIndex = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    if (list.toArray().length < 6) {
    setIsLoader(true);
    setCurrent("Добавить по индексу");
    setTextButton("Добавить по индексу");
    for (let i = 0; i <= indexNumber; i++) {
      setIndex({ value: String(i) });
      await timeout(SHORT_DELAY_IN_MS);
      setHead(
        <Circle
          letter={values.value}
          state={ElementStates.Changing}
          isSmall={true}
        />
      );
      if (i < indexNumber) {
        await timeout(SHORT_DELAY_IN_MS);
        list.toArray()[i].color = ElementStates.Changing;
        setList(list);
        setStringArr([...list.toArray()]);
        await timeout(SHORT_DELAY_IN_MS);
      }
    }
    list.addByIndex(
      { value: values.value, color: ElementStates.Modified },
      indexNumber
    );
    await timeout(SHORT_DELAY_IN_MS);
    setList(list);
    setStringArr([...list.toArray()]);
    await timeout(SHORT_DELAY_IN_MS);
    const defaultArray = list.toArray().map((value) => ({
      ...value,
      color: ElementStates.Default,
    })) as IString[];
    setList(list);
    setStringArr([...defaultArray]);
    setHead("");

    setCurrent("");
    setTextButton("");
    setIsLoader(false);
    setValues({ value: "" });
    setIndex({ value: "" });
  }
  };

  const onClickDelIndex = async (evt: SyntheticEvent) => {
    evt.preventDefault();
    setIsLoader(true);
    setCurrent("Удалить по индексу");
    setTextButton("Удалить по индексу");

    for (let i = 0; i <= indexNumber; i++) {
      setIndex({ value: String(i) });
      await timeout(SHORT_DELAY_IN_MS);
      if (i < indexNumber) {
        await timeout(SHORT_DELAY_IN_MS);
        list.toArray()[i].color = ElementStates.Changing;
        setList(list);
        setStringArr([...list.toArray()]);
        await timeout(SHORT_DELAY_IN_MS);
      }
      if (i === indexNumber) {
        setTail(
          <Circle
            letter={list.toArray()[indexNumber].value}
            state={ElementStates.Changing}
            isSmall={true}
          />
        );
        setList(list);
        setStringArr([...list.toArray()]);
        list.toArray()[indexNumber].value = "";
        setList(list);
        setStringArr([...list.toArray()]);
        await timeout(SHORT_DELAY_IN_MS);
      }
    }
    list.deleteByIndex(indexNumber);
    setList(list);
    await timeout(SHORT_DELAY_IN_MS);
    setStringArr([...list.toArray()]);
    const defaultArray = list.toArray().map((value) => ({
      ...value,
      color: ElementStates.Default,
    })) as IString[];
    setList(list);
    setStringArr([...defaultArray]);
    setTail("");
    setCurrent("");
    setTextButton("");
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.inputs_container}>
        <form className={styles.input_container}>
          <Input
            isLimitText={true}
            maxLength={4}
            value={values.value}
            name="value"
            onChange={handleChange}
            type="text"
            extraClass={styles.input}
            placeholder="Введите значение"
            disabled={(isLoader ? true : false) || (list.toArray().length === 6? true : false)}
          />
          <div className={styles.buttons_container}>
            <Button
              text="Добавить в head"
              type="submit"
              onClick={(e) => onClick(e)}
              disabled={values.value === "" ? true : false}
              isLoader={current === "Добавить в head" && isLoader}
              id="addHead"
            />
            <Button
              text="Добавить в tail"
              type="submit"
              onClick={(e) => onClickTail(e)}
              disabled={values.value === "" ? true : false}
              isLoader={current === "Добавить в tail" && isLoader}
              id="addTail"
            />
            <Button
              text="Удалить из head"
              type="submit"
              // extraClass={styles.clear}
              onClick={(e) => onClickDelHead(e)}
              disabled={isLoader ? true : false}
              isLoader={current === "Удалить из head" && isLoader}
              id="deleteHead"
            />
            <Button
              text="Удалить из tail"
              type="submit"
              // extraClass={styles.clear}
              onClick={(e) => onClickDelTail(e)}
              disabled={isLoader ? true : false}
              isLoader={current === "Удалить из tail" && isLoader}
              id="deleteTail"
            />
          </div>
        </form>
        <form className={styles.input_container}>
          <Input
            value={indexValue.value}
            name="value"
            max={6}
            min={0}
            onChange={handleChangeInputIndex}
            type="number"
            extraClass={styles.input}
            placeholder="Введите индекс"
            disabled={(isLoader ? true : false)}
          />
          <div className={styles.buttons_index}>
            <Button
              text="Добавить по индексу"
              type="submit"
              id="addByIndex"
              onClick={(e) => onClickIndex(e)}
              disabled={
                ((values.value === "" || indexValue.value === "" || (list.toArray().length - 1) < Number(indexValue.value) ) ? true : false) 
              }
              linkedList="big"
              isLoader={current === "Добавить по индексу" && isLoader}
            />
            <Button
              text="Удалить по индексу"
              type="submit"
              id="deleteByIndex"
              linkedList="big"
              onClick={(e) => onClickDelIndex(e)}
              disabled={indexValue.value === "" || (list.toArray().length - 1) < Number(indexValue.value) ? true : false}
              isLoader={current === "Удалить по индексу" && isLoader}
            />
          </div>
        </form>
      </div>
      <ul className={styles.circle_container}>
        {stringArr?.map((item, index) => (
          <li key={index} className={styles.circle_item}>
            <Circle
              index={index}
              letter={item.value}
              state={item.color}
              extraClass={`${styles.fadeIn}`}
              head={headDisplayConditions(
                stringArr,
                current,
                index,
                textButton,
                head,
                indexNumber
              )}
              tail={tailDisplayConditions(
                stringArr,
                index,
                textButton,
                tail,
                indexNumber
              )}
            />
            {index < stringArr.length - 1 ? <ArrowIcon /> : null}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
