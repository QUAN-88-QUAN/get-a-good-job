import foo from './foo.js'

import('./dynameic.js').then((m)=>{
  console.log('main',m.default)
})

import bar from './bar.js'

console.log('main',foo,bar)