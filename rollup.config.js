import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/index.lib.js',
      name: 'webCrawlUtil',
      format: 'iife',
      plugins: [terser()],
    },
    {
      file: 'lib/index.esm.js',
      name: 'useJquery',
      format: 'es',
    },
    {
      file: 'lib/index.js',
      format: 'cjs',
    },
  ],
  plugins: [typescript()],
};
