(function (modules) {  
    function require(id) {
        const [fn, mapping] = modules[id]
        function localRequire(filePath) {
            const id = mapping[filePath];
            return require(id)
        }
        const module = {
            exports: {}
        }
        fn(localRequire, module, module.exports)
        return module.exports
    }

    require(0)
})({
    
        0:[function (require,module,exports) {
            "use strict";

var _foo = require("./foo.js");

var _user = require("./user.json");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_user2.default);
(0, _foo.foo)();
console.log('main.js');
        },{"./foo.js":1,"./user.json":2}],
    
        1:[function (require,module,exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = require("./bar.js");

var _bar2 = _interopRequireDefault(_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function foo() {
  console.log('foo');
  (0, _bar2.default)();
}
        },{"./bar.js":3}],
    
        2:[function (require,module,exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "{\"name\": \"lw\",\"age\": 25}";
        },{}],
    
        3:[function (require,module,exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = bar;

function bar() {
  console.log('bar');
}
        },{}],
    

});
