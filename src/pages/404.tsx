import { cx } from "@/lib/styles";
import { links } from "@/data/home";
import { siteSeo } from "@/data/seo";
import Layout from "@/layouts/Layout";
import Button from "@/components/ui/Button";
import styles from "./404.module.css";
export default function NotFoundPage() {
  const seo = {
    title: `페이지를 찾을 수 없습니다 | ${siteSeo.name}`,
    description:
      "요청하신 페이지를 찾을 수 없습니다. 코드스쿼드 홈에서 필요한 정보를 다시 확인해 주세요.",
    canonicalPath: "/404",
    noindex: true,
  };
  return (
    <>
      <Layout {...seo}>
        <main
          className={cx(styles, "not-found-main")}
          aria-labelledby="not-found-title"
        >
          <section className={cx(styles, "not-found-section")}>
            <div className={cx(styles, "not-found-container")}>
              <p className={cx(styles, "not-found-kicker typo-bold-sm")}>
                404 Not Found
              </p>
              <h1
                id="not-found-title"
                className={cx(styles, "not-found-title typo-display-md")}
              >
                페이지를 찾을 수 없습니다
              </h1>
              <p
                className={cx(
                  styles,
                  "not-found-description typo-body-lg text-wrap-pretty",
                )}
              >
                주소가 바뀌었거나, 입력한 경로가 정확하지 않을 수 있습니다.
                코드스쿼드 홈에서 과정을 다시 찾아보거나 문의해 주세요.
              </p>
              <div
                className={cx(styles, "not-found-actions")}
                aria-label="404 페이지 이동 링크"
              >
                <Button
                  label="홈으로 이동"
                  href="/"
                  status="accent"
                  size="lg"
                />
                <Button label="문의하기" href={links.email} size="lg" />
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}
