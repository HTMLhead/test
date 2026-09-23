import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Public directory HTML entries need an explicit filename in Vite.
function axPreviewEntry(): Plugin {
  const redirect: import("vite").Connect.NextHandleFunction = (
    req,
    res,
    next,
  ) => {
    const url = new URL(req.url || "/", "http://localhost");
    if (url.pathname !== "/ax-home" && url.pathname !== "/ax-home/") {
      next();
      return;
    }
    res.writeHead(302, { Location: `/ax-home/index.html${url.search}` });
    res.end();
  };
  return {
    name: "ax-preview-entry",
    configureServer(server) {
      server.middlewares.use(redirect);
    },
    configurePreviewServer(server) {
      server.middlewares.use(redirect);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "OLIVE_");
  const proxy = {
    "^/api/olive/graphql$": {
      target: env.OLIVE_API_ORIGIN || "https://olive.codesquad.kr",
      changeOrigin: true,
      rewrite: () => "/api/graphql",
      timeout: 15_000,
      proxyTimeout: 15_000,
    },
  };

  return {
    server: { proxy },
    preview: { proxy },
    plugins: [axPreviewEntry(), react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@page": fileURLToPath(
          new URL("./src/components/pageComponent", import.meta.url),
        ),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
      },
    },
  };
});
