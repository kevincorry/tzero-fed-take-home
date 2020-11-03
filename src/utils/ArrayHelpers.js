export const sortItems = (items, sortAsc, index) => {
  if (isSortable(items)) {
    const sortMethod = sortAsc ? ascSort : descSort;
    items.sort((a, b) => sortMethod(a[index], b[index]));
  }
};

export const ascSort = (a, b) => {
  return parseInt(a) - parseInt(b);
};

export const descSort = (a, b) => {
  return parseInt(b) - parseInt(a);
};

export const isSortable = (array) => {
  return Array.isArray(array) && array.length;
};

export const removeEmptyItems = (arr, index) => {
  return arr.filter((a) => a[index] > 0);
};
