const {spawn} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const frames = [50, 120, 166, 241, 292, 410, 449];
fs.mkdirSync('out/stills', {recursive: true});
const cli = path.resolve('node_modules/.bin/remotion');
async function worker() {
  while (frames.length) {
    const frame = frames.shift();
    await new Promise((resolve, reject) => {
      const child = spawn(cli, ['still', 'src/index.ts', 'ReverseEngineering', `out/stills/frame-${frame}.png`, `--frame=${frame}`, '--browser-executable=/usr/bin/chromium', '--log=error'], {stdio: 'inherit'});
      child.on('error', reject);
      child.on('exit', code => code === 0 ? resolve() : reject(new Error(`Frame ${frame}: exit ${code}`)));
    });
    console.log(`Inspected frame ${frame}`);
  }
}
Promise.all([worker(), worker()]).catch(error => {console.error(error); process.exitCode = 1;});
