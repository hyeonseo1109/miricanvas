import * as styles from "./style.css";

export const TextButton = ({ text }: { text: string }) => {
  return <button className={styles.TextButton}>{text}</button>;
};
