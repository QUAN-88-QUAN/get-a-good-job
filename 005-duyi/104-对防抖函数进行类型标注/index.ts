function handler(a: number, b: number): number {
  return a + b;
}

// 返回的函数没有参数的类型了
// declare function debuunce(func:Function,wait:number):Function;

// 返回值又有类型了
// declare function debuunce<T>(func:T,wait:number):T;

declare function debuunce<A extends any[], R>(
  func: (...args: A) => R,
  wait: number
): (...args: A) => void;

const fn = debuunce(handler, 1000);

fn();
