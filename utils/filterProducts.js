const searchProducts = (products, search) => {
  if (!search) return products;
  const searchedProducts = products.filter((p) =>
    p.title.toLowerCase().includes(search),
  );
  return searchedProducts;
};

const categoryProducts = (products, category) => {
  if (!category) return products;
  const categorizedProducts = products.filter((p) => p.category === category);
  return categorizedProducts;
};

const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.category === "all") {
    const { category, ...rest } = currentQuery;
    return rest;
  }
  if (newQuery.search === "") {
    const { search, ...rest } = currentQuery;
    return rest;
  }
  return {
    ...currentQuery, 
    ...newQuery
  }
};
export { searchProducts, categoryProducts ,createQueryObject };
