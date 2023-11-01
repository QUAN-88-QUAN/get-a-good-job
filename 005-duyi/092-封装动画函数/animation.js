function animation(duration, from, to, callback) {
  const speed = (to - from) / duration;
  const startTime = Date.now();
  let value = from;
  function _run() {
    // 让value发生变化
    const now = Date.now();
    const time = now - startTime;
    if (time > duration) {
      value = to;
      callback && callback(value);
      return;
    }
    value = speed * time + from;
    callback && callback(value);
    // 注册下一次变化
    requestAnimationFrame(_run);
  }
  _run();
}
