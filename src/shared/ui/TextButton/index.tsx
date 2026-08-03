import * as styles from "./style.css";

export const TextButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button className={styles.TextButton} onClick={onClick}>
      {text}
    </button>
  );
};
