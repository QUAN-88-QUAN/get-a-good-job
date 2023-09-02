// 外链版本
import SparkMD5 from 'https://unpkg.com/crypto.web.js@1.0.0/dist/md5.js'
// 官方库不支持esm
// https://github.com/satazor/js-spark-md5
export function createChunk(file,index,chunkSize){
  return new  Promise((resolve,reject)=>{
    const start = index * chunkSize;
    const end = start+chunkSize;
    const fileReader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();
    fileReader.onload = (e)=>{
      spark.append(e.target.result);
      resolve({
        start,
        end,
        index,
        sliceFile,
        hash:spark.end(),
      })
    }
    // 这是切好的数据，老师视频里没有将这个文件，也就是sliceFile返回
    const sliceFile = file.slice(start,end);
    fileReader.readAsArrayBuffer(sliceFile);
  })
}