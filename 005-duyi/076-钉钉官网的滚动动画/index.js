const items = document.querySelectorAll(".list-item");
const playGround = document.querySelector(".playground");
const list = document.querySelector(".list");

function createAnimation(scrollStart, scrollEnd, valueStart, valueEnd) {
  return function (scroll) {
    if (scroll <= scrollStart) {
      return scrollStart;
    }
    if (scroll >= scrollEnd) {
      return scrollEnd;
    }
    return (
      valueStart +
      ((scroll - scrollStart) * (valueEnd - valueStart)) /
        (scrollEnd - scrollStart)
    );
  };
}

const animate = createAnimation(100, 2000, 0, 1);

const animationMap = new Map();

function getDomAnimation(scrollStart, scrollEnd, dom) {
  scrollStart = scrollStart + dom.dataset.order * 600;
  const opactyAnimation = createAnimation(scrollStart, scrollEnd, 0, 1);
  const opacity = function (scroll) {
    return opactyAnimation(scroll);
  };

  const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1);
  const xAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    list.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2,
    0
  );
  const yAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    list.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2,
    0
  );

  const transform = function (scroll) {
    return `translate(${xAnimation(scroll)}px,${yAnimation(
      scroll
    )}px) scale(${scaleAnimation(scroll)})`;
  };
  return {
    opacity,
    transform,
  };
}

function updateMap() {
  animationMap.clear();
  // 提供了元素的大小及其相对于视口的位置
  console.log(playGround);
  const playGroundRect = playGround.getBoundingClientRect();
  console.log(playGroundRect);
  const scrollStart = playGroundRect.top + window.scrollY;
  const scrollEnd = playGroundRect.bottom + window.scrollY - window.innerHeight;
  for (const item of items) {
    animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item));
  }
}

updateMap();

function updateStyle() {
  const scroll = window.scrollY;
  for (let [dom, value] of animationMap) {
    for (const cssProp in value) {
      dom.style[cssProp] = value[cssProp](scroll);
    }
  }
}

updateStyle();

window.addEventListener("scroll", updateStyle);
