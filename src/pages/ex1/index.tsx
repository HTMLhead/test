import { useEffect, useRef, type CSSProperties } from "react";
import Layout from "@/layouts/Layout";
import Button from "@/components/ui/Button";
import { links } from "@/data/home";
import intro from "@/assets/img/picture/place1.png";
import ax from "@/assets/img/picture/place7.png";
import b2b from "@/assets/img/picture/place3.png";
import lucas from "@/assets/img/picture/place5.png";
import company from "@/assets/img/picture/place6.png";
import styles from "./index.module.css";

const scenes = [
  {
    id: "intro",
    name: "우리의 이야기",
    image: intro,
    position: "58% center",
    title: ["가능성을 발견하고,", "함께 변화를 만듭니다."],
    description:
      "나의 첫 AI 경험부터, 우리 조직의 새로운 내일까지.\n배움으로 연결되는 가능성, 코드스쿼드.",
    action: "교육 만나보기",
    href: "#ex1-ax",
  },
  {
    id: "ax",
    name: "AX 교육",
    image: ax,
    position: "42% center",
    title: ["작은 시도에서,", "시작되는 변화."],
    description:
      "AI를 아는 것에서, 내 일에 사용하는 것으로.\n직접 만들고 실험하며 나만의 가능성을 발견합니다.",
    action: "AX 교육 알아보기",
    href: links.olive,
  },
  {
    id: "b2b",
    name: "B2B 교육",
    image: b2b,
    position: "68% center",
    title: ["개인의 가능성이,", "팀의 역량으로."],
    description:
      "우리 조직의 실제 과제에서 시작하는 맞춤 교육.\n함께 해결하고 나누며, 배움을 현장의 변화로 연결합니다.",
    action: "기업 교육 알아보기",
    href: links.partners,
  },
  {
    id: "lucas",
    name: "교육 플랫폼 루카스",
    image: lucas,
    position: "35% center",
    title: ["배움의 모든 순간,", "루카스와 함께."],
    description:
      "AX 교육부터 기업 맞춤 교육까지.\n교육의 시작부터 실전 적용까지 함께하는 교육 플랫폼.",
    action: "교육 문의하기",
    href: links.email,
  },
  {
    id: "company",
    name: "코드스쿼드",
    image: company,
    position: "60% center",
    title: ["함께 변화를 만드는", "코드스쿼드입니다."],
    description:
      "배움으로 가능성을 연결하는 교육 회사.\n개인의 시작부터 조직의 변화까지 함께합니다.",
    action: "코드스쿼드 알아보기",
    href: links.about,
  },
];
const end = scenes.length - 0.4;
const staticQuery = "(prefers-reduced-motion: reduce), (max-height: 639px)";
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (start: number, finish: number, n: number) => {
  const t = clamp((n - start) / (finish - start));
  return t * t * (3 - 2 * t);
};

export default function PhotoStoryPage() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current!;
    const panels = Array.from(
      element.querySelectorAll<HTMLElement>("[data-photo-panel]"),
    );
    const buttons = Array.from(
      element.querySelectorAll<HTMLButtonElement>("[data-photo-nav]"),
    );
    const media = window.matchMedia(staticQuery);
    let frame = 0;
    let start = 0;
    let distance = 1;
    const render = () => {
      frame = 0;
      if (media.matches) {
        panels.forEach((panel) => {
          panel.inert = false;
          panel.removeAttribute("aria-hidden");
        });
        return;
      }
      const p = clamp((window.scrollY - start) / distance) * end;
      let active = 0;
      panels.forEach((panel, i) => {
        const incoming = i === 0 ? 1 : smooth(i - 0.4, i + 0.15, p);
        const outgoing =
          i === scenes.length - 1 ? 0 : smooth(i + 0.6, i + 1.15, p);
        const visible = incoming * (1 - outgoing);
        panel.style.setProperty("--image-reveal", String(incoming));
        panel.style.setProperty("--copy-reveal", String(visible));
        panel.style.setProperty(
          "--zoom",
          String(1.045 - clamp(p - i + 0.4) * 0.045),
        );
        panel.inert = visible <= 0.5;
        panel.setAttribute("aria-hidden", String(visible <= 0.5));
        if (visible > 0.5) active = i;
      });
      buttons.forEach((button, i) => {
        button.style.setProperty(
          "--fill",
          `${clamp((p - i + 0.15) / 0.9) * 100}%`,
        );
        if (i === active) button.setAttribute("aria-current", "step");
        else button.removeAttribute("aria-current");
      });
      element.dataset.scene = scenes[active].id;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const measure = () => {
      start =
        element.getBoundingClientRect().top +
        window.scrollY -
        parseFloat(
          getComputedStyle(element).getPropertyValue("--header-height"),
        );
      distance = Math.max(
        1,
        element.offsetHeight - stage.current!.offsetHeight,
      );
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    media.addEventListener("change", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      media.removeEventListener("change", measure);
    };
  }, []);

  const goTo = (index: number) => {
    if (window.matchMedia(staticQuery).matches) {
      document.getElementById(`ex1-${scenes[index].id}`)?.scrollIntoView();
      return;
    }
    const element = root.current!;
    const header = parseFloat(
      getComputedStyle(element).getPropertyValue("--header-height"),
    );
    window.scrollTo({
      top:
        element.getBoundingClientRect().top +
        window.scrollY -
        header +
        ((element.offsetHeight - stage.current!.offsetHeight) *
          (index === 0 ? 0 : index + 0.25)) /
          end,
      behavior: "smooth",
    });
  };

  return (
    <Layout
      title="코드스쿼드 | 사진으로 만나는 교육 이야기"
      canonicalPath="/ex1"
      noindex
    >
      <main className={styles.page}>
        <section
          ref={root}
          className={styles.story}
          data-photo-story
          aria-label="사진으로 만나는 코드스쿼드"
        >
          <div ref={stage} className={styles.stage}>
            {scenes.map((scene, index) => {
              const Heading = index === 0 ? "h1" : "h2";
              return (
                <section
                  id={`ex1-${scene.id}`}
                  key={scene.id}
                  className={styles.scene}
                  data-photo-panel
                  aria-labelledby={`ex1-${scene.id}-title`}
                  style={
                    {
                      "--position": scene.position,
                      "--order": index,
                    } as CSSProperties
                  }
                >
                  <div className={styles.background} aria-hidden="true">
                    <img
                      src={scene.image}
                      alt=""
                      fetchPriority={index === 0 ? "high" : "auto"}
                    />
                  </div>
                  <div className={styles.content}>
                    <p className={styles.label}>{scene.name}</p>
                    <Heading id={`ex1-${scene.id}-title`}>
                      {scene.title[0]}
                      <br />
                      <span>{scene.title[1]}</span>
                    </Heading>
                    <p className={styles.description}>{scene.description}</p>
                    <Button
                      label={scene.action}
                      href={scene.href}
                      icon="right"
                      onClick={
                        index === 0
                          ? (event) => {
                              event.preventDefault();
                              goTo(1);
                            }
                          : undefined
                      }
                    />
                  </div>
                </section>
              );
            })}
            <nav className={styles.navigation} aria-label="사진 이야기 이동">
              {scenes.map((scene, index) => (
                <button
                  key={scene.id}
                  type="button"
                  data-photo-nav
                  aria-label={`${scene.name} 보기`}
                  aria-controls={`ex1-${scene.id}`}
                  onClick={() => goTo(index)}
                >
                  <span className={styles.dot}>
                    <span />
                  </span>
                  <span className={styles.navLabel}>{scene.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  );
}
