import React from 'react';
import {Img, staticFile} from 'remotion';

export type Pose = 'standing' | 'rest' | 'worker';
const sprites = {
  standing: {x: 0, y: 168, width: 516, height: 764, polygon: [[0,0],[550,0],[550,410],[450,410],[450,640],[500,640],[500,1086],[0,1086]]},
  rest: {x: 464, y: 420, width: 570, height: 505, polygon: [[550,0],[940,0],[940,410],[1000,410],[1000,760],[1040,760],[1040,1086],[500,1086],[500,640],[450,640],[450,410],[550,410]]},
  worker: {x: 962, y: 152, width: 486, height: 782, polygon: [[940,0],[1448,0],[1448,1086],[1040,1086],[1040,760],[1000,760],[1000,410],[940,410]]},
} as const;

export const cowHeight = (pose: Pose, width: number) => sprites[pose].height * width / sprites[pose].width;

/** Crops the user's original PNG in the browser; no regenerated image or substituted asset. */
export const Cow = ({pose = 'standing', width, style}: {pose?: Pose; width: number; style?: React.CSSProperties}) => {
  const b = sprites[pose];
  const s = width / b.width;
  return <div style={{position: 'relative', width, height: b.height * s, overflow: 'hidden', ...style}}>
    <Img src={staticFile('cows-original.png')} style={{position: 'absolute', left: -b.x * s, top: -b.y * s, width: 1448 * s, maxWidth: 'none', height: 1086 * s, clipPath: `polygon(${b.polygon.map(([x,y]) => `${x / 1448 * 100}% ${y / 1086 * 100}%`).join(',')})`}} />
  </div>;
};

export const Eyes = ({pose, width, style}: {pose: 'standing' | 'rest'; width: number; style?: React.CSSProperties}) => {
  const points = pose === 'rest' ? [[169, 229], [329, 260]] : [[183, 228], [349, 255]];
  const scale = width / sprites[pose].width;
  return <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', ...style}}>{points.map(([x,y],i) => <svg key={i} width={60*scale} height={74*scale} viewBox="0 0 60 74" style={{position: 'absolute', left:(x-30)*scale, top:(y-37)*scale, rotate: i === 0 ? '-10deg' : '8deg', overflow:'visible'}}><defs><pattern id={`fur-${pose}-${i}`} width="60" height="74" patternUnits="userSpaceOnUse"><image href={staticFile('cows-original.png')} x="-700" y="-560" width="1448" height="1086" /></pattern><radialGradient id={`edge-${pose}-${i}`}><stop offset="78%" stopColor="white"/><stop offset="100%" stopColor="black"/></radialGradient><mask id={`mask-${pose}-${i}`}><ellipse cx="30" cy="37" rx="29" ry="37" fill={`url(#edge-${pose}-${i})`} /></mask></defs><ellipse cx="30" cy="37" rx="29" ry="37" fill={`url(#fur-${pose}-${i})`} mask={`url(#mask-${pose}-${i})`} /><path d="M15 22L45 52M45 22L15 52" fill="none" stroke="#352b28" strokeWidth="6" strokeLinecap="round" /></svg>)}</div>;
};

export const Mascot = ({pose, width, style, tired = false, patch = false, reflection = true}: {pose: Pose; width: number; style?: React.CSSProperties; tired?: boolean; patch?: boolean; reflection?: boolean}) => {
  const height = cowHeight(pose,width);
  return <div style={{position: 'absolute', width, height, ...style}}>
    <div style={{position: 'absolute', left: '-7%', width: '114%', bottom: -25, height: 77, background: 'radial-gradient(ellipse, #010209d9 0%, #05061099 36%, transparent 72%)', filter:'blur(11px)'}} />
    {reflection && <div style={{position:'absolute', top:height-5, left:0, width, height:height*.28, overflow:'hidden', opacity:.13, filter:'blur(7px)', maskImage:'linear-gradient(to bottom,black,transparent)'}}><div style={{scale:'1 -1'}}><Cow pose={pose} width={width} /></div></div>}
    <div style={{position:'relative', filter:'drop-shadow(-4px -3px 8px #9898d72e) drop-shadow(2px 14px 15px #0008)'}}>
      <Cow pose={pose} width={width} />
      {tired && pose !== 'worker' && <Eyes pose={pose} width={width} />}
      {patch && <div style={{position:'absolute', left:pose==='rest'?'75%':'48%', top:pose==='rest'?'68%':'64%', width:pose==='rest'?'20%':'24%', height:'9%', rotate:pose==='rest'?'9deg':'-4deg', color:'#f6f3ec', background:'#6c6ba5', borderRadius:'45%', boxShadow:'inset 0 0 0 2px #d8d3ef66, 0 2px 4px #15111e55', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Georgia,serif', fontStyle:'italic', fontWeight:700, fontSize:width*.065, textShadow:'1px 2px 1px #35324c'}}>php</div>}
    </div>
  </div>;
};
