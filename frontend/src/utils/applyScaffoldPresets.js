import { mergeTrees } from "./mergeTrees";
function cloneTree(nodes) {
  return nodes.map((node) => ({
    ...node,
    children: node.children ? cloneTree(node.children) : [],
  }));
}

function hasChildNamed(parent, name) {
  return parent.children?.some((child) => child.name === name);
}

function pushIfMissing(parent, node) {
  if (!hasChildNamed(parent, node.name)) {
    parent.children.push(node);
  }
}

const reactWarningText =
  "This scaffold uses Vite 8. Use Node.js 20.19+ or 22.12+ before running";

function getReactAppCss() {
  return `.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at top left, rgba(99, 102, 241, 0.18), transparent 30%),
    radial-gradient(circle at top right, rgba(56, 189, 248, 0.1), transparent 28%),
    linear-gradient(180deg, #020617 0%, #071127 100%);
}

.hero-card {
  width: min(820px, 100%);
  padding: 32px;
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.78);
  border: 1px solid rgba(148, 163, 184, 0.14);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
}

.badge {
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(99, 102, 241, 0.16);
  border: 1px solid rgba(99, 102, 241, 0.24);
  color: #c7d2fe;
  font-size: 13px;
  font-weight: 700;
}

.hero-title {
  margin: 0 0 14px;
  font-size: clamp(2rem, 5vw, 3.2rem);
  line-height: 1.08;
  color: #f8fafc;
}

.subtitle {
  margin: 0 0 24px;
  color: #94a3b8;
  font-size: 1rem;
}

.warning-box {
  margin-bottom: 20px;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.28);
  color: #fde68a;
}

.warning-title {
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 800;
  color: #fef3c7;
}

.warning-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
}

.steps {
  display: grid;
  gap: 12px;
}

.step {
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.1);
  color: #e2e8f0;
}

.status-card {
  margin-top: 22px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.status-label {
  margin: 0 0 10px;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #cbd5e1;
}

.status-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.status-chip.loading {
  background: rgba(245, 158, 11, 0.16);
  border: 1px solid rgba(245, 158, 11, 0.3);
  color: #fde68a;
}

.status-chip.success {
  background: rgba(34, 197, 94, 0.16);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #bbf7d0;
}

.status-chip.error {
  background: rgba(239, 68, 68, 0.16);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: #fecaca;
}

.status-text {
  margin: 0;
  color: #cbd5e1;
  line-height: 1.7;
}

code {
  background: rgba(255, 255, 255, 0.08);
  padding: 2px 8px;
  border-radius: 6px;
  font-family: Consolas, "Fira Code", monospace;
}`;
}

function getReactIndexCss(withTailwind) {
  if (withTailwind) {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#root {
  margin: 0;
  min-height: 100%;
}`;
  }

  return `:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: #e5e7eb;
  background: #020617;
  line-height: 1.5;
  font-weight: 400;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
}

body {
  min-width: 320px;
  min-height: 100vh;
  background: #020617;
  color: #e2e8f0;
}`;
}

function getReactMainFile(withTypeScript) {
  const appFile = withTypeScript ? "./App.tsx" : "./App.jsx";
  return `import React from "react";
import ReactDOM from "react-dom/client";
import App from "${appFile}";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")${
    withTypeScript ? "!" : ""
  }).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
}

function getConnectedReactAppFile({ withTailwind, withTypeScript }) {
  if (withTailwind) {
    return `import { useEffect, useState } from "react";

type BackendState = {
  ok: boolean;
  message: string;
};

export default function App() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Checking backend connection...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch("/api/status");
        if (!response.ok) {
          throw new Error("Backend health check failed");
        }

        const data: BackendState = await response.json();
        setStatus("success");
        setMessage(data.message || "Frontend and backend are connected.");
      } catch (error) {
        setStatus("error");
        setMessage(
          "Frontend is running, but backend is not reachable yet. Start the backend and refresh."
        );
      }
    };

    checkBackend();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_28%),linear-gradient(180deg,#020617_0%,#071127_100%)] px-6 py-10">
        <div className="mx-auto grid min-h-[80vh] max-w-5xl place-items-center">
          <section className="w-full rounded-3xl border border-slate-700/40 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl md:p-10">
            <span className="inline-flex rounded-full border border-indigo-400/25 bg-indigo-500/15 px-3 py-2 text-sm font-semibold text-indigo-200">
              Generated by Folder Structure Visualizer
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              React + Vite + Tailwind ${withTypeScript ? "TSX + " : ""}Express scaffold ready
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400 md:text-lg">
              Your frontend and backend starters were generated already wired together.
              The frontend calls <code className="rounded bg-white/10 px-2 py-1 text-slate-100">/api/status</code>
              through the Vite proxy.
            </p>

            <div className="mt-6 rounded-2xl border border-amber-400/25 bg-amber-500/10 p-4 text-amber-100">
              <p className="text-sm font-extrabold tracking-wide text-amber-50">
                Node.js requirement
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-100/90">
                ${reactWarningText}{" "}
                <code className="rounded bg-white/10 px-2 py-1 text-slate-100">
                  npm install
                </code>{" "}
                in both apps, then run{" "}
                <code className="rounded bg-white/10 px-2 py-1 text-slate-100">
                  npm run dev
                </code>{" "}
                in frontend and backend.
              </p>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-700/40 bg-white/5 p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-300">
                Connection status
              </p>

              <div
                className={[
                  "mt-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold",
                  status === "loading"
                    ? "border border-amber-400/30 bg-amber-500/15 text-amber-200"
                    : status === "success"
                    ? "border border-emerald-400/30 bg-emerald-500/15 text-emerald-200"
                    : "border border-rose-400/30 bg-rose-500/15 text-rose-200",
                ].join(" ")}
              >
                {status === "loading"
                  ? "Checking backend..."
                  : status === "success"
                  ? "Backend connected"
                  : "Backend not reachable"}
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                {message}
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl border border-slate-700/40 bg-white/5 p-4 text-slate-200">
                Frontend calls <code className="rounded bg-white/10 px-2 py-1">/api/status</code>
              </div>
              <div className="rounded-2xl border border-slate-700/40 bg-white/5 p-4 text-slate-200">
                Vite proxy forwards requests to <code className="rounded bg-white/10 px-2 py-1">http://localhost:5000</code>
              </div>
              <div className="rounded-2xl border border-slate-700/40 bg-white/5 p-4 text-slate-200">
                Start both apps and get straight to building
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}`;
  }

  return `import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Checking backend connection...");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch("/api/status");
        if (!response.ok) {
          throw new Error("Backend health check failed");
        }

        const data = await response.json();
        setStatus("success");
        setMessage(data.message || "Frontend and backend are connected.");
      } catch (error) {
        setStatus("error");
        setMessage(
          "Frontend is running, but backend is not reachable yet. Start the backend and refresh."
        );
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="app-shell">
      <div className="hero-card">
        <span className="badge">Generated by Folder Structure Visualizer</span>

        <h1 className="hero-title">
          React + Vite ${withTypeScript ? "TSX + " : ""}Express scaffold ready
        </h1>

        <p className="subtitle">
          Your frontend and backend starters were generated already wired
          together. The frontend calls <code>/api/status</code> through the
          Vite proxy.
        </p>

        <div className="warning-box">
          <p className="warning-title">Node.js requirement</p>
          <p className="warning-text">
            ${reactWarningText} Run <code>npm install</code> in both apps, then
            run <code>npm run dev</code> in frontend and backend.
          </p>
        </div>

        <div className="status-card">
          <p className="status-label">Connection status</p>

          <div
            className={
              status === "loading"
                ? "status-chip loading"
                : status === "success"
                ? "status-chip success"
                : "status-chip error"
            }
          >
            {status === "loading"
              ? "Checking backend..."
              : status === "success"
              ? "Backend connected"
              : "Backend not reachable"}
          </div>

          <p className="status-text">{message}</p>
        </div>

        <div className="steps">
          <div className="step">
            Frontend calls <code>/api/status</code>
          </div>
          <div className="step">
            Vite proxy forwards requests to <code>http://localhost:5000</code>
          </div>
          <div className="step">
            Start both apps and get straight to building
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;`;
}

function getReactAppFile({
  withTailwind,
  withTypeScript,
  withBackendConnection,
}) {
  const appFileName = withTypeScript ? "src/App.tsx" : "src/App.jsx";

  if (withBackendConnection) {
    return getConnectedReactAppFile({ withTailwind, withTypeScript });
  }

  if (withTailwind) {
    return `export default function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(56,189,248,0.10),transparent_28%),linear-gradient(180deg,#020617_0%,#071127_100%)] px-6 py-10">
        <div className="mx-auto grid min-h-[80vh] max-w-4xl place-items-center">
          <section className="w-full rounded-3xl border border-slate-700/40 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-xl md:p-10">
            <span className="inline-flex rounded-full border border-indigo-400/25 bg-indigo-500/15 px-3 py-2 text-sm font-semibold text-indigo-200">
              Generated by Folder Structure Visualizer
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              React + Vite + Tailwind ${withTypeScript ? "TSX " : ""}scaffold ready
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              Your frontend starter has been generated successfully. Start
              building from{" "}
              <code className="rounded bg-white/10 px-2 py-1 text-slate-100">
                ${appFileName}
              </code>
            </p>

            <div className="mt-6 rounded-2xl border border-amber-400/25 bg-amber-500/10 p-4 text-amber-100">
              <p className="text-sm font-extrabold tracking-wide text-amber-50">
                Node.js requirement
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-100/90">
                ${reactWarningText}{" "}
                <code className="rounded bg-white/10 px-2 py-1 text-slate-100">
                  npm install
                </code>{" "}
                and{" "}
                <code className="rounded bg-white/10 px-2 py-1 text-slate-100">
                  npm run dev
                </code>.
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              <div className="rounded-2xl border border-slate-700/40 bg-white/5 p-4 text-slate-200">
                Edit{" "}
                <code className="rounded bg-white/10 px-2 py-1">
                  ${appFileName}
                </code>
              </div>
              <div className="rounded-2xl border border-slate-700/40 bg-white/5 p-4 text-slate-200">
                Create components in{" "}
                <code className="rounded bg-white/10 px-2 py-1">
                  src/components
                </code>
              </div>
              <div className="rounded-2xl border border-slate-700/40 bg-white/5 p-4 text-slate-200">
                Run{" "}
                <code className="rounded bg-white/10 px-2 py-1">
                  npm install
                </code>{" "}
                and{" "}
                <code className="rounded bg-white/10 px-2 py-1">
                  npm run dev
                </code>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}`;
  }

  if (withTypeScript) {
    return `import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <div className="hero-card">
        <span className="badge">Generated by Folder Structure Visualizer</span>

        <h1 className="hero-title">React + Vite TSX scaffold ready</h1>

        <p className="subtitle">
          Your frontend starter has been generated successfully. Start building
          from <code>${appFileName}</code>.
        </p>

        <div className="warning-box">
          <p className="warning-title">Node.js requirement</p>
          <p className="warning-text">
            ${reactWarningText} <code>npm install</code> and <code>npm run dev</code>.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            Edit <code>${appFileName}</code>
          </div>
          <div className="step">
            Create components in <code>src/components</code>
          </div>
          <div className="step">
            Run <code>npm install</code> and <code>npm run dev</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
`;
  }

  return `import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <div className="hero-card">
        <span className="badge">Generated by Folder Structure Visualizer</span>

        <h1 className="hero-title">React + Vite scaffold ready</h1>

        <p className="subtitle">
          Your frontend starter has been generated successfully. Start building
          from <code>${appFileName}</code>.
        </p>

        <div className="warning-box">
          <p className="warning-title">Node.js requirement</p>
          <p className="warning-text">
            ${reactWarningText} <code>npm install</code> and <code>npm run dev</code>.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            Edit <code>${appFileName}</code>
          </div>
          <div className="step">
            Create components in <code>src/components</code>
          </div>
          <div className="step">
            Run <code>npm install</code> and <code>npm run dev</code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;`;
}

function getViteConfigFile(withTypeScript, withBackendConnection) {
  return `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  ${
    withBackendConnection
      ? `server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },`
      : ""
  }
});`;
}

function getPackageJson({ withTailwind, withTypeScript }) {
  return JSON.stringify(
    {
      name: "frontend",
      private: true,
      version: "0.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
      },
      devDependencies: {
        vite: "^8.0.1",
        "@vitejs/plugin-react": "^6.0.1",
        ...(withTypeScript
          ? {
              typescript: "^5.6.3",
              "@types/react": "^18.3.12",
              "@types/react-dom": "^18.3.1",
            }
          : {}),
        ...(withTailwind
          ? {
              tailwindcss: "^3.4.13",
              postcss: "^8.5.8",
              autoprefixer: "^10.4.27",
            }
          : {}),
      },
    },
    null,
    2,
  );
}

function createReactVitePreset(
  withTailwind = false,
  withTypeScript = false,
  withBackendConnection = false,
) {
  const appFileName = withTypeScript ? "App.tsx" : "App.jsx";
  const mainFileName = withTypeScript ? "main.tsx" : "main.jsx";
  const viteConfigFileName = withTypeScript
    ? "vite.config.ts"
    : "vite.config.js";

  return {
    name: "frontend",
    type: "folder",
    children: [
      {
        name: ".gitignore",
        type: "file",
        content: `node_modules
dist
.vite
.DS_Store`,
      },
      {
        name: "package.json",
        type: "file",
        content: getPackageJson({ withTailwind, withTypeScript }),
      },
      {
        name: "index.html",
        type: "file",
        content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Frontend</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/${mainFileName}"></script>
  </body>
</html>`,
      },
      {
        name: viteConfigFileName,
        type: "file",
        content: getViteConfigFile(withTypeScript, withBackendConnection),
      },
      {
        name: "public",
        type: "folder",
        children: [],
      },
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "assets",
            type: "folder",
            children: [],
          },
          {
            name: "components",
            type: "folder",
            children: [],
          },
          {
            name: "utils",
            type: "folder",
            children: [],
          },
          {
            name: mainFileName,
            type: "file",
            content: getReactMainFile(withTypeScript),
          },
          {
            name: appFileName,
            type: "file",
            content: getReactAppFile({
              withTailwind,
              withTypeScript,
              withBackendConnection,
            }),
          },
          ...(withTailwind
            ? []
            : [
                {
                  name: "App.css",
                  type: "file",
                  content: getReactAppCss(),
                },
              ]),
          {
            name: "index.css",
            type: "file",
            content: getReactIndexCss(withTailwind),
          },
          ...(withTypeScript
            ? [
                {
                  name: "vite-env.d.ts",
                  type: "file",
                  content: `/// <reference types="vite/client" />`,
                },
              ]
            : []),
        ],
      },
      ...(withTailwind
        ? [
            {
              name: "tailwind.config.js",
              type: "file",
              content: `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};`,
            },
            {
              name: "postcss.config.js",
              type: "file",
              content: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
            },
          ]
        : []),
      ...(withTypeScript
        ? [
            {
              name: "tsconfig.json",
              type: "file",
              content: `{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}`,
            },
            {
              name: "tsconfig.app.json",
              type: "file",
              content: `{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}`,
            },
            {
              name: "tsconfig.node.json",
              type: "file",
              content: `{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "Bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}`,
            },
          ]
        : []),
    ],
  };
}

function createExpressPreset(
  withFrontendConnection = false,
  withTypeScript = false,
) {
  if (withTypeScript) {
    return {
      name: "backend",
      type: "folder",
      children: [
        {
          name: "package.json",
          type: "file",
          content: JSON.stringify(
            {
              name: "backend",
              version: "1.0.0",
              private: true,
              type: "module",
              main: "src/server.ts",
              scripts: {
                dev: "tsx watch src/server.ts",
                start: "tsx src/server.ts",
                typecheck: "tsc --noEmit",
              },
              dependencies: {
                express: "^4.21.0",
                ...(withFrontendConnection ? { cors: "^2.8.5" } : {}),
              },
              devDependencies: {
                typescript: "^5.6.3",
                tsx: "^4.19.1",
                "@types/node": "^22.7.4",
                "@types/express": "^5.0.0",
                ...(withFrontendConnection ? { "@types/cors": "^2.8.17" } : {}),
              },
            },
            null,
            2,
          ),
        },
        {
          name: "tsconfig.json",
          type: "file",
          content: `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "types": ["node"]
  },
  "include": ["src"]
}`,
        },
        {
          name: "src",
          type: "folder",
          children: [
            {
              name: "app.ts",
              type: "file",
              content: withFrontendConnection
                ? `import express, { type Express } from "express";
import cors from "cors";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/api/status", (_req, res) => {
  res.json({
    ok: true,
    message: "Frontend and backend are connected successfully.",
  });
});

export default app;`
                : `import express, { type Express } from "express";

const app: Express = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Backend API is running");
});

export default app;`,
            },
            {
              name: "server.ts",
              type: "file",
              content: `import app from "./app.ts";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
            },
          ],
        },
      ],
    };
  }

  return {
    name: "backend",
    type: "folder",
    children: [
      {
        name: "package.json",
        type: "file",
        content: JSON.stringify(
          {
            name: "backend",
            version: "1.0.0",
            private: true,
            main: "src/server.js",
            scripts: {
              dev: "node src/server.js",
              start: "node src/server.js",
            },
            dependencies: {
              express: "^4.21.0",
              ...(withFrontendConnection ? { cors: "^2.8.5" } : {}),
            },
          },
          null,
          2,
        ),
      },
      {
        name: "src",
        type: "folder",
        children: [
          {
            name: "server.js",
            type: "file",
            content: withFrontendConnection
              ? `const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    message: "Frontend and backend are connected successfully.",
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
              : `const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
          },
        ],
      },
    ],
  };
}

function createGitignoreFile() {
  return {
    name: ".gitignore",
    type: "file",
    content: `node_modules
dist
build
.vite
.env
.DS_Store`,
  };
}

function ensureRoot(tree) {
  if (!tree.length) {
    return [
      {
        name: "project",
        type: "folder",
        children: [],
      },
    ];
  }

  if (tree.length === 1 && tree[0].type === "folder") {
    return tree;
  }

  return [
    {
      name: "project",
      type: "folder",
      children: tree,
    },
  ];
}

function sanitizePathSegment(segment = "") {
  return segment.trim().replace(/^\/+|\/+$/g, "");
}

function splitPath(path = "") {
  return path
    .split("/")
    .map((segment) => sanitizePathSegment(segment))
    .filter(Boolean);
}

function normalizePlacementPath(placementConfig = {}) {
  if (!placementConfig || placementConfig.mode !== "specific") {
    return [];
  }

  const targetFolder = sanitizePathSegment(placementConfig.targetFolder || "");
  if (!targetFolder) {
    return [];
  }

  const parentSegments = splitPath(placementConfig.parentPath || "");
  return [...parentSegments, targetFolder];
}

function ensureFolderPath(startNode, pathSegments = []) {
  let currentNode = startNode;

  for (const segment of pathSegments) {
    if (!currentNode.children) {
      currentNode.children = [];
    }

    let nextNode = currentNode.children.find(
      (child) => child.type === "folder" && child.name === segment,
    );

    if (!nextNode) {
      nextNode = {
        name: segment,
        type: "folder",
        children: [],
      };
      currentNode.children.push(nextNode);
    }

    currentNode = nextNode;
  }

  return currentNode;
}

export function applyScaffoldPresets(
  treeData,
  options,
  placementConfig = { mode: "root", targetFolder: "", parentPath: "" },
) {
  const clonedTree = ensureRoot(cloneTree(treeData));
  const root = clonedTree[0];

  let targetParent = root;

  const placementPath = normalizePlacementPath(placementConfig);

  if (placementPath.length > 0) {
    targetParent = ensureFolderPath(root, placementPath);
  }

  const withBackendConnection = options.reactVite && options.expressBackend;

  const presetNodes = [];

  if (options.reactVite) {
    presetNodes.push(
      createReactVitePreset(
        options.tailwind,
        options.typescript,
        withBackendConnection,
      ),
    );
  }

  if (options.expressBackend) {
    presetNodes.push(
      createExpressPreset(withBackendConnection, options.typescript),
    );
  }

  if (!targetParent.children) {
    targetParent.children = [];
  }

  if (presetNodes.length > 0) {
    targetParent.children = mergeTrees(targetParent.children, presetNodes);
  }

  if (options.gitignore) {
    pushIfMissing(root, createGitignoreFile());
  }

  return clonedTree;
}
