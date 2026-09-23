import { cx } from "@/lib/styles";
import LcCta from "@/components/pageComponent/lc/LcCta";
import LcCurriculum from "@/components/pageComponent/lc/LcCurriculum";
import LcFlow from "@/components/pageComponent/lc/LcFlow";
import LcHero from "@/components/pageComponent/lc/LcHero";
import LcOutcomes from "@/components/pageComponent/lc/LcOutcomes";
import LcPrograms from "@/components/pageComponent/lc/LcPrograms";
import LcWhy from "@/components/pageComponent/lc/LcWhy";
import { getPageSeo } from "@/data/seo";
import Layout from "@/layouts/Layout";
import styles from "./index.module.css";
export default function PartnersPage() {
  const seo = getPageSeo("/partners");
  return (
    <>
      <Layout {...seo}>
        <main className={cx(styles, "partners-main")}>
          <LcHero />
          <LcWhy />
          <LcFlow />
          <LcPrograms />
          <LcCurriculum />
          <LcOutcomes />
          <LcCta />
        </main>
      </Layout>
    </>
  );
}
