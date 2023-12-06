interface Article {
  title: string;
  content: string;
  author: string;
  date: Date;
  readCount: number;
}

// 1、&交叉类型，059有说
// {
//   title: string;
//   content: string;
// }
// &
// {
//   author?: string;
//   date?: Date;
//   readCount?: number;
// }
// 等于
// {
//   title: string;
//   content: string;
//   author?: string;
//   date?: Date;
//   readCount?: number;
// }
// 2、Omit 去掉某些字段
// 3、Pick 仅保留某些字段
// 4、Partial 全部变成可选
type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type createArticleOptions = Optional<Article,'author'|'date'|'readCount'>;

// 创建文章的时候文章类型有些参数时可选的，但是不能加?，
// 因为，文章类型是来约束文章的，这里是创建文章，但是创建文章的类型又是从文章类型来的
// 这时就需要一个新的类型来表示
function createArticle(options: createArticleOptions) {
  // options.author
}