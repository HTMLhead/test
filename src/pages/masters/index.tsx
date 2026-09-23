import { cx } from "@/lib/styles";
import MastersAudience from "@/components/pageComponent/masters/MastersAudience";
import MastersCta from "@/components/pageComponent/masters/MastersCta";
import MastersCurriculum from "@/components/pageComponent/masters/MastersCurriculum";
import MastersFeatures from "@/components/pageComponent/masters/MastersFeatures";
import MastersHero from "@/components/pageComponent/masters/MastersHero";
import MastersIntro from "@/components/pageComponent/masters/MastersIntro";
import MastersOperation from "@/components/pageComponent/masters/MastersOperation";
import { getPageSeo } from "@/data/seo";
import Layout from "@/layouts/Layout";
import styles from "./index.module.css";
export default function MastersPage() {
  const seo = getPageSeo("/masters");
  return (
    <>
      <Layout {...seo}>
        <main className={cx(styles, "masters-main")}>
          <MastersHero />
          <MastersIntro />
          <MastersFeatures />
          <MastersCurriculum />
          <MastersAudience />
          <MastersOperation />
          <MastersCta />
        </main>
      </Layout>
    </>
  );
}
