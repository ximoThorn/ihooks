
export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  external: ['react'],
  watch: {
    exclude: 'node_modules/**'
  }
}
