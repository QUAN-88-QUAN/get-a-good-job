// 一开始 this,exports,module.exports都是指的同一个对象
// 最后导出的是module.export
// 下面的代码分析出来就是
// this
// {a:1,b:2,f:6}

// exports
// {c:3,e:5}

// module.exports
// {d:4}
this.a = 1
exports.b = 2
exports = {
  c:3
}
module.exports  = {
  d:4
}
exports.e = 5
this.f = 6