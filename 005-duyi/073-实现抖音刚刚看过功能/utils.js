export function debounce(fn, delay = 3000) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

export function getIndexRange(page, size) {
  const start = (page - 1) * size;
  const end = start + size - 1;
  return [start, end];
}

export function getPage(index, size) {
  return Math.ceil((index + 1) / size);
}
