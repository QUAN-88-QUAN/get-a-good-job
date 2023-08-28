const items = document.querySelectorAll(".list-item");
const playGround = document.querySelector(".playground");
const list = document.querySelector(".list");

// 创建动画
function createAnimation(scrollStart, scrollEnd, valueStart, valueEnd) {
  return function (scroll) {
    if (scroll <= scrollStart) {
      return valueStart;
    }
    if (scroll >= scrollEnd) {
      return valueEnd;
    }
    return (
      valueStart +
      ((scroll - scrollStart) * (valueEnd - valueStart)) /
        (scrollEnd - scrollStart)
    );
  };
}

const animationMap = new Map();

// 得到每个节点的所有动画
function getDomAnimation(scrollStart, scrollEnd, dom) {
  // 每个动画的起点不一样，就这样就产生了视差效果
  scrollStart = scrollStart + dom.dataset.order * 100;
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
  // getBoundingClientRect提供了元素的大小及其相对于视口的位置
  const playGroundRect = playGround.getBoundingClientRect();
  const scrollStart = playGroundRect.top + window.scrollY;
  const scrollEnd = playGroundRect.bottom + window.scrollY - window.innerHeight;
  // 这样也可以
  // const scrollStart = playGround.offsetTop
  // const scrollEnd = playGroundRect.height + scrollStart - window.innerHeight;
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
