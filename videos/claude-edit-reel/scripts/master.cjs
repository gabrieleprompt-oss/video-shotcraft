const {spawnSync}=require('node:child_process');
const path=require('node:path');
const fs=require('node:fs');
const root=path.resolve(__dirname,'..');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'public/audio/voice-manifest.json'),'utf8'));
const inputs=['-i',path.join(root,'out/claude-edit-reel.mp4'),'-i',path.join(root,'public/audio/sfx.wav')];
for(const item of manifest)inputs.push('-i',path.join(root,'public',item.file));
const filters=['[1:a]aformat=sample_rates=48000:channel_layouts=stereo[sfx]'];
manifest.forEach((item,i)=>filters.push(`[${i+2}:a]aformat=sample_rates=48000:channel_layouts=stereo,adelay=${Math.round(item.start*1000)}|${Math.round(item.start*1000)}[voice${i}]`));
filters.push(`[sfx]${manifest.map((_,i)=>`[voice${i}]`).join('')}amix=inputs=${manifest.length+1}:duration=first:dropout_transition=0:normalize=0,loudnorm=I=-16:TP=-1:LRA=9[mix]`);
const result=spawnSync('ffmpeg',[
  '-hide_banner','-loglevel','error','-y',
  ...inputs,'-filter_complex',filters.join(';'),
  '-map','0:v:0','-map','[mix]',
  '-c:v','libx264','-preset','slow','-crf','18',
  '-maxrate','2400k','-bufsize','4800k','-threads','4','-pix_fmt','yuv420p',
  '-ar','48000','-c:a','aac','-b:a','192k',
  '-t','60','-movflags','+faststart',
  path.join(root,'out/claude-edit-reel-master.mp4'),
],{stdio:'inherit'});
if(result.error)throw result.error;
process.exitCode=result.status??1;
