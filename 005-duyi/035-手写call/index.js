Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
  const key = Symbol("temp");
  // ctx.fn = this
  // const result = ctx.fn(...args)

  // node环境打印不出来
  Object.defineProperty(ctx, key, {
    enumerable: false,
    value: this,
  });
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};
function method(a, b) {
  console.log(this, a, b);
  return a + b;
}
console.log(method.call({ quan: "quan" }, 2, 3));
console.log(method.myCall({ quan: "quan" }, 2, 3));
console.log(method.myCall(null, 2, 3));
console.log(method.myCall(1, 2, 3));