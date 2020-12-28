const createCategoriesList = (categories, options = []) => {
  if (!categories || categories.length === 0) return [];

  categories.map((cate) => {
    options.push({
      value: cate._id,
      name: cate.name,
      parentId: cate.parentId,
      type: cate.type,
    });
    cate.children &&
      cate.children.length &&
      createCategoriesList(cate.children, options);
    return options;
  });
  return options;
};

export default createCategoriesList;
