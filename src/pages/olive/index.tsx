import { cx } from "@/lib/styles";
import OliveFaq from "@/components/pageComponent/olive/OliveFaq";
import OliveCourses from "@/components/pageComponent/olive/OliveCourses";
import OliveFlow from "@/components/pageComponent/olive/OliveFlow";
import OliveExperience from "@/components/pageComponent/olive/OliveExperience";
import OliveHero from "@/components/pageComponent/olive/OliveHero";
import OliveOutcomes from "@/components/pageComponent/olive/OliveOutcomes";
import OlivePrinciples from "@/components/pageComponent/olive/OlivePrinciples";
import { getPageSeo } from "@/data/seo";
import Layout from "@/layouts/Layout";
import styles from "./index.module.css";
export default function OlivePage() {
  const seo = getPageSeo("/olive");
  return (
    <>
      <Layout {...seo}>
        <main className={cx(styles, "olive-main")}>
          <OliveHero />
          <OliveExperience />
          <OliveCourses />
          <OlivePrinciples />
          <OliveFlow />
          <OliveOutcomes />
          <OliveFaq />
        </main>
      </Layout>
    </>
  );
}
