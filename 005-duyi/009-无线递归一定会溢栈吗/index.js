function foo(){
  // 执行foo的期间,没有调用foo,只是在执行foo期间执行了一个计时器,
  // 在计时器到达的时候再去执行foo
  // setTimeout(foo,0)

  // 先执行foo,将foo执行的结果作为计时器到达之后要执行的东西
  // setTimeout(foo(),0)

  // 不会
  // Promise.resolve().then(foo)

  // 会
  Promise.resolve().then(foo())
}
foo()