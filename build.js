// import { build } from 'esbuild';
const { build } = require('esbuild')

build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/server.js',
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    external: ['config.js'],
})