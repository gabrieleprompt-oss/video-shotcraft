// Run from any directory: node /path/to/scripts/render-thumbnails.cjs
const fs = require('node:fs');
const path = require('node:path');
const {bundle} = require('@remotion/bundler');
const {openBrowser, renderStill, selectComposition} = require('@remotion/renderer');

const projectRoot = path.resolve(__dirname, '..');
const browserExecutable = process.env.CHROMIUM_EXECUTABLE || '/usr/bin/chromium';

async function renderThumbnails() {
  const outputDir = path.join(projectRoot, 'public', 'media');
  fs.mkdirSync(outputDir, {recursive: true});
  const serveUrl = await bundle({
    entryPoint: path.join(__dirname, 'thumbnail-entry.tsx'),
    rootDir: projectRoot,
    publicDir: path.join(projectRoot, 'public'),
  });
  const browser = await openBrowser('chrome', {browserExecutable});
  try {
    const composition = await selectComposition({
      serveUrl,
      id: 'CorridorThumbnails',
      puppeteerInstance: browser,
      browserExecutable,
    });
    for (const [index, frame] of [0, 100, 200].entries()) {
      const output = path.join(outputDir, `thumb-${index}.png`);
      await renderStill({
        serveUrl,
        composition,
        puppeteerInstance: browser,
        browserExecutable,
        frame,
        output,
        imageFormat: 'png',
        overwrite: true,
      });
      console.log(`Rendered Corridor frame ${frame}: ${output}`);
    }
  } finally {
    await browser.close({silent: true});
  }
}

renderThumbnails().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
