import { cx } from "@/lib/styles";
import { Badge } from "@/components/ui";
import styles from "./MastersCurriculum.module.css";
export default function MastersCurriculum() {
  const curriculum = [
    {
      stage: "준비 과정",
      duration: "2주",
      description: "Java 기초, Git, 개발환경, AI 활용 가이드",
    },
    {
      stage: "프로그래밍 기본기",
      duration: "4주",
      description: "Java, 객체지향, 테스트, 자료구조",
    },
    {
      stage: "웹 백엔드",
      duration: "6주",
      description: "HTTP, Spring, API, 인증, 예외 처리",
    },
    {
      stage: "데이터베이스와 인프라",
      duration: "4주",
      description: "MySQL, 트랜잭션, 배포, 클라우드와 DevOps",
    },
    {
      stage: "풀스택 프로젝트",
      duration: "4주",
      description: "리액트 기반 프론트엔드, 풀스택 개발, 팀 협업, 서비스 구현",
    },
    {
      stage: "AI 활용 프로젝트",
      duration: "4주",
      description: "AI-assisted 개발, 리팩토링, 문서화",
    },
    {
      stage: "미션 기반 CS 학습",
      duration: "4주",
      description:
        "OS, 아키텍처, 네트워크, 데이터베이스 등 CS 기초 지식을 미션 기반으로 학습",
    },
  ];
  return (
    <>
      <section
        className={cx(styles, "masters-curriculum")}
        aria-labelledby="masters-curriculum-heading"
      >
        <div className={cx(styles, "container masters-curriculum-inner")}>
          <div className={cx(styles, "section-heading")}>
            <h2
              id="masters-curriculum-heading"
              className={cx(styles, "typo-display-md")}
            >
              커리큘럼
            </h2>
            <p className={cx(styles, "typo-body-lg")}>
              기초 준비부터 백엔드, 인프라, 풀스택 프로젝트와 AI 활용까지
              단계적으로 이어집니다.
            </p>
          </div>

          <ol className={cx(styles, "curriculum-list")}>
            {curriculum.map((item, index) => (
              <li key={index}>
                <span className={cx(styles, "curriculum-step typo-bold-xs")}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={cx(styles, "curriculum-card")}>
                  <div className={cx(styles, "curriculum-meta")}>
                    <Badge
                      label={item.duration}
                      color="green"
                      className={cx(styles, "masters-duration-badge")}
                    />
                    <h3 className={cx(styles, "typo-bold-xl")}>{item.stage}</h3>
                  </div>
                  <p className={cx(styles, "typo-body-md")}>
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className={cx(styles, "curriculum-note-wrap")}>
            <p className={cx(styles, "curriculum-note typo-body-sm")}>
              세부 커리큘럼은 모집 시점과 참여자의 수준에 따라 일부 조정될 수
              있습니다.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
