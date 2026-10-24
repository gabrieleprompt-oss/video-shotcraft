import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, ease, Icon, mono, p, Panel, Pill, sans, Waveform} from '../Design';
import {PreviewClip, SceneShell} from '../UI';

/** 27–33s, 180 frames: one waveform becomes the actual rough-cut timeline. */
export const Process: React.FC = () => {
  const f = useCurrentFrame();
  const scan = interpolate(f, [24, 78], [0, 1], clamp);
  const snap = p(f, 81, 17);
  const morph = p(f, 111, 21);
  const complete = p(f, 144, 10);
  const follow = p(f, 165, 15);
  const percent = Math.round(interpolate(f, [0, 24, 75, 111, 144], [0, 9, 54, 80, 100], clamp));

  return <SceneShell index={6} kicker="ANALYSE / SÉLECTION / MONTAGE" title="Claude choisit." second="Et assemble.">
    <Panel title="Claude Code — processing" width={920} height={850} accent style={{position: 'absolute', left: 80, top: 610, scale: 1 + follow * .065, translate: `${-14 * follow}px ${-15 * follow}px`, transform: `perspective(1800px) rotateY(${interpolate(f, [0, 22], [3, 0], {...clamp, easing: ease})}deg)`, transformOrigin: '70% 63%'}}>
      <div style={{position: 'absolute', left: 32, top: 29, right: 32, display: 'flex', alignItems: 'center', gap: 15}}>
        <div style={{width: 43, height: 43, display: 'grid', placeItems: 'center', borderRadius: 12, background: '#b393fa18', border: '1px solid #b393fa33'}}><Icon kind={f >= 144 ? 'check' : 'spark'} size={27} color={C.purple}/></div>
        <div><div style={{fontFamily: mono, fontSize: 23, color: C.text}}>{f >= 144 ? 'ROUGH CUT COMPLETE' : 'ANALYZING FOOTAGE'}</div><div style={{fontFamily: mono, fontSize: 16, color: C.muted, marginTop: 7}}>{f < 54 ? 'Lecture du rush · détection des pauses' : f < 111 ? 'Sélection des passages utiles' : 'Construction de la timeline'}</div></div>
        <div style={{fontFamily: mono, fontSize: 30, color: C.purple, marginLeft: 'auto'}}>{percent}<span style={{fontSize: 17, color: C.muted}}> %</span></div>
      </div>
      <div style={{position: 'absolute', left: 34, right: 34, top: 111, height: 3, background: '#ffffff0c'}}><div style={{height: 3, width: `${percent}%`, background: C.purple, boxShadow: '0 0 12px #b393fa33'}}/></div>

      <div style={{position: 'absolute', left: 43, right: 43, top: 145, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 16, color: C.muted, opacity: 1 - morph}}><span>SOURCE / rush-demo.mp4</span><span>00:12.0</span></div>

      {/* This waveform remains mounted as it slides into the audio track. */}
      <div style={{position: 'absolute', left: 45 + 95 * morph, top: 194 + 406 * morph, width: 830 - 109 * morph, height: 125 - 55 * morph, borderRadius: 7, background: `rgba(49, 63, 87, ${.09 + .16 * morph})`, overflow: 'hidden', zIndex: 3}}>
        <Waveform width={830 - 109 * morph} height={125 - 55 * morph} color={C.ice} progress={Math.max(.05, scan)}/>
        {f < 112 && <div style={{position: 'absolute', left: `${scan * 100}%`, top: 0, bottom: 0, width: 2, background: C.purple, boxShadow: '0 0 13px #b393fa88', opacity: p(f, 24, 5)}}/>}
        {[.16, .34, .54, .76].map((x, i) => <div key={x} style={{position: 'absolute', left: `${x * 100}%`, top: 4, width: 6, height: 11, borderRadius: 2, background: C.purple, opacity: p(f, 24 + i * 6, 5) * (1 - morph)}}/>)}
      </div>

      <div style={{position: 'absolute', left: 43, top: 344, fontFamily: mono, fontSize: 16, color: C.muted, opacity: 1 - morph}}>{f < 81 ? 'PASSAGES DÉTECTÉS' : 'CLIPS RETENUS / 3'}</div>

      {/* The timeline frame materializes around the same selected clips. */}
      <div style={{position: 'absolute', left: 28, right: 28, top: 355, height: 365, border: `1px solid ${C.line}`, borderRadius: 10, background: '#090e17', opacity: morph}}>
        <div style={{height: 42, borderBottom: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', padding: '0 18px', fontFamily: mono, fontSize: 17, color: C.muted, gap: 20}}><Icon kind="cut" size={20} color={C.purple}/><span>Timeline / rough cut</span><span style={{marginLeft: 'auto', fontSize: 14}}>30 FPS</span></div>
        <div style={{position: 'absolute', left: 112, right: 23, top: 59, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 13, color: '#69748a'}}>{['00:00', '00:02', '00:04', '00:06', '00:08'].map(t => <span key={t}>{t}</span>)}</div>
        <div style={{position: 'absolute', left: 18, top: 101, fontFamily: mono, fontSize: 14, color: C.muted}}>Video 1</div>
        <div style={{position: 'absolute', left: 18, top: 193, fontFamily: mono, fontSize: 14, color: C.muted}}>Captions</div>
        <div style={{position: 'absolute', left: 112, right: 23, top: 184, height: 41, borderRadius: 5, border: '1px dashed #ffffff13', display: 'flex', alignItems: 'center', paddingLeft: 15, fontFamily: mono, fontSize: 14, color: '#586176'}}>À ajouter au prochain prompt</div>
        <div style={{position: 'absolute', left: 18, top: 267, fontFamily: mono, fontSize: 14, color: C.muted}}>Audio 1</div>
        <div style={{position: 'absolute', left: 112 + interpolate(f, [132, 179], [0, 650], clamp), top: 49, bottom: 14, width: 2, background: C.purple, zIndex: 6}}><div style={{position: 'absolute', top: 0, left: -5, width: 12, height: 10, background: C.purple, clipPath: 'polygon(0 0,100% 0,50% 100%)'}}/></div>
      </div>

      {[0, 1, 2, 3, 4].map(i => {
        const rejected = i === 1 || i === 3;
        const disappear = rejected ? p(f, 54 + i * 2, 11) : 0;
        const selectedIndex = i / 2;
        const sourceX = 45 + i * 166;
        const selectedX = 140 + selectedIndex * 240;
        return <div key={i} style={{position: 'absolute', left: sourceX + (!rejected ? (selectedX - sourceX) * snap : 0), top: 387 + 48 * morph - 22 * disappear, width: 145 + (!rejected ? 89 * snap : 0), height: 105 - 25 * morph, border: `1px solid ${rejected && f > 54 ? C.red + '66' : !rejected && f > 81 ? C.purple + '88' : '#ffffff33'}`, borderRadius: 7, overflow: 'hidden', opacity: p(f, 8 + i * 6, 8) * (1 - disappear), scale: 1 - .2 * disappear, boxShadow: '0 12px 20px #0005', zIndex: 4}}>
          <PreviewClip frame={f + 810 + i * 27} style={{height: '100%'}}/>
          <span style={{position: 'absolute', left: 8, bottom: 6, fontFamily: mono, fontSize: 12, color: '#fff', textShadow: '0 2px 3px #000'}}>TAKE {String(i + 1).padStart(2, '0')}</span>
          {!rejected && <div style={{position: 'absolute', right: 7, top: 7, opacity: snap}}><Icon kind="check" size={17} color={C.purple}/></div>}
        </div>;
      })}

      <div style={{position: 'absolute', left: 45, right: 45, top: 550, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: p(f, 88, 8) * (1 - morph), fontFamily: sans, fontSize: 27, color: C.text}}><Icon kind="check" color={C.purple} size={28}/><span>Les bons plans. Sans les blancs.</span></div>
      <Pill style={{position: 'absolute', left: 270, top: 150, opacity: complete, scale: .94 + complete * .06, fontSize: 22}}><Icon kind="check" size={24} color={C.purple}/>ROUGH CUT COMPLETE</Pill>
      <div style={{position: 'absolute', left: 45, right: 45, bottom: 28, display: 'flex', justifyContent: 'space-between', fontFamily: mono, fontSize: 16, color: C.muted, opacity: p(f, 15, 8)}}><span>5 prises analysées</span><span style={{color: C.purple, opacity: p(f, 85, 8)}}>3 passages sélectionnés</span><span style={{opacity: complete}}>00:08 · assemblé</span></div>
    </Panel>
  </SceneShell>;
};
