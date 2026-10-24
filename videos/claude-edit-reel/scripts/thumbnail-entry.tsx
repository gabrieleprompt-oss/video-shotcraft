import React from 'react';
import {AbsoluteFill, Composition, registerRoot, useCurrentFrame} from 'remotion';
import {Corridor} from '../src/Corridor';

const CorridorThumbnail: React.FC = () => <AbsoluteFill>
  <Corridor frame={useCurrentFrame()} edited={false}/>
</AbsoluteFill>;

const ThumbnailRoot: React.FC = () => <Composition
  id="CorridorThumbnails"
  component={CorridorThumbnail}
  durationInFrames={201}
  fps={30}
  width={960}
  height={540}
/>;

registerRoot(ThumbnailRoot);
