import React from 'react';
import {AbsoluteFill,Composition,Folder,Sequence,Still,useVideoConfig,useCurrentFrame,interpolate,staticFile} from 'remotion';
import {Audio} from '@remotion/media';
import {StylePreview} from './StylePreview';
import {Narration} from './Narration';
import {Hook} from './scenes/Hook';
import {Reveal} from './scenes/Reveal';
import {Setup} from './scenes/Setup';
import {Import} from './scenes/Import';
import {Prompt} from './scenes/Prompt';
import {Process} from './scenes/Process';
import {Polish} from './scenes/Polish';
import {Result} from './scenes/Result';
import {Revise} from './scenes/Revise';
import {ExportScene} from './scenes/ExportScene';
import {CTA} from './scenes/CTA';
import {Corridor} from './Corridor';

const Fade=({children,duration}:{children:React.ReactNode;duration:number})=>{
  const f=useCurrentFrame();
  return <AbsoluteFill style={{opacity:interpolate(f,[0,3,duration-4,duration-1],[.85,1,1,.8],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>{children}</AbsoluteFill>;
};

export const Reel=()=>{
  const {fps}=useVideoConfig();
  return <AbsoluteFill style={{background:'#080A10'}}>
    <Sequence from={0} durationInFrames={5*fps} premountFor={fps} name="01 — Avant / après"><Fade duration={150}><Hook/><Narration index={0}/></Fade></Sequence>
    <Sequence from={5*fps} durationInFrames={5*fps} premountFor={fps} name="02 — Zéro montage manuel"><Fade duration={150}><Reveal/><Narration index={1}/></Fade></Sequence>
    <Sequence from={10*fps} durationInFrames={5*fps} premountFor={fps} name="03 — Claude Code + kit"><Fade duration={150}><Setup/><Narration index={2}/></Fade></Sequence>
    <Sequence from={15*fps} durationInFrames={5*fps} premountFor={fps} name="04 — Import du rush"><Fade duration={150}><Import/><Narration index={3}/></Fade></Sequence>
    <Sequence from={20*fps} durationInFrames={7*fps} premountFor={fps} name="05 — Un seul prompt"><Fade duration={210}><Prompt/><Narration index={4}/></Fade></Sequence>
    <Sequence from={27*fps} durationInFrames={6*fps} premountFor={fps} name="06 — Analyse et montage"><Fade duration={180}><Process/><Narration index={5}/></Fade></Sequence>
    <Sequence from={33*fps} durationInFrames={6*fps} premountFor={fps} name="07 — Motion et sound design"><Fade duration={180}><Polish/><Narration index={6}/></Fade></Sequence>
    <Sequence from={39*fps} durationInFrames={6*fps} premountFor={fps} name="08 — Résultat"><Fade duration={180}><Result/><Narration index={7}/></Fade></Sequence>
    <Sequence from={45*fps} durationInFrames={5*fps} premountFor={fps} name="09 — Correction par prompt"><Fade duration={150}><Revise/><Narration index={8}/></Fade></Sequence>
    <Sequence from={50*fps} durationInFrames={5*fps} premountFor={fps} name="10 — Nouvelle version et export"><Fade duration={150}><ExportScene/><Narration index={9}/></Fade></Sequence>
    <Sequence from={55*fps} durationInFrames={5*fps} premountFor={fps} name="11 — Commente CLAUDE"><Fade duration={150}><CTA/><Narration index={10}/></Fade></Sequence>
    <Sequence from={0} durationInFrames={60*fps} premountFor={fps} name="Sound design"><Audio src={staticFile('audio/sfx.wav')}/></Sequence>
  </AbsoluteFill>;
};

const SourceDemo=()=> <Corridor frame={useCurrentFrame()} style={{width:1080,height:1920}}/>;

export const Root=()=> <>
  <Composition id="ClaudeEditReel" component={Reel} durationInFrames={1800} fps={30} width={1080} height={1920}/>
  <Still id="StylePreview" component={StylePreview} width={1080} height={1920}/>
  <Folder name="Scenes">
    <Composition id="Hook" component={Hook} durationInFrames={150} fps={30} width={1080} height={1920}/>
    <Composition id="Reveal" component={Reveal} durationInFrames={150} fps={30} width={1080} height={1920}/>
    <Composition id="Setup" component={Setup} durationInFrames={150} fps={30} width={1080} height={1920}/>
    <Composition id="Import" component={Import} durationInFrames={150} fps={30} width={1080} height={1920}/>
    <Composition id="Prompt" component={Prompt} durationInFrames={210} fps={30} width={1080} height={1920}/>
    <Composition id="Process" component={Process} durationInFrames={180} fps={30} width={1080} height={1920}/>
    <Composition id="Polish" component={Polish} durationInFrames={180} fps={30} width={1080} height={1920}/>
    <Composition id="Result" component={Result} durationInFrames={180} fps={30} width={1080} height={1920}/>
    <Composition id="Revise" component={Revise} durationInFrames={150} fps={30} width={1080} height={1920}/>
    <Composition id="Export" component={ExportScene} durationInFrames={150} fps={30} width={1080} height={1920}/>
    <Composition id="CTA" component={CTA} durationInFrames={150} fps={30} width={1080} height={1920}/>
  </Folder>
  <Composition id="RushDemo" component={SourceDemo} durationInFrames={360} fps={30} width={1080} height={1920}/>
</>;
