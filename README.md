# 📁 Folder Structure Visualizer

<p align="center">
  <a href="https://foldervisualiser.farhaankhan.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Open%20App-6366f1?style=for-the-badge&logo=vercel&logoColor=white"/>
  </a>
</p>

A practical developer tool that converts ASCII folder trees into an interactive explorer and generates **ready-to-run project scaffolds**.

Paste a structure → visualize it → export a working project.

---

## ✨ Core Features

### 📂 ASCII → Visual Tree

- Paste standard ASCII folder structures
- Supports `├──`, `└──`, `│`, and indentation-based formats

### 🌳 Interactive Explorer

- Expand/collapse folders
- Smooth animations
- Clean IDE-like experience

### 🔍 Smart Search

- Real-time filtering
- Auto-expands matching folders
- Highlights matches

### 📊 Counters & Icons

- File/folder counts
- Intelligent file-type icons

### 📋 Utilities

- Copy full path
- Export tree as Markdown

---

## 📦 Scaffold Generator (Main Feature)

Generate a **fully working project ZIP** directly from your structure.

### Supported Presets

- React + Vite (JSX)
- React + Vite + Tailwind
- React + Vite + TypeScript (TSX)
- React + Vite + TSX + Tailwind
- Node + Express backend
- Root `.gitignore`

### What You Get

- Frontend with working dev server
- Backend with Express + `/api/status`
- Vite proxy preconfigured
- Clean starter UI

Yes — it actually runs. Not fake files.

---

## ⚠️ Important Behavior (Read This Once)

### 1. Root vs Custom Placement

You have two modes:

#### 🟢 Root Mode

Scaffold is created at root:

```
frontend/
backend/
```

Run from:

```bash
cd frontend
npm install
npm run dev
```

---

#### 🟡 Custom Placement Mode

Example:

```
Parent: WORK_PLEASE
Target: apps
```

Output:

```
WORK_PLEASE/apps/frontend
WORK_PLEASE/apps/backend
```

👉 You MUST run from THIS location:

```bash
cd WORK_PLEASE/apps/frontend
npm install
npm run dev
```

❌ Running from existing `apps/frontend` (from your input tree) will fail.

---

### 2. Placeholder Folder Conflicts

If your input already contains:

```
apps/frontend
apps/backend
```

Those are treated as **plain folders**, not scaffold apps.

➡️ The tool generates NEW working apps in the selected destination.

---

### 3. Empty Config Handling

Files like:

```
package.json
vite.config.js
```

may be empty in your input tree.

✔️ The tool replaces them with valid scaffold configs when presets are enabled.

---

### 4. Extra Folders May Appear

Example:

```
src/utils/
```

These may be added by presets.

✔️ Safe to delete
✔️ Required for some setups

(Translation: don’t panic, nothing is broken.)

---

### 5. Tailwind Behavior

- With Tailwind → no `App.css`
- Without Tailwind → standard CSS setup

---

### 6. Node Version Requirement

Generated projects use **Vite 8**

You need:

- Node.js **20.19+** OR
- Node.js **22.12+**

---

## ⚛️ Generated Frontend Structure

### JSX Mode

- `App.jsx`
- `main.jsx`
- `vite.config.js`

### TSX Mode

- `App.tsx`
- `main.tsx`
- `vite.config.ts`
- `tsconfig.json`

### Tailwind Adds

- `tailwind.config.js`
- `postcss.config.js`

---

## 🧠 How It Works

1. Parse ASCII → JSON tree
2. Render interactive UI
3. Merge presets into structure
4. Generate ZIP using JSZip

---

## 🚀 Installation (Local Dev)

```bash
git clone https://github.com/Far-200/folder-structure-visualizer
cd folder-structure-visualizer
npm install
npm run dev
```

---

## 🧪 Testing Reality (Honest Section)

This tool has been tested with:

- Large monorepo-style trees
- Nested folders (10+ levels)
- JSX + TSX combinations
- Tailwind on/off
- Backend on/off
- Root + custom placement

---

## ⚠️ Known Limitations

- Parser is flexible, not strict — expects reasonable ASCII format
- Custom placement can confuse users if they run wrong folders
- Not designed for malformed or inconsistent tree syntax

---

## 🎯 Use Cases

- Rapid project scaffolding
- Visualizing large repos
- Sharing architecture
- Generating README trees

---

## 🏆 Highlights

- Built recursive tree renderer
- Dynamic scaffold generator
- Real working full-stack output
- Practical developer tool (not just UI demo)

---

## 🔮 Future Improvements

- README generation for exported projects
- More preset variations
- Better placement UX hints

---

## 👨‍💻 Author

Farhaan Khan
CSE Student • Full-Stack Builder • AI Explorer

---

## ⭐ Support

If this helped you — star the repo.

If it broke — open an issue 😄
