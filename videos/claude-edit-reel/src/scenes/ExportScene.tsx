import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Corridor} from '../Corridor';
import {C, clamp, Cursor, ease, Icon, mono, p, Panel, Pill, sans} from '../Design';
import {Button, SceneShell} from '../UI';

/** Both sides of the comparison use the exact same Corridor source frame. */
const Comparison: React.FC<{slider: number}> = ({slider}) => <div style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#243542'}}>
  <Corridor frame={128} edited/>
  <div style={{position: 'absolute', left: 25, top: 126, fontSize: 52, fontWeight: 800, lineHeight: 1.02, rotate: '-7deg', color: '#fff', textShadow: '0 3px 14px #000'}}>Le montage<br/><span style={{color: C.purple}}>prend vie.</span></div>
  <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 0 0 ${slider}%)`}}><Corridor frame={128} edited/><div style={{position: 'absolute', inset: 0, background: 'linear-gradient(transparent 45%,#070b14a0)'}}/><div style={{position: 'absolute', left: 34, bottom: 38, fontSize: 43, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.4, color: '#fff'}}>Le montage<br/><span style={{color: C.purple}}>prend vie.</span></div></div>
  <div style={{position: 'absolute', left: 18, top: 18, fontFamily: mono, fontSize: 16, background: '#10151edb', padding: '9px 12px', borderRadius: 5, color: '#ddd'}}>AVANT</div>
  <div style={{position: 'absolute', right: 18, top: 18, fontFamily: mono, fontSize: 16, background: '#10151edb', padding: '9px 12px', borderRadius: 5, color: C.purple}}>APRÈS</div>
  <div style={{position: 'absolute', top: 0, bottom: 0, left: `${slider}%`, width: 2, background: '#e6dcff', boxShadow: '0 0 15px #0007'}}><div style={{position: 'absolute', left: -22, top: '48%', width: 46, height: 46, borderRadius: '50%', background: '#131622', border: '1px solid #dfd0ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24}}>↔</div></div>
</div>;

export const ExportScene: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const version = p(f, .3 * fps, .55 * fps);
  const slider = interpolate(f, [1 * fps, 1.7 * fps, 2.4 * fps], [88, 16, 58], {...clamp, easing: ease});
  const exporting = p(f, 3.05 * fps, .55 * fps);
  const file = p(f, 3.65 * fps, .24 * fps);
  const fill = p(f, 4.3 * fps, .5 * fps);
  const left = interpolate(fill, [0, 1], [354, 80], clamp);
  const top = interpolate(fill, [0, 1], [850, 610], clamp);
  const width = interpolate(fill, [0, 1], [372, 920], clamp);
  const height = interpolate(fill, [0, 1], [435, 850], clamp);
  return <SceneShell index={10} kicker="NOUVELLE VERSION" title="Version suivante." second="Sans recommencer.">
    <div style={{position: 'absolute', left: 120 - version * 1050, top: 610, opacity: 1 - version, rotate: `${-version * 5}deg`}}><Panel title="HyperFrames — version 01" width={840} height={820}><div style={{position: 'absolute', inset: '28px 28px 180px', overflow: 'hidden', borderRadius: 8}}><Corridor frame={128} edited/></div><Pill style={{position: 'absolute', left: 30, bottom: 60, fontSize: 20}}>VERSION 01</Pill></Panel></div>
    <div style={{position: 'absolute', left: 120 + (1 - version) * 1050, top: 610, opacity: 1 - file * .85, transform: `perspective(1800px) rotateY(${(1 - version) * 8}deg)`}}>
      <Panel width={840} height={820} title="HyperFrames — version 02" accent>
        <div style={{position: 'absolute', left: 28, right: 28, top: 28, height: 450, border: '1px solid #ffffff2b', borderRadius: 9, overflow: 'hidden'}}><Comparison slider={slider}/></div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 502, display: 'flex', alignItems: 'center', fontFamily: mono, fontSize: 18, color: C.muted}}><span style={{color: C.purple}}>VERSION 02</span><span style={{marginLeft: 'auto'}}>RUSH ORIGINAL · PLAN 03</span></div>
        <div style={{position: 'absolute', left: 30, right: 30, top: 553, height: 1, background: C.line}}/>
        <div style={{position: 'absolute', left: 30, top: 583, fontFamily: sans, fontSize: 26, fontWeight: 700}}>Animation mise à jour.</div>
        <div style={{position: 'absolute', left: 30, top: 628, fontFamily: mono, fontSize: 17, color: C.muted}}>1080 × 1920 / 30 FPS / H.264</div>
        <Button active style={{position: 'absolute', right: 28, top: 681, minWidth: 180, scale: f > 2.98 * fps && f < 3.14 * fps ? .94 : 1}}>{exporting > .01 ? <><svg width="28" height="28" viewBox="0 0 36 36"><circle cx="18" cy="18" r="13" fill="none" stroke="#33234155" strokeWidth="3"/><circle cx="18" cy="18" r="13" fill="none" stroke="#21162d" strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - exporting} rotate="-90" style={{transformOrigin: '50% 50%'}}/></svg>{exporting >= 1 ? 'TERMINÉ' : 'EXPORT…'}</> : <><Icon kind="arrow" size={25} color="#171120"/>EXPORT</>}</Button>
      </Panel>
    </div>
    <Cursor x={interpolate(f, [2.55 * fps, 2.95 * fps], [1020, 810], {...clamp, easing: ease})} y={interpolate(f, [2.55 * fps, 2.95 * fps], [1450, 1380], {...clamp, easing: ease})} click={f > 2.98 * fps && f < 3.16 * fps} opacity={p(f, 2.5 * fps, .16 * fps) * (1 - p(f, 3.22 * fps, .2 * fps))}/>
    <div style={{position: 'absolute', left, top, width, height, borderRadius: 24, background: 'linear-gradient(130deg,#2d2843,#151925 60%,#1d2535)', border: '1px solid #c1a4f777', boxShadow: '0 40px 100px #000a,inset 0 1px 0 #ffffff22', opacity: file, scale: interpolate(file, [0, 1], [.8, 1], clamp), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, overflow: 'hidden'}}>
      <div style={{width: 115 + fill * 105, height: 145 + fill * 115, border: '2px solid #b393fa66', borderRadius: 16, background: '#b393fa12', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12}}><Icon kind="play" size={40 + fill * 32} color={C.purple}/><span style={{fontFamily: mono, fontSize: 27 + fill * 22, color: C.purple}}>MP4</span></div>
      <div style={{fontFamily: sans, fontSize: 29 + fill * 20, fontWeight: 800, letterSpacing: -.8}}>reel-final.mp4</div>
      <div style={{fontFamily: mono, fontSize: 15 + fill * 7, color: C.muted}}>1080 × 1920 · 30 FPS</div>
      <Pill style={{fontSize: 18 + fill * 3, padding: '9px 16px'}}><Icon kind="check" size={24} color={C.purple}/>PRÊT À PUBLIER</Pill>
    </div>
  </SceneShell>;
};
