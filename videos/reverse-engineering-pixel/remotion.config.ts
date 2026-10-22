import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('png');
Config.setCodec('h264');
Config.setCrf(16);
Config.setPixelFormat('yuv420p');
Config.setMuted(true);
Config.setOverwriteOutput(true);
Config.setConcurrency(3);
