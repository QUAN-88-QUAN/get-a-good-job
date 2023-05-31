function createId(name){
  const key = `channel-${name}`
  let id = +localStorage.getItem(key)
  if(!id){
    id=0
  }
  id++
  localStorage.setItem(key,id.toString())
  return id
}

function sendMsg(msg,channel){
  channel.postMessage({
    id:channel.id,
    msg
  })
}

function createChannel(name){
  const channel = new BroadcastChannel(name)
  channel.id = createId(name)
  channel.listeners = new Set()
  sendMsg('发送消息',channel)
  window.addEventListener('unload',()=>{
    sendMsg('窗口关闭',channel)
  })
  channel.addEventListener('message',e=>{
    if(e.data.msg==='发送消息'){
      sendMsg('收到消息',channel)
      console.log('收到消息')
      channel.listeners.add(e.data.id)
    }else if(e.data.msg==='收到消息'){
      console.log('收到消息')
      channel.listeners.add(e.data.id)
    }else if(e.data.msg==='窗口关闭'){
      console.log('窗口关闭')
      channel.listeners.delete(e.data.id)
    }
  })
  return channel
}