import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, Cursor, ease, Icon, mono, p, Panel, Pill} from '../Design';
import {PreviewClip, SceneShell} from '../UI';

export const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const split = interpolate(f, [0, 32, 37, 76, 124, 136], [0, 0, 10, 88, 88, 100], {...clamp, easing: ease});
  const divider = 16 + 878 * split / 100;
  const connection = p(f, 96, 13);
  const cursorX = f < 37 ? interpolate(f, [25, 37], [1050, 181], {...clamp, easing: ease}) : 77 + divider;

  return <SceneShell index={1} kicker="AVANT / APRÈS" title="Le même rush." second="Après Claude.">
    <div style={{position: 'absolute', left: 85, top: 628, width: 910, height: 650, perspective: 1700, translate: `0 ${Math.sin(f / 28) * 2}px`, scale: interpolate(f, [0, 129, 143], [.985, .985, 1], {...clamp, easing: ease})}}>
      <Panel title="rush-demo.mp4 — comparaison" width={910} height={650} style={{transform: `rotateX(${1.1 - p(f, 129, 14)}deg) rotateY(${-1.2 + p(f, 129, 14)}deg)`}}>
        <div style={{position: 'absolute', left: 16, right: 16, top: 16, height: 505, borderRadius: 9, overflow: 'hidden', border: '1px solid #ffffff27'}}>
          <PreviewClip frame={f + 40} style={{height: '100%'}}/>
          <div style={{position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - split}% 0 0)`}}><PreviewClip frame={f + 40} edited style={{height: '100%'}}/></div>
          <div style={{position: 'absolute', right: 21, bottom: 23, display: 'flex', alignItems: 'center', gap: 9, fontFamily: mono, fontSize: 19, color: '#fff', padding: '10px 14px', borderRadius: 6, background: '#0b0f18c9', border: '1px solid #ffffff25', opacity: p(f, 15, 7) * (1 - p(f, 126, 8)), translate: `0 ${(1 - p(f, 15, 7)) * 15}px`}}><span style={{width: 8, height: 8, borderRadius: 5, background: C.red, opacity: .55 + Math.sin(f / 6) * .45}}/>RAW FOOTAGE</div>
          <div style={{position: 'absolute', left: 878 * split / 100 - 1, top: 0, bottom: 0, width: 2, background: '#f7f2ff', boxShadow: '0 0 12px #b393fa77', opacity: p(f, 34, 3) * (1 - p(f, 128, 7))}}>
            <div style={{position: 'absolute', top: 216, left: -25, width: 52, height: 66, borderRadius: 13, border: '1px solid #ffffff99', background: '#eee9f7', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, boxShadow: '0 6px 18px #0005'}}><span style={{width: 3, height: 22, borderRadius: 2, background: '#62596e'}}/><span style={{width: 3, height: 22, borderRadius: 2, background: '#62596e'}}/></div>
          </div>
        </div>
        <div style={{position: 'absolute', left: 28, right: 28, top: 545, display: 'flex', alignItems: 'center', gap: 13, fontFamily: mono, fontSize: 17, color: C.muted}}><Icon kind="play" color={C.purple} size={24}/><span style={{color: C.purple}}>00:00:{String(Math.floor(f / 30)).padStart(2, '0')}</span><div style={{height: 2, flex: 1, background: '#ffffff17', margin: '0 10px'}}><div style={{width: `${24 + f / 2}%`, height: 2, background: C.purple}}/></div><span>30 FPS</span><span style={{color: '#e6dfef'}}>1080p</span></div>
      </Panel>
    </div>
    <svg width="1080" height="1920" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}><path d="M698 1264V1297Q698 1320 675 1320H563Q540 1320 540 1343" fill="none" stroke={C.purple} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - connection} opacity={connection * .75}/><circle cx={698 - p(f, 104, 11) * 158} cy={1320} r="5" fill="#e8d9ff" opacity={p(f, 104, 3) * (1 - p(f, 117, 5))}/></svg>
    <Pill style={{position: 'absolute', left: 291, top: 1342, width: 498, height: 87, boxSizing: 'border-box', justifyContent: 'center', gap: 18, borderRadius: 14, fontSize: 23, opacity: p(f, 96, 9), translate: `0 ${(1 - p(f, 96, 9)) * 25}px`, boxShadow: `0 18px 45px #0008, 0 0 ${p(f, 109, 4) * (1 - p(f, 118, 10)) * 32}px #b393fa33`}}><Icon kind="spark" color={C.purple} size={30}/>EDITED WITH CLAUDE</Pill>
    <Cursor x={cursorX} y={interpolate(f, [25, 36, 76, 110], [982, 949, 949, 1330], {...clamp, easing: ease})} click={f >= 36 && f < 43} opacity={p(f, 26, 5) * (1 - p(f, 85, 8))}/>
  </SceneShell>;
};
