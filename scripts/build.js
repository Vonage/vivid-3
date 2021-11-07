import { build } from 'esbuild';

build(
  {
    bundle: true,
    splitting: true,
    format: "esm",
    target: "es2018",
    watch: true,
    chunkNames: "chunks/[name].[hash]",
    entryPoints: [
      "./src/components/badge/badge.ts",
      "./src/components/icon/icon.ts",
    ],
    outbase: "./src",
    outdir: "./dist"
  }
);
