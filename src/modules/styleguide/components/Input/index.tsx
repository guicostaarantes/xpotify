import React, { BaseHTMLAttributes, RefObject } from "react";

import styles from "./style.css";

type InputProps = BaseHTMLAttributes<HTMLInputElement> & {
  autoComplete?: "on" | "off";
  innerRef?: RefObject<HTMLInputElement>;
  value?: string;
};

const Input = ({
  className = "",
  innerRef,
  onChange,
  value,
  ...rest
}: InputProps) => (
  <input
    className={`${styles.input} ${className}`}
    onChange={onChange}
    ref={innerRef}
    value={value}
    {...rest}
  />
);

export default Input;
