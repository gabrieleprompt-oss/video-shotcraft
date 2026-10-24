import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, Cursor, ease, Icon, mono, p} from '../Design';
import {ActionCard, SceneShell, Terminal} from '../UI';

export const Setup: React.FC = () => {
  const f = useCurrentFrame();
  const kit = p(f, 84, 11);
  const hyperframes = p(f, 114, 10);
  const pulse = p(f, 138, 4) * (1 - p(f, 143, 6));
  const commands = 'npx hyperframes init reel-demo\ncd reel-demo\nnpx hyperframes preview';

  return <SceneShell index={3} kicker="LE SETUP" title="Un terminal." second="Tout le montage.">
    <div style={{position: 'absolute', left: 80, top: 630, width: 920, height: 640, perspective: 1800, translate: `${interpolate(f, [0, 12], [-155, 0], {...clamp, easing: ease})}px ${Math.sin(f / 38) * 1.5}px`, opacity: p(f, 0, 8)}}>
      <Terminal frame={Math.min(89, Math.max(0, f - 45))} text={commands} style={{height: 640, transform: `rotateY(${-2 + p(f, 24, 9) * 2}deg)`, borderColor: f >= 24 ? '#b393fa66' : '#ffffff25', boxShadow: `0 40px 85px #0009, 0 0 ${22 * p(f, 24, 7) * (1 - p(f, 35, 12)) + pulse * 27}px #b393fa29`}}/>
      <div style={{position: 'absolute', right: 27, top: 21, fontFamily: mono, fontSize: 16, color: C.purple, opacity: p(f, 24, 7), background: '#111620', padding: '1px 10px'}}>FOCUS</div>
      <div style={{position: 'absolute', left: 34, right: 34, bottom: 27, display: 'flex', alignItems: 'center', gap: 12, fontFamily: mono, fontSize: 18, color: '#8c96a7', opacity: p(f, 78, 7)}}><Icon kind="folder" size={23} color={C.purple}/><span>reel-demo/</span><span style={{color: '#596477'}}>src · public · hyperframes.json</span></div>
    </div>
    <svg width="1080" height="1920" style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
      <path d="M320 1269V1302" stroke={C.purple} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p(f, 89, 8)} fill="none"/>
      <path d="M760 1269V1302" stroke={C.purple} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p(f, 117, 8)} fill="none"/>
      <path d="M501 1376H579" stroke={C.purple} strokeWidth="2" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - p(f, 123, 10)} fill="none" opacity=".8"/>
      <circle cx={501 + p(f, 127, 9) * 78} cy="1376" r="5" fill="#decaff" opacity={p(f, 127, 3) * (1 - p(f, 136, 4))}/>
    </svg>
    <ActionCard icon="cut" label="EDIT KIT" detail="Presets de montage" style={{position: 'absolute', left: 135, top: 1302, width: 366, height: 164, opacity: kit, translate: `0 ${(1 - kit) * 39}px`, borderColor: pulse ? '#b393fa99' : '#ffffff28', boxShadow: `0 20px 40px #0007, 0 0 ${pulse * 25}px #b393fa33`}}/>
    <ActionCard icon="spark" label="HYPERFRAMES" detail="Composition HTML" style={{position: 'absolute', left: 579, top: 1302, width: 366, height: 164, opacity: hyperframes, translate: `${(1 - hyperframes) * 50}px 0`, borderColor: pulse ? '#b393fa99' : '#ffffff28', boxShadow: `0 20px 40px #0007, 0 0 ${pulse * 25}px #b393fa33`}}/>
    <div style={{position: 'absolute', left: 902, top: 1325, width: 25, height: 25, borderRadius: 20, background: '#b393fa21', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: p(f, 138, 5), scale: .7 + p(f, 138, 8) * .3}}><Icon kind="check" size={18} color={C.purple}/></div>
    <Cursor x={interpolate(f, [12, 24, 44], [1020, 245, 320], {...clamp, easing: ease})} y={interpolate(f, [12, 24, 44], [1265, 1050, 1115], {...clamp, easing: ease})} click={f >= 24 && f < 29} opacity={p(f, 12, 4) * (1 - p(f, 38, 7))}/>
  </SceneShell>;
};
