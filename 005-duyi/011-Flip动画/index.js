// 没得源码,自己写的,拖快了会抖动
class Flip {
  constructor(nodeList, time) {
    this.nodeList = nodeList;
    this.time = time;
    this.startP = Array.from(this.nodeList.children).reduce((acc, cur) => {
      const boxSize = cur.getBoundingClientRect();
      // push的返回值是数组的新长度
      acc.push({
        top: boxSize.top,
        height: boxSize.height,
        nodeName: cur.innerText,
        node: cur,
      });
      return acc;
    }, []);
  }
  play() {
    const endP = Array.from(this.nodeList.children).reduce((acc, cur) => {
      const boxSize = cur.getBoundingClientRect();
      // push的返回值是数组的新长度
      acc.push({
        top: boxSize.top,
        height: boxSize.height,
        nodeName: cur.innerText,
        node: cur,
      });
      return acc;
    }, []);
    endP.forEach((item) => {
      this.startP.forEach((i) => {
        if (item.nodeName === i.nodeName && item.top !== i.top) {
          item.node.style.transition = `none`;
          item.node.style.transform = `translateY(${i.top - item.top}px)`;
        }
      });
      // requestAnimationFrame(() => {
      //   this.startP.forEach((item) => {
      //     item.node.style.transition = `all ${this.time}s ease`;
      //     item.node.style.transform = ``;
      //   });
      // });
      this.timer = setTimeout(() => {
        this.startP.forEach((item) => {
          item.node.style.transition = `all ${this.time}s ease`;
          item.node.style.transform = ``;
        });
      }, this.time * 1000);
    });
    this.startP = Object.assign(endP);
  }
}
