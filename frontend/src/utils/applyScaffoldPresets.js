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

function createReactVitePreset(withTailwind = false) {
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
        content: JSON.stringify(
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
              vite: "^5.4.0",
              "@vitejs/plugin-react": "^4.3.1",
              ...(withTailwind
                ? {
                    tailwindcss: "^3.4.13",
                    postcss: "^8.4.47",
                    autoprefixer: "^10.4.20",
                  }
                : {}),
            },
          },
          null,
          2,
        ),
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
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      },
      {
        name: "vite.config.js",
        type: "file",
        content: `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});`,
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
            name: "main.jsx",
            type: "file",
            content: `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
          },
          {
            name: "App.jsx",
            type: "file",
            content: `import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <h1>Frontend App</h1>
      <p>Your React + Vite scaffold is ready.</p>
    </div>
  );
}

export default App;`,
          },
          {
            name: "App.css",
            type: "file",
            content: `.app-shell {
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  text-align: center;
}`,
          },
          {
            name: "index.css",
            type: "file",
            content: withTailwind
              ? `@tailwind base;
@tailwind components;
@tailwind utilities;`
              : `:root {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  font-weight: 400;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #0f172a;
  color: #e2e8f0;
}`,
          },
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
    ],
  };
}

function createExpressPreset() {
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
            main: "src/server.js",
            scripts: {
              dev: "node src/server.js",
              start: "node src/server.js",
            },
            dependencies: {
              express: "^4.21.0",
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
            content: `const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

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

export function applyScaffoldPresets(treeData, options) {
  const clonedTree = ensureRoot(cloneTree(treeData));
  const root = clonedTree[0];

  if (options.reactVite) {
    pushIfMissing(root, createReactVitePreset(options.tailwind));
  }

  if (options.expressBackend) {
    pushIfMissing(root, createExpressPreset());
  }

  if (options.gitignore) {
    pushIfMissing(root, createGitignoreFile());
  }

  return clonedTree;
}
