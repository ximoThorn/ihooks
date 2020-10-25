import resolve from '@rollup/plugin-node-resolve'
// 对浏览器不支持的新js语法进行转义
import babel from '@rollup/plugin-babel'
// 用于将CommonJS模块转换为ES6
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  external: ['react'],
  watch: {
    exclude: 'node_modules/**'
  },
  plugins: [
    resolve(),
    babel({ babelHelpers: 'bundled' }),
    commonjs()
  ]
}
