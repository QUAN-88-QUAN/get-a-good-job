const add = new Proxy({
  _store:0
},{
  get(target,p,receiver){
    console.log(target,p)
    // 这里不是很懂,多看看
    // 这里的p应该代表的就是后面加上的10,但是为什么加上的10会传到这里呢,代理的不是add吗
    if(p===Symbol.toPrimitive){
      return ()=>{
        return target._store
      }
    }
    target._store += +p
    return receiver
  }
})
console.log(add[2][3][10] + 10)