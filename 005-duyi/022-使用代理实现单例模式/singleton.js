export function singleton(className){
  let ins
  // 4 
  // return class{
  //   constructor(...args){
  //     if(!ins){
  //       ins = new className(...args)
  //     }
  //     return ins
  //   }
  // }

  // 5
  return new Proxy(className,{
    construct(target,args){
      if(!ins){
        ins = new target(...args)
      }
      return ins
    }
  })
}