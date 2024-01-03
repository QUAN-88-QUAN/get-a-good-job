interface Fans{
  call():void
}

interface IKun extends Fans{
  dance():void;
  sing():void;
  basketball():void
}

interface SuperIKun extends IKun{
  rap():void
}

// 成员安全，保证所有成员可用
// 给:超集或者子类型 SuperIKun
// 收:子集或者父类型 IKun
// 下述就是协变

const superIkun:SuperIKun={
  call:()=>{},
  dance:()=>{},
  sing:()=>{},
  rap:()=>{},
  basketball:()=>{}
}

// const ikun:IKun=superIkun
// 能使用，类型是安全的
// ikun.

const fans:Fans={
  call:()=>{},
}

// const ikun:IKun=fans
// 不能使用，类型不安全的

// 不是很懂

// 成员安全
// 给:超集或者子类型
// 收:子集或者父类型
// 下述就是逆变

// type Transform = (x:IKun)=>IKun
// type SuperIKunTransform = (x:SuperIKun)=>SuperIKun

// const superTransform:SuperIKunTransform=(x)=>{
//   return x
// }
// const transform:Transform = superTransform

// 参数上述不报错
// 给 IKun
// 收 Fans
type Transform = (x:IKun)=>IKun
type SuperIKunTransform = (x:Fans)=>SuperIKun

const superTransform:SuperIKunTransform=(x)=>{
  return x as any
}
const transform:Transform = superTransform
const ikun:IKun=transform()