const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

// 入口依赖分析
const Dep = entryFile => {
  const content = fs.readFileSync(entryFile, 'utf-8')
  // 用@babel/parser的parse方法，返回一棵抽象语法树
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const newPath = './' + path.join(path.dirname(entryFile), node.source.value)
      dependencies[node.source.value] = newPath
    }
  })
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  return {
    filename: entryFile,
    dependencies,
    code
  }
}

// 分析依赖
const moduleAnalys = entryFile => {
  const entryModule = Dep(entryFile)
  const graphArr = [entryModule]

  for (let i = 0; i < graphArr.length; i++) {
    const { dependencies } = graphArr[i]
    for (let j in dependencies) {
      graphArr.push(Dep(dependencies[j]))
    }
  }

  const graph = {}
  graphArr.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  return graph
}

// 生成代码
const generateCode = entry => {
  const graph = moduleAnalys(entry)
  const graphCode = JSON.stringify(graph, null, 2)
  const content = `
    (function(graph) {
      require('${entry}');
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
    })(${graphCode});
  `;
  fs.writeFileSync('./dist/main.js', content)
}

generateCode('./src/index.js')