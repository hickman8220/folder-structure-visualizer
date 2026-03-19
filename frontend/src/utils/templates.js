function fileNode(name, content = "") {
  return {
    name,
    type: "file",
    content,
  };
}

function folderNode(name, children = []) {
  return {
    name,
    type: "folder",
    children,
  };
}

export const reactViteTemplate = [
  folderNode("frontend", [
    folderNode("public", [fileNode("vite.svg", "")]),
    folderNode("src", [
      folderNode("assets", []),
      folderNode("components", []),
      folderNode("pages", []),
      folderNode("hooks", []),
      folderNode("utils", []),
      fileNode(
        "App.jsx",
        `function App() {
  return (
    <div>
      <h1>Hello from React + Vite</h1>
    </div>
  );
}

export default App;
`,
      ),
      fileNode(
        "main.jsx",
        `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
      ),
      fileNode(
        "index.css",
        `:root {
  font-family: system-ui, sans-serif;
}

body {
  margin: 0;
  padding: 0;
}
`,
      ),
    ]),
    fileNode(
      "index.html",
      `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`,
    ),
    fileNode(
      "package.json",
      `{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
`,
    ),
    fileNode(
      "vite.config.js",
      `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
`,
    ),
  ]),
];

export const expressTemplate = [
  folderNode("backend", [
    folderNode("src", [
      folderNode("controllers", []),
      folderNode("routes", []),
      folderNode("middleware", []),
      folderNode("config", []),
      folderNode("utils", []),
      fileNode(
        "app.js",
        `import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend running" });
});

export default app;
`,
      ),
      fileNode(
        "server.js",
        `import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`,
      ),
    ]),
    fileNode(
      "package.json",
      `{
  "name": "backend",
  "version": "1.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "dev": "node --watch src/server.js",
    "start": "node src/server.js"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}
`,
    ),
    fileNode(
      ".gitignore",
      `node_modules
.env
`,
    ),
  ]),
];

export const tailwindTemplate = [
  folderNode("frontend", [
    fileNode(
      "tailwind.config.js",
      `/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
`,
    ),
    fileNode(
      "postcss.config.js",
      `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`,
    ),
    folderNode("src", [
      fileNode(
        "index.css",
        `@tailwind base;
@tailwind components;
@tailwind utilities;
`,
      ),
    ]),
    fileNode(
      "package.json",
      `{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.10",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.45"
  }
}
`,
    ),
  ]),
];

export const rootGitignoreTemplate = [
  fileNode(
    ".gitignore",
    `node_modules
dist
build
.env
.vscode
.DS_Store
`,
  ),
];
