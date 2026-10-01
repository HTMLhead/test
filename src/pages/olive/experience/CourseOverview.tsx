import { useState } from "react";
import Button from "@/components/ui/Button";
import AppLink from "@/components/ui/AppLink";
import icons from "@/assets/img/icons";
import {
  experiencePath,
  experienceTitle,
  experienceTasks,
  experienceOutcomes,
  experienceLevel,
  experienceDuration,
  experienceCompleters,
} from "@/data/experience";
import styles from "./index.module.css";

const shareUrl = new URL(
  experiencePath,
  import.meta.env.VITE_SITE_URL || "https://codesquad.kr",
).href;
const shareText = `${experienceTitle} | 코드스쿼드`;
const socialLinks = [
  {
    name: "X",
    icon: icons.x,
    href: `https://x.com/intent/post?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
  },
  {
    name: "LinkedIn",
    icon: icons.linkedin,
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  },
  {
    name: "Facebook",
    icon: icons.facebook,
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  },
];

function ShareFact() {
  const [message, setMessage] = useState("");
  async function copyLink(done: string) {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setMessage(done);
    } catch {
      setMessage("복사하지 못했어요. 주소창의 링크를 복사해 주세요.");
    }
  }
  return (
    <div className={styles.shareFact}>
      <dt>공유</dt>
      <dd className={styles.shareIcons}>
        <button
          type="button"
          className={styles.shareIcon}
          aria-label="링크 복사하기"
          onClick={() => void copyLink("링크를 복사했어요.")}
        >
          <img src={icons.link} alt="" />
        </button>
        {socialLinks.map((link) => (
          <a
            key={link.name}
            className={styles.shareIcon}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.name}에 공유하기 (새 탭)`}
          >
            <img src={link.icon} alt="" />
          </a>
        ))}
      </dd>
      <dd role="status" className={styles.shareStatus}>
        {message}
      </dd>
    </div>
  );
}

export default function CourseOverview({
  unlockedIndex,
}: {
  unlockedIndex: number;
}) {
  return (
    <>
      <header className={styles.courseHero}>
        <img
          className={styles.courseHeroImage}
          src="/assets/img/picture/courseThumbnail.png"
          alt=""
          fetchPriority="high"
        />
        <div className={styles.courseHeroCopy}>
          <h1>{experienceTitle}</h1>
          <p>
            AI가 무엇인지 알아보고, 직접 대화하고 답을 다듬으며 내 일에 쓰는
            방법을 익혀 봅니다.
          </p>
        </div>
      </header>

      <div className={styles.courseLayout}>
        <aside
          className={styles.courseStart}
          aria-labelledby="course-start-title"
        >
          <div>
            <h2 id="course-start-title">첫 대화부터 시작해볼까요?</h2>
            <dl className={styles.courseFacts}>
              <div>
                <dt>난이도</dt>
                <dd>{experienceLevel}</dd>
              </div>
              <div>
                <dt>소요 시간</dt>
                <dd>
                  {experienceDuration} · {experienceTasks.length}단계
                </dd>
              </div>
              <div>
                <dt>완주자</dt>
                <dd>{experienceCompleters.toLocaleString("ko-KR")}명</dd>
              </div>
              <ShareFact />
            </dl>
          </div>
          <div className={styles.courseStartActions}>
            <Button
              label="코스 시작하기"
              href={`${experiencePath}/1`}
              status="accent"
              icon="right"
              size="md"
            />
          </div>
        </aside>

        <div className={styles.courseBody}>
          <article className={styles.courseOverview} aria-label="코스 소개">
            <h2>어떤 코스인가요?</h2>
            <p>
              AI에게 요청하고, 답을 받아 보고, 원하는 대로 고쳐 보는 입문
              코스입니다. AI와 대화형 AI서비스가 무엇인지부터 가볍게 살펴보고,
              대부분의 시간은 직접 해 보는 데 씁니다. 약 1시간이면 마칠 수
              있어요.
            </p>

            <h2>누구를 위한 코스인가요?</h2>
            <p>
              AI를 거의 써 보지 않았거나, 내 일에 어떻게 적용할지 감이 오지 않는
              분을 위한 코스입니다.
            </p>

            <h2>무엇이 필요한가요?</h2>
            <ul className={styles.readingList}>
              <li>ChatGPT나 Claude 계정</li>
              <li>평소에 고민하는 실제 업무 한 가지</li>
            </ul>

            <h2>코스를 마치면 무엇이 남나요?</h2>
            <ul className={styles.readingList}>
              {experienceOutcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
          <section
            className={styles.curriculum}
            aria-labelledby="curriculum-title"
          >
            <div className={styles.sectionHeading}>
              <div>
                <h2 id="curriculum-title">코스 목차</h2>
                <p>각 단계를 마치면 다음 단계가 열립니다.</p>
              </div>
            </div>
            <ol>
              {experienceTasks.map((item, itemIndex) => (
                <li key={item.id}>
                  {itemIndex <= unlockedIndex ? (
                    <AppLink href={`${experiencePath}/${item.id}`}>
                      <span className={styles.taskNumber}>
                        {item.id.padStart(2, "0")}
                      </span>
                      <div>
                        <h3>
                          {item.title}{" "}
                          <span className={styles.taskMinutes}>
                            {item.minutes}분
                          </span>
                        </h3>
                        <p>{item.description}</p>
                      </div>
                    </AppLink>
                  ) : (
                    <div className={styles.curriculumLocked}>
                      <span className={styles.taskNumber}>
                        {item.id.padStart(2, "0")}
                      </span>
                      <div>
                        <h3>
                          {item.title}{" "}
                          <span className={styles.taskMinutes}>
                            {item.minutes}분
                          </span>
                        </h3>
                        <p>{item.description}</p>
                      </div>
                      <span className={styles.lockMark}>잠김</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
