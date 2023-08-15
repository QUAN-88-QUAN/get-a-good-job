export function captureFrame(vdoFile, time = 0) {
  return new Promise((resolve, reject) => {
    const vdo = document.createElement("video");
    // 定格在一个事件
    vdo.currentTime = time;
    // 由于浏览器不同，有的浏览器是不允许播放的。静音下就可以
    vdo.muted = true;
    // 播放
    vdo.autoplay = true;
    vdo.oncanplay = async () => {
      const frame = await drawVideo(vdo);
      resolve(frame);
    };
    vdo.src = URL.createObjectURL(vdoFile);
  });
}

function drawVideo(vdo) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = vdo.videoWidth;
    canvas.height = vdo.videoHeight;
    ctx.drawImage(vdo, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      resolve({
        blob,
        url: URL.createObjectURL(blob),
      });
    });
  });
}
