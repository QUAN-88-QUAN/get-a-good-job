// 1 两个实例不相等
// export class Video {
//   constructor() {
//     console.log("video created");
//   }
// }

// 2 创造实例提前了
// class Video1 {
//   constructor() {
//     console.log("video created");
//   }
// }
// const Video = new Video1()
// export {Video}

// 3 因为不能将构造器私有化，所以只能用类去调用静态方法
// class Video {
//   // private constructor() {
//     constructor() {
//     console.log("video created");
//   }
//   static _ins = null
//   static getIntance(){
//     if(!this._ins){
//       this._ins = new Video()
//     }
//     return this._ins
//   }
// }

// 4
// import { singleton } from "./singleton.js";
// class Video {
//   constructor() {
//     console.log("video created");
//   }
// }
// const newVideo = singleton(Video)

// 5
import { singleton } from "./singleton.js";
class Video {
  constructor() {
    console.log("video created");
  }
}
const newVideo = singleton(Video);

export { newVideo as Video };
