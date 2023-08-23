import { getOffset, getVideos } from "./api.js";
import { debounce, getIndexRange, getPage } from "./utils.js";

const visibleIndex = new Set();
const ob = new IntersectionObserver((entries) => {
  // 将处于视口的元素下标加入，可以知道现在是在多少范围，通过页码就能知道多少页码
  for (const entry of entries) {
    const index = entry.target.dataset.index;
    if (entry.isIntersecting) {
      visibleIndex.add(index);
    } else {
      visibleIndex.delete(index);
    }
  }
  loadPagesDebounce();
});

function getRange() {
  if (visibleIndex.size === 0) return [0, 0];
  const min = Math.min(...visibleIndex);
  const max = Math.max(...visibleIndex);
  return [min, max];
}

// 假设看过的元素id，返回的就是看过的元素的下标顺序
const currentId = 200;
const SIZE = 12;
const container = document.querySelector(".container");
const indicator = document.querySelector(".indicator");

function createElements(page) {
  const childrenLen = container.children.length;
  const count = page * SIZE - childrenLen;
  for (let i = 0; i < count; i++) {
    const item = document.createElement("div");
    item.className = "item";
    item.dataset.index = i + childrenLen;
    container.appendChild(item);
    ob.observe(item);
  }
}

function loadPages() {
  // 得到当前能看到的元素索引范围
  const [minIndex, maxIndex] = getRange();
  console.log(minIndex, maxIndex);
  // 获取当前能看到的页
  const pages = new Set();
  for (let i = minIndex; i <= maxIndex; i++) {
    pages.add(getPage(i, SIZE));
  }
  for (const page of pages) {
    const [minIndex, maxIndex] = getIndexRange(page, SIZE);
    // 已经渲染过的页码就不再渲染
    if (container.children[minIndex].dataset.loaded) {
      continue;
    }
    container.children[minIndex].dataset.loaded = true;
    getVideos(page, SIZE).then((res) => {
      console.log(res);
      for (let i = minIndex; i <= maxIndex; i++) {
        const item = container.children[i];
        item.innerHTML = `
        <img src="${res[i - minIndex].url}" alt="">
        `;
      }
    });
  }
}

const loadPagesDebounce = debounce(loadPages, 300);

createElements(1);

async function setIndicatorVisible() {
  const offset = await getOffset(currentId);
  const [minIndex, maxIndex] = getRange();
  // 获取页码
  const page = getPage(offset, SIZE);
  if (offset >= minIndex && offset <= maxIndex) {
    indicator.style.display = "none";
  } else {
    indicator.style.display = "block";
  }
  indicator.dataset.page = page;
  indicator.dataset.index = offset;
}

setIndicatorVisible();

indicator.addEventListener("click", function (e) {
  const page = +e.target.dataset.page;
  const index = +e.target.dataset.index;
  createElements(page);
  container.children[index].scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});
