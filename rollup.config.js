
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import {terser} from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'tesla-style-solar-power-card.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: 'tesla-style-solar-power-card.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()]
    }
  ],
  plugins: [
    resolve(),
    typescript(),
  ],
}