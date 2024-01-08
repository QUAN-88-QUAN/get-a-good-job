type Method = 'GET' | 'POST';
// type Method = 'GET' | 'POST' | 'PUT';

function request(url: string, method: Method) {
  if (method === 'GET') {
    method
  } else if (method === 'POST') {
    method
  } else {
    const n:never = method
  }
}