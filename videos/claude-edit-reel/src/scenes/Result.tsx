import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, clamp, Cursor, ease, Icon, mono, p, Panel, Pill} from '../Design';
import {Button, PreviewClip, SceneShell, Timeline} from '../UI';

export const Result: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const open = p(f, .55 * fps, .5 * fps);
  const close = p(f, 4.5 * fps, .55 * fps);
  const hero = open * (1 - close);
  const entered = p(f, 0, .35 * fps);
  const left = interpolate(hero, [0, 1], [112, 264], clamp) + close * 105;
  const top = interpolate(hero, [0, 1], [698, 610], clamp) + close * 45;
  const width = interpolate(hero, [0, 1], [856, 552], clamp) - close * 210;
  const height = interpolate(hero, [0, 1], [420, 850], clamp) + close * 240;
  return <SceneShell index={8} kicker="LE RÉSULTAT" title="Le rush" second="prend vie.">
    <div style={{position: 'absolute', left: 80, top: 610, opacity: entered * (1 - hero * .92), translate: `0 ${(1 - entered) * 35}px`, transform: `perspective(1800px) rotateX(${(1 - open) * 4}deg)`, transformOrigin: '50% 50%'}}>
      <Panel width={920} height={850} title="HyperFrames — preview">
        <div style={{position: 'absolute', left: 32, top: 28, width: 856, height: 420, borderRadius: 10, overflow: 'hidden'}}><PreviewClip frame={f + 120} edited style={{height: '100%'}}/></div>
        <div style={{position: 'absolute', left: 35, top: 475, fontFamily: mono, fontSize: 20, color: C.muted}}>reel-demo / final composition</div>
        <Button active style={{position: 'absolute', right: 32, top: 463, scale: f > .48 * fps && f < .66 * fps ? .94 : 1}}><Icon kind="play" size={24} color="#171120"/>PREVIEW</Button>
        <Timeline frame={f + 70} mode="polished" style={{position: 'absolute', left: 170, top: 540, scale: .68, transformOrigin: '0 0'}}/>
      </Panel>
    </div>
    <div style={{position: 'absolute', left, top, width, height, borderRadius: 17, overflow: 'hidden', opacity: open, border: '1px solid #e4dcff66', boxShadow: '0 40px 100px #000a', transform: `perspective(1700px) rotateY(${close * -5}deg)`, transformOrigin: '50% 50%'}}>
      <PreviewClip frame={f + 120} portrait edited style={{height: '100%', width: '100%'}}/>
      <div style={{position: 'absolute', left: 26, top: 80, opacity: p(f, 1.25 * fps, .2 * fps) * (1 - close), translate: `${(1 - p(f, 1.25 * fps, .25 * fps)) * -30}px 0`}}><Pill style={{fontSize: 17, padding: '10px 13px', background: '#080c13cc'}}><Icon kind="spark" size={20} color={C.purple}/>UN SEUL PROMPT</Pill></div>
      <div style={{position: 'absolute', right: 26, top: 155, fontFamily: mono, fontSize: 17, color: '#fff', opacity: p(f, 2.1 * fps, .2 * fps) * (1 - p(f, 3.1 * fps, .25 * fps)), background: '#0b0e16ba', borderRadius: 5, padding: '8px 12px'}}>ZOOM {Math.round(interpolate(f, [2.1 * fps, 2.5 * fps], [100, 110], {...clamp, easing: ease}))}%</div>
      <svg width="100%" height="100%" viewBox="0 0 552 850" style={{position: 'absolute', inset: 0, opacity: p(f, 2.85 * fps, .25 * fps) * (1 - p(f, 3.7 * fps, .2 * fps))}}><path d="M155 235H125V270M397 235H427V270M125 530V565H155M397 565H427V530" fill="none" stroke="#e6d7ff" strokeWidth="2" strokeDasharray="8 3"/><path d="M276 382V412M261 397H291" stroke="#e6d7ff" strokeWidth="1.5" opacity=".7"/></svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 3, background: '#ffffff33'}}><div style={{height: '100%', background: C.purple, width: `${interpolate(f, [.6 * fps, 4.5 * fps], [0, 100], clamp)}%`}}/></div>
    </div>
    <Cursor x={interpolate(f, [0, .45 * fps], [1000, 844], {...clamp, easing: ease})} y={interpolate(f, [0, .45 * fps], [1320, 1176], {...clamp, easing: ease})} click={f > .48 * fps && f < .64 * fps} opacity={1 - p(f, .7 * fps, .15 * fps)}/>
    <Pill style={{position: 'absolute', left: 365, top: 1415, opacity: p(f, 5.3 * fps, .23 * fps), translate: `0 ${(1 - p(f, 5.3 * fps, .23 * fps)) * 18}px`, fontSize: 20}}><Icon kind="check" size={24} color={C.purple}/>GENERATED</Pill>
  </SceneShell>;
};
