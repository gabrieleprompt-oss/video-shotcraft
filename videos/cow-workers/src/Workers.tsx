import React from 'react';
import {Easing, interpolate, useCurrentFrame} from 'remotion';
import {Mascot} from './Cow';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const ease=Easing.bezier(.16,1,.3,1);
const tasks=[['GET','/index.php'],['GET','/blog/42'],['GET','/api/stock'],['POST','/commande'],['GET','/panier'],['POST','/login'],['GET','/contact'],['GET','/produits?p=3']];

const Request = ({task,index}: {task:string[];index:number}) => <div style={{width:235,height:88,position:'relative',background:'#e9e8e3',border:'1px solid #c4c7cb',boxShadow:'3px 8px 10px #0009',padding:'8px 14px',boxSizing:'border-box',fontFamily:'Plex,monospace',rotate:`${index%2===0?-.7:.6}deg`}}>
  <div style={{fontSize:21,lineHeight:1.1,fontWeight:600,color:task[0]==='GET'?'#3c9470':'#b78136'}}>{task[0]}</div>
  <div style={{fontSize:23,lineHeight:1.3,fontWeight:600,color:'#20232b',whiteSpace:'nowrap',marginTop:3}}>{task[1]}</div>
</div>;

export const Worker = ({index,x,start}: {index:number;x:number;start:number}) => {
  const f=useCurrentFrame();
  const enter=interpolate(f,[start,start+17],[0,1],{...clamp,easing:ease});
  const cycle=Math.max(0,f-start-25)/27;
  const whole=Math.floor(cycle);
  const phase=cycle-whole;
  return <div style={{position:'absolute',left:x-145,top:1062,width:290,height:800,opacity:enter,scale:interpolate(f,[start,start+20],[.72,1],{...clamp,easing:ease}),translate:`0 ${Math.round(interpolate(f,[start,start+20],[100,0],{...clamp,easing:ease}))}px`,transformOrigin:'50% 38%'}}>
    <div style={{position:'absolute',left:66,top:0,width:158,height:35,border:'1px solid #5599bd99',background:'#0b1b2a',borderRadius:22,boxShadow:'0 0 10px #51a4d211',fontFamily:'Plex,monospace',fontSize:19,color:'#b5e7f2',textAlign:'center',lineHeight:'32px'}}>worker {index+1}</div>
    <Mascot pose="worker" width={205} reflection={false} style={{left:45,top:52+Math.sin((f-start)*.24)*1.5}} />
    <div style={{position:'absolute',left:6,top:272,width:276,height:198}}>
      <div style={{position:'absolute',left:14,top:5,width:250,height:25,background:'linear-gradient(0deg,#565b68,#b0b4bf)',transform:'perspective(350px) rotateX(30deg)',borderTop:'3px solid #d2d1d7',boxShadow:'0 7px 13px #0008'}} />
      <div style={{position:'absolute',left:17,top:30,width:10,height:112,background:'linear-gradient(90deg,#353b4b,#7b818b,#333947)'}} />
      <div style={{position:'absolute',right:18,top:30,width:10,height:112,background:'linear-gradient(90deg,#353b4b,#7b818b,#333947)'}} />
      <div style={{position:'absolute',left:48,top:43,width:183,height:81,background:'linear-gradient(90deg,#272b35,#595e6a,#333744)',border:'2px solid #a2a5b455',boxShadow:'2px 5px 5px #0009'}}>
        <div style={{position:'absolute',left:12,right:12,top:13,height:4,background:'#171e2d'}} />
        <div style={{position:'absolute',left:12,right:12,top:26,height:4,background:'#171e2d'}} />
        <div style={{position:'absolute',left:12,right:12,top:39,height:4,background:'#171e2d'}} />
        <div style={{position:'absolute',left:12,top:57,width:6,height:6,borderRadius:'50%',background:'#74e0ab',boxShadow:`0 0 ${4+Math.sin(f*.23)*2}px #74e0ab`}} />
        <div style={{position:'absolute',right:10,top:54,fontFamily:'Plex,monospace',fontSize:13,color:'#c1c4d1'}}>PHP</div>
      </div>
    </div>
    <div style={{position:'absolute',left:29,top:407,width:235,height:399,overflow:'hidden',maskImage:'linear-gradient(to bottom,transparent,black 5%,black 88%,transparent)'}}>
      {[0,1,2,3,4].map(i=><div key={i} style={{position:'absolute',left:0,top:i*107-phase*107-24,opacity:i===0?interpolate(phase,[0,.8,1],[1,.9,0],clamp):1}}><Request task={tasks[(whole+i+index*2)%tasks.length]} index={i} /></div>)}
    </div>
    <div style={{position:'absolute',left:141,top:420,width:1,height:395,background:'linear-gradient(#768aab44,transparent)',zIndex:-1}} />
  </div>;
};

export const Workers = () => <><Worker index={0} x={185} start={243} /><Worker index={1} x={540} start={260} /><Worker index={2} x={895} start={276} /></>;
