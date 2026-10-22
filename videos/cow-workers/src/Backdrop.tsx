import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const clamp = {extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const pages = ['PHP: Hypertext Preprocessor','PHP 8.4','Getting Started','Documentation','The PHP Manual','PHP: A popular scripting language','Installation','Functions reference','PHP 8.3','Security and performance','PHP Foundation','Language reference','PHP: Downloads','A better web','PHP for the web'];

export const WebMosaic = ({opacity}: {opacity:number}) => {
  const f=useCurrentFrame();
  return <div style={{position:'absolute', left:-120, top:100, width:1320, height:1350, opacity, filter:'blur(3.4px)', transform:`perspective(1600px) rotateY(-4deg) translateY(${-f*.18}px)`, maskImage:'linear-gradient(to bottom,transparent,black 10%,black 80%,transparent)'}}>
    {pages.map((title,i)=>{
      const dark=i%4===0||i%5===0;
      return <div key={title} style={{position:'absolute', left:(i%5)*266, top:Math.floor(i/5)*420+(i%2)*36, width:244, height:396, background:dark?'#28243b':'#e0e1e4', border:'1px solid #8e90a444', boxShadow:'0 8px 20px #0007', overflow:'hidden', color:dark?'#dbd9e6':'#303246', fontFamily:'Arial,sans-serif'}}>
        <div style={{height:25, background:'#413a67', display:'flex', alignItems:'center', padding:'0 12px', gap:9}}><span style={{fontFamily:'Georgia,serif',fontStyle:'italic',fontWeight:700,fontSize:19,color:'#eee'}}>php</span><div style={{height:3,width:83,background:'#b6afcc66'}} /></div>
        <div style={{height:24, background:dark?'#201b35':'#cac8d2', fontSize:8, display:'flex', alignItems:'center', justifyContent:'space-around'}}>Downloads Documentation Get Involved Help</div>
        {(i%3===0||i%5===0)&&<div style={{height:100, background:dark?'#4c456e':'#7771a4', color:'#efedf6', display:'flex', alignItems:'center',justifyContent:'center',fontStyle:'italic',fontFamily:'Georgia,serif',fontSize:65,fontWeight:700}}>php</div>}
        <div style={{padding:'16px 15px',fontSize:17,lineHeight:1.2,fontWeight:700}}>{title}</div>
        <div style={{margin:'0 15px 12px',height:3,background:'#86819488'}} />
        {[0,1,2,3,4,5,6,7,8].map(j=><div key={j} style={{margin:'8px 15px',height:j%4===0?6:3,width:130+(j*17+i*13)%65,background:dark?'#9791ab77':'#6c6c7f66'}} />)}
        <div style={{margin:'14px 15px',background:dark?'#131320':'#cccbd3',height:55,padding:'8px 7px',fontFamily:'monospace',fontSize:8,color:dark?'#b4b0ca':'#5c5779'}}>&lt;?php<br />echo "Hello, world!";<br />?&gt;</div>
      </div>;
    })}
  </div>;
};

export const Backdrop = () => {
  const f=useCurrentFrame();
  const mosaic=interpolate(f,[31,57,153,183,214],[0,.62,.64,.5,0],clamp);
  const errors=interpolate(f,[112,124,150,164],[0,1,1,0],clamp);
  return <AbsoluteFill style={{background:'#090a13',overflow:'hidden'}}>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 52% 31%, #272239 0%, #171623 36%, #0c0d17 72%)'}} />
    <WebMosaic opacity={mosaic} />
    <AbsoluteFill style={{background:'linear-gradient(180deg,#08091244 0%,transparent 30%,#08091422 50%,#080914bb 80%,#080910 100%)'}} />
    <div style={{position:'absolute', left:-150, right:-150, top:1130, height:620, background:'radial-gradient(ellipse at 50% 0%,#49425955,transparent 60%)', opacity:interpolate(f,[200,275],[.6,.3],clamp)}} />
    <div style={{position:'absolute',left:40,right:40,top:1050,height:280,filter:'blur(70px)',background:'radial-gradient(ellipse,#38314f88,transparent 65%)',opacity:interpolate(f,[196,260],[.2,.75],clamp)}} />
    {Array.from({length:9},(_,i)=><div key={i} style={{position:'absolute',left:220+(i%3)*270,top:440+Math.floor(i/3)*165,opacity:errors*.64,display:'flex',alignItems:'center',flexDirection:'column',gap:13,color:'#b74358',fontFamily:'monospace',fontSize:23}}><div style={{width:59,height:59,border:'3px solid #923346',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:40}}>!</div><span>502</span></div>)}
    <div style={{position:'absolute',left:0,right:0,bottom:0,height:790,background:'linear-gradient(to bottom, transparent, #06091288)',transformOrigin:'bottom',perspective:700}} />
    <AbsoluteFill style={{opacity:.08,backgroundImage:'repeating-linear-gradient(0deg,transparent 0px,transparent 3px,#080811 3px,#080811 4px)',pointerEvents:'none'}} />
  </AbsoluteFill>;
};
