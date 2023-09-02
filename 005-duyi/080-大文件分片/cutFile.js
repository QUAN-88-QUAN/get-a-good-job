import { createChunk } from "./createChunk.js";

const CHUNK_SIZE = 1024 * 1024 * 5;
// const THREAD_COUNT = navigator.hardwareConcurrency || 4;
const THREAD_COUNT = 4;

// export async function cutFile(file) {
//   const result = [];
//   const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
//   // console.log(chunkCount);
//   for (let i = 0; i < chunkCount; i++) {
//     const chunk = await createChunk(file, i, CHUNK_SIZE);
//     result.push(chunk);
//   }
//   return result;
// }

// 使用线程来加快速度
export async function cutFile(file) {
  return new Promise((resolve, reject) => {
    const result = [];
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    let finishCount = 0;

    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker("./worker.js", { type: "module" });
      // 计算每个线程的起始位置和结束位置
      const startIndex = i * workerChunkCount;
      let endIndex = startIndex + workerChunkCount;
      if (endIndex > chunkCount) {
        endIndex = chunkCount;
      }
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startIndex,
        endIndex,
      });
      worker.onmessage = (e) => {
        for (let i = startIndex; i < endIndex; i++)  {
          result[i] = e.data[i - startIndex];
        }
        worker.terminate();
        finishCount++;
        if (finishCount === workerChunkCount) {
          resolve(result);
        }
      };
    }
  });
}
