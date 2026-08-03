import type { PointerEventHandler } from "react";
import { Main } from "@pages/main/ui";
import * as styles from "./style.css";

interface FloatingAppProps {
  onClose: () => void;
  onDragStart: PointerEventHandler<HTMLElement>;
}

export const FloatingApp = ({ onClose, onDragStart }: FloatingAppProps) => (
  <section
    className={styles.panel}
    aria-label="미리캔버스 키워드 추출기"
  >
    <header className={styles.header} onPointerDown={onDragStart}>
      <strong>미리캔버스 키워드 추출기</strong>
      <button
        type="button"
        className={styles.closeButton}
        aria-label="패널 닫기"
        title="닫기"
        onPointerDown={(event) => event.stopPropagation()}
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
