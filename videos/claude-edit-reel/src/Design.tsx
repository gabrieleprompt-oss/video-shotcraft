import React,{useEffect,useState} from 'react';
import {AbsoluteFill,continueRender,delayRender,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';

export const C={bg:'#080B12',panel:'#111620',raised:'#19202D',line:'#ffffff1A',text:'#F4F3F8',muted:'#9199AC',purple:'#B393FA',purpleDark:'#7850C2',ice:'#8CB8D0',red:'#E17D8E'};
export const sans='Manrope, sans-serif';
export const mono='Plex, monospace';
export const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const ease=Easing.bezier(.16,1,.3,1);
export const p=(f:number,start:number,duration=12)=>interpolate(f,[start,start+duration],[0,1],{...clamp,easing:ease});

export const Fonts=()=>{
  const [handle]=useState(()=>delayRender('Local editorial fonts'));
  useEffect(()=>{Promise.all([new FontFace('Manrope',`url(${staticFile('fonts/Manrope.ttf')})`,{weight:'200 800'}).load(),new FontFace('Plex',`url(${staticFile('fonts/IBMPlexMono-Regular.ttf')})`).load()]).then(fonts=>{fonts.forEach(font=>document.fonts.add(font));continueRender(handle)}).catch(()=>continueRender(handle));},[handle]);
  return null;
};

export const Backdrop=()=>{
  const f=useCurrentFrame();
  return <AbsoluteFill style={{background:C.bg,overflow:'hidden'}}>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 82% 24%, #47306455, transparent 52%), radial-gradient(ellipse at 8% 78%, #233b4d44, transparent 48%)'}} />
    <div style={{position:'absolute',left:780,top:-150,width:210,height:900,borderRadius:'50%',background:'#8d4fca',filter:'blur(110px)',opacity:.14,rotate:'20deg',translate:`${Math.sin(f/140)*14}px 0`}} />
    <div style={{position:'absolute',left:-320,top:1260,width:920,height:330,background:'#305366',filter:'blur(120px)',opacity:.13,rotate:'-17deg'}} />
    <AbsoluteFill style={{opacity:.1,backgroundImage:'radial-gradient(#7d8198 0.7px,transparent .7px)',backgroundSize:'5px 5px'}} />
    <div style={{position:'absolute',left:50,top:80,width:980,height:1760,borderLeft:'1px solid #ffffff05',borderRight:'1px solid #ffffff05'}} />
  </AbsoluteFill>;
};

export const Icon=({kind,size=32,color=C.muted}:{kind:'play'|'cut'|'spark'|'folder'|'file'|'arrow'|'check'|'send'|'caption'|'cursor'|'sound';size?:number;color?:string})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
  {kind==='play'&&<path d="M8 5L19 12L8 19Z" fill={color} stroke="none" />}
  {kind==='cut'&&<><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M8 8L20 20M8 16L20 4"/></>}
  {kind==='spark'&&<><path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2Z"/><path d="M20 2V6M18 4H22"/></>}
  {kind==='folder'&&<path d="M3 6H10L12 8H21V20H3ZM3 6V4H10L12 6H21V8"/>}
  {kind==='file'&&<><path d="M6 2H15L20 7V22H6Z"/><path d="M15 2V7H20M9 12H17M9 16H17"/></>}
  {kind==='arrow'&&<path d="M3 12H21M15 6L21 12L15 18"/>}
  {kind==='check'&&<path d="M4 12L9 17L20 6"/>}
  {kind==='send'&&<><path d="M3 3L22 12L3 21L6 12Z"/><path d="M6 12H22"/></>}
  {kind==='caption'&&<><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M10 9H7V15H10M18 9H15V15H18"/></>}
  {kind==='cursor'&&<path d="M5 2L19 14L12 15L9 22Z" fill={color} stroke="#0a0c14"/>}
  {kind==='sound'&&<><path d="M3 9H7L12 5V19L7 15H3ZM16 8Q21 12 16 16M19 4Q27 12 19 20"/></>}
</svg>;

export const Panel=({children,title='Untitled project',width=920,height=850,style,accent=false}:{children:React.ReactNode;title?:string;width?:number;height?:number;style?:React.CSSProperties;accent?:boolean})=><div style={{position:'relative',width,height,background:'linear-gradient(125deg,#171c28,#0d111b 60%,#131827)',border:`1px solid ${accent?'#b393fa66':'#ffffff25'}`,borderRadius:20,boxShadow:'0 50px 100px #000a,0 3px 0 #ffffff06,inset 0 1px 0 #ffffff0b',overflow:'hidden',...style}}>
  <div style={{position:'absolute',left:0,right:0,top:0,height:60,background:'#0a0e16aa',borderBottom:`1px solid ${C.line}`,display:'flex',alignItems:'center',padding:'0 24px',fontFamily:sans,fontSize:21,color:C.muted,gap:10}}><div style={{width:9,height:9,borderRadius:6,background:'#d17d92'}}/><div style={{width:9,height:9,borderRadius:6,background:'#bca06d'}}/><div style={{width:9,height:9,borderRadius:6,background:'#7da793'}}/><span style={{marginLeft:18}}>{title}</span><span style={{marginLeft:'auto',fontFamily:mono,fontSize:17,color:'#696f82'}}>workspace</span></div>
  <div style={{position:'absolute',top:60,left:0,right:0,bottom:0}}>{children}</div>
</div>;

export const Waveform=({width=700,height=70,color=C.ice,frame=0,progress=1}:{width?:number;height?:number;color?:string;frame?:number;progress?:number})=><svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{display:'block',overflow:'visible'}}>
  <path d={`M0 ${height/2}H${width}`} stroke={color} strokeOpacity=".22"/>
  {Array.from({length:Math.floor(width/4)},(_,i)=>{
    const v=(Math.sin(i*1.43)*.5+.5)*(Math.sin(i*.13)*.34+.66);
    const silence=i%43>34?.08:1;
    const h=4+v*(height-8)*silence;
    return <rect key={i} x={i*4} y={(height-h)/2} width="2" height={h} fill={color} opacity={i*4<progress*width?.68:.13}/>;
  })}
  {frame>0&&<line x1={(frame%200)/200*width} x2={(frame%200)/200*width} y1="0" y2={height} stroke={C.purple} />}
</svg>;

export const Pill=({children,color=C.purple,style}:{children:React.ReactNode;color?:string;style?:React.CSSProperties})=><div style={{display:'inline-flex',alignItems:'center',gap:10,padding:'12px 19px',border:`1px solid ${color}44`,background:'#10121be8',borderRadius:10,color,fontFamily:mono,fontSize:22,whiteSpace:'nowrap',boxShadow:'0 10px 25px #0005',...style}}>{children}</div>;

export const Heading=({eyebrow,title,second,frame}:{eyebrow:string;title:string;second?:string;frame?:number})=>{
  const current=useCurrentFrame();
  const f=frame??current;
  return <div style={{position:'absolute',left:78,right:78,top:190,opacity:p(f,0,7),translate:`0 ${interpolate(f,[0,15],[28,0],{...clamp,easing:ease})}px`}}><div style={{fontFamily:mono,fontSize:23,letterSpacing:2.5,color:C.muted,marginBottom:28}}>{eyebrow}</div><div style={{fontFamily:sans,fontSize:100,fontWeight:800,lineHeight:1.08,letterSpacing:-6,color:C.text}}>{title}{second&&<><br/><span style={{color:C.purple}}>{second}</span></>}</div></div>;
};

export const Cursor=({x,y,click=false,opacity=1}:{x:number;y:number;click?:boolean;opacity?:number})=><div style={{position:'absolute',left:x,top:y,filter:'drop-shadow(0 4px 3px #000b)',scale:click?.88:1,transformOrigin:'0 0',opacity}}><svg width="56" height="68" viewBox="0 0 28 34" fill="none"><path d="M4 2L25 21L15 22L11 32Z" fill="#f4f4f8" stroke="#141724" strokeWidth="1.8"/><path d="M16 22L21 31" stroke="#f4f4f8" strokeWidth="3.6"/></svg></div>;

export const Curve=({width=760,height=180,frame=100}:{width?:number;height?:number;frame?:number})=>{
  const pts=[[45,146],[228,32],[460,120],[704,25]];
  return <svg width={width} height={height} viewBox="0 0 760 180" style={{overflow:'visible'}}><defs><filter id="curve-glow"><feGaussianBlur stdDeviation="5"/></filter></defs><path d="M45 146C140 142 130 22 228 32S359 127 460 120S607 5 704 25" fill="none" stroke={C.purple} strokeWidth="10" opacity=".2" filter="url(#curve-glow)"/><path d="M45 146C140 142 130 22 228 32S359 127 460 120S607 5 704 25" pathLength="1" strokeDasharray="1" strokeDashoffset={1-Math.min(1,frame/65)} fill="none" stroke={C.purple} strokeWidth="3"/>
  <path d="M45 153C140 149 130 29 228 39S359 134 460 127S607 12 704 32" fill="none" stroke="#83b4c6" strokeWidth="1.5" opacity=".55"/>
  {pts.map(([x,y],i)=><g key={i} opacity={p(frame,i*13,7)}><rect x={x-11} y={y-11} width="22" height="22" transform={`rotate(45 ${x} ${y})`} fill="#141421" stroke="#e9dfff" strokeWidth="4"/><rect x={x-13} y={y-13} width="26" height="26" transform={`rotate(45 ${x} ${y})`} fill="none" stroke={C.purple} strokeWidth="7" opacity=".35" filter="url(#curve-glow)"/></g>)}</svg>;
};
