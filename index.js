import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import parser from '@babel/parser';
import traverse from '@babel/traverse'
import pkg from 'babel-core'

let id = 0
const { transformFromAst } = pkg
function createAsset(filePath) {
    // 1. 获取文件的内容
    const source = fs.readFileSync(filePath,{
        encoding:'utf-8'
    })
    // console.log(source);
    // 2. 获取依赖关系
    // 通过babel/parser把文件内容转化成AST
    const ast = parser.parse(source, {
        sourceType: 'module'
    })
    // console.log(ast);
    const deps = [] // 用于暂存依赖关系
    // 通过babel/parser把文件
    traverse.default(ast,{
        ImportDeclaration({node}) {
            // console.log(node);
            // 要使用的是里面的source里面的value
            // console.log(node.source.value);
            deps.push(node.source.value) // 存储依赖关系，比如有foo.js，说明source文件依赖于foo.js
        }
    })
    const { code }= transformFromAst(ast,null,{
        presets: ['env'],
    })
    // console.log(code);
    return {
        filePath,
        code,
        deps,
        mapping: {},
        id: id++
    }
}
// const asset = createAsset()
// console.log(asset);
// asset的值
// {
//   source: "import foo from './foo.js'\r\nfoo()\r\nconsole.log('main.js');",
//   deps: [ './foo.js' ]
// }
// 根据依赖关系生成图结构
function createGraph() {
    const mainAsset = createAsset('./example/main.js') // 入口
    const queue = [mainAsset]
    for(const asset of queue) {
        asset.deps.forEach(relativePath => {
            const child = createAsset(path.resolve('./example',relativePath))
            asset.mapping[relativePath] = child.id
            queue.push(child)
             // path.resolve("./example",relativePath)  处理路径
            // console.log(child);
            // console.log(relativePath);
        })
    }
    return queue
}
const graph = createGraph()
// console.log(graph);

// 利用ejs去生成模板文件
function build(graph) {
    const template = fs.readFileSync('./bundle.ejs',{
        encoding: 'utf-8'
    })
    
    const data = graph.map(asset => {
        return {
            id: asset.id,
            code: asset.code,
            mapping: asset.mapping
        }
    })
    const code = ejs.render(template,{data})
    console.log(data);
    fs.writeFileSync('./dist/bundle.js',code)
    // console.log(code);
}
build(graph)