import React from 'react';
import {AbsoluteFill, Composition, Folder, Sequence, useVideoConfig} from 'remotion';
import {C, PixelWipe} from './design';
import {Hook} from './scenes/Hook';
import {Observe} from './scenes/Observe';
import {Inspect} from './scenes/Inspect';
import {Rebuild} from './scenes/Rebuild';

const ReverseEngineering = () => {
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{background: C.bg}}>
    <Sequence from={0} durationInFrames={2.5 * fps} premountFor={fps} name="00 — Pars du résultat"><Hook /></Sequence>
    <Sequence from={2.5 * fps} durationInFrames={3.3 * fps} premountFor={fps} name="01 — Observe le comportement"><Observe /></Sequence>
    <Sequence from={5.8 * fps} durationInFrames={4.8 * fps} premountFor={fps} name="02 — Inspecte la logique"><Inspect /></Sequence>
    <Sequence from={10.6 * fps} durationInFrames={4.4 * fps} premountFor={fps} name="03 — Recrée le comportement"><Rebuild /></Sequence>
    <PixelWipe />
  </AbsoluteFill>;
};

export const RemotionRoot = () => (
  <>
    <Composition id="ReverseEngineering" component={ReverseEngineering} durationInFrames={450} fps={30} width={1080} height={1920} />
    <Folder name="Scenes">
      <Composition id="Intro" component={Hook} durationInFrames={75} fps={30} width={1080} height={1920} />
      <Composition id="Observe" component={Observe} durationInFrames={99} fps={30} width={1080} height={1920} />
      <Composition id="Inspecte" component={Inspect} durationInFrames={144} fps={30} width={1080} height={1920} />
      <Composition id="Recree" component={Rebuild} durationInFrames={132} fps={30} width={1080} height={1920} />
    </Folder>
  </>
);
