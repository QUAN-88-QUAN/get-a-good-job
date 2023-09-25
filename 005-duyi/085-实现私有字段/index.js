// class A{
//   __f=123

//   m(){
//     console.log(this.__f)
//   }
// }
// const a= new A()
// a.m()

// 方法一
// 写在一起不行，不过可以放到一个模块里
// import { A } from "./m1.js";
// const a = new A();
// console.log(a.m())
// // 缺点
// const symbols = Object.getOwnPropertySymbols(a)
// const f = symbols[0]
// console.log(a[f])

// 方法二，TS，但是ts只存在于编译环境，编译完就失效了
// class Test {
//   private _name = 'asd'
// }
// const t = new Test()

// 方法三，兼容性不太好
// class A{
//   #f=123

//   m(){
//     console.log(this.#f)
//   }
// }
// const a= new A()
// a.m()
// console.log(a.#f)

// 方法四
import { A } from "./m2.js";
const a = new A();
console.log(a.m())