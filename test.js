const {transformSync} = require('@babel/core')
const myPlugin = require('./testBabel.js')

const code = `
if (true) {
    // 在dev环境下会执行
    // 生产环境下会被移除
    const a = 1
    const b = 2
    console.log(a + b)
  }`

const babelConfig = {
    plugins: ['./testBabel.js']
}
const output = transformSync(code,babelConfig)
console.log(output);