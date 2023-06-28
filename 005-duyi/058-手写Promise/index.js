// 不写在代码里，防止硬编码
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  #state = PENDING;
  #result = undefined;
  // 记录属性,为数组是因为可能重复调用then
  #handlers = [];
  constructor(executor) {
    const resolve = (data) => {
      this.#changeSate(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeSate(REJECTED, reason);
    };
    // 执行期间报错也就相当于执行reject
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
    // bind返回的也是一个新的函数
    // executor(this.resolve.bind(this),this.reject.bind(this))
  }
  // bind返回的也是一个新的函数
  // resolve(){}
  // reject(){}

  #changeSate(state, result) {
    // 改变了就不能改变
    if (this.#state !== "pending") return;
    this.#state = state;
    this.#result = result;
    this.#run();
  }

  // 1、两个参数什么时候调用
  // 2、什么时候返回的Promise是完成的，什么时候是拒绝的
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handlers.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handlers.shift();
      if (this.#state === FULFILLED) {
        if (typeof onFulfilled === "function") {
          onFulfilled(this.#result);
        }
      } else if (this.#state === REJECTED) {
        if (typeof onRejected === "function") {
          onRejected(this.#result);
        }
      }
    }
  }

  #isPromiseLike(value) {
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function";
    }
    return false;
  }

  #runMicroTask(func) {
    setTimeout(func, 0);
  }
}

const p1 = new Promise((resolve, reject) => {
  // 1、基本操作
  // resolve(1);
  // 2、处理错误
  // throw 123
  // 3、处理异步错误
  // 异步错误捕获不到
  // setTimeout(()=>{
  //   throw 123
  // })
  // 4、处理异步操作
  // setTimeout(() => {
  //   resolve(1);
  // });
});
// p1.then(
//   (res) => {
//     console.log("Promise 完成", res);
//   },
//   (error) => {
//     console.log("Promise 失败", error);
//   }
// );
// console.log(p1);
// const p2 = new MyPromise((resolve, reject) => {
//   // 1、基本操作
//   // resolve(1);
//   // 2、处理错误
//   // throw 123
//   // 3、处理异步错误
//   // 异步错误捕获不到
//   // setTimeout(()=>{
//   //   throw 123
//   // })
//   // 4、处理异步操作
//   // setTimeout(() => {
//   //   reject(1);
//   // }, 1000);
// });
// 5、处理链式调用
// p2.then(
//   (res) => {
//     console.log("Promise 完成1", res);
//   },
//   (error) => {
//     console.log("Promise 失败1", error);
//   }
// );
// p2.then(
//   (res) => {
//     console.log("Promise 完成2", res);
//   },
//   (error) => {
//     console.log("Promise 失败2", error);
//   }
// );
// p2.then(
//   (res) => {
//     // console.log("Promise 完成3", res);
//     123;
//     // null
//   },
//   (error) => {
//     console.log("Promise 失败3", error);
//   }
// );
// console.log(p2);
// 6、与promise互相操作
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
p2.then((data) => {
  console.log("ok1", data);
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve(data * 2);
    }, 1000);
  });
}).then((data) => {
  console.log("ok2", data);
});