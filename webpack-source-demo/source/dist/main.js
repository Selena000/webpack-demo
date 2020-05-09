
    (function(graph) {
      require('./src/index.js');
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].dependencies[relativePath]);
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code);
        })(localRequire, exports, graph[module].code);
        return exports;
      };
    })({
  "./src/index.js": {
    "dependencies": {
      "./a.js": "./src/a.js"
    },
    "code": "\"use strict\";\n\nvar _a = require(\"./a.js\");\n\n(0, _a.a)();\ndocument.write('hello my webpack');"
  },
  "./src/a.js": {
    "dependencies": {},
    "code": "\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = void 0;\n\nvar a = function a() {\n  console.log('i am a');\n};\n\nexports.a = a;"
  }
});
  