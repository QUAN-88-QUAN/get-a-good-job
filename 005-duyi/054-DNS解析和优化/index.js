const fs = require("fs");
const path = require("path");
const { parse } = require("node-html-parser");
const { glob } = require("glob");
const urlRegex = require("url-regex");

// 获取外部链接的正确表达式
const urlPattern = /(https?:\/\/)[^/]*)/i;
const urls = new Set();
// 遍历dist目录下的所有HTML,js,css文件
async function searchDomain() {
  const files = await glob("dist/**/.{html,css,js}");
  for (const file of files) {
    const source = fs.readFileSync(file, "utf-8");
    const matches = source.match(urlRegex({ strict: true }));
    if (matches) {
      matches.forEach((url) => {
        const match = url.match(urlPattern);
        if (match && match[1]) {
          urls.add(match[1]);
        }
      });
    }
  }
}
async function insertLinks() {
  const files = await glob("dist/**/*.html");
  const links = [...urls]
    .map((url) => {
      `<link rel="dns-prefetch" href="${url}}"></link>`;
    })
    .join("\n");
  for (const file of files) {
    const html = fs.readFileSync("file", "utf-8");
    const root = parse(html);
    const head = root.querySelector("head");
    head.insertAdjacentHTML("aftervegin", links);
    fs.writeFileSync(file, root.toString());
  }
}

async function main() {
  await searchDomain();
  await insertLinks();
}

main();
