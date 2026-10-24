import React, {useId} from 'react';

type Point = [number, number, number];

export type CorridorProps = {
  frame?: number;
  edited?: boolean;
  style?: React.CSSProperties;
};

/** Original vector demonstration footage. All movement is a function of frame. */
export const Corridor: React.FC<CorridorProps> = ({frame = 0, edited = false, style}) => {
  const uid = `corridor-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const id = (name: string) => `${uid}-${name}`;
  const paint = (name: string) => `url(#${id(name)})`;
  const time = Number.isFinite(frame) ? frame : 0;
  const travel = time * 0.012;
  const cameraX = Math.sin(time / 220) * 0.035;
  const cameraY = 1.57 + Math.sin(time / 130) * 0.008;
  const horizon = 238 + Math.sin(time / 250) * 1.8;
  const focal = 355;
  const center = 495;
  const near = 0.62;
  const far = 78;
  const half = 2.72;
  const height = 3.72;
  const bay = 5.4;
  const firstBay = Math.floor(travel / bay);
  const zoom = edited ? 1.055 + Math.sin(time / 145) * 0.023 : 1;
  const accent = edited ? '#b6a1ff' : '#e7f2f8';

  const project = ([x, y, z]: Point): [number, number] => [
    center + ((x - cameraX) * focal) / z,
    horizon - ((y - cameraY) * focal) / z,
  ];

  const clip = (vertices: Point[]): Point[] => {
    const result: Point[] = [];
    for (let index = 0; index < vertices.length; index++) {
      const a = vertices[index];
      const b = vertices[(index + 1) % vertices.length];
      if (a[2] >= near) result.push(a);
      if ((a[2] >= near) !== (b[2] >= near)) {
        const t = (near - a[2]) / (b[2] - a[2]);
        result.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, near]);
      }
    }
    return result;
  };

  const points = (vertices: Point[]) => clip(vertices).map((point) => project(point).join(',')).join(' ');
  const polygon = (vertices: Point[], fill: string, key: string, extra: React.SVGProps<SVGPolygonElement> = {}) => (
    <polygon key={key} points={points(vertices)} fill={fill} {...extra} />
  );
  const line = (a: Point, b: Point, color: string, width: number, key: string, opacity = 1) => {
    if (a[2] < near && b[2] < near) return null;
    const clipped = clip([a, b]);
    if (clipped.length < 2) return null;
    const [x1, y1] = project(clipped[0]);
    const [x2, y2] = project(clipped[1]);
    return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} opacity={opacity} />;
  };

  const floor: Point[] = [[-half, 0, near], [half, 0, near], [half, 0, far], [-half, 0, far]];
  const rightWall: Point[] = [[half, 0, near], [half, height, near], [half, height, far], [half, 0, far]];
  const ceiling: Point[] = [[-half, height, near], [half, height, near], [half, height, far], [-half, height, far]];
  const bays = Array.from({length: 16}, (_, index) => {
    const number = firstBay + index;
    return {number, front: number * bay - travel, back: (number + 1) * bay - travel};
  }).filter(({back}) => back > near).reverse();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 960 540"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      style={{display: 'block', width: '100%', height: '100%', background: '#d8e1e7', ...style}}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id('floor')} x1="0" y1="0" x2="0.18" y2="1">
          <stop offset="0" stopColor={edited ? '#acbbc8' : '#b8c3ca'} />
          <stop offset="0.33" stopColor="#d2dbe0" />
          <stop offset="0.7" stopColor={edited ? '#72828e' : '#8e9da6'} />
          <stop offset="1" stopColor={edited ? '#3f5361' : '#657983'} />
        </linearGradient>
        <linearGradient id={id('left')} x1="0" y1="0" x2="1" y2="0.1">
          <stop offset="0" stopColor={edited ? '#778996' : '#9aabb4'} />
          <stop offset="0.52" stopColor="#b5c2ca" />
          <stop offset="1" stopColor="#edf2f4" />
        </linearGradient>
        <linearGradient id={id('ceiling')} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor={edited ? '#667987' : '#8a9ca7'} />
          <stop offset="0.5" stopColor="#d6dfe5" />
          <stop offset="1" stopColor="#eff3f5" />
        </linearGradient>
        <linearGradient id={id('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={edited ? '#92b6ce' : '#b0c9d8'} />
          <stop offset="0.62" stopColor="#e4eef1" />
          <stop offset="1" stopColor="#c5d4da" />
        </linearGradient>
        <linearGradient id={id('glass')} x1="0" y1="0" x2="1" y2="0.8">
          <stop offset="0" stopColor="#dceaf0" stopOpacity="0.11" />
          <stop offset="0.42" stopColor="#8fb3c7" stopOpacity="0.03" />
          <stop offset="0.78" stopColor="#e9f7fb" stopOpacity="0.3" />
          <stop offset="1" stopColor="#7597ab" stopOpacity="0.16" />
        </linearGradient>
        <linearGradient id={id('metal')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#526b7a" />
          <stop offset="0.22" stopColor="#b8c8d0" />
          <stop offset="0.44" stopColor="#eef5f7" />
          <stop offset="0.62" stopColor="#8fa3ae" />
          <stop offset="1" stopColor="#405969" />
        </linearGradient>
        <linearGradient id={id('door')} x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0" stopColor="#193240" />
          <stop offset="0.46" stopColor="#456575" />
          <stop offset="0.55" stopColor="#7897a5" />
          <stop offset="1" stopColor="#254552" />
        </linearGradient>
        <linearGradient id={id('reflection')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7eef9" stopOpacity="0.55" />
          <stop offset="1" stopColor="#d7eef9" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id('air')} cx="52%" cy="45%" r="70%">
          <stop offset="0" stopColor="#f7fcff" stopOpacity="0.38" />
          <stop offset="0.33" stopColor="#f7fcff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#102635" stopOpacity={edited ? '0.14' : '0.05'} />
        </radialGradient>
        <radialGradient id={id('vignette')} cx="51%" cy="47%" r="72%">
          <stop offset="0.3" stopColor="#00111e" stopOpacity="0" />
          <stop offset="1" stopColor="#00111e" stopOpacity={edited ? '0.27' : '0.1'} />
        </radialGradient>
        <clipPath id={id('floorClip')}><polygon points={points(floor)} /></clipPath>
        <clipPath id={id('glassClip')}><polygon points={points(rightWall)} /></clipPath>
      </defs>

      <g transform={`translate(${480 - 480 * zoom} ${270 - 270 * zoom}) scale(${zoom})`}>
        <rect width="960" height="540" fill="#dce6eb" />
        {polygon([[-half, 0, near], [-half, height, near], [-half, height, far], [-half, 0, far]], paint('left'), 'left')}
        {polygon(ceiling, paint('ceiling'), 'ceiling')}
        {polygon(floor, paint('floor'), 'floor')}
        {polygon(rightWall, paint('sky'), 'sky')}

        <g clipPath={paint('glassClip')}>
          {[{x: 14, z: 46, w: 14, h: 14}, {x: 8.8, z: 26, w: 15, h: 9.4}, {x: 7.4, z: 7, w: 10, h: 6.4}].map((building, index) => (
            <g key={`building-${index}`}>
              {polygon([[building.x, 0, building.z], [building.x, building.h, building.z], [building.x, building.h, building.z + building.w], [building.x, 0, building.z + building.w]], ['#b1c1ca', '#b9cbd4', '#a9beca'][index], `building-face-${index}`)}
              {Array.from({length: Math.floor(building.h / 0.66)}, (_, row) => (
                <g key={`windows-${row}`}>
                  {polygon([[building.x - 0.01, row * 0.66 + 0.14, building.z + 0.2], [building.x - 0.01, row * 0.66 + 0.5, building.z + 0.2], [building.x - 0.01, row * 0.66 + 0.5, building.z + building.w - 0.15], [building.x - 0.01, row * 0.66 + 0.14, building.z + building.w - 0.15]], row % 3 === 0 ? '#d7e4e9' : '#8fa8b7', `window-band-${index}-${row}`, {opacity: 0.66})}
                </g>
              ))}
              {Array.from({length: 12}, (_, column) => line([building.x - 0.02, 0, building.z + column * building.w / 12], [building.x - 0.02, building.h, building.z + column * building.w / 12], '#e0e9ed', 1.1, `building-grid-${column}`, 0.8))}
            </g>
          ))}
          <rect width="960" height="540" fill={paint('glass')} />
        </g>

        <g clipPath={paint('floorClip')}>
          {bays.map(({front, back, number}) => (
            <g key={`floor-${number}`}>
              {polygon([[half, 0.006, front + 0.2], [half, 0.006, back - 0.18], [-half, 0.006, back + 3.5], [-half, 0.006, front + 3.9]], '#f7fcff', `sunlight-${number}`, {opacity: number % 2 === 0 ? 0.16 : 0.09})}
              {polygon([[half - 0.06, 0, front], [half - 0.06, -2.7, front], [half - 0.06, -2.7, front + 0.11], [half - 0.06, 0, front + 0.11]], '#314e60', `mullion-reflection-${number}`, {opacity: 0.16})}
              {polygon([[-1.45, -3.66, front + 0.48], [-1.36, -3.66, front + 0.48], [-1.36, -3.66, back - 0.48], [-1.45, -3.66, back - 0.48]], paint('reflection'), `light-reflection-${number}`, {opacity: 0.35})}
              {line([-half, 0.008, front], [half, 0.008, front], '#4d6877', 0.75, `floor-cross-${number}`, 0.35)}
              {line([-half, 0.008, front + bay / 2], [half, 0.008, front + bay / 2], '#6e8795', 0.5, `floor-cross-half-${number}`, 0.25)}
            </g>
          ))}
          {[-2.15, -1.08, 0, 1.08, 2.15].map((x, index) => line([x, 0.008, near], [x, 0.008, far], '#58727f', 0.65, `floor-long-${index}`, 0.29))}
          <rect x="0" y="340" width="960" height="200" fill={paint('reflection')} opacity="0.17" />
        </g>

        {bays.map(({front, back, number}) => (
          <g key={`bay-${number}`}>
            {polygon([[-half + 0.012, 0.15, front], [-half + 0.012, 3.42, front], [-half + 0.012, 3.42, back], [-half + 0.012, 0.15, back]], '#d0dbe1', `left-panel-${number}`, {opacity: number % 2 === 0 ? 0.11 : 0.3})}
            {line([-half + 0.022, 0.18, front + bay / 2], [-half + 0.022, height, front + bay / 2], '#6e8796', 0.75, `left-panel-seam-${number}`, 0.4)}
            {line([-half + 0.025, 2.84, front], [-half + 0.025, 2.84, back], '#e2eaf0', 0.8, `left-upper-seam-${number}`, 0.8)}
            {number % 3 === 1 && (
              <g>
                {polygon([[-half + 0.045, 0.08, front + 1.0], [-half + 0.045, 2.75, front + 1.0], [-half + 0.045, 2.75, back - 1.0], [-half + 0.045, 0.08, back - 1.0]], '#526d7b', `door-frame-${number}`)}
                {polygon([[-half + 0.056, 0.12, front + 1.12], [-half + 0.056, 2.63, front + 1.12], [-half + 0.056, 2.63, back - 1.12], [-half + 0.056, 0.12, back - 1.12]], paint('door'), `door-${number}`)}
                {line([-half + 0.065, 0.12, front + bay / 2], [-half + 0.065, 2.63, front + bay / 2], '#9eb7c4', 1, `door-center-${number}`, 0.8)}
                {line([-half + 0.085, 0.94, front + bay / 2 - 0.13], [-half + 0.085, 1.39, front + bay / 2 - 0.13], '#e7f0f4', 2.2, `door-handle-${number}`, 0.95)}
                {polygon([[-half + 0.07, 1.75, front + 1.18], [-half + 0.07, 2.38, front + 1.18], [-half + 0.07, 2.07, back - 1.19], [-half + 0.07, 1.75, back - 1.19]], '#c3dce7', `door-reflection-${number}`, {opacity: 0.13})}
              </g>
            )}

            {polygon([[half - 0.025, 0.24, front], [half - 0.025, 3.49, front], [half - 0.025, 3.49, back], [half - 0.025, 0.24, back]], paint('glass'), `glass-pane-${number}`)}
            {polygon([[half - 0.035, 0.32, front + 0.1], [half - 0.035, 2.8, front + 0.1], [half - 0.035, 3.2, front + 1.4], [half - 0.035, 0.7, front + 1.4]], '#f2fbff', `glass-sheen-${number}`, {opacity: 0.08})}

            {polygon([[-half, 3.45, front - 0.07], [half, 3.45, front - 0.07], [half, 3.45, front + 0.09], [-half, 3.45, front + 0.09]], '#4d6574', `ceiling-rib-${number}`)}
            {polygon([[-half, 3.45, front + 0.09], [half, 3.45, front + 0.09], [half, 3.56, front + 0.09], [-half, 3.56, front + 0.09]], '#bccbd3', `ceiling-rib-highlight-${number}`)}
            {[-1.45, 1.45].map((x, lightIndex) => (
              <g key={`light-${lightIndex}`}>
                {polygon([[x - 0.065, 3.696, front + 0.52], [x + 0.065, 3.696, front + 0.52], [x + 0.065, 3.696, back - 0.52], [x - 0.065, 3.696, back - 0.52]], '#6f8794', `light-inset-${number}-${lightIndex}`)}
                {polygon([[x - 0.035, 3.688, front + 0.58], [x + 0.035, 3.688, front + 0.58], [x + 0.035, 3.688, back - 0.58], [x - 0.035, 3.688, back - 0.58]], '#f6fdff', `light-core-${number}-${lightIndex}`)}
              </g>
            ))}

            {polygon([[-half, 0, front - 0.08], [-half, 3.56, front - 0.08], [-half + 0.12, 3.56, front - 0.08], [-half + 0.12, 0, front - 0.08]], '#708894', `left-column-front-${number}`)}
            {polygon([[-half + 0.12, 0, front - 0.08], [-half + 0.12, 3.56, front - 0.08], [-half + 0.12, 3.56, front + 0.12], [-half + 0.12, 0, front + 0.12]], '#d3dfe5', `left-column-side-${number}`)}
            {polygon([[half - 0.105, 0, front - 0.08], [half - 0.105, 3.55, front - 0.08], [half, 3.55, front - 0.08], [half, 0, front - 0.08]], paint('metal'), `right-column-front-${number}`)}
            {polygon([[half - 0.105, 0, front - 0.08], [half - 0.105, 3.55, front - 0.08], [half - 0.105, 3.55, front + 0.11], [half - 0.105, 0, front + 0.11]], '#647f8f', `right-column-side-${number}`)}
            {line([half - 0.116, 0.16, front + bay / 2], [half - 0.116, 3.49, front + bay / 2], '#8ca4b1', 1.6, `glass-mullion-${number}`, 0.85)}
            {line([half - 0.12, 0.19, front + bay / 2], [half - 0.12, 3.49, front + bay / 2], '#e4eff4', 0.55, `glass-mullion-edge-${number}`, 0.9)}
          </g>
        ))}

        {[-half + 0.025, half - 0.025].map((x, index) => (
          <g key={`rails-${index}`}>
            {polygon([[x, 0, near], [x, 0.16, near], [x, 0.16, far], [x, 0, far]], '#4b6574', `skirting-${index}`)}
            {line([x, 0.165, near], [x, 0.165, far], '#dceaf0', 1.4, `skirting-top-${index}`, 0.8)}
            {line([x, 3.51, near], [x, 3.51, far], '#4e6878', 3.1, `ceiling-edge-${index}`, 0.8)}
          </g>
        ))}
        {line([-half + 0.04, 0.04, near], [-half + 0.04, 0.04, far], accent, edited ? 2.1 : 1.1, 'low-accent', edited ? 0.85 : 0.55)}
        {line([-half + 0.08, 3.5, near], [-half + 0.08, 3.5, far], accent, edited ? 2.2 : 1.1, 'high-accent', 0.78)}
        {line([half - 0.12, 1.12, near], [half - 0.12, 1.12, far], '#8ca5b3', 1.1, 'glass-horizontal', 0.65)}
        <rect width="960" height="540" fill={paint('air')} />
      </g>
      <rect width="960" height="540" fill={paint('vignette')} />
    </svg>
  );
};

export default Corridor;
