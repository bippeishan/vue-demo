export const simpleDeepClone = (data: any) => {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const copyRenderTree = (tree: any, root: any) => {
  tree.data = simpleDeepClone(root.data);
  tree.children = [];
  if (root.children && root.children.length > 0) {
    root.children.forEach((item: any, index: number) => {
      tree.children[index] = copyRenderTree({}, item);
    });
  }
  return tree;
};
