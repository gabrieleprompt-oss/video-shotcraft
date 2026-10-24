import React from 'react';
import {AbsoluteFill,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {Backdrop,C,clamp,Curve,ease,Fonts,Heading,Icon,mono,p,Panel,Pill,sans,Waveform} from './Design';
import {Corridor} from './Corridor';

export const SceneShell=({children,index,kicker,title,second}:{children:React.ReactNode;index:number;kicker:string;title?:string;second?:string})=>{
  const f=useCurrentFrame();
  return <AbsoluteFill style={{background:C.bg,color:C.text,fontFamily:sans,overflow:'hidden'}}>
  <Fonts/><Backdrop/>
  <div style={{position:'absolute',left:80,right:80,top:85,display:'flex',alignItems:'center',gap:12,fontFamily:mono,fontSize:21,color:C.muted,letterSpacing:1}}><Icon kind="spark" size={27} color={C.purple}/><span>CLAUDE / VIDEO WORKFLOW</span><span style={{marginLeft:'auto',fontSize:18,color:'#727b90'}}>REEL_01</span></div>
  {title&&<Heading eyebrow={`${String(index).padStart(2,'0')} / ${kicker}`} title={title} second={second}/>}
  <AbsoluteFill style={{transform:`perspective(2100px) rotateY(${-6+Math.sin(f/140)*.65}deg) rotateX(${3+Math.sin(f/170)*.3}deg) rotateZ(${-1.8+Math.sin(f/210)*.3}deg)`,transformOrigin:'540px 1050px'}}>{children}</AbsoluteFill>
  <div style={{position:'absolute',right:80,bottom:95,fontFamily:mono,fontSize:19,color:'#7b8296',letterSpacing:.3}}>DÉMONSTRATION VISUELLE</div>
</AbsoluteFill>;
};

export const Thumbnail=({index=0,style}:{index?:number;style?:React.CSSProperties})=><Img src={staticFile(`media/thumb-${Math.abs(index)%3}.png`)} style={{width:'100%',height:'100%',objectFit:'cover',display:'block',...style}}/>;

export const PreviewClip=({frame=0,edited=false,style,portrait=false,captionOpacity=1}:{frame?:number;edited?:boolean;style?:React.CSSProperties;portrait?:boolean;captionOpacity?:number})=><div style={{position:'relative',height:portrait?760:420,overflow:'hidden',background:'#22303d',...style}}>
  <div style={{position:'absolute',inset:edited?-24:0,scale:edited?interpolate(frame%105,[0,32,58,104],[1.03,1.1,1.1,1.04],clamp):1,translate:edited?`${Math.sin(frame*.018)*8}px 0`:undefined}}><Corridor frame={frame} edited={edited}/></div>
  <AbsoluteFill style={{background:'linear-gradient(transparent 45%,#03050b88)'}}/>
  {edited&&<><div style={{position:'absolute',left:25,top:24,padding:'8px 13px',fontFamily:mono,fontSize:18,color:'#fff',background:'#080a12aa',border:'1px solid #ffffff33',borderRadius:5}}>01: EDITED</div><div style={{position:'absolute',left:30,right:30,bottom:35,fontFamily:sans,fontSize:portrait?62:39,lineHeight:1.08,fontWeight:800,letterSpacing:-1.5,color:'#fff',opacity:captionOpacity,textShadow:'0 3px 12px #0009'}}>Le montage<br/><span style={{color:C.purple}}>prend vie.</span></div></>}
</div>;

export const Button=({children,active=false,style}:{children:React.ReactNode;active?:boolean;style?:React.CSSProperties})=><div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,height:66,padding:'0 27px',background:active?C.purple:'#1c2231',color:active?'#14101e':C.text,border:`1px solid ${active?'#d3bfff':'#ffffff25'}`,borderRadius:11,fontFamily:sans,fontSize:25,fontWeight:700,boxShadow:active?'0 0 24px #b393fa22,inset 0 1px 0 #ffffff55':'0 8px 18px #0004',...style}}>{children}</div>;

export const Terminal=({frame=0,text='',file=false,style}:{frame?:number;text?:string;file?:boolean;style?:React.CSSProperties})=>{
  const visible=text.slice(0,Math.floor(Math.max(0,frame)*2.6));
  return <Panel title="Terminal — claude" width={920} height={650} style={style}>
    <div style={{position:'absolute',left:32,right:32,top:27,fontFamily:mono,fontSize:23,lineHeight:1.6,color:'#b4b9c8'}}>
      <div style={{border:'1px solid #b48d6033',padding:'20px 24px',borderRadius:8,marginBottom:28,display:'flex',gap:19,alignItems:'center'}}><span style={{color:'#d6a17d',fontSize:51,lineHeight:1}}>✳</span><div><div style={{fontSize:28,color:C.text,fontWeight:600}}>Claude Code</div><div style={{fontSize:18,color:'#9195a5'}}>~/projects/reel-demo</div></div></div>
      <div style={{color:C.muted,fontSize:19,marginBottom:19}}>Build, edit, and ship from your terminal.</div>
      {file&&<div style={{display:'inline-flex',gap:12,alignItems:'center',padding:'10px 16px',background:'#202637',border:'1px solid #ffffff1c',borderRadius:6,fontSize:19,color:C.purple,marginBottom:17}}><Icon kind="file" size={24} color={C.purple}/>./assets/rush-demo.mp4</div>}
      <div style={{display:'flex',gap:15,alignItems:'flex-start'}}><span style={{color:C.purple}}>❯</span><div style={{whiteSpace:'pre-wrap',color:C.text,fontSize:24,lineHeight:1.65}}>{visible}<span style={{display:'inline-block',width:10,height:26,background:C.purple,verticalAlign:'middle',opacity:Math.floor(frame/13)%2===0?1:.2}}/></div></div>
      {frame>90&&<div style={{marginTop:26,fontSize:19,color:C.muted,display:'flex',gap:12,alignItems:'center'}}><span style={{color:C.purple}}>✳</span>Preparing your edit…</div>}
    </div>
  </Panel>;
};

export type TimelineMode='raw'|'cut'|'full'|'polished'|'bad';
export const Timeline=({frame=0,mode='full',style}:{frame?:number;mode?:TimelineMode;style?:React.CSSProperties})=>{
  const cut=mode==='cut'||mode==='polished'||mode==='full';
  const snap=mode==='cut'?p(frame,40,35):1;
  const polish=mode==='polished'||mode==='full';
  return <div style={{position:'relative',width:860,height:360,background:'#0c111b',border:'1px solid #ffffff1b',borderRadius:9,overflow:'hidden',...style}}>
    <div style={{height:43,borderBottom:'1px solid #ffffff0e',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 18px',color:C.muted,fontFamily:mono,fontSize:16}}><span>Timeline</span><span>00:00:32:08</span><span>30 FPS</span></div>
    <div style={{position:'absolute',left:97,right:20,top:57,display:'flex',justifyContent:'space-between',fontFamily:mono,fontSize:13,color:'#778096'}}>{['00:00','00:05','00:10','00:15'].map(x=><span key={x}>{x}</span>)}</div>
    {['Video 1','Captions','Audio 1'].map((label,i)=><div key={label} style={{position:'absolute',left:13,top:94+i*82,fontFamily:mono,fontSize:13,color:C.muted}}>{label}</div>)}
    {[0,1,2,3,4].map(i=>{
      const gap=cut?14+(1-snap)*30:32;
      const left=96+i*(132+gap);
      const rejected=(i===1||i===3)&&mode==='cut';
      return <div key={i} style={{position:'absolute',left,top:87+(rejected?-p(frame,15,16)*80:0),width:132,height:66,overflow:'hidden',border:`1px solid ${polish?C.purple+'77':'#8994ad77'}`,borderRadius:5,opacity:rejected?1-p(frame,15,15):1,scale:mode==='bad'?[.95,1.03,.93,1.08,1][i]:1}}><Thumbnail index={i}/><span style={{position:'absolute',left:6,bottom:5,fontFamily:mono,fontSize:10,color:'#fff',textShadow:'0 2px 3px #000'}}>clip_{String(i+1).padStart(2,'0')}</span></div>;
    })}
    {polish&&<div style={{position:'absolute',left:98,top:173,width:718,height:42,display:'flex',gap:12}}>{['Le montage','prend vie.','Un seul prompt.'].map((t,i)=><div key={t} style={{width:[192,183,267][i],border:'1px solid #b393fa44',borderRadius:4,background:'#b393fa1c',fontFamily:sans,fontSize:18,lineHeight:'40px',textAlign:'center',color:'#ded0f7'}}>{t}</div>)}</div>}
    <div style={{position:'absolute',left:98,top:244,right:22,height:70,background:'#24324966',borderRadius:4,overflow:'hidden'}}><Waveform width={739} height={66} frame={frame} color={polish?'#a89dce':'#8fa4be'}/></div>
    <div style={{position:'absolute',top:49,bottom:14,left:98+(frame%170)/170*720,width:2,background:C.purple,boxShadow:'0 0 7px #b393fa44'}}><div style={{position:'absolute',left:-5,top:0,width:12,height:12,background:C.purple,clipPath:'polygon(0 0,100% 0,50% 100%)'}}/></div>
  </div>;
};

export const Editor=({frame=0,mode='full',style}:{frame?:number;mode?:TimelineMode;style?:React.CSSProperties})=><Panel title="HyperFrames — reel-demo" width={920} height={1000} style={style}>
  <div style={{position:'absolute',left:18,right:18,top:20,height:440,border:'1px solid #ffffff1c',borderRadius:8,overflow:'hidden'}}><PreviewClip frame={frame} edited={mode==='polished'||mode==='full'} style={{height:'100%'}}/></div>
  <div style={{position:'absolute',left:28,right:28,top:480,display:'flex',alignItems:'center',fontFamily:mono,fontSize:18,color:C.muted}}><span style={{color:C.purple}}>00:00:32:08</span><span style={{margin:'0 auto'}}><Icon kind="play" size={24}/></span><span>9:16 • 1080p</span></div>
  <Timeline frame={frame} mode={mode} style={{position:'absolute',left:28,top:535}}/>
</Panel>;

export const FileCard=({frame=0,style}:{frame?:number;style?:React.CSSProperties})=><div style={{width:330,height:252,position:'relative',background:'linear-gradient(135deg,#252c3e,#151b29)',border:'1px solid #c4bdd744',borderRadius:16,padding:14,boxSizing:'border-box',boxShadow:'0 28px 55px #0008',...style}}><div style={{height:160,borderRadius:8,overflow:'hidden',position:'relative'}}><Thumbnail/><div style={{position:'absolute',right:8,bottom:7,fontFamily:mono,fontSize:15,color:'#fff',background:'#0009',padding:'4px 6px'}}>00:12</div></div><div style={{display:'flex',alignItems:'center',gap:10,fontFamily:sans,fontSize:22,fontWeight:600,marginTop:15,color:C.text}}><Icon kind="file" size={25} color={C.purple}/>rush-demo.mp4</div><div style={{fontFamily:mono,fontSize:14,color:C.muted,marginTop:5,marginLeft:35}}>1080p · H.264</div></div>;

export const ActionCard=({icon='spark',label,detail,style}:{icon?:'spark'|'cut'|'caption'|'sound';label:string;detail?:string;style?:React.CSSProperties})=><div style={{width:270,height:163,padding:25,boxSizing:'border-box',background:'linear-gradient(130deg,#252838,#151926)',border:'1px solid #ffffff28',borderRadius:15,boxShadow:'0 20px 35px #0006',...style}}><Icon kind={icon} size={34} color={C.purple}/><div style={{fontFamily:sans,fontSize:23,fontWeight:700,color:C.text,marginTop:15}}>{label}</div>{detail&&<div style={{fontFamily:mono,fontSize:16,color:C.muted,marginTop:6}}>{detail}</div>}</div>;
