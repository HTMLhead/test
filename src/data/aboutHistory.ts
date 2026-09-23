export type HistoryItem = {
  company: string;
  courseName: string;
  variant?: "default" | "featured" | "accent";
};

export type HistoryYear = {
  year: number;
  items: HistoryItem[];
};

export type HistoryData = {
  history: HistoryYear[];
};

type HistoryRow = HistoryItem & {
  year: number;
};

const rows: HistoryRow[] = [
  { year: 2017, company: "스마일게이트", courseName: "신입사원 교육" },
  { year: 2017, company: "우아한형제들", courseName: "우아한테크캠프" },
  { year: 2017, company: "SK플래닛", courseName: "직무 교육(건)" },
  { year: 2018, company: "우아한형제들", courseName: "신입사원 교육" },
  { year: 2018, company: "라인플러스", courseName: "신입사원 교육" },
  { year: 2018, company: "국민대학교창업지원단", courseName: "창업스쿨" },
  { year: 2018, company: "우아한형제들", courseName: "우아한테크캠프" },
  { year: 2019, company: "라인플러스", courseName: "신입사원 교육" },
  { year: 2019, company: "우아한형제들", courseName: "우아한테크캠프" },
  { year: 2019, company: "커넥트재단", courseName: "부스트캠프" },
  { year: 2019, company: "국민대학교산학협력단", courseName: "허브아카데미" },
  { year: 2019, company: "키네마스터", courseName: "재직자 교육" },
  { year: 2020, company: "커넥트재단", courseName: "부스트캠프" },
  { year: 2020, company: "우아한형제들", courseName: "우아한테크캠프" },
  { year: 2021, company: "카카오", courseName: "신입사원 교육" },
  { year: 2021, company: "우아한형제들", courseName: "우아한테크캠프" },
  { year: 2021, company: "커넥트재단", courseName: "부스트캠프" },
  { year: 2022, company: "카카오", courseName: "신입사원, 리뷰어 교육" },
  { year: 2022, company: "카카오엔터테인먼트", courseName: "신입사원 교육" },
  { year: 2022, company: "우아한형제들", courseName: "우아한테크캠프" },
  { year: 2022, company: "커넥트재단", courseName: "부스트캠프" },
  { year: 2022, company: "카카오", courseName: "재직자 교육" },
  { year: 2023, company: "현대자동차그룹", courseName: "소프티어부트캠프" },
  { year: 2023, company: "커넥트재단", courseName: "부스트캠프" },
  { year: 2024, company: "현대자동차그룹", courseName: "소프티어부트캠프" },
  { year: 2024, company: "우아한형제들", courseName: "우아한테크캠프" },
  { year: 2024, company: "네이버커넥트재단", courseName: "부스트캠프" },
  { year: 2025, company: "현대자동차그룹", courseName: "소프티어부트캠프" },
  { year: 2025, company: "네이버커넥트재단", courseName: "부스트캠프" },
  { year: 2025, company: "서울대학교", courseName: "AI 활용한 FE개발" },
  { year: 2026, company: "현대자동차그룹", courseName: "소프티어부트캠프" },
  { year: 2026, company: "서울대학교", courseName: "AI 활용한 FE개발" },
];

const mastersRows: HistoryRow[] = Array.from({ length: 10 }, (_, index) => {
  const year = 2017 + index;
  return {
    year,
    company: "마스터즈 코스",
    courseName: String(year),
    variant: "featured",
  };
});

const maxRows: HistoryRow[] = [
  {
    year: 2023,
    company: "마스터즈 MAX",
    courseName: "2023",
    variant: "featured",
  },
];

const allRows = [...mastersRows, ...maxRows, ...rows];

export const aboutHistory: HistoryData = {
  history: Array.from(
    allRows
      .reduce((grouped, { year, ...item }) => {
        const items = grouped.get(year) ?? [];
        items.push(item);
        grouped.set(year, items);
        return grouped;
      }, new Map<number, HistoryItem[]>())
      .entries(),
    ([year, items]) => ({
      year,
      items,
    }),
  ),
};
