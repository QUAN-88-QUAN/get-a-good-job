const str = "手动阀手动阀☹️撒大师傅撒";
// 这里slice截取没问题因为浏览器做了兼容吧
console.log(str.slice(7)); //撒大师傅撒
console.log(str.slice(7).length); //6
console.log(str[7]); //''
// 封装一下
String.prototype.sliceByPoint = function (pStart, pEnd) {
  let result = ""; //截取的结果
  let pIndex = 0; //码点的指针
  let cIndex = 0; //码元的指针
  while (1) {
    if (pIndex >= pEnd || cIndex >= this.length) {
      break;
    }
    const point = this.codePointAt(cIndex);
    if(pIndex>=pStart){
      result+=String.fromCodePoint(point)
    }
    pIndex++;
    cIndex += point > 0xffff ? 2 : 1;
  }
  return result
};
console.log(str.sliceByPoint(7)); //撒大师傅撒
