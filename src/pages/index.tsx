import LogoStory from "@page/home/LogoStory";
import { getPageSeo } from "@/data/seo";
import Layout from "../layouts/Layout";
import styles from "./index.module.css";

export default function HomePage() {
  return (
    <Layout {...getPageSeo("/")}>
      <main className={styles["home-main"]}>
        <LogoStory />
      </main>
    </Layout>
  );
}
