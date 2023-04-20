function addMethod(obj, name, fn) {
  const old = obj[name];
  obj[name] = function (...args) {
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else if (typeof old === "function") {
      return old.apply(this,args);
    }
  };
}

const searcher = {};
addMethod(searcher, "find", () => {
  console.log("查询所有用户");
});
addMethod(searcher, "find", (name) => {
  console.log("按照姓名查询用户");
});
addMethod(searcher, "find", (firstName, lastName) => {
  console.log("按照姓和名查询用户");
});
searcher.find();
searcher.find("11");
searcher.find("11", "22");
searcher.find("11");
