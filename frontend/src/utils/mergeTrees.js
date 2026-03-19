function cloneNode(node) {
  return {
    ...node,
    children: node.children ? node.children.map(cloneNode) : [],
  };
}

function mergeNodeArrays(baseNodes = [], additionNodes = []) {
  const result = baseNodes.map(cloneNode);

  for (const newNode of additionNodes) {
    const existingIndex = result.findIndex(
      (node) => node.name === newNode.name && node.type === newNode.type,
    );

    if (existingIndex === -1) {
      result.push(cloneNode(newNode));
      continue;
    }

    const existingNode = result[existingIndex];

    if (existingNode.type === "folder" && newNode.type === "folder") {
      existingNode.children = mergeNodeArrays(
        existingNode.children || [],
        newNode.children || [],
      );
    } else {
      result[existingIndex] = cloneNode(newNode);
    }
  }

  return result;
}

export function mergeTrees(baseTree = [], additionTree = []) {
  return mergeNodeArrays(baseTree, additionTree);
}
