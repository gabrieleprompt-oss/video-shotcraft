import React from 'react';
import {Composition} from 'remotion';
import {CowFilm} from './Film';
export const Root = () => <Composition id="CowWorkers" component={CowFilm} durationInFrames={399} fps={30} width={1080} height={1920} />;
