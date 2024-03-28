exports.createHierarchy = (items) => {
  items.sort((a, b) => {
      if (a.popular && !b.popular) {
          return -1; 
      } else if (!a.popular && b.popular) {
          return 1; 
      } else {
          return 0; 
      }
  });

  const itemMap = {};
  const rootItems = [];

  items.forEach(item => {
      item.children = [];
      itemMap[item.id] = item;

      if (item.parentId === null) {
          rootItems.push(item);
      }
  });

  items.forEach(item => {
      if (item.parentId !== null) {
          const parent = itemMap[item.parentId];
          if (parent) {
              parent.children.push(item);
          }
      }
  });
  return rootItems;
}