import * as styles from "./style.css";

export const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className={styles.searchButton} onClick={onClick}>
      &rarr;
    </button>
  );
};
