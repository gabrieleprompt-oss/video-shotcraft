import React from 'react';
import {Audio} from '@remotion/media';
import type {Caption} from '@remotion/captions';
import {Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import data from './captions.json';
import {C,sans} from './Design';

type ReelCaption=Caption & {pageBreakAfter?:boolean};
const CaptionLine=({captions}:{captions:ReelCaption[]})=>{
  const f=useCurrentFrame();const {fps}=useVideoConfig();const ms=f/fps*1000;
  const pages:ReelCaption[][]=[];let current:ReelCaption[]=[];
  for(const caption of captions){current.push(caption);if(caption.pageBreakAfter){pages.push(current);current=[];}}
  if(current.length)pages.push(current);
  const page=pages.find(words=>ms>=words[0].startMs&&ms<words[words.length-1].endMs+75);
  if(!page)return null;
  return <div style={{position:'absolute',left:90,right:90,top:1600,minHeight:130,display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center',fontFamily:sans,fontSize:53,fontWeight:750,lineHeight:1.25,letterSpacing:-1.4,color:C.text,textShadow:'0 3px 20px #000,0 1px 8px #000'}}><div>{page.map((word,i)=><span key={i} style={{color:/Claude|HyperFrames|montage|silences|meilleurs|CLAUDE/i.test(word.text)?C.purple:C.text}}>{word.text}</span>)}</div></div>;
};

export const Narration=({index}:{index:number})=>{
  const {fps}=useVideoConfig();
  return <>
    <Sequence from={Math.round(.06*fps)} premountFor={fps} name={`Voix ${index+1}`}>
      <Audio src={staticFile(`audio/voice-${String(index+1).padStart(2,'0')}.mp3`)}/>
    </Sequence>
    <CaptionLine captions={data[index] as ReelCaption[]}/>
  </>;
};
