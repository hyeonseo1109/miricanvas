import * as styles from "./style.css";

export const SearchInput = ({
  value,
  onChange,
  onEnter,
}: {
  value: string | null;
  onChange: (value: string) => void;
  onEnter: () => void;
}) => {
  return (
    <input
      type="text"
      placeholder="요소이름 검색"
      className={styles.searchInput}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onEnter()}
    />
  );
};
