function request(options = {}) {
  const { url, methods = "GET", data = null } = options;
  return new Promise(async (resolve) => {
    const resp = await fetch(url, { methods, body: data });
    console.log(resp)
    // console.log(resp.headers.get('content-length'))
    // const body = await resp.text();
    const reader = resp.body.getReader()
    let loaded = ''
    const decoder = new TextDecoder()
    let body = null
    while(1){
      const {done,value} = await reader.read()
      console.log(done,value)
      if(done){
        break
      }
      loaded+=value.length
      console.log(loaded,resp.headers.get('content-length'))
      body += decoder.decode(value)
    }
    resolve(body);
  });
}
