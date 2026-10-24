import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, Cursor, ease, Icon, mono, p, sans} from '../Design';
import {FileCard, SceneShell, Terminal} from '../UI';

export const Import: React.FC = () => {
  const f = useCurrentFrame();
  const drag = p(f, 45, 30);
  const lift = p(f, 21, 8);
  const dropped = p(f, 75, 7);
  const progress = interpolate(f, [96, 123], [0, 1], clamp);
  const ready = p(f, 123, 7);
  const fileX = 375 - drag * 210;
  const fileY = 625 + drag * 500 - lift * (1 - drag) * 16;
  const fileScale = 1 - drag * .5;

  return <SceneShell index={4} kicker="IMPORT DU RUSH" title="Un fichier." second="Une instruction.">
    <div style={{position: 'absolute', left: 80, top: 790, opacity: p(f, 9, 10), translate: `0 ${(1 - p(f, 9, 10)) * 45}px`}}><Terminal frame={Math.min(89, Math.max(0, f - 75))} file={f >= 79} style={{height: 665, borderColor: f >= 57 && f < 82 ? '#b393fa88' : '#ffffff25', boxShadow: `0 40px 85px #0008, 0 0 ${p(f, 57, 8) * (1 - p(f, 83, 10)) * 22}px #b393fa22`}}/></div>
    <div style={{position: 'absolute', left: 130, top: 1124, width: 820, height: 224, border: `2px dashed ${f >= 57 ? '#b393fa88' : '#818a9e38'}`, borderRadius: 14, boxSizing: 'border-box', background: f >= 57 ? '#b393fa0b' : '#ffffff02', opacity: p(f, 17, 8) * (1 - dropped), display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 15}}><Icon kind="file" size={35} color={f >= 57 ? C.purple : C.muted}/><span style={{fontFamily: sans, fontSize: 25, color: f >= 57 ? '#e3d6f8' : C.muted}}>Déposer le rush ici</span><span style={{fontFamily: mono, fontSize: 16, color: '#737f94'}}>MP4 · MOV · WEBM</span></div>
    <div style={{position: 'absolute', left: fileX, top: fileY, scale: fileScale * (.93 + p(f, 0, 7) * .07), transformOrigin: '0 0', opacity: p(f, 0, 6) * (1 - p(f, 77, 5)), rotate: `${-3.5 * lift * (1 - drag)}deg`, zIndex: 4}}><FileCard frame={f + 90} style={{boxShadow: `0 ${28 + lift * 18}px ${55 + lift * 35}px #0009`, borderColor: f >= 21 ? '#c7afff88' : '#c4bdd744'}}/></div>
    <div style={{position: 'absolute', left: 145, right: 145, top: 1316, opacity: p(f, 92, 6)}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 35, marginBottom: 17, color: ready ? C.purple : C.muted, fontFamily: mono, fontSize: 20}}><div style={{display: 'flex', alignItems: 'center', gap: 11}}>{f >= 123 ? <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="13" r="11" fill="#b393fa18" stroke="#b393fa55"/><path d="M7 13L11 17L19 9" stroke={C.purple} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - ready}/></svg> : <Icon kind="file" size={23} color={C.purple}/>}<span>{f >= 123 ? 'FILE READY' : 'IMPORTING FOOTAGE'}</span></div><span style={{color: f >= 123 ? C.purple : '#d7d8e3'}}>{Math.round(progress * 100)}%</span></div>
      <div style={{position: 'relative', height: 6, overflow: 'hidden', borderRadius: 7, background: '#ffffff11'}}><div style={{width: `${progress * 100}%`, height: 6, background: C.purple, boxShadow: '0 0 12px #b393fa66'}}/>{[0, 1, 2].map(i => <div key={i} style={{position: 'absolute', width: 18, height: 2, top: 2, left: ((f * 8 + i * 190) % 790), background: '#eadfff', opacity: f > 96 && f < 123 ? .7 : 0}}/>)}</div>
      <div style={{fontFamily: mono, fontSize: 16, color: '#727d92', marginTop: 16, opacity: p(f, 97, 5)}}>./assets/rush-demo.mp4</div>
    </div>
    <Cursor x={f < 45 ? interpolate(f, [5, 21, 45], [1030, 590, 590], {...clamp, easing: ease}) : f <= 75 ? fileX + 215 * fileScale : interpolate(f, [75, 96], [272, 858], {...clamp, easing: ease})} y={f < 45 ? interpolate(f, [5, 21, 45], [1050, 754, 754], {...clamp, easing: ease}) : f <= 75 ? fileY + 145 * fileScale : interpolate(f, [75, 96], [1197, 1435], {...clamp, easing: ease})} click={(f >= 21 && f < 28) || (f >= 74 && f < 79)} opacity={p(f, 5, 5) * (1 - p(f, 90, 8))}/>
  </SceneShell>;
};
