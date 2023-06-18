import typescript from "@rollup/plugin-typescript";
import { readdir } from 'fs/promises'
import { join } from 'path'

const utils = (await readdir('src/utils')).map(path => join('src/utils', path))

export default {
  input: ['./src/mixin.ts', ...utils],
  output: {
    dir: 'exports',
    format: 'es'
  },
  plugins: [
    typescript()
  ]
}