import { useEffect, useMemo, useState } from "react";
import InputPanel from "./components/InputPanel";
import TreeView from "./components/TreeView";
import PathBar from "./components/PathBar";
import Toolbar from "./components/Toolbar";
import Toast from "./components/Toast";
import ScaffoldOptions from "./components/ScaffoldOptions";
import { downloadTreeAsZip } from "./utils/exportZip";
import { countTreeStats, treeToMarkdown } from "./utils/treeHelpers";
import { applyScaffoldPresets } from "./utils/applyScaffoldPresets";
import "./App.css";

function collectFolderPaths(nodes, parentPath = "") {
  let paths = [];

  for (const node of nodes) {
    const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;

    if (node.type === "folder") {
      paths.push(currentPath);
      if (node.children?.length) {
        paths = paths.concat(collectFolderPaths(node.children, currentPath));
      }
    }
  }

  return paths;
}

function App() {
  const [rawTreeData, setRawTreeData] = useState([]);
  const [selectedPath, setSelectedPath] = useState("");
  const [expandedPaths, setExpandedPaths] = useState(new Set());
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [scaffoldOptions, setScaffoldOptions] = useState({
    reactVite: false,
    expressBackend: false,
    tailwind: false,
    typescript: false,
    gitignore: false,
  });

  const [placementConfig, setPlacementConfig] = useState({
    mode: "root",
    targetFolder: "",
    parentPath: "",
  });

  const treeData = useMemo(() => {
    return applyScaffoldPresets(rawTreeData, scaffoldOptions, placementConfig);
  }, [rawTreeData, scaffoldOptions, placementConfig]);

  const stats = useMemo(() => countTreeStats(treeData), [treeData]);

  useEffect(() => {
    const allFolderPaths = collectFolderPaths(treeData);
    setExpandedPaths(new Set(allFolderPaths));
  }, [treeData]);

  useEffect(() => {
    if (!treeData.length) {
      setSelectedPath("");
      return;
    }

    const selectedStillExists = (() => {
      const walk = (nodes, parentPath = "") => {
        for (const node of nodes) {
          const currentPath = parentPath
            ? `${parentPath}/${node.name}`
            : node.name;

          if (currentPath === selectedPath) return true;

          if (node.type === "folder" && node.children?.length) {
            if (walk(node.children, currentPath)) return true;
          }
        }
        return false;
      };

      return walk(treeData);
    })();

    if (!selectedStillExists) {
      setSelectedPath("");
    }
  }, [treeData, selectedPath]);

  useEffect(() => {
    const appScaffoldsEnabled =
      scaffoldOptions.reactVite || scaffoldOptions.expressBackend;

    if (!appScaffoldsEnabled) {
      setPlacementConfig({
        mode: "root",
        targetFolder: "",
        parentPath: "",
      });
    }
  }, [scaffoldOptions.reactVite, scaffoldOptions.expressBackend]);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const toggleFolder = (path) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);

      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }

      return next;
    });
  };

  const handleOptionChange = (key) => {
    setScaffoldOptions((prev) => {
      const next = {
        ...prev,
        [key]: !prev[key],
      };

      if (key === "reactVite" && prev.reactVite) {
        next.tailwind = false;
        next.typescript = false;
      }

      if (key === "tailwind" && !prev.reactVite) {
        return prev;
      }

      if (key === "typescript" && !prev.reactVite) {
        return prev;
      }

      return next;
    });
  };

  const handlePlacementChange = (updates) => {
    setPlacementConfig((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const expandAll = () => {
    const allFolderPaths = collectFolderPaths(treeData);
    setExpandedPaths(new Set(allFolderPaths));
  };

  const collapseAll = () => {
    setExpandedPaths(new Set());
  };

  const handleDownloadZip = async () => {
    const success = await downloadTreeAsZip(treeData);
    if (success) {
      triggerToast("Scaffold ZIP downloaded");
    }
  };

  const handleCopyMarkdown = async () => {
    if (!treeData.length) return;
    const markdown = treeToMarkdown(treeData);
    await navigator.clipboard.writeText(markdown);
    triggerToast("Tree copied as markdown");
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">Dev Tool</p>
          <h1>Folder Structure Visualizer</h1>
          <p className="app-subtitle">
            Paste an ASCII folder tree and explore it like a real project
            structure.
          </p>
        </div>
      </header>

      <Toolbar
        expandAll={expandAll}
        collapseAll={collapseAll}
        treeData={treeData}
        downloadZip={handleDownloadZip}
        copyMarkdown={handleCopyMarkdown}
        stats={stats}
      />

      <main className="main-layout">
        <section className="panel input-panel">
          <InputPanel setTreeData={setRawTreeData} />

          <ScaffoldOptions
            options={scaffoldOptions}
            onToggle={handleOptionChange}
            placementConfig={placementConfig}
            onPlacementChange={handlePlacementChange}
          />
        </section>

        <section className="panel tree-panel">
          <TreeView
            treeData={treeData}
            selectedPath={selectedPath}
            setSelectedPath={setSelectedPath}
            expandedPaths={expandedPaths}
            toggleFolder={toggleFolder}
          />
        </section>
      </main>

      <PathBar path={selectedPath} />
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}

export default App;
