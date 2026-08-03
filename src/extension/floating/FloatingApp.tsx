import { Main } from "@pages/main/ui";
import * as styles from "./style.css";

interface FloatingAppProps {
  onClose: () => void;
}

export const FloatingApp = ({ onClose }: FloatingAppProps) => (
  <section
    className={styles.panel}
    aria-label="미리캔버스 키워드 추출기"
  >
    <header className={styles.header}>
      <strong>미리캔버스 키워드 추출기</strong>
      <button
        type="button"
        className={styles.closeButton}
        aria-label="패널 닫기"
        title="닫기"
        onClick={onClose}
      >
        ×
      </button>
    </header>
    <div className={styles.content}>
      <Main />
    </div>
  </section>
);
