type test1 = 'a' & string

type test2 = 'a' & 'b'

type test3 = 'a' | 'b'

type test4 = 'a' | 'b' | 1 & string
type test5 = ('a' & string) | ('b' & string) | (1 & string)

// 争对属性名的约束
// 去除符号字段
// string & keyof T