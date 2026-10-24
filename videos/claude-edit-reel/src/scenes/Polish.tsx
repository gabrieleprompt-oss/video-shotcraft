import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, Curve, ease, Icon, mono, p, Panel, Pill, sans, Waveform} from '../Design';
import {PreviewClip, SceneShell} from '../UI';

/** 33–39s, 180 frames: the rough cut gains captions, zoom and motion layers. */
export const Polish: React.FC = () => {
  const f = useCurrentFrame();
  const assembly = p(f, 150, 19);
  const zoom = p(f, 60, 10);
  const audio = p(f, 120, 16);
  const bounce = f >= 36 ? Math.sin(Math.min(1, (f - 36) / 12) * Math.PI) * .05 : 0;

  return <SceneShell index={7} kicker="SOUS-TITRES / ZOOMS / MOTION" title="Le montage" second="prend vie.">
    <Panel title="HyperFrames — motion & captions" width={920} height={865} style={{position: 'absolute', left: 80, top: 600, transform: `perspective(2000px) rotateY(${interpolate(f, [0, 16], [-2, 0], {...clamp, easing: ease})}deg)`, scale: .98 + .02 * p(f, 0, 15)}}>
      <div style={{position: 'absolute', left: 21, right: 21, top: 20, height: 400, border: '1px solid #ffffff2a', borderRadius: 9, overflow: 'hidden', background: '#121b26'}}>
        <div style={{position: 'absolute', inset: 0, scale: 1 + .1 * zoom, transformOrigin: '54% 43%'}}><PreviewClip frame={990 + f} style={{height: 400}}/></div>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%,#070914bb)'}}/>
        <div style={{position: 'absolute', left: 22, top: 20, display: 'flex', gap: 10, alignItems: 'center', fontFamily: mono, fontSize: 16, color: '#eee8fa', padding: '9px 12px', border: '1px solid #ffffff33', borderRadius: 6, background: '#090c16b8'}}><span style={{width: 6, height: 6, background: C.purple, borderRadius: '50%'}}/>LIVE PREVIEW</div>
        <div style={{position: 'absolute', right: 20, top: 20, fontFamily: mono, fontSize: 20, color: '#fff', padding: '9px 13px', borderRadius: 6, background: '#080b15aa', border: '1px solid #b393fa66', opacity: zoom}}>{Math.round(100 + zoom * 10)}%</div>
        <div style={{position: 'absolute', left: 35, right: 35, bottom: 34, display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: 13, rowGap: 4, fontFamily: sans, fontSize: 53, fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, color: '#fff', textShadow: '0 3px 15px #000b'}}>
          {['Le', 'montage', 'prend', 'vie.'].map((word, i) => <span key={word} style={{opacity: p(f, [0, 6, 13, 21][i], 5), translate: `0 ${10 * (1 - p(f, [0, 6, 13, 21][i], 5))}px`, color: i === 1 && f >= 36 || i === 3 ? C.purple : '#fff', scale: i === 1 ? 1 + bounce : 1, transformOrigin: '50% 100%'}}>{word}</span>)}
        </div>
        <div style={{position: 'absolute', left: 10, top: 10, width: 29, height: 29, borderLeft: '2px solid #ffffff44', borderTop: '2px solid #ffffff44', opacity: zoom}}/>
        <div style={{position: 'absolute', right: 10, bottom: 10, width: 29, height: 29, borderRight: '2px solid #ffffff44', borderBottom: '2px solid #ffffff44', opacity: zoom}}/>
      </div>
      <div style={{position: 'absolute', left: 27, right: 27, top: 439, display: 'flex', alignItems: 'center', fontFamily: mono, fontSize: 17, color: C.muted}}><span style={{color: C.purple}}>00:00:{String(33 + Math.floor(f / 30)).padStart(2, '0')}</span><span style={{display: 'flex', gap: 11, margin: '0 auto', alignItems: 'center'}}><Icon kind="play" size={21} color={C.purple}/><span>9:16 / 30 FPS</span></span><span>1080p</span></div>

      <div style={{position:'absolute',left:65,top:488,width:790,height:205,opacity:p(f,63,10)*(1-p(f,84,10)),translate:`0 ${18*(1-p(f,63,12))}px`,pointerEvents:'none'}}><div style={{fontFamily:mono,fontSize:16,color:C.muted,letterSpacing:1,marginBottom:5}}>SCALE / EASE OUT</div><Curve width={760} height={180} frame={Math.max(0,(f-62)*3.2)}/></div>

      {/* Three floating feature cards become three layers of this same timeline. */}
      {[
        {title: 'Captions', detail: 'Mot par mot', icon: 'caption' as const, start: 87},
        {title: 'Zooms', detail: '110% · sujet suivi', icon: 'cursor' as const, start: 91},
        {title: 'Motion', detail: 'Apparitions nettes', icon: 'spark' as const, start: 95},
      ].map((card, i) => {
        const enter = p(f, card.start, 8);
        return <div key={card.title} style={{position: 'absolute', left: 22 + i * 293 * (1 - assembly), top: 485 + i * 51 * assembly + (1 - enter) * 22, width: 270 + assembly * 584, height: 126 - assembly * 84, borderRadius: 10 - assembly * 5, overflow: 'hidden', background: assembly > .1 ? '#b393fa13' : 'linear-gradient(140deg,#262a3b,#151b29)', border: '1px solid #b393fa44', boxShadow: assembly < .8 ? '0 18px 28px #0005' : undefined, opacity: enter, transform: `perspective(1600px) rotateY(${(1 - assembly) * (i - 1) * -2}deg)`}}>
          <div style={{position: 'absolute', left: 18, top: 17 - assembly * 8, scale: 1 - .24 * assembly, transformOrigin: '0 0'}}><Icon kind={card.icon} size={29} color={C.purple}/></div>
          <div style={{position: 'absolute', left: 18 + 38 * assembly, top: 57 - 48 * assembly, fontFamily: sans, fontSize: 24 - assembly * 5, fontWeight: 700, color: C.text}}>{card.title}</div>
          <div style={{position: 'absolute', left: 18, top: 91, fontFamily: mono, fontSize: 16, color: C.muted, opacity: 1 - assembly}}>{card.detail}</div>
          <div style={{position: 'absolute', left: 195, right: 13, top: 6, bottom: 6, display: 'flex', gap: 9, opacity: assembly}}>
            {i === 0 && ['Le montage', 'prend vie.', 'Un seul prompt.'].map((text, j) => <div key={text} style={{width: [156, 135, 188][j], borderRadius: 3, border: '1px solid #b393fa44', background: '#b393fa20', color: '#e3d9f8', fontFamily: sans, fontSize: 15, display: 'grid', placeItems: 'center'}}>{text}</div>)}
            {i === 1 && <svg width="618" height="29" viewBox="0 0 618 29"><path d="M0 24H90L120 6H210L235 24H360L392 8H510L540 24H618" fill="none" stroke={C.ice} strokeWidth="1.7"/>{[120, 210, 392, 510].map((x, j) => <rect key={x} x={x - 3} y={j > 1 ? 5 : 3} width="6" height="6" fill={C.ice} transform={`rotate(45 ${x} ${j > 1 ? 8 : 6})`}/>)}</svg>}
            {i === 2 && [170, 205, 146].map((width, j) => <div key={j} style={{width, border: '1px solid #8cb8d044', borderRadius: 3, background: '#8cb8d014', display: 'flex', gap: 7, alignItems: 'center', padding: '0 10px', fontFamily: mono, fontSize: 12, color: C.ice}}><Icon kind="spark" size={13} color={C.ice}/>{['REVEAL', 'ALIGN', 'CONNECT'][j]}</div>)}
          </div>
        </div>;
      })}

      <div style={{position: 'absolute', left: 22, right: 44, top: 640, height: 77, border: '1px solid #8cb8d033', background: '#8cb8d00b', borderRadius: 6, opacity: audio, overflow: 'hidden', clipPath: `inset(0 ${100 * (1 - audio)}% 0 0)`, translate: `0 ${12 * (1 - audio)}px`}}>
        <div style={{position: 'absolute', left: 17, top: 16, display: 'flex', alignItems: 'center', gap: 12, color: C.muted, fontFamily: sans, fontSize: 19}}><Icon kind="sound" size={25} color={C.ice}/>Audio</div>
        <div style={{position: 'absolute', left: 195, right: 10, top: 8}}><Waveform width={640} height={60} color={C.ice} progress={audio}/></div>
      </div>
      <div style={{position: 'absolute', left: 217 + interpolate(f, [150, 179], [0, 580], clamp), top: 480, height: 246, width: 2, background: C.purple, boxShadow: '0 0 10px #b393fa33', opacity: assembly}}><div style={{position: 'absolute', top: -2, left: -5, width: 12, height: 11, background: C.purple, clipPath: 'polygon(0 0,100% 0,50% 100%)'}}/></div>
      <div style={{position: 'absolute', left: 24, right: 24, bottom: 27, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: C.muted, fontFamily: mono, fontSize: 16, opacity: p(f, 151, 13)}}><span>4 couches synchronisées</span><span style={{display: 'flex', gap: 8, alignItems: 'center', color: C.purple}}><Icon kind="check" size={19} color={C.purple}/>READY TO PREVIEW</span></div>
    </Panel>
    <Pill style={{position: 'absolute', left: 370, top: 1315, opacity: p(f, 104, 7) * (1 - p(f, 120, 7)), fontSize: 18, padding: '9px 14px'}}><Icon kind="check" size={20} color={C.purple}/>AUTO-ALIGNED</Pill>
  </SceneShell>;
};
