import React, { BaseHTMLAttributes } from "react";

import styles from "./style.css";

const MainTitle = ({
  children,
  className = "",
  ...rest
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={`${styles.mainTitle} ${className}`} {...rest}>
    {children}
  </h1>
);

export default MainTitle;
