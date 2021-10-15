import React, { BaseHTMLAttributes } from "react";

import styles from "./style.css";

const Paragraph = ({
  children,
  className = "",
  ...rest
}: BaseHTMLAttributes<HTMLParagraphElement>) => (
  <p className={`${styles.paragraph} ${className}`} {...rest}>
    {children}
  </p>
);

export default Paragraph;
