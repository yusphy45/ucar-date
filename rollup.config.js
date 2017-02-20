import buble from 'rollup-plugin-buble';

export default {
  entry: 'src/index.js',
  dest: 'dist/dist.js',
  format: 'cjs',
  plugins: [ buble() ]
};