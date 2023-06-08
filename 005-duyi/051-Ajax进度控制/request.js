function request(options = {}) {
  const { url, methods = "GET", data = null } = options;
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
      // console.log(xhr)
      if (xhr.readyState === xhr.DONE) {
        resolve(xhr.responseText);
      }
    });
    xhr.addEventListener("progress", (e) => {
      console.log(e);
      console.log(e.loaded);
      console.log(e.total);
    });
    // 上传
    xhr.addEventListener("upload", (e) => {
      console.log(e);
      console.log(e.loaded);
      console.log(e.total);
    });
    xhr.open(methods, url);
    xhr.send(data);
  });
}
