// 1 必须是6-12位
// 2 必须包含数字,小写字母,大写字母,特殊字符($@,_.之一)

// const str = 'sadasdw'//能匹配上
// const reg = new RegExp(/^[a-zA-Z\d$@,_.]{6,12}$/,'g')
// console.log(reg.exec(str))

// ?=前瞻,匹配的时候不会消耗字符串
const str = 'aSa33@,rr'
const str1 = 'sadasdw'
const reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@,_.])[a-zA-Z\d$@,_.]{6,12}$/,'g')
console.log(reg.exec(str))
console.log(reg.exec(str1))