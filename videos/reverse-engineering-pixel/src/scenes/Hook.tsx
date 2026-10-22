import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, Counter, Cursor, ease, inAt, mono, pixel, SceneShell} from '../design';
import {PixelIcon} from '../PixelIcons';

export const Hook = () => {
  const f = useCurrentFrame();
  return <SceneShell step={0} globalFrame={f}>
    <div style={{position: 'absolute', left: 90, top: 238, right: 70}}>
      <div style={{fontFamily: mono, color: C.purple, fontSize: 25, letterSpacing: 2, marginBottom: 35}}>LE CODE, À L'ENVERS.</div>
      <div style={{fontFamily: pixel, fontWeight: 600, fontSize: 169, lineHeight: .9, letterSpacing: -5, translate: `0 ${Math.round(interpolate(f, [0, 14], [20, 0], {...clamp, easing: ease}))}px`}}>REVERSE</div>
      <div style={{fontFamily: pixel, fontWeight: 600, fontSize: 127, lineHeight: 1.1, letterSpacing: -3, color: C.lime, opacity: inAt(f, 4, 10), translate: `${Math.round(interpolate(f, [4, 18], [-35, 0], {...clamp, easing: ease}))}px 0`}}>ENGINEERING</div>
      <div style={{fontFamily: mono, fontSize: 43, color: C.ink, marginTop: 38, opacity: inAt(f, 10, 10)}}>Pars du résultat.</div>
    </div>
    <div style={{position: 'absolute', left: 110, top: 877, scale: interpolate(f, [0, 25], [.9, 1], {...clamp, easing: ease}), translate: `0 ${Math.round(interpolate(f, [0, 25], [95, 0], {...clamp, easing: ease}))}px`, opacity: inAt(f, 0, 9)}}>
      <Counter count={0} accent={C.purple} />
    </div>
    <div style={{position: 'absolute', left: 89, top: 762, display: 'flex', alignItems: 'center', gap: 16, color: C.muted, fontFamily: mono, fontSize: 24, opacity: inAt(f, 13, 10)}}><span style={{width: 11, height: 11, background: C.lime}} />SUJET : UN SIMPLE BOUTON</div>
    <div style={{position: 'absolute', right: 105, top: 690, rotate: '12deg', opacity: inAt(f, 18, 12)}}><PixelIcon kind="spark" size={70} color={C.purple} /></div>
    <div style={{position: 'absolute', left: 90, top: 1505, display: 'flex', alignItems: 'center', gap: 20, opacity: inAt(f, 23, 10)}}><PixelIcon kind="arrow" size={38} color={C.lime} /><span style={{fontFamily: pixel, fontSize: 54}}>Comprends ce qui se cache<br />derrière.</span></div>
    <Cursor x={interpolate(f, [27, 66], [935, 760], {...clamp, easing: ease})} y={interpolate(f, [27, 66], [1470, 1150], {...clamp, easing: ease})} opacity={inAt(f, 25, 6)} />
  </SceneShell>;
};
