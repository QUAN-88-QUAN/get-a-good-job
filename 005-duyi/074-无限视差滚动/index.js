const imgs = [
  "https://picsum.photos/id/33/600/700",
  "https://picsum.photos/id/34/600/700",
  "https://picsum.photos/id/35/600/700",
  "https://picsum.photos/id/36/600/700",
  "https://picsum.photos/id/37/600/700",
];

function createItem(index) {
  const imgUrl = imgs[index];
  const item = document.createElement("div");
  item.classList.add("item");
  item.innerHTML = `<img src="${imgUrl}" alt="">`;
  scrollContainer.appendChild(item);
  return item;
}

const scrollContainer = document.querySelector(".scroll-container");
let currentIndex = 0;
function resetElements() {
  scrollContainer.innerHTML = "";
  const prevIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1;

  createItem(prevIndex).classList.add("prev");
  createItem(currentIndex).classList.add("cur");
  createItem(nextIndex).classList.add("next");
}

resetElements();

let isAnimating = false;
scrollContainer.addEventListener("wheel", (e) => {
  if (!e.deltaY) {
    return;
  }
  console.log(isAnimating)
  if (isAnimating) {
    return;
  }
  isAnimating = true;
  if (e.deltaY > 0) {
    scrollContainer.classList.add("scroll-down");
    currentIndex = currentIndex + 1 > imgs.length - 1 ? 0 : currentIndex + 1;
  } else {
    scrollContainer.classList.add("scroll-up");
    currentIndex = currentIndex - 1 < 0 ? imgs.length - 1 : currentIndex - 1;
  }
});

// 动画结束之后，重置状态
scrollContainer.addEventListener("transitionend", () => {
  isAnimating = false;
  scrollContainer.classList.remove("scroll-down");
  scrollContainer.classList.remove("scroll-up");
  resetElements();
});
