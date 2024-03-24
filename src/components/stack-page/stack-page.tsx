import React, { SyntheticEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack.module.css";
import { useForm } from "../../hooks/hooks";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { ElementStates } from "../../types/element-states";
import { useState } from "react";
import { timeout } from "../../utils/functions";
import { Circle } from "../ui/circle/circle";
import { IString } from "../../types/my-types";

export const StackPage: React.FC = () => {
  const { values, handleChange, setValues } = useForm({ value: "" });
  const [stack, setStack] = useState(new Stack<IString>());
  const [arr, setArr] = useState<IString[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const onClick = async (evt: SyntheticEvent, textButton: string) => {
    evt.preventDefault();
    const array = stack.getEl();
    if (values.value !== "" && textButton === "Добавить") {
      setIsLoader(true);
      stack.push({ value: values.value, color: ElementStates.Changing });
      setStack(stack);
      setArr([...array]);
      setValues({ value: "" });
      await timeout(500);
      setIsLoader(false);
      stack.peak()!.color = ElementStates.Default;
      setStack(stack);
      setArr([...array]);
    } else if (textButton === "Удалить") {
      stack.peak()!.color = ElementStates.Changing;
      setStack(stack);
      setArr([...array]);
      await timeout(500);
      stack.pop();
      await timeout(500);
      setStack(stack);
      setArr([...array]);
    } else if (textButton === "Очистить") {
      const length = stack.getSize();
      let i = 0;
      for (i; i < length; i++) {
        stack.pop();
        setStack(stack);
      }
      setArr([...array]);
    }
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.input_container} onSubmit={evt => evt.preventDefault()}>
        <Input
          isLimitText={true}
          max={4}
          maxLength={4}
          value={values.value}
          name="value"
          onChange={handleChange}
          type="string"
          extraClass={styles.input}
        />
        <div className={styles.buttons_container}>
          <Button
            text="Добавить"
            type="submit"
            isLoader={isLoader}
            onClick={(e) => onClick(e, "Добавить")}
            disabled={values.value === "" ? true : false}
            linkedList="small"
            id='addButton'
          />
          <Button
            text="Удалить"
            type="submit"
            onClick={(e) => onClick(e, "Удалить")}
            disabled={stack.getSize() > 0 ? false : true}
            id='deleteButton'
          />
          <Button
            text="Очистить"
            type="button"
            extraClass={styles.clear}
            onClick={(e) => onClick(e, "Очистить")}
            disabled={stack.getSize() > 0 ? false : true}
            id='clearButton'
          />
        </div>
      </form>
      <ul className={styles.circle_container}>
        {arr?.map((item, index) => (
          <li key={index} className={styles.circle_item}>
            <Circle
              letter={item.value}
              state={item.color}
              extraClass={`${styles.fadeIn}`}
              index={index}
              head={stack.peak() === item ? "top" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
