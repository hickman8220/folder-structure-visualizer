export function cloneTree(nodes = []) {
  return nodes.map((node) => ({
    ...node,
    children:
      node.type === "folder" ? cloneTree(node.children || []) : undefined,
  }));
}

export function countTreeStats(nodes) {
  let folders = 0;
  let files = 0;

  function walk(list) {
    for (const node of list) {
      if (node.type === "folder") {
        folders += 1;
        walk(node.children || []);
      } else {
        files += 1;
      }
    }
  }

  walk(nodes);

  return { folders, files };
}

export function treeToMarkdown(nodes, depth = 0) {
  const lines = [];

  for (const node of nodes) {
    const indent = "  ".repeat(depth);
    const suffix = node.type === "folder" ? "/" : "";
    lines.push(`${indent}- ${node.name}${suffix}`);

    if (node.type === "folder" && node.children?.length) {
      lines.push(treeToMarkdown(node.children, depth + 1));
    }
  }

  return lines.filter(Boolean).join("\n");
}

export function sanitizePathSegment(segment = "") {
  return segment.trim().replace(/^\/+|\/+$/g, "");
}

export function splitPath(path = "") {
  return path
    .split("/")
    .map((segment) => sanitizePathSegment(segment))
    .filter(Boolean);
}

export function normalizePlacementPath(config = {}) {
  if (!config || config.mode !== "specific") {
    return [];
  }

  const targetFolder = sanitizePathSegment(config.targetFolder || "");
  if (!targetFolder) {
    return null;
  }

  const parentSegments = splitPath(config.parentPath || "");
  return [...parentSegments, targetFolder];
}

export function findFolderByPath(nodes = [], pathSegments = []) {
  if (!pathSegments.length) {
    return null;
  }

  let currentChildren = nodes;
  let currentNode = null;

  for (const segment of pathSegments) {
    const nextNode = currentChildren.find(
      (node) => node.type === "folder" && node.name === segment,
    );

    if (!nextNode) {
      return null;
    }

    currentNode = nextNode;
    currentChildren = nextNode.children || [];
  }

  return currentNode;
}

export function ensureFolderPath(nodes = [], pathSegments = []) {
  if (!pathSegments.length) {
    return null;
  }

  let currentChildren = nodes;
  let currentNode = null;

  for (const segment of pathSegments) {
    let nextNode = currentChildren.find(
      (node) => node.type === "folder" && node.name === segment,
    );

    if (!nextNode) {
      nextNode = {
        name: segment,
        type: "folder",
        children: [],
      };
      currentChildren.push(nextNode);
    }

    if (!Array.isArray(nextNode.children)) {
      nextNode.children = [];
    }

    currentNode = nextNode;
    currentChildren = nextNode.children;
  }

  return currentNode;
}
