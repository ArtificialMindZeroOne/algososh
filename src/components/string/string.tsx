import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css";
import { useState } from "react";
import { timeout } from "../../utils/functions";
import { sortArray } from "../string/utils"
import { DELAY_IN_MS } from "../../constants/delays";
import { useForm } from "../../hooks/hooks";
import { ElementStates } from "../../types/element-states";
import { IString } from "../../types/my-types"

export const StringComponent: React.FC = () => {
  const { values, handleChange } = useForm({ value: "" });
  const [stringArr, setStringArr] = useState<IString[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const onClick = async () => {
    setIsLoader(true);
    const arrayString = Array.from(values.value);
    const arrayObj = arrayString.map((value) => ({
      value,
      color: ElementStates.Default,
    })) as IString[];
    setStringArr([...arrayObj]);
    await timeout(DELAY_IN_MS);
    sortArray(arrayObj, setStringArr, setIsLoader);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.input_container}>
        <Input
          isLimitText={true}
          maxLength={11}
          value={values.value}
          name="value"
          onChange={handleChange}
          data-testid="input"
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isLoader}
          onClick={onClick}
          disabled={values.value === "" ? true : false}
        //data-testid="button"
        />
      </form>
      <ul className={styles.circle_container}>
        {stringArr?.map((item, index) => (
          <li key={index} className={styles.circle_item}>
            <Circle
              letter={item.value}
              state={item.color}
              extraClass={`${styles.fadeIn}`}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
