import React from "react";

import styles from "./style.css";

const MainTitle = ({ children, className }) => (
  <h1 className={`${styles.mainTitle} ${className}`}>{children}</h1>
);

export default MainTitle;
