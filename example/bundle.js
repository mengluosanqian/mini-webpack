// bundle.js存放的是打包后的内容，其实就是对应文件的所有内容，考虑到命名冲突的问题，外层包裹一个function

(function (modules) {
    function require(id) {
        // 为了防止同名问题，把filePath改成id，传入之后，先通过localRequire方法把filePath改成id，，再通过id找到对应的fn去执行
        const [fn, mapping] = modules[id]
        // filePath映射一个函数
        // const map = {
        //     "./foo.js":foojs,
        //     "./main.js":mainjs
        // }
        // const fn = map[filePath]
        // const fn = modules[id]
        function localRequire(filePath) {
            const id = mapping[filePath];
            return require(id)
        }
        const module = {
            exports: {}
        }
        fn(localRequire, module, module.exports)
        // fn(require, module, module.exports)
        return module.exports
    }
    // require('./main.js')
    require(1)
    // function mainjs(require,module,exports) {
    //     // main.js
    //     // import foo from './foo.js'
    //     // import 只能出现在顶层作用域
    //     const {foo} = require('./foo.js')
    //     foo()
    //     console.log('main.js');
    // }

    // function foojs(require,module,exports) {
    //     // foo.js
    //     // export也只能出现在顶层作用域
    //     // export function foo() {
    //     //     console.log('foo');
    //     // }
    //     function foo() {
    //         console.log('foo');
    //     }
    //     module.exports = {
    //         foo,
    //     }
    // }
})({
    // "./foo.js":function (require,module,exports) {
    //     // foo.js
    //     // export也只能出现在顶层作用域
    //     // export function foo() {
    //     //     console.log('foo');
    //     // }
    //     function foo() {
    //         console.log('foo');
    //     }
    //     module.exports = {
    //         foo,
    //     }
    // },
    // "./main.js":function (require,module,exports) {
    //     // main.js
    //     // import foo from './foo.js'
    //     // import 只能出现在顶层作用域
    //     const {foo} = require('./foo.js')
    //     foo()
    //     console.log('main.js');
    // }
    
    1: [
        function (require, module, exports) {
            const {
                foo
            } = require('./foo.js')
            foo()
            console.log('main.js');
        }, {
            './foo.js': 2
        }
    ],
    2: [function (require, module, exports) {
        function foo() {
            console.log('foo');
        }
        module.exports = {
            foo,
        }
    }]
})