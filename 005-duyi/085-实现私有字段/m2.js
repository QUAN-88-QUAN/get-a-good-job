const privateMap = new WeakMap()

export class A {
  constructor(){
    privateMap.set(this, {
      a:1
    })
  }
  m(){
    console.log(privateMap.get(this).a)
  }
}