import React, {useEffect,useState} from 'react';
import {AbsoluteFill,continueRender,delayRender,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {Backdrop} from './Backdrop';
import {cowHeight,Mascot} from './Cow';
import {AnatomicalHeart} from './Heart';
import {Workers} from './Workers';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const ease=Easing.bezier(.25,.8,.22,1);
const fade=(f:number,frames:number[],values:number[])=>interpolate(f,frames,values,clamp);

const Font = () => {
  const [handle]=useState(()=>delayRender('Local monospace font'));
  useEffect(()=>{
    const font=new FontFace('Plex',`url(${staticFile('fonts/IBMPlexMono-Regular.ttf')})`);
    font.load().then(loaded=>{document.fonts.add(loaded);continueRender(handle)}).catch(()=>continueRender(handle));
  },[handle]);
  return null;
};

const spiral=Array.from({length:85},(_,i)=>{
  const theta=i/84*Math.PI*5.2;
  const r=19*(1-i/95);
  return `${i===0?'M':'L'}${25+Math.cos(theta)*r} ${25+Math.sin(theta)*r}`;
}).join(' ');

const Dizzy = ({width}: {width:number}) => {
  const f=useCurrentFrame();
  return <div style={{position:'absolute',inset:0,opacity:fade(f,[89,96,108,114],[0,1,1,0])}}>
    {[[183,228],[349,255]].map(([x,y],i)=><svg key={i} width={54*width/516} height={66*width/516} viewBox="0 0 50 60" style={{position:'absolute',left:(x-27)*width/516,top:(y-33)*width/516,rotate:`${(f-89)*9}deg`}}><ellipse cx="25" cy="30" rx="25" ry="30" fill="#e2d4c0" /><path d={spiral} transform="translate(0 5)" fill="none" stroke="#3a302c" strokeWidth="3.6" strokeLinecap="round" /></svg>)}
  </div>;
};

const MainMascot = () => {
  const f=useCurrentFrame();
  const width=interpolate(f,[0,205,260,300,398],[620,620,510,650,650],{...clamp,easing:ease});
  const feet=interpolate(f,[0,205,260,300,398],[1510,1510,1000,990,990],{...clamp,easing:ease});
  const visible=fade(f,[0,109,121,165,180],[1,1,0,0,1]);
  const angle=fade(f,[0,86,95,101,113,121,164,181],[0,0,-7,8,-68,-68,0,0]);
  const xShift=fade(f,[0,86,95,101,113,123,165,182],[0,0,12,-8,-70,-70,0,0]);
  const bob=fade(f,[0,170,179,190,202],[0,0,-35,8,0]);
  const rest=fade(f,[112,123,164,176],[0,1,1,0]);
  const camera=interpolate(f,[0,24,48],[2.35,2.15,1],{...clamp,easing:ease});
  const cameraY=interpolate(f,[0,24,48],[-180,-155,0],{...clamp,easing:ease});
  return <AbsoluteFill style={{transform:`translateY(${cameraY}px) scale(${camera})`,transformOrigin:'540px 1180px'}}>
    <div style={{position:'absolute',left:0,top:0,width:1080,height:1920,filter:`brightness(${fade(f,[0,29,51],[.62,.82,1])})`}}>
      <div style={{position:'absolute',left:540-width/2+xShift,top:feet-cowHeight('standing',width)+bob,width,height:cowHeight('standing',width),opacity:visible,rotate:`${angle}deg`,transformOrigin:'50% 88%',filter:`blur(${fade(f,[0,100,111,122,165,177],[0,0,2.5,0,0,0])}px)`}}>
        <Mascot pose="standing" width={width} patch={f>=43} />
        <Dizzy width={width} />
      </div>
      <div style={{position:'absolute',left:540-740/2,top:1510-cowHeight('rest',740)+fade(f,[112,123,137],[12,-8,0]),width:740,height:cowHeight('rest',740),opacity:rest,rotate:`${fade(f,[112,122,133],[-9,3,0])}deg`,transformOrigin:'50% 90%'}}>
        <Mascot pose="rest" width={740} tired patch />
      </div>
    </div>
    <div style={{position:'absolute',inset:0,opacity:fade(f,[0,24,42],[1,1,0])}}>
      <div style={{position:'absolute',left:388,top:1029,width:356,height:333,background:'radial-gradient(ellipse,#b32b4844,transparent 65%)',filter:'blur(28px)'}} />
      <svg width="1080" height="1920" style={{position:'absolute',inset:0,overflow:'visible',filter:'drop-shadow(0 0 5px #d23f4d88)'}}>
        <g fill="none" stroke="#b34857" strokeWidth="2.8" opacity=".65">
          <path d="M538 1150C504 1108 473 1074 449 1015M497 1082C462 1084 430 1068 408 1028M540 1171C615 1119 659 1134 702 1090M640 1137L705 1157M548 1188C527 1244 514 1293 511 1344M525 1251L476 1291M565 1198C600 1249 611 1281 619 1325" />
        </g>
      </svg>
      <AnatomicalHeart size={246} style={{position:'absolute',left:430,top:1048,rotate:'-8deg',scale:1+Math.max(0,Math.sin(f*.55))*.025,filter:'drop-shadow(0 5px 12px #0009)'}} />
    </div>
    <div style={{position:'absolute',left:50,right:50,top:1485,height:3,background:'linear-gradient(to right,transparent,#c6ccddcc,transparent)',opacity:fade(f,[161,168,177],[0,.85,0]),filter:'blur(1px)'}} />
  </AbsoluteFill>;
};

const Connections = () => {
  const f=useCurrentFrame();
  const opacity=fade(f,[225,239,284,304],[0,.85,.85,0]);
  const p=fade(f,[229,270],[0,1]);
  const startY=interpolate(f,[222,260],[1180,1015],{...clamp,easing:ease});
  return <svg width="1080" height="1920" style={{position:'absolute',inset:0,opacity,overflow:'visible'}}>
    {[185,540,895].map((x,i)=><g key={x}>
      <path d={`M540 ${startY}C540 ${startY+75} ${x} 1000 ${x} 1100`} pathLength="1" stroke="#a4b8d3" strokeWidth="1.7" fill="none" strokeDasharray="1" strokeDashoffset={1-Math.min(1,Math.max(0,(p-i*.16)*1.5))} />
      <circle cx={x} cy={1100} r="4" fill="#cbe9f4" opacity={fade(f,[245+i*17,252+i*17],[0,1])} />
    </g>)}
  </svg>;
};

export const CowFilm = () => <AbsoluteFill style={{background:'#090a13',overflow:'hidden'}}>
  <Font />
  <Backdrop />
  <Connections />
  <MainMascot />
  <Workers />
  <AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(ellipse at 50% 45%,transparent 25%,#02040a44 100%)'}} />
</AbsoluteFill>;
