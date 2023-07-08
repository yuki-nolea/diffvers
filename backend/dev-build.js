const { build } = require('esbuild')
const path = require('path')

const options = {
  entryPoints: [path.resolve(__dirname, 'src/app.ts')],
  bundle: true,
  target: 'es2016',
  platform: 'node',
  outdir: path.resolve(__dirname, '../frontend'),
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
}


build(options).catch(err => {
  process.stderr.write(err.stderr)
  process.exit(1)
})