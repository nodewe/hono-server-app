import { build } from 'esbuild';
import fs from 'fs/promises';
import path from 'path';

await build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/server.cjs',
    platform: 'node',
    format: 'cjs',
    target: 'node18',
    external: ['config.json5'],
})

// 1. 复制 config.mjs 到 dist 目录
const srcConfigPath = path.resolve('config.json5');
const distConfigPath = path.resolve('dist/config.json5');
await fs.copyFile(srcConfigPath, distConfigPath);