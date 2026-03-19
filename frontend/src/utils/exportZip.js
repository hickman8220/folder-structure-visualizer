import JSZip from "jszip";

const IGNORE_FOLDERS = ["node_modules", "dist", "build", ".next", "coverage"];

function shouldIgnoreFolder(name) {
  return IGNORE_FOLDERS.includes(name);
}

function getFileContent(node) {
  if (typeof node.content === "string") {
    return node.content;
  }

  return "";
}

function addNodesToZip(zipFolder, nodes) {
  for (const node of nodes) {
    if (node.type === "folder") {
      if (shouldIgnoreFolder(node.name)) continue;

      const childFolder = zipFolder.folder(node.name);

      if (childFolder) {
        addNodesToZip(childFolder, node.children || []);
      }
    } else {
      zipFolder.file(node.name, getFileContent(node));
    }
  }
}

export async function downloadTreeAsZip(treeData) {
  if (!treeData || treeData.length === 0) return false;

  const zip = new JSZip();
  let zipName = "folder-structure";

  if (treeData.length === 1 && treeData[0].type === "folder") {
    const rootNode = treeData[0];
    zipName = rootNode.name;

    const rootFolder = zip.folder(rootNode.name);

    if (rootFolder) {
      addNodesToZip(rootFolder, rootNode.children || []);
    }
  } else {
    for (const node of treeData) {
      if (node.type === "folder") {
        if (shouldIgnoreFolder(node.name)) continue;

        const folder = zip.folder(node.name);

        if (folder) {
          addNodesToZip(folder, node.children || []);
        }
      } else {
        zip.file(node.name, getFileContent(node));
      }
    }
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${zipName}.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
  return true;
}
