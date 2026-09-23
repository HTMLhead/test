import { useRef, useState, type KeyboardEvent } from "react";
import { cx } from "@/lib/styles";
import Image from "@/components/ui/Image";
import crongImage from "@/assets/img/picture/crong.png";
import honuxImage from "@/assets/img/picture/honux.png";
import jkImage from "@/assets/img/picture/jk.png";
import dangleImage from "@/assets/img/picture/dangle.png";
import styles from "./AboutMasters.module.css";
export default function AboutMasters() {
  const masters = [
    {
      name: "크롱",
      role: "Crong, 웹 프론트엔드 마스터",
      quote:
        "우리 모두 꾸준히 학습하며 성장하는 행복한 개발자가 되면 좋겠습니다.",
      image: crongImage,
      careers: [
        "S대학 2025년 2학기 - 'AI를 활용한 front-end 개발' 과정 운영",
        "우아한형제들 테크캠프 FE 교육 담당",
        "네이버 커넥트재단 부스트코스, 부스트캠프 FE교육 담당",
        "전 SK 플래닛 웹 FE 마스터",
        "전 NAVER FE 플랫폼팀 팀장",
        "전 NHN NEXT 웹 FE 전임 교수",
        "전 Initech, TmaxSoft 웹 보안 엔지니어",
      ],
    },
    {
      name: "호눅스",
      role: "Honux, 웹 백엔드 마스터",
      quote:
        "남들하고 비교하면 초라해 보이지만 느리더라도 내 속도로 꾸준히 가면 잘 되겠죠.",
      image: honuxImage,
      careers: [
        "네카라쿠배 모두를 포함한 다수 기업을 대상으로 백엔드 및 클라우드 강의 경력",
        "전 Amazon Web Services 시니어 테크니컬 트레이너",
        "전 네이버 랩스 공동 연구원",
        "전 NHN NEXT DB 교수",
        "전 LG 전자 CTO 소프트웨어 플랫폼 연구소 선임 연구원",
        "한양대학교 전자컴퓨터공학 박사 졸업",
      ],
    },
    {
      name: "제이케이",
      role: "JK, 모바일 iOS 마스터",
      quote: "개발자가 된다는 것은 과거형이 아니라 현재 진행형이어야만 한다.",
      image: jkImage,
      careers: [
        "현 국가인공지능전략위원회 교육인재 분과위원",
        "현 국내 최장수 macOS/iOS 개발자 커뮤니티와 레츠스위프트 운영진",
        "삼성전자, 네이버, 금결원, GE, 빙글 등 모바일 컨설팅/iOS 강의 경력",
        "전 이노베이션아카데미 설립추진위원",
        "전 레진코믹스 모바일 개발 리드",
        "전 NHN NEXT 모바일 전임 교수",
        "전 오로라 플래닛 모바일 스타트업 대표",
        "전 브리지텍 기술연구소 차장",
      ],
    },
    {
      name: "당글",
      role: "Dangle, 웹 백엔드 마스터",
      quote:
        "개발에 정답은 없다고 생각합니다. 현재 상황에서 최선의 답을 찾을 뿐.",
      image: dangleImage,
      careers: [
        "전 Amazon Web Services Technical Trainer",
        "전 카카오 Backend engineer",
        "전 NHN NEXT UI/Web programming 전공 졸업",
      ],
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const handleTabKey = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % masters.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + masters.length) % masters.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = masters.length - 1;
    else return;
    event.preventDefault();
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  };
  return (
    <>
      <section
        className={cx(styles, "masters-section")}
        aria-labelledby="masters-heading"
      >
        <div className={cx(styles, "container masters-inner")}>
          <div className={cx(styles, "masters-header")}>
            <h2
              id="masters-heading"
              className={cx(styles, "typo-display-lg text-wrap-pretty")}
            >
              분야별 전문 마스터
            </h2>
            <p className={cx(styles, "typo-bold-xl text-wrap-pretty")}>
              코드스쿼드의 마스터는 단순한 강사가 아닙니다.
              <br />
              현업을 경험한 개발자이자 학습자 곁에서
              <br />
              코드를 함께 보는 멘토입니다.
            </p>
          </div>

          <div className={cx(styles, "master-tabs-shell")}>
            <div
              className={cx(styles, "master-tab-list")}
              role="tablist"
              aria-label="마스터 프로필 선택"
            >
              {masters.map((master, index) => (
                <button
                  id={`master-tab-${index + 1}`}
                  className={cx(
                    styles,
                    `master-tab${index === activeTab ? " is-active" : ""}`,
                  )}
                  type="button"
                  role="tab"
                  aria-selected={index === activeTab ? "true" : "false"}
                  aria-controls={`master-panel-${index + 1}`}
                  data-master-tab={index + 1}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  tabIndex={index === activeTab ? 0 : -1}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(event) => handleTabKey(event, index)}
                  key={index}
                >
                  <span className={cx(styles, "master-tab-copy")}>
                    <span
                      className={cx(
                        styles,
                        "master-tab-name typo-bold-lg text-wrap-pretty",
                      )}
                    >
                      {master.name}
                    </span>
                    <span
                      className={cx(
                        styles,
                        "master-tab-role typo-body-sm text-wrap-pretty",
                      )}
                    >
                      {master.role}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className={cx(styles, "master-panel-stack")}>
              {masters.map((master, index) => (
                <article
                  id={`master-panel-${index + 1}`}
                  className={cx(
                    styles,
                    `master-profile-card${index === activeTab ? " is-active" : ""}`,
                  )}
                  role="tabpanel"
                  aria-labelledby={`master-tab-${index + 1}`}
                  aria-hidden={index === activeTab ? "false" : "true"}
                  data-master-panel={index + 1}
                  hidden={index !== activeTab}
                  key={index}
                >
                  <div className={cx(styles, "master-profile-photo")}>
                    <Image
                      src={master.image}
                      alt={`${master.name} 프로필 사진`}
                      loading={index === activeTab ? "eager" : "lazy"}
                    />
                  </div>
                  <div className={cx(styles, "master-profile-copy")}>
                    <div className={cx(styles, "master-title")}>
                      <h3
                        className={cx(
                          styles,
                          "typo-display-sm text-wrap-pretty",
                        )}
                      >
                        {master.name}
                      </h3>
                      <p
                        className={cx(styles, "typo-bold-md text-wrap-pretty")}
                      >
                        {master.role}
                      </p>
                    </div>
                    <p
                      className={cx(
                        styles,
                        "master-quote typo-bold-lg text-wrap-pretty",
                      )}
                    >
                      “{master.quote}”
                    </p>
                    <div className={cx(styles, "master-career")}>
                      <strong
                        className={cx(styles, "typo-bold-md text-wrap-pretty")}
                      >
                        경력
                      </strong>
                      <ul>
                        {master.careers.map((career, itemIndex) => (
                          <li
                            className={cx(
                              styles,
                              "typo-body-md text-wrap-pretty",
                            )}
                            key={itemIndex}
                          >
                            {career}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
