const {bundle}=require('@remotion/bundler');
const {selectComposition,renderStill}=require('@remotion/renderer');
const path=require('node:path');
const fs=require('node:fs');
(async()=>{
  fs.mkdirSync('out/stills',{recursive:true});
  const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
  const options={browserExecutable:'/usr/bin/chromium'};
  const composition=await selectComposition({serveUrl,id:'ClaudeEditReel',...options});
  const frames=process.argv.slice(2).length?process.argv.slice(2).map(Number):[90,225,375,525,720,900,1080,1245,1425,1575,1745];
  for(let i=0;i<frames.length;i+=2){
    await Promise.all(frames.slice(i,i+2).map(async frame=>{
      await renderStill({serveUrl,composition,frame,output:`out/stills/${String(frame).padStart(4,'0')}.png`,imageFormat:'png',...options});
      console.log(`Frame ${frame} checked`);
    }));
  }
})().catch(error=>{console.error(error);process.exit(1)});
