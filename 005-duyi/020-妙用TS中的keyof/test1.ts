interface Point {
  x:number,
  y:number,
  z:number
}

type keys = keyof Point

const k:keys = 'x'