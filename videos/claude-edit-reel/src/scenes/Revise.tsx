import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, clamp, Cursor, ease, Icon, mono, p, Panel, Pill, sans} from '../Design';
import {Button, PreviewClip, SceneShell, Timeline} from '../UI';

export const Revise: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const prompt = p(f, 1.25 * fps, .28 * fps);
  const send = p(f, 2.3 * fps, .48 * fps);
  const rebuild = p(f, 3.2 * fps, .45 * fps);
  const fixed = p(f, 3.65 * fps, .3 * fps);
  const packetX = interpolate(send, [0, 1], [802, 520], clamp);
  const packetY = interpolate(send, [0, .5, 1], [1320, 1130, 954], clamp);
  return <SceneShell index={9} kicker="MODIFICATION PAR PROMPT" title="Une retouche." second="Un prompt.">
    <div style={{position: 'absolute', left: 80, top: 610, translate: `0 ${Math.sin(f / 45) * 2}px`, transform: `perspective(1800px) rotateY(${interpolate(f, [0, fps * .7], [-3, 0], {...clamp, easing: ease})}deg)`}}>
      <Panel width={920} height={650} title="HyperFrames — motion / shot_03" accent>
        <div style={{position: 'absolute', left: 30, top: 24, width: 268, height: 164, border: `1px solid ${C.purple}88`, borderRadius: 8, overflow: 'hidden', rotate: `${(1 - fixed) * -3}deg`}}><PreviewClip frame={fixed > .2 ? f + 70 : 72} edited style={{height: '100%'}}/></div>
        <div style={{position: 'absolute', left: 335, top: 42, fontFamily: mono, fontSize: 19, color: C.muted}}>SELECTED ANIMATION</div>
        <div style={{position: 'absolute', left: 335, top: 82, fontFamily: sans, fontSize: 34, fontWeight: 700, color: fixed > .5 ? C.text : C.purple}}>{fixed > .5 ? 'Alignement précis' : 'Un détail à revoir'}</div>
        <div style={{position: 'absolute', left: 335, top: 137, fontFamily: mono, fontSize: 17, color: C.muted}}>{fixed > .5 ? 'motion.ease / refined' : 'motion.ease / shot_03'}</div>
        <div style={{position: 'absolute', left: 30, top: 215, opacity: 1 - rebuild}}><Timeline frame={20} mode="bad"/></div>
        <div style={{position: 'absolute', left: 30, top: 215, opacity: fixed, translate: `0 ${(1 - fixed) * 30}px`}}><Timeline frame={Math.max(0, f - 3.65 * fps)} mode="polished"/></div>
        {Array.from({length: 7}, (_, i) => <div key={i} style={{position: 'absolute', left: 126 + i * 104, top: 304 + (i % 3) * 77, width: 86, height: i % 2 ? 8 : 43, border: `1px solid ${C.purple}66`, background: i % 2 ? '#b393fa44' : '#54456888', borderRadius: 4, opacity: rebuild * (1 - fixed), translate: `${Math.sin(i * 2) * rebuild * 65}px ${Math.cos(i * 1.4) * rebuild * 40}px`, rotate: `${Math.sin(i) * rebuild * 13}deg`}}/>)}
        <div style={{position: 'absolute', left: 25, right: 25, top: 210, height: 370, border: `1px solid ${C.purple}`, borderRadius: 12, opacity: p(f, .05 * fps, .2 * fps) * (1 - p(f, .65 * fps, .25 * fps)), boxShadow: '0 0 25px #b393fa16'}}/>
      </Panel>
    </div>
    <div style={{position: 'absolute', left: 130, top: 1290, width: 820, height: 120, borderRadius: 16, border: '1px solid #b393fa66', background: 'linear-gradient(120deg,#29263c,#151927)', boxShadow: '0 22px 50px #0009', opacity: prompt * (1 - p(f, 2.4 * fps, .3 * fps)), translate: `0 ${(1 - prompt) * 35}px`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 28px', boxSizing: 'border-box'}}>
      <span style={{color: C.purple, fontSize: 37}}>✳</span><span style={{fontFamily: mono, fontSize: 29, letterSpacing: .4}}>MAKE IT CLEANER</span><Button active style={{marginLeft: 'auto', width: 75, height: 64, padding: 0, scale: f > 2.24 * fps && f < 2.42 * fps ? .91 : 1}}><Icon kind="send" size={28} color="#181121"/></Button>
    </div>
    <div style={{position: 'absolute', left: packetX, top: packetY, width: 20, height: 20, background: C.purple, borderRadius: 7, rotate: `${send * 140}deg`, boxShadow: '0 0 22px #c6a9ff,0 0 55px #b393fa44', opacity: send > 0 ? 1 - p(f, 2.75 * fps, .1 * fps) : 0}}/>
    <div style={{position: 'absolute', left: 500, top: 955, width: 44 + send * 40, height: 44 + send * 40, border: '1px solid #b393fa77', borderRadius: '50%', opacity: p(f, 2.73 * fps, .1 * fps) * (1 - p(f, 3.15 * fps, .2 * fps)), scale: 1 + p(f, 2.75 * fps, .5 * fps) * 3}}/>
    <Cursor x={interpolate(f, [.5 * fps, .85 * fps, 1.85 * fps, 2.2 * fps], [1020, 710, 710, 832], {...clamp, easing: ease})} y={interpolate(f, [.5 * fps, .85 * fps, 1.85 * fps, 2.2 * fps], [1000, 953, 1240, 1328], {...clamp, easing: ease})} click={(f > .8 * fps && f < .96 * fps) || (f > 2.24 * fps && f < 2.4 * fps)} opacity={p(f, .4 * fps, .15 * fps) * (1 - p(f, 2.48 * fps, .2 * fps))}/>
    <Pill style={{position: 'absolute', left: 391, top: 1330, fontSize: 21, opacity: p(f, 4.2 * fps, .24 * fps), translate: `0 ${(1 - p(f, 4.2 * fps, .24 * fps)) * 20}px`}}><Icon kind="check" size={25} color={C.purple}/>UPDATED</Pill>
  </SceneShell>;
};
