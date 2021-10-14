import React from "react";

import styles from "./style.css";

const Paragraph = ({ children, className }) => (
  <p className={`${styles.paragraph} ${className}`}>{children}</p>
);

export default Paragraph;
