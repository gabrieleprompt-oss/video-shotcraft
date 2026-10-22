import React, {useEffect, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {PixelCursor, PixelIcon} from './PixelIcons';

export const C = {
  bg: '#10162A', panel: '#171F37', ink: '#F9F1D8', muted: '#9AA5C4',
  lime: '#CEFF70', purple: '#B5A2FF', coral: '#FF917A', line: '#343E5A', blue: '#85CCFF',
};
export const pixel = 'Pixelify, monospace';
export const mono = 'Plex, monospace';
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const inAt = (frame: number, start = 0, duration = 14) =>
  interpolate(frame, [start, start + duration], [0, 1], {...clamp, easing: ease});

export const FontAssets = () => {
  const [handle] = useState(() => delayRender('Load local pixel and code fonts'));
  useEffect(() => {
    const title = new FontFace('Pixelify', `url(${staticFile('fonts/PixelifySans.ttf')})`, {weight: '400 700'});
    const code = new FontFace('Plex', `url(${staticFile('fonts/IBMPlexMono-Regular.ttf')})`);
    Promise.all([title.load(), code.load()]).then((fonts) => {
      fonts.forEach((font) => document.fonts.add(font));
      continueRender(handle);
    }).catch((error) => {console.error(error); continueRender(handle);});
  }, [handle]);
  return null;
};

export const Background = () => (
  <AbsoluteFill style={{background: C.bg, color: C.ink, overflow: 'hidden'}}>
    <AbsoluteFill style={{opacity: 0.29, backgroundImage: `radial-gradient(${C.line} 1.7px, transparent 1.7px)`, backgroundSize: '24px 24px'}} />
    <div style={{position: 'absolute', left: -115, top: 770, width: 1310, height: 610, rotate: '-12deg', borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, opacity: 0.24}} />
    <div style={{position: 'absolute', left: 76, top: 176, width: 8, height: 1474, background: C.line, opacity: .18}} />
  </AbsoluteFill>
);

export const Chrome = ({step = 0, frame = 0}: {step?: number; frame?: number}) => (
  <>
    <div style={{position: 'absolute', left: 80, right: 80, top: 88, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: mono, fontSize: 23, letterSpacing: 1.1, color: C.muted}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16}}><PixelIcon kind="code" size={34} color={C.lime} /><span style={{color: C.ink}}>CODE / DÉCODÉ</span></div>
      <span>LAB_001</span>
    </div>
    <div style={{position: 'absolute', left: 80, right: 80, top: 151, height: 2, background: C.line}} />
    <div style={{position: 'absolute', left: 80, right: 80, top: 1735}}>
      <div style={{height: 4, background: C.line, marginBottom: 25}}><div style={{height: '100%', width: `${Math.min(100, (frame / 449) * 100)}%`, background: C.lime}} /></div>
      <div style={{display: 'flex', gap: 18, fontFamily: mono, fontSize: 21, color: C.muted}}>
        {[['01', 'OBSERVER'], ['02', 'INSPECTER'], ['03', 'RECRÉER']].map(([n, name], index) => <div key={n} style={{flex: 1, color: step === index + 1 ? C.lime : C.muted, display: 'flex', alignItems: 'center', gap: 11}}><span style={{background: step === index + 1 ? C.lime : C.line, width: 7, height: 7}} /><span>{n} {name}</span></div>)}
      </div>
    </div>
  </>
);

export const SceneShell = ({children, step, globalFrame}: {children: React.ReactNode; step: number; globalFrame: number}) => (
  <AbsoluteFill style={{color: C.ink, fontFamily: pixel}}>
    <FontAssets />
    <Background />
    <Chrome step={step} frame={globalFrame} />
    {children}
  </AbsoluteFill>
);

export const StepHeading = ({number, title, subtitle, accent = C.lime}: {number: string; title: string; subtitle: React.ReactNode; accent?: string}) => {
  const f = useCurrentFrame();
  return <div style={{position: 'absolute', left: 90, top: 240, right: 80, translate: `0 ${Math.round(interpolate(f, [0, 14], [32, 0], {...clamp, easing: ease}))}px`, opacity: inAt(f, 0, 8)}}>
    <div style={{display: 'flex', alignItems: 'center', gap: 16, fontFamily: mono, fontSize: 26, color: accent, marginBottom: 24}}><span style={{background: accent, color: C.bg, padding: '8px 14px'}}>{number}</span><span>REVERSE ENGINEERING</span></div>
    <div style={{fontFamily: pixel, fontSize: 120, lineHeight: .95, fontWeight: 600, letterSpacing: -3}}>{title}</div>
    <div style={{fontFamily: mono, fontSize: 36, lineHeight: 1.45, color: C.muted, marginTop: 28}}>{subtitle}</div>
  </div>;
};

export const Window = ({title, children, width = 880, height = 520, accent = C.purple, style}: {title: string; children: React.ReactNode; width?: number; height?: number; accent?: string; style?: React.CSSProperties}) => (
  <div style={{width, height, position: 'relative', background: C.panel, border: `4px solid ${C.ink}`, boxShadow: `12px 12px 0 ${accent}`, ...style}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: 0, height: 61, background: C.ink, color: C.bg, display: 'flex', alignItems: 'center', padding: '0 22px', fontFamily: mono, fontSize: 25, justifyContent: 'space-between'}}>
      <span>{title}</span><div style={{display: 'flex', gap: 10}}><span style={{width: 15, height: 4, background: C.bg, alignSelf: 'end'}} /><span style={{width: 16, height: 16, border: `3px solid ${C.bg}`}} /><span style={{fontSize: 26, lineHeight: .8}}>×</span></div>
    </div>
    <div style={{position: 'absolute', left: 0, top: 61, right: 0, bottom: 0}}>{children}</div>
    {[[0, 0], [width - 4, 0], [0, height - 4], [width - 4, height - 4]].map(([left, top], i) => <span key={i} style={{position: 'absolute', left: left - 4, top: top - 4, width: 8, height: 8, background: C.bg}} />)}
  </div>
);

export const PixelButton = ({pressed = false, label = 'CLIQUER', width = 290, style}: {pressed?: boolean; label?: string; width?: number; style?: React.CSSProperties}) => (
  <div style={{width, height: 108, position: 'relative', ...style}}>
    <div style={{position: 'absolute', inset: 0, background: '#6A9B35', translate: '0 10px'}} />
    <div style={{position: 'absolute', inset: 0, background: C.lime, color: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, fontFamily: pixel, fontSize: 44, fontWeight: 600, translate: pressed ? '0 8px' : '0 0'}}>
      <PixelIcon kind="spark" size={28} color={C.bg} />{label}
    </div>
  </div>
);

export const Count = ({value, style, size = 164}: {value: number; style?: React.CSSProperties; size?: number}) => <div style={{fontFamily: pixel, fontSize: size, fontWeight: 600, lineHeight: 1, color: C.ink, fontVariantNumeric: 'tabular-nums', ...style}}>{value}</div>;

export const Counter = ({count, pressed = false, title = 'compteur.app', width = 860, height = 470, accent = C.purple, style}: {count: number; pressed?: boolean; title?: string; width?: number; height?: number; accent?: string; style?: React.CSSProperties}) => (
  <Window title={title} width={width} height={height} accent={accent} style={style}>
    <div style={{position: 'absolute', left: 46, top: 47, fontFamily: mono, fontSize: 21, color: C.muted}}>NOMBRE DE CLICS</div>
    <Count value={count} style={{position: 'absolute', left: 44, top: 93, width: 210, textAlign: 'center'}} />
    <PixelButton pressed={pressed} style={{position: 'absolute', right: 58, top: 135}} />
    <div style={{position: 'absolute', left: 46, right: 45, bottom: 37, height: 2, background: C.line}} />
    <div style={{position: 'absolute', left: 46, bottom: 9, fontFamily: mono, fontSize: 19, color: C.muted}}>INPUT: CLIC<span style={{color: C.lime}}> → </span>OUTPUT: {count}</div>
  </Window>
);

export const Cursor = ({x, y, opacity = 1, pressed = false}: {x: number; y: number; opacity?: number; pressed?: boolean}) => (
  <div style={{position: 'absolute', left: Math.round(x), top: Math.round(y), opacity, scale: pressed ? .88 : 1, transformOrigin: '6px 6px', filter: 'drop-shadow(5px 6px 0 #0008)'}}><PixelCursor size={64} /></div>
);

export const ClickBurst = ({frame, at, x, y, color = C.lime}: {frame: number; at: number; x: number; y: number; color?: string}) => {
  const p = interpolate(frame, [at, at + 14], [0, 1], clamp);
  if (frame < at || frame > at + 14) return null;
  return <div style={{position: 'absolute', left: x, top: y}}>{Array.from({length: 8}, (_, i) => <span key={i} style={{position: 'absolute', width: 8, height: 8, background: color, left: Math.round(Math.cos(i * Math.PI / 4) * (22 + p * 60)), top: Math.round(Math.sin(i * Math.PI / 4) * (22 + p * 60)), opacity: 1 - p}} />)}</div>;
};

export const Annotation = ({children, color = C.lime, style}: {children: React.ReactNode; color?: string; style?: React.CSSProperties}) => <div style={{fontFamily: mono, fontSize: 25, lineHeight: 1.4, color, ...style}}>{children}</div>;

export const PixelWipe = () => {
  const f = useCurrentFrame();
  const boundary = [75, 174, 318].find((value) => Math.abs(f - value) <= 5);
  if (!boundary) return null;
  const t = f - boundary;
  return <AbsoluteFill style={{pointerEvents: 'none'}}>{Array.from({length: 12}, (_, i) => {
    const stagger = (i % 4) * .4;
    const width = t < 0 ? interpolate(t, [-5 + stagger, 0], [0, 100], clamp) : interpolate(t, [0, 4 + stagger], [100, 0], clamp);
    return <div key={i} style={{position: 'absolute', top: i * 160, height: 161, left: t <= 0 ? 0 : undefined, right: t > 0 ? 0 : undefined, width: `${width}%`, background: i % 3 === 0 ? C.purple : C.lime}} />;
  })}</AbsoluteFill>;
};
