import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {PixelIcon} from '../PixelIcons';
import {
  C, ClickBurst, Count, Cursor, PixelButton, SceneShell, StepHeading,
  Window, clamp, ease, inAt, mono, pixel,
} from '../design';

const CompactCounter = ({title, count, clickedAt, top, accent, frame, delay}: {
  title: string;
  count: number;
  clickedAt: number;
  top: number;
  accent: string;
  frame: number;
  delay: number;
}) => (
  <Window
    title={title}
    width={880}
    height={330}
    accent={accent}
    style={{
      position: 'absolute', left: 100, top,
      opacity: inAt(frame, delay, 9),
      translate: `0 ${Math.round(interpolate(frame, [delay, delay + 16], [28, 0], {...clamp, easing: ease}))}px`,
    }}
  >
    <div style={{position: 'absolute', left: 44, top: 24, color: C.muted, fontFamily: mono, fontSize: 20}}>NOMBRE DE CLICS</div>
    <Count
      value={count}
      size={134}
      style={{
        position: 'absolute', left: 42, top: 66, width: 190, textAlign: 'center',
        color: frame >= clickedAt && frame < clickedAt + 12 ? C.lime : C.ink,
        scale: interpolate(frame, [clickedAt, clickedAt + 4, clickedAt + 12], [1, 1.08, 1], clamp),
        transformOrigin: 'left center',
      }}
    />
    <PixelButton
      pressed={frame >= clickedAt && frame <= clickedAt + 4}
      style={{position: 'absolute', left: 470, top: 80}}
    />
    <div style={{position: 'absolute', left: 280, top: 104, fontFamily: pixel, fontSize: 40, color: C.lime, opacity: interpolate(frame, [clickedAt, clickedAt + 4, clickedAt + 20], [0, 1, 0], clamp), translate: `0 ${interpolate(frame, [clickedAt, clickedAt + 20], [12, -16], clamp)}px`}}>+1</div>
  </Window>
);

export const Rebuild = () => {
  const f = useCurrentFrame();
  const original = f >= 32 ? 1 : 0;
  const recreated = f >= 62 ? 1 : 0;
  const matching = inAt(f, 74, 12);
  return (
    <SceneShell step={3} globalFrame={f + 318}>
      <StepHeading
        number="03"
        title="Recrée."
        subtitle="Même action. Même comportement."
        accent={C.purple}
      />
      <CompactCounter title="ORIGINAL / compteur.app" count={original} clickedAt={32} top={620} accent={C.purple} frame={f} delay={0} />
      <CompactCounter title="RECRÉÉ / mon-compteur.app" count={recreated} clickedAt={62} top={1120} accent={C.lime} frame={f} delay={7} />

      <div style={{position: 'absolute', left: 538, top: 972, width: 4, height: 126, background: C.line, opacity: inAt(f, 12, 12)}} />
      <div style={{
        position: 'absolute', left: 270, top: 1000, width: 540, height: 73,
        background: C.bg, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18,
        color: C.lime, fontFamily: mono, fontSize: 24, opacity: matching,
        scale: interpolate(f, [74, 86], [.95, 1], {...clamp, easing: ease}),
      }}>
        <PixelIcon kind="check" size={36} color={C.lime} />
        MÊME COMPORTEMENT
      </div>

      <Cursor
        x={interpolate(f, [0, 24, 43, 59, 72], [940, 708, 708, 708, 780], {...clamp, easing: ease})}
        y={interpolate(f, [0, 24, 43, 59, 72], [700, 807, 807, 1307, 1390], {...clamp, easing: ease})}
        pressed={(f >= 32 && f <= 36) || (f >= 62 && f <= 66)}
        opacity={interpolate(f, [0, 8, 76, 85], [0, 1, 1, 0], clamp)}
      />
      <ClickBurst frame={f} at={32} x={716} y={815} />
      <ClickBurst frame={f} at={62} x={716} y={1315} />

      <div style={{position: 'absolute', left: 100, right: 80, top: 1565, textAlign: 'center', fontFamily: mono, fontSize: 30, lineHeight: 1.5, color: C.muted, opacity: inAt(f, 81, 12)}}>
        Tu reproduis <span style={{color: C.ink}}>le comportement.</span>
      </div>
    </SceneShell>
  );
};
