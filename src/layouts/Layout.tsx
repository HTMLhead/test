import { useEffect, type ReactNode } from "react";
import { siteSeo } from "@/data/seo";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  canonicalPath?: string;
  noindex?: boolean;
};

export default function Layout({
  children,
  title = siteSeo.defaultTitle,
  description = siteSeo.defaultDescription,
  canonicalPath = "/",
  noindex = false,
}: Props) {
  useEffect(() => {
    const siteUrl = import.meta.env.VITE_SITE_URL || "https://codesquad.kr";
    const canonical = new URL(canonicalPath, siteUrl).href;
    document.title = title;
    const meta = (key: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let element = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`,
      );
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.append(element);
      }
      element.content = content;
    };
    meta("description", description);
    meta("robots", noindex ? "noindex, nofollow" : "index, follow");
    meta("og:title", title, true);
    meta("og:description", description, true);
    meta("og:url", canonical, true);
    meta("og:site_name", siteSeo.name, true);
    meta("og:locale", siteSeo.locale, true);
    meta("og:type", "website", true);
    meta("og:image", new URL(siteSeo.ogImage, siteUrl).href, true);
    meta("og:image:alt", `${siteSeo.name} 대표 이미지`, true);
    meta("twitter:card", "summary_large_image");
    meta("twitter:title", title);
    meta("twitter:description", description);
    meta("twitter:image", new URL(siteSeo.ogImage, siteUrl).href);
    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.append(link);
    }
    link.href = canonical;
  }, [title, description, canonicalPath, noindex]);
  return children;
}
