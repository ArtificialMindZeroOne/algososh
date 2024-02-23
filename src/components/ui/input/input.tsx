import React from "react";
import styles from "./input.module.css";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  placeholder?: string;
  extraClass?: string;
  isLimitText?: boolean;
  isLimitNumbers?: boolean;
}

export const Input: React.FC<InputProps> = ({
  placeholder = "Введите текст",
  extraClass = "",
  type = "text",
  maxLength,
  max,
  isLimitText = false,
  isLimitNumbers = false,
  ...rest
}) => {
  const decline = (word: string, numeral: number) => {
    let ending = "";
    const residue = numeral % 10;

    if (5 <= numeral && numeral <= 20) {
      ending = "ов";
    } else if (residue === 2 || residue === 3 || residue === 4) {
      ending = "а";
    } else if (residue === 1) {
      ending = "";
    } else ending = "ов";

    return word + ending;
  };

  const limitText = `Максимум — ${maxLength} ${decline("символ", Number(maxLength))}`;
  const limitNumbers = `Максимальное число — ${max}`;

  return (
    <div className={`${styles.content} ${extraClass}`}>
      <input
        className={`${styles.input} text text_type_input text_color_input`}
        placeholder={placeholder}
        type={type}
        maxLength={maxLength}
        max={max}
        {...rest}
      />
      {isLimitText && (
        <span
          className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}
        >
          {limitText}
        </span>
      )}
          {isLimitNumbers && (
        <span
          className={`text text_type_input-lim text_color_input mt-2 ml-8 ${styles.limit}`}
        >
          {limitNumbers}
        </span>
      )}
    </div>
  );
};
