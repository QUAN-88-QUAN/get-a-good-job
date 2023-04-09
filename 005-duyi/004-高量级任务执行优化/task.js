// 运行一个耗时任务
// 如果是异步执行任务,请返回Promise
// 要尽快的完成任务,同时不要让页面产生卡顿
// 尽量兼容更多的浏览器

function runTask(task) {
  // 1 直接运行运行任务,阻塞
  // task()
  // 2 微任务,阻塞
  // 微队列要全部释放才能去做其他的事情
  // return new Promise((resolve,reject)=>{
  //   Promise.resolve().then(()=>{
  //     task()
  //     resolve()
  //   })
  // })
  // 3 宏任务,卡顿
  // return new Promise((resolve, reject) => {
  //   setTimeout(()=>{
  //     task()
  //     resolve()
  //   },0)
  // });
  // 4 req,阻塞
  // return new Promise((resolve)=>{
  //   requestAnimationFrame(()=>{
  //     task()
  //     resolve()
  //   })
  // })
  // 4 requestIdleCallback辅助函数
  return new Promise((resolve) => {
    _runTask(task, resolve);
  });
}

function _runTask(task, callback) {
  // requestIdleCallback((idle) => {
  // 处理兼容性
  let start = Date.now();
  requestAnimationFrame(() => {
    // if (idle.timeRemaining() > 0) {
    if (Date.now() - start < 16.6) {
      task();
      callback();
    } else {
      _runTask(task, callback);
    }
  });
}
