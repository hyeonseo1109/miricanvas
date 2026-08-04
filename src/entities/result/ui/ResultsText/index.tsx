import { Fragment, useState } from "react";
import { copyResult, type KeywordResults } from "@entities/result/model";
import * as styles from "./style.css";

export const ResultsText = ({
  results,
  error,
}: {
  results: KeywordResults | null;
  error: string | null;
}) => {
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  const copyKeywords = async (text: string, label: string) => {
    if (!text) return;

    try {
      await copyResult(text);
      setCopyFeedback(`${label} 복사 완료`);
    } catch {
      setCopyFeedback("복사하지 못했습니다. 브라우저 권한을 확인해 주세요.");
    }
  };

  const rows = results
    ? [
        { label: "1+2 통합 (최대 25개)", text: results.combined },
        ...results.elements.map((text, index) => ({
          label: `${index + 1}.`,
          text,
        })),
      ]
    : [];

  return (
    <div className={styles.wrapper}>
      {error ? <p className={styles.error}>{error}</p> : null}
      {rows.map(({ label, text }, index) => (
        <Fragment key={label}>
          <div className={styles.resultRow}>
            <div className={styles.resultContent}>
              <strong className={styles.label}>{label}</strong>
              <span className={styles.keywordText} tabIndex={text ? 0 : -1}>
                {text || "키워드 없음"}
              </span>
            </div>
            <button
              type="button"
              className={styles.copyButton}
              disabled={!text}
              onClick={() => void copyKeywords(text, label)}
            >
              복사
            </button>
          </div>
          {index === 0 ? (
            <div
              className={styles.resultDivider}
              role="separator"
              aria-label="통합 결과와 개별 요소 결과 구분"
            />
          ) : null}
        </Fragment>
      ))}
      {copyFeedback ? (
        <p className={styles.copyFeedback} aria-live="polite">
          {copyFeedback}
        </p>
      ) : null}
    </div>
  );
};
