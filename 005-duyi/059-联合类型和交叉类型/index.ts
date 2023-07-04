// 交的和并的是值

type U =
  {
    a: number;
    b: number;
  } |
  {
    a: number;
    c: number;
  }

const u: U = {
  a: 1,
  b: 2,
  c: 3
}

// 为什么报错
u.b
u.a

type I =
  {
    a: number;
    b: number;
  } &
  {
    a: number;
    c: number;
  }

// 为什么报错
const i: I = {
  a: 1,
}
const i2: I = {
  a: 1,
  b: 2,
  c: 3
}