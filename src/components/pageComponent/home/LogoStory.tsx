import { useEffect, useRef } from "react";
import Button from "@/components/ui/Button";
import symbol from "../../../../public/assets/img/brand/codesquad-symbol.svg?raw";
import { links } from "@/data/home";
import styles from "./LogoStory.module.css";

const chapters = [
  {
    id: "ax",
    name: "AX 교육",
    title: (
      <>
        작은 시도에서,
        <br />
        시작되는 변화.
      </>
    ),
    description: (
      <>
        AI를 아는 것에서, 내 일에 사용하는 것으로.
        <br />
        직접 만들고 실험하며 나만의 가능성을 발견합니다.
      </>
    ),
    details: ["AI와 함께하는 실습", "내 업무에 적용하는 배움"],
    link: "AX 교육 알아보기",
    href: links.olive,
    position: 1.3,
  },
  {
    id: "b2b",
    name: "B2B 교육",
    title: (
      <>
        개인의 가능성이,
        <br />
        팀의 역량으로.
      </>
    ),
    description: (
      <>
        우리 조직의 실제 과제에서 시작하는 맞춤 교육.
        <br />
        함께 해결하고 나누며, 배움을 현장의 변화로 연결합니다.
      </>
    ),
    details: ["조직에 맞춘 교육 설계", "현업 과제 중심 프로젝트"],
    link: "기업 교육 알아보기",
    href: links.partners,
    position: 2.35,
  },
  {
    id: "lucas",
    name: "루카스",
    title: (
      <>
        배움의 모든 순간,
        <br />
        루카스와 함께.
      </>
    ),
    description: (
      <>
        AX 교육부터 기업 맞춤 교육까지.
        <br />
        교육의 시작부터 실전 적용까지 함께하는 교육 플랫폼, 루카스.
      </>
    ),
    details: ["교육 플랫폼", "AX · B2B 교육", "학습부터 공유까지"],
    link: "교육 문의하기",
    href: links.email,
    position: 3.45,
  },
  {
    id: "codesquad",
    name: "코드스쿼드",
    title: (
      <>
        함께 변화를 만드는
        <br />
        코드스쿼드입니다.
      </>
    ),
    description: (
      <>
        배움으로 가능성을 연결하는 교육 회사.{" "}
        <br />
        개인의 시작부터 조직의 변화까지 함께합니다.
      </>
    ),
    details: ["AX 교육", "기업 맞춤 교육", "교육 플랫폼 루카스"],
    link: "코드스쿼드 알아보기",
    href: links.about,
    position: 4.55,
  },
];
const timelineEnd = 4.8;
const chapterBoundaries = [0, 1.75, 2.8, 3.8, timelineEnd];
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (from: number, to: number, value: number) => {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
};

export default function LogoStory() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = root.current!;
    const panels = Array.from(
      element.querySelectorAll<HTMLElement>("[data-panel]"),
    );
    const chapterLinks = Array.from(
      element.querySelectorAll<HTMLButtonElement>("[data-chapter]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-height: 639px)",
    );
    let frame = 0;
    let start = 0;
    let distance = 1;
    const render = () => {
      frame = 0;
      if (reducedMotion.matches) {
        panels.forEach((panel) => {
          panel.inert = false;
          panel.removeAttribute("aria-hidden");
        });
        return;
      }
      const p = clamp((window.scrollY - start) / distance) * timelineEnd;
      const move = smooth(0.08, 0.95, p);
      const weights = [
        1 - smooth(0.08, 0.56, p),
        smooth(0.57, 0.98, p) * (1 - smooth(1.5, 1.85, p)),
        smooth(1.65, 2.02, p) * (1 - smooth(2.55, 2.9, p)),
        smooth(2.7, 3.08, p) * (1 - smooth(3.5, 3.9, p)),
        smooth(3.65, 4.05, p),
      ];
      element.style.setProperty("--move", String(move));
      const logoFocus = smooth(0.45, 0.95, p);
      element.style.setProperty("--logo-focus", String(logoFocus));
      // Reveal each complete logo state from the top. Previous states stay
      // intact underneath; no layer shrinks or animates back upward.
      element.style.setProperty("--dots", String(clamp((p - 0.85) / 0.4)));
      element.style.setProperty("--center", String(clamp((p - 1.65) / 0.5)));
      element.style.setProperty("--outer", String(clamp((p - 2.7) / 0.5)));
      element.style.setProperty("--complete", String(clamp((p - 3.7) / 0.7)));
      element.style.setProperty("--progress", String(clamp(p / timelineEnd)));
      panels.forEach((panel, index) => {
        const visible = weights[index] > 0.5;
        panel.style.setProperty("--reveal", String(weights[index]));
        panel.inert = !visible;
        panel.setAttribute("aria-hidden", String(!visible));
      });
      const active =
        p < 0.65 ? -1 : p < 1.75 ? 0 : p < 2.8 ? 1 : p < 3.8 ? 2 : 3;
      chapterLinks.forEach((link, index) => {
        const progress = clamp(
          (p - chapterBoundaries[index]) /
            (chapterBoundaries[index + 1] - chapterBoundaries[index]),
        );
        link.style.setProperty("--dot-fill", `${progress * 100}%`);
        if (index === active) link.setAttribute("aria-current", "step");
        else link.removeAttribute("aria-current");
      });
      element.dataset.scene = active < 0 ? "intro" : chapters[active].id;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const measure = () => {
      start = element.getBoundingClientRect().top + window.scrollY;
      distance = Math.max(1, element.offsetHeight - window.innerHeight);
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    reducedMotion.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      reducedMotion.removeEventListener("change", measure);
    };
  }, []);

  const goTo = (event: React.MouseEvent<HTMLElement>, index: number) => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce), (max-height: 639px)")
        .matches
    ) {
      event.preventDefault();
      document.getElementById(chapters[index].id)?.scrollIntoView();
      return;
    }
    event.preventDefault();
    const element = root.current!;
    const start = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top:
        start +
        ((element.offsetHeight - window.innerHeight) *
          chapters[index].position) /
          timelineEnd,
      behavior: "smooth",
    });
  };

  return (
    <section
      className={styles.story}
      ref={root}
      aria-label="코드스쿼드의 교육 이야기"
      data-logo-story
    >
      <div className={styles.stage}>
        <div
          className={styles.logo}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: symbol }}
        />
        <div className={styles.intro} data-panel>
          <h1>
            가능성을 발견하고,
            <br />
            함께 <span>변화를 만듭니다.</span>
          </h1>
          <p className={styles.introDescription}>
            나의 첫 AI 경험부터, 우리 조직의 새로운 내일까지.
            <br />
            배움으로 연결되는 가능성, 코드스쿼드.
          </p>
          <div className={styles.actions}>
            <Button
              label="교육 만나보기"
              href="#ax"
              icon="right"
              status="accent"
              onClick={(event) => goTo(event, 0)}
            />
          </div>
        </div>
        {chapters.map((chapter) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className={styles.chapter}
            data-panel
            aria-labelledby={`${chapter.id}-title`}
          >
            <div className={styles.copy}>
              <p className={styles.chapterName}>{chapter.name}</p>
              <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
              <p className={styles.description}>{chapter.description}</p>
              <ul className={styles.details}>
                {chapter.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className={styles.actions}>
                <Button
                  label={chapter.link}
                  href={chapter.href}
                  icon="right"
                  status="accent"
                />
              </div>
            </div>
          </section>
        ))}
        <nav className={styles.chapters} aria-label="교육 이야기 이동">
          {chapters.map((chapter, index) => (
            <button
              key={chapter.id}
              type="button"
              data-chapter
              aria-label={`${chapter.name}${["lucas", "codesquad"].includes(chapter.id) ? "로" : "으로"} 이동`}
              title={chapter.name}
              aria-controls={chapter.id}
              onClick={(event) => goTo(event, index)}
            >
              <span className={styles.dotTrack} aria-hidden="true">
                <span className={styles.dotFill} data-dot-fill />
              </span>
            </button>
          ))}
        </nav>
        <div className={styles.progress} aria-hidden="true" />
      </div>
    </section>
  );
}
