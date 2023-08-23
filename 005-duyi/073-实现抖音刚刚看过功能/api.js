export function getOffset(id) {
  return new Promise((resolve, reject) => {
    resolve(id - 1);
  });
}
export function getVideos(page, size) {
  const arr = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < size; i++) {
      arr.push({
        id: i,
        url: `https://picsum.photos/id/${i * page}/200/300`,
      });
    }
    resolve(arr);
  });
}
