const usePagination = (items, currentPage, itemsPerPage) => {
  if (!items || !items.length) {
    return {
      currentPage,
      itemsPerPage,
      previousPage: null,
      nextPage: null,
      totalPages: null,
      data: [],
    };
  }
  let totalPages = Math.ceil(items.length / itemsPerPage);

  let offset = (currentPage - 1) * itemsPerPage;
  let paginatedItems = items.slice(offset).slice(0, itemsPerPage);
  return {
    currentPage,
    itemsPerPage,
    previousPage: currentPage - 1 ? currentPage - 1 : null,
    nextPage: totalPages > currentPage ? currentPage + 1 : null,
    totalItems: items.length,
    totalPages,
    data: paginatedItems,
  };
};

export default usePagination;
