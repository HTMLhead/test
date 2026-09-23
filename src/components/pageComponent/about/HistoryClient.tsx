import { useMemo, useState } from "react";
import {
  aboutHistory,
  type HistoryData,
  type HistoryItem,
} from "@/data/aboutHistory";

function sortHistories(data: HistoryData) {
  return [...data.history].sort((a, b) => b.year - a.year);
}

function HistoryCardTitle({ item }: { item: HistoryItem }) {
  if (item.variant === "featured") {
    return (
      <div className="history-card-title">
        <h3 className="typo-bold-xl text-wrap-pretty">{item.company}</h3>
        <div className="typo-bold-xl text-wrap-pretty">{item.courseName}</div>
      </div>
    );
  }

  return (
    <div className="history-card-title">
      <h3 className="typo-bold-xl text-wrap-pretty">{item.company}</h3>
      <div className="typo-bold-lg text-wrap-pretty">({item.courseName})</div>
    </div>
  );
}

function getHistoryColumns(items: HistoryItem[] = []) {
  return [
    {
      className: "is-masters",
      items: items.filter((item) => item.company.includes("마스터즈")),
    },
    {
      className: "is-camp",
      items: items.filter(
        (item) =>
          !item.company.includes("마스터즈") &&
          item.courseName.includes("캠프"),
      ),
    },
    {
      className: "is-etc",
      items: items.filter(
        (item) =>
          !item.company.includes("마스터즈") &&
          !item.courseName.includes("캠프"),
      ),
    },
  ];
}

export default function HistoryClient() {
  const histories = useMemo(() => sortHistories(aboutHistory), []);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const activeYear = selectedYear ?? histories[0]?.year ?? null;
  const activeHistory = histories.find(({ year }) => year === activeYear);
  const historyColumns = getHistoryColumns(activeHistory?.items);

  return (
    <section className="history-section" aria-labelledby="history-heading">
      <div className="container history-inner">
        <div className="history-header">
          <h2 id="history-heading" className="typo-display-lg text-wrap-pretty">
            코드스쿼드의 교육 연혁
          </h2>
          <p className="typo-bold-xl text-wrap-pretty">
            기업 부트캠프, 재직자 교육, 대학교육까지
            <br />
            다양한 현장에서 교육 경험을 쌓아왔습니다.
          </p>
        </div>

        <div className="history-content">
          <nav className="year-nav" aria-label="연도별 교육 연혁">
            <ol>
              {histories.map(({ year }) => (
                <li key={year}>
                  <button
                    type="button"
                    className={
                      year === activeYear
                        ? "typo-bold-md text-wrap-pretty is-active"
                        : "typo-body-md text-wrap-pretty"
                    }
                    aria-current={year === activeYear ? "true" : undefined}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          <div className="history-card-columns" aria-live="polite">
            {historyColumns.map(({ className, items }, columnIndex) => (
              <ol
                className={`history-card-column ${className}`}
                key={`${activeYear}-column-${columnIndex}`}
              >
                {items.map((item, index) => (
                  <li
                    className={`history-card ${
                      item.variant ? `is-${item.variant}` : ""
                    }`}
                    key={`${activeYear}-${columnIndex}-${item.company}-${item.courseName}-${index}`}
                  >
                    <HistoryCardTitle item={item} />
                  </li>
                ))}
              </ol>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
