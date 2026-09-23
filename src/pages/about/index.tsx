import { cx } from "@/lib/styles";
import AboutCta from "@page/about/AboutCta";
import AboutHero from "@page/about/AboutHero";
import AboutHistory from "@page/about/AboutHistory";
import AboutMasters from "@page/about/AboutMasters";
import AboutWhy from "@page/about/AboutWhy";
import { getPageSeo } from "@/data/seo";
import Layout from "@/layouts/Layout";
import styles from "./index.module.css";
export default function AboutPage() {
  const seo = getPageSeo("/about");
  return (
    <>
      <Layout {...seo}>
        <main className={cx(styles, "about-main")}>
          <AboutHero />
          <AboutWhy />
          <AboutMasters />
          <AboutHistory />
          <AboutCta />
        </main>
      </Layout>
    </>
  );
}
