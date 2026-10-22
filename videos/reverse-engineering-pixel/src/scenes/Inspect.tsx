import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, Cursor, ease, inAt, mono, pixel, SceneShell, StepHeading, Window} from '../design';
import {PixelIcon} from '../PixelIcons';

const CodeLine = ({number, children, active = false, opacity = 1}: {number: number; children: React.ReactNode; active?: boolean; opacity?: number}) => <div style={{height: 66, display: 'flex', alignItems: 'center', gap: 23, opacity, background: active ? '#CEFF701A' : 'transparent', borderLeft: `4px solid ${active ? C.lime : 'transparent'}`, margin: '0 -20px', padding: '0 20px'}}><span style={{color: C.muted, fontSize: 22, width: 21, textAlign: 'right'}}>{number}</span><span>{children}</span></div>;

export const Inspect = () => {
  const f = useCurrentFrame();
  const showCode = f >= 20;
  const highlight = f >= 50;
  return <SceneShell step={2} globalFrame={f + 174}>
    <StepHeading number="02" title="Inspecte." subtitle="Retrouve la logique du clic." accent={C.purple} />
    <Window title="DEVTOOLS / SOURCE" height={700} width={880} accent={C.lime} style={{position: 'absolute', left: 100, top: 665, translate: `0 ${Math.round(interpolate(f, [0, 17], [40, 0], {...clamp, easing: ease}))}px`}}>
      <div style={{position: 'absolute', top: 27, left: 32, display: 'flex', alignItems: 'center', gap: 14, fontFamily: mono, color: C.purple, fontSize: 26}}><PixelIcon kind="code" size={29} color={C.purple} />compteur.js</div>
      <div style={{position: 'absolute', right: 32, top: 28, fontFamily: mono, fontSize: 22, color: C.muted}}>JS / EXTRAIT</div>
      <div style={{position: 'absolute', top: 80, left: 32, right: 32, height: 2, background: C.line}} />
      <div style={{position: 'absolute', left: 32, right: 32, top: 108, fontFamily: mono, fontSize: 31, whiteSpace: 'pre', lineHeight: 1.4}}>
        <CodeLine number={1} opacity={inAt(f, 16, 8)}><span style={{color: C.purple}}>let </span>n <span style={{color: C.coral}}>=</span> <span style={{color: C.lime}}>0</span>;</CodeLine>
        <CodeLine number={2} opacity={inAt(f, 24, 8)}><span style={{color: C.blue}}>button</span>.<span style={{color: C.lime}}>onclick </span><span style={{color: C.coral}}>= </span>() <span style={{color: C.purple}}>=&gt; </span>{'{'}</CodeLine>
        <CodeLine number={3} active={highlight} opacity={inAt(f, 32, 8)}>{'  '}n <span style={{color: C.coral}}>+= </span><span style={{color: C.lime}}>1</span>;</CodeLine>
        <CodeLine number={4} opacity={inAt(f, 40, 8)}>{'  '}display.<span style={{color: C.blue}}>textContent </span><span style={{color: C.coral}}>= </span>n;</CodeLine>
        <CodeLine number={5} opacity={inAt(f, 48, 8)}>{'}'};</CodeLine>
      </div>
      <div style={{position: 'absolute', left: 41, right: 40, top: 507, height: 2, background: C.line}} />
      <div style={{position: 'absolute', left: 42, top: 548, display: 'flex', alignItems: 'center', gap: 17, color: C.lime, fontFamily: mono, fontSize: 25, opacity: inAt(f, 58, 10)}}><PixelIcon kind="chip" size={33} color={C.lime} />UN CLIC → UNE LOGIQUE</div>
      {!showCode && <div style={{position: 'absolute', left: 32, top: 119, width: 14, height: 34, background: C.lime}} />}
    </Window>
    <div style={{position: 'absolute', left: 110, right: 110, top: 1485, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: inAt(f, 65, 15)}}>
      <div style={{fontFamily: pixel, fontSize: 54, color: C.ink}}>CLIC</div>
      <PixelIcon kind="arrow" size={48} color={C.purple} />
      <div style={{fontFamily: pixel, fontSize: 67, color: C.lime}}>n + 1</div>
      <PixelIcon kind="arrow" size={48} color={C.purple} />
      <div style={{fontFamily: pixel, fontSize: 54, color: C.ink}}>ÉCRAN</div>
    </div>
    <div style={{position: 'absolute', left: 110, top: 1605, fontFamily: mono, fontSize: 27, color: C.muted, opacity: inAt(f, 75, 12)}}>Chaque clic ajoute 1, puis actualise l'affichage.</div>
    <Cursor x={interpolate(f, [8, 40, 65], [900, 652, 594], {...clamp, easing: ease})} y={interpolate(f, [8, 40, 65], [1280, 1092, 1016], {...clamp, easing: ease})} opacity={interpolate(f, [6, 15, 82, 92], [0, 1, 1, 0], clamp)} />
    {f >= 85 && f < 122 && <div style={{position: 'absolute', left: interpolate(f, [85, 121], [260, 812], clamp), top: 1560, width: 10, height: 10, background: C.lime}} />}
  </SceneShell>;
};
