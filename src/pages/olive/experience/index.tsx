import { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/layouts/Layout";
import Button from "@/components/ui/Button";
import AppLink from "@/components/ui/AppLink";
import NotFoundPage from "@/pages/404";
import {
  experiencePath,
  experienceTitle,
  experienceTasks,
} from "@/data/experience";
import {
  StartTask,
  UnderstandingTask,
  ServicesTask,
  PracticeTask,
  MyWorkTask,
  JudgmentTask,
} from "./Tasks";
import styles from "./index.module.css";
import CourseOverview from "./CourseOverview";
import { ServiceProvider } from "./PromptComposer";

const taskContent = [
  StartTask,
  UnderstandingTask,
  ServicesTask,
  PracticeTask,
  MyWorkTask,
  JudgmentTask,
];

export default function ExperiencePage() {
  const { taskId } = useParams();
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const isTaskNavOpen = openTaskId === taskId;
  const index = experienceTasks.findIndex((task) => task.id === taskId);
  if (taskId !== undefined && index < 0) return <NotFoundPage />;
  const task = index < 0 ? null : experienceTasks[index];
  const Content = taskContent[index];
  const previous = experienceTasks[index - 1];
  const next = experienceTasks[index + 1];

  return (
    <Layout
      title={`${task ? `${task.title} | ` : ""}${experienceTitle} | 코드스쿼드`}
      description={
        task?.description ??
        "첫 요청부터 답 다듬기, 내 일에 써 보기까지 여섯 단계로 약 1시간 동안 배우는 AI 입문 체험 코스입니다."
      }
      canonicalPath={task ? `${experiencePath}/${task.id}` : experiencePath}
    >
      <main className={styles.page}>
        <div className={styles.container}>
          {task ? (
            <div className={styles.taskLayout}>
              <div className={styles.taskToolbar}>
                <AppLink href={experiencePath} className={styles.back}>
                  ← 코스 소개
                </AppLink>
                <span className={styles.taskProgress}>
                  {task.id} / {experienceTasks.length}
                </span>
                <button
                  type="button"
                  className={styles.taskNavToggle}
                  aria-expanded={isTaskNavOpen}
                  aria-controls="experience-task-nav"
                  onClick={() =>
                    setOpenTaskId(isTaskNavOpen ? null : (taskId ?? null))
                  }
                >
                  목차 {isTaskNavOpen ? "닫기" : "보기"}
                </button>
                <nav
                  id="experience-task-nav"
                  className={styles.taskNav}
                  aria-label="단계 목차"
                  hidden={!isTaskNavOpen}
                >
                  <p>코스 목차</p>
                  <ol>
                    {experienceTasks.map((item) => (
                      <li key={item.id}>
                        <AppLink
                          href={`${experiencePath}/${item.id}`}
                          aria-current={item.id === taskId ? "page" : undefined}
                          onClick={() => setOpenTaskId(null)}
                        >
                          <span>{item.id.padStart(2, "0")}</span>
                          {item.title}
                        </AppLink>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>
              <h1 className={styles.srOnly}>{task.title}</h1>
              <div className={styles.taskBody}>
                <ServiceProvider>
                  <Content key={task.id} />
                </ServiceProvider>
                <nav
                  className={styles.taskPagination}
                  aria-label="이전 다음 단계"
                >
                  <AppLink
                    href={
                      previous
                        ? `${experiencePath}/${previous.id}`
                        : experiencePath
                    }
                    onClick={() => setOpenTaskId(null)}
                  >
                    <span>← {previous ? "이전 단계" : "코스 소개"}</span>
                    <strong>{previous?.title ?? experienceTitle}</strong>
                  </AppLink>
                  <AppLink
                    href={
                      next ? `${experiencePath}/${next.id}` : experiencePath
                    }
                    onClick={() => setOpenTaskId(null)}
                  >
                    <span>{next ? "다음 단계" : "코스 소개로 돌아가기"} →</span>
                    <strong>{next?.title ?? "전체 학습 돌아보기"}</strong>
                  </AppLink>
                </nav>
                {!next && (
                  <div className={styles.next}>
                    <h2>배움을 더 이어가고 싶다면</h2>
                    <p>
                      내 업무에 AI를 더 깊이 쓰는 방법은 올리브에서 이어서 배울
                      수 있어요. 미션을 해결하고 동료와 피드백을 나누며 활용
                      범위를 넓혀 보세요.
                    </p>
                    <Button
                      label="올리브 코스 살펴보기"
                      href="/olive#olive-courses"
                      status="accent"
                      icon="right"
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <CourseOverview />
          )}
        </div>
      </main>
    </Layout>
  );
}
