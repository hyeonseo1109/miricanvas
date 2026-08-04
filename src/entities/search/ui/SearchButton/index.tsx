import * as styles from "./style.css";

export const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      type="button"
      className={styles.searchButton}
      aria-label="검색"
      onClick={onClick}
    >
      &rarr;
    </button>
  );
};
