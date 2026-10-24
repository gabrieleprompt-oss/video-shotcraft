import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Backdrop,C,Curve,Fonts,Heading,Icon,mono,Panel,Pill,sans,Waveform} from './Design';
import {Corridor} from './Corridor';

export const StylePreview=()=> <AbsoluteFill style={{background:C.bg,color:C.text}}>
  <Fonts/><Backdrop/>
  <Heading frame={30} eyebrow="DIRECTION VISUELLE / REEL 60 S" title="Une vidéo." second="Un prompt."/>
  <div style={{position:'absolute',left:61,top:635,transform:'perspective(1700px) rotateY(-9deg) rotateX(9deg) rotateZ(-5deg)',transformOrigin:'50% 50%'}}>
    <Panel title="Claude / editing workspace" width={970} height={1000} accent>
      <div style={{position:'absolute',left:0,top:0,width:145,bottom:0,borderRight:`1px solid ${C.line}`,padding:'23px 14px',boxSizing:'border-box'}}>
        {(['spark','caption','sound','folder'] as const).map((kind,i)=><div key={kind} style={{height:97,marginBottom:15,border:`1px solid ${i===0?'#b393fa66':C.line}`,borderRadius:9,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:11,background:i===0?'#a385f00c':'transparent',fontFamily:sans,fontSize:16,color:i===0?C.purple:C.muted}}><Icon kind={kind} color={i===0?C.purple:C.muted} size={28}/>{['Effects','Captions','Audio','Media'][i]}</div>)}
      </div>
      <div style={{position:'absolute',left:165,top:22,right:25,height:430,border:'1px solid #ffffff1c',borderRadius:7,overflow:'hidden',background:'#141c26'}}><Corridor frame={70} edited/><div style={{position:'absolute',left:24,bottom:22,fontFamily:sans,fontSize:38,fontWeight:800,letterSpacing:-1,textShadow:'0 3px 15px #000'}}>Le montage <span style={{color:C.purple}}>prend vie.</span></div></div>
      <div style={{position:'absolute',left:170,top:470,right:25,display:'flex',alignItems:'center',gap:24,fontFamily:mono,fontSize:19,color:C.muted}}><span style={{color:C.purple}}>00:00:32:08</span><span style={{marginLeft:'auto'}}>◂</span><Icon kind="play" size={22}/><span>▸</span><span style={{marginLeft:'auto'}}>9:16</span></div>
      <div style={{position:'absolute',left:165,top:530,right:24,height:390,borderTop:`1px solid ${C.line}`}}>
        <div style={{fontFamily:mono,fontSize:17,color:C.muted,display:'flex',justifyContent:'space-between',paddingTop:17}}>{['00:25','00:30','00:35','00:40'].map(x=><span key={x}>{x}</span>)}</div>
        <div style={{position:'absolute',top:52,left:12}}><Curve width={730} height={172} frame={100}/></div>
        <div style={{position:'absolute',left:0,top:193,right:0,display:'flex',gap:12}}>{[0,1,2].map(i=><div key={i} style={{width:[245,295,190][i],height:76,overflow:'hidden',border:'1px solid #adb4cb66',borderRadius:7,position:'relative'}}><Corridor frame={i*60}/><div style={{position:'absolute',inset:0,background:'#b6a3df17'}}/></div>)}</div>
        <div style={{position:'absolute',left:0,top:288,right:0,height:67,background:'#1c283980',borderRadius:5,border:'1px solid #ffffff0e'}}><Waveform width={750} height={60}/></div>
        <div style={{position:'absolute',left:323,top:14,width:2,height:350,background:C.purple,boxShadow:'0 0 8px #b393fa77'}}><div style={{position:'absolute',left:-6,top:-2,width:13,height:13,background:C.purple,clipPath:'polygon(0 0,100% 0,50% 100%)'}}/></div>
      </div>
    </Panel>
  </div>
  <Pill style={{position:'absolute',left:108,top:1575,rotate:'-5deg'}}><Icon kind="spark" size={25} color={C.purple}/>EDITING, REIMAGINED.</Pill>
  <div style={{position:'absolute',left:80,right:80,top:1740,fontFamily:sans,fontSize:30,color:C.muted,lineHeight:1.5}}>Profondeur, rythme et transitions<br/><span style={{color:C.text}}>guidées par l'action.</span></div>
</AbsoluteFill>;
