import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useForm } from "../../hooks/hooks";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./fibonacci.module.css";
import { getFibonacciNumbers, arrayTimeOut } from "../fibonacci-page/utils";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const { values, handleChange } = useForm({ value: "" });
  const [arrayNumber, setArrayNumber] = useState<string[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const number = Number(values.value);

  const onClick = () => {
    setIsLoader(true);
    const arrayNum = getFibonacciNumbers(number).map(String);
    arrayTimeOut(arrayNum, setArrayNumber, setIsLoader);
  };

  const disBtn = (num: number) => {
    if (num > 19) {
      return true
    } else if (num < 1) {
      return true
    } else {
      return false
    }
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.input_container}>
        <Input
          isLimitText={true}
          max={19}
          min={1}
          value={values.value}
          name="value"
          onChange={handleChange}
          type="number"
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={isLoader}
          onClick={onClick}
          disabled={disBtn(number)}
        />
      </form>
      <ul className={styles.circle_container}>
        {arrayNumber?.map((item, index) => (
          <li key={index} className={styles.circle_item}>
            <Circle
              letter={item}
              extraClass={`${styles.fadeIn}`}
              index={index}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
