import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { getPublicCourses } from "@/lib/api";
import type { PublicCourse } from "@/lib/olive";
import styles from "./OliveCourses.module.css";

type CourseState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "success"; courses: PublicCourse[] };

function CourseThumbnail({ src }: { src: string | null }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={styles.thumbnail} aria-hidden="true">
      <span>OLIVE</span>
      {src && !failed && (
        <img
          src={src}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

export default function OliveCourses() {
  const [state, setState] = useState<CourseState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading" });

    getPublicCourses({
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15_000)]),
    })
      .then((courses) => {
        if (!controller.signal.aborted) {
          setState({ status: "success", courses: courses.slice(0, 3) });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: "error" });
      });

    return () => controller.abort();
  }, [attempt]);

  return (
    <section
      id="olive-courses"
      className={styles.section}
      aria-labelledby="olive-courses-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.heading}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>올리브 코스 둘러보기</p>
            <h2 id="olive-courses-heading">지금 만나볼 수 있는 코스</h2>
            <p className={styles.description}>
              관심 있는 코스를 살펴보고, 올리브에서 학습을 시작해 보세요.
            </p>
          </div>
          <Button
            label="전체 코스 보기"
            href="https://olive.codesquad.kr"
            icon="right"
          />
        </div>

        {state.status === "loading" && (
          <p className={styles.message} role="status">
            코스를 불러오고 있어요.
          </p>
        )}
        {state.status === "error" && (
          <div className={styles.message}>
            <p role="alert">
              코스를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
            </p>
            <button
              className={styles.retry}
              type="button"
              onClick={() => setAttempt((value) => value + 1)}
            >
              다시 불러오기
            </button>
          </div>
        )}
        {state.status === "success" &&
          (state.courses.length === 0 ? (
            <p className={styles.message} role="status">
              새로운 코스를 준비하고 있어요. 곧 다시 만나요.
            </p>
          ) : (
            <ul className={styles.grid}>
              {state.courses.map((course) => (
                <li key={course.id}>
                  <a
                    className={styles.card}
                    href={`https://olive.codesquad.kr/course/u/${encodeURIComponent(course.path)}`}
                  >
                    <CourseThumbnail
                      key={course.thumbnailUrl}
                      src={course.thumbnailUrl}
                    />
                    <div className={styles.copy}>
                      <h3>{course.title}</h3>
                      <p>{course.description}</p>
                      <span className={styles.more}>
                        코스 살펴보기 <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </section>
  );
}
