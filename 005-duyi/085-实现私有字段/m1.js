const f = Symbol('f')

export class A{
  [f]=123

  m(){
    console.log(this[f])
  }
}