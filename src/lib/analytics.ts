type AnalyticsWindow = Window & { dataLayer?: unknown[] };
let initialized = false;
let lastPath: string | undefined;

export function trackPageView(path: string) {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!id || lastPath === path) return;
  const target = window as AnalyticsWindow;
  target.dataLayer ??= [];
  function gtag(..._args: unknown[]) {
    target.dataLayer!.push(arguments);
  }
  if (!initialized) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.append(script);
    gtag("js", new Date());
    gtag("config", id, { send_page_view: false });
    initialized = true;
  }
  gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
  lastPath = path;
}
