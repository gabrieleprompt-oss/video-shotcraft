import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, ClickBurst, Counter, Count, Cursor, ease, inAt, mono, pixel, SceneShell, StepHeading} from '../design';
import {PixelIcon} from '../PixelIcons';

export const Observe = () => {
  const f = useCurrentFrame();
  const click = 41;
  const changed = f >= click;
  return <SceneShell step={1} globalFrame={f + 75}>
    <StepHeading number="01" title="Observe." subtitle={<>Un clic. Le compteur change.</>} />
    <Counter count={changed ? 1 : 0} pressed={f >= click && f < click + 6} style={{position: 'absolute', left: 110, top: 721, translate: `0 ${Math.round(interpolate(f, [0, 16], [30, 0], {...clamp, easing: ease}))}px`}} />
    <div style={{position: 'absolute', left: 110, top: 1280, display: 'flex', alignItems: 'center', gap: 15, fontFamily: mono, fontSize: 24, color: C.muted, opacity: inAt(f, 8, 12)}}><PixelIcon kind="eye" size={34} color={C.purple} />TESTE UNE ACTION. REGARDE LE RÉSULTAT.</div>
    <div style={{position: 'absolute', left: 170, right: 170, top: 1434, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <Count value={0} size={116} style={{color: C.muted}} />
      <PixelIcon kind="arrow" size={52} color={changed ? C.lime : C.line} />
      <div style={{fontFamily: pixel, fontSize: 76, color: changed ? C.lime : C.muted, scale: interpolate(f, [click, click + 12], [.85, 1], {...clamp, easing: ease})}}>+1</div>
      <PixelIcon kind="arrow" size={52} color={changed ? C.lime : C.line} />
      <Count value={1} size={116} style={{color: changed ? C.lime : C.line, opacity: changed ? 1 : .5}} />
    </div>
    <Cursor x={interpolate(f, [0, 36], [913, 755], {...clamp, easing: ease})} y={interpolate(f, [0, 36], [1240, 978], {...clamp, easing: ease})} opacity={interpolate(f, [0, 4, 76, 84], [0, 1, 1, 0], clamp)} pressed={f >= click && f < click + 6} />
    <ClickBurst frame={f} at={click} x={758} y={981} />
  </SceneShell>;
};
