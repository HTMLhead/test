import { lazy, Suspense, useEffect, useRef } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useLocation,
  useRouteError,
  isRouteErrorResponse,
  redirectDocument,
  redirect,
} from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/index";
import MastersPage from "@/pages/masters/index";
import OlivePage from "@/pages/olive/index";
import PartnersPage from "@/pages/partners/index";
import LearningMethodPage from "@/pages/learning-method/index";
import AboutPage from "@/pages/about/index";
import NotFoundPage from "@/pages/404";
import { trackPageView } from "@/lib/analytics";

const AiExperiencePage = lazy(() => import("@/pages/olive/experience"));
const PhotoStoryPage = lazy(() => import("@/pages/ex1"));

function RootLayout() {
  const location = useLocation();
  const firstRender = useRef(true);
  useEffect(() => {
    trackPageView(location.pathname + location.search);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const main = document.querySelector("main");
    main?.setAttribute("tabindex", "-1");
    main?.focus({ preventScroll: true });
  }, [location.key, location.pathname, location.search]);

  return (
    <>
      <a className="skip-link" href="#page-content">
        본문으로 건너뛰기
      </a>
      <Header />
      <div id="page-content" tabIndex={-1}>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </>
  );
}

function RouteError() {
  const error = useRouteError();
  return (
    <main className="route-error">
      <h1>화면을 불러오지 못했습니다</h1>
      <p>
        {isRouteErrorResponse(error)
          ? `요청 오류 (${error.status})`
          : "잠시 후 다시 시도해 주세요."}
      </p>
      <a href="/">홈으로 돌아가기</a>
    </main>
  );
}

const router = createBrowserRouter([
  {
    path: "ax-home",
    loader: ({ request }) =>
      redirectDocument(`/ax-home/index.html${new URL(request.url).search}`),
  },
  {
    element: <RootLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "ex1",
        element: (
          <Suspense fallback={<main aria-busy="true" />}>
            <PhotoStoryPage />
          </Suspense>
        ),
      },
      { path: "masters", element: <MastersPage /> },
      { path: "olive", element: <OlivePage /> },
      {
        path: "olive/experience/:taskId?",
        element: (
          <Suspense fallback={<main aria-busy="true" />}>
            <AiExperiencePage />
          </Suspense>
        ),
      },
      { path: "ai-experience", loader: () => redirect("/olive/experience") },
      { path: "partners", element: <PartnersPage /> },
      { path: "learning-method", element: <LearningMethodPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
