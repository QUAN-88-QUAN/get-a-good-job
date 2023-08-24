const card = document.querySelector('.card');

const BAR = 79

// 得到视口坐标
function getClientPoint(screenX, screenY){
  let clientX = screenX - window.screenX;
  console.log(window.screenX, window.screenY)
  let clientY = screenY - window.screenY -BAR;
  return [clientX, clientY]
}

// 通过视口坐标得到屏幕坐标
function getScreenPoint(clientX, clientY){
  let screenX = clientX + window.screenX;
  let screenY = clientY + window.screenY + BAR;
  return [screenX, screenY]
}

card.onmousedown = (e)=>{
  let x = e.pageX - card.offsetLeft;
  let y = e.pageY - card.offsetTop;
  window.onmousemove = (e)=>{
    const cx = e.pageX - x;
    const cy = e.pageY - y;
    card.style.left = cx+'px'
    card.style.top = cy+'px'
    // 通知其他窗口
    channel.postMessage(getScreenPoint(cx, cy))
  }
  window.onmouseup = ()=>{
    window.onmousemove = null;
    window.onmouseup = null;
  }
}

function init(){
  console.log(location.search.includes('hidden'))
  if(location.search.includes('hidden')){
    card.style.left = '-10000px';
  }
}

init()

const channel = new BroadcastChannel('card');

channel.onmessage = (e)=>{
  console.log(e.data)
  const [cx, cy] = getClientPoint(...e.data)
  console.log(cx, cy)
  card.style.left = cx+'px'
  card.style.top = cy+'px'
}