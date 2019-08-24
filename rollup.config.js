import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
// import browsersync from 'rollup-plugin-browsersync';

export default [
  {
    input: 'src/main.js',
    output: {
      file: 'index.js',
      format: 'cjs'
    },
    plugins: [      
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      }),
      uglify(),      
    ]
  },
  {
    input: 'src/test.js',
    output: {
      file: 'test.js',
      format: 'cjs'
    },
    plugins: [
      // browsersync({
      //   server: {
      //     baseDir: './',
      //     directory: false,
      //     serveStaticOptions: {
      //       extensions: ['html'],
      //     },
      //   },
      //   port: 8080,
      //   open: false,
      //   files: [
      //     '*.js',
      //     '*.html',
      //   ]
      // }),
      babel({
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  }
]
