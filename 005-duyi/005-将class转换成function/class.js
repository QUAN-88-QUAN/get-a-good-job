class Example{
  constructor(name){
    this.name = name;
  }
  func(){
    console.log(this.name);
  }
}
// new Example('quan').func()
// 1 必须只能通过new调用
// Example()
// 2 原型上的属性是不能被枚举的
// const quan = new Example('quan')
// for (const key in quan) {
//   console.log(key)
// }
// 3 方法不能使用new
const quan = new Example('quan')
new quan.func()