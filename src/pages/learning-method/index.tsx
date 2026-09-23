import { cx } from "@/lib/styles";
import LearningMethodCta from "@/components/pageComponent/learningMethod/LearningMethodCta";
import LearningMethodHero from "@/components/pageComponent/learningMethod/LearningMethodHero";
import LearningMethodList from "@/components/pageComponent/learningMethod/LearningMethodList";
import LearningMethodOverview from "@/components/pageComponent/learningMethod/LearningMethodOverview";
import { getPageSeo } from "@/data/seo";
import Layout from "@/layouts/Layout";
import styles from "./index.module.css";
export default function LearningMethodPage() {
  const seo = getPageSeo("/learning-method");
  return (
    <>
      <Layout {...seo}>
        <main className={cx(styles, "learning-method-main")}>
          <LearningMethodHero />
          <LearningMethodOverview />
          <LearningMethodList />
          <LearningMethodCta />
        </main>
      </Layout>
    </>
  );
}
