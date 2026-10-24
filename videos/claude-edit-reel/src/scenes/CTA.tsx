import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, clamp, Cursor, ease, Icon, mono, p, sans} from '../Design';
import {PreviewClip, SceneShell} from '../UI';

export const CTA: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const card = p(f, .8 * fps, .4 * fps);
  const sending = p(f, 3 * fps, .65 * fps);
  const final = p(f, 3.8 * fps, .3 * fps);
  const letters = Math.floor(interpolate(f, [2 * fps, 2.65 * fps], [0, 6], clamp));
  const typed = 'CLAUDE'.slice(0, letters);
  const pulse = Math.sin(Math.max(0, f - 4 * fps) / 16) * .5 + .5;
  return <SceneShell index={11} kicker="TON SETUP EXACT" title="Un commentaire." second="C'est tout.">
    <div style={{position: 'absolute', left: 210, top: 605, width: 660, height: 790, borderRadius: 20, overflow: 'hidden', border: '1px solid #ffffff44', boxShadow: '0 35px 95px #0009', scale: interpolate(f, [0, .5 * fps, 4 * fps, 5 * fps], [.96, 1, 1, 1.015], {...clamp, easing: ease}), translate: `0 ${Math.sin(f / 43) * 2}px`, transform: `perspective(1700px) rotateY(${Math.sin(f / 70) * 2}deg)`}}>
      <PreviewClip frame={f + 185} captionOpacity={1-final} edited portrait style={{height: '100%'}}/>
      <div style={{position: 'absolute', inset: 0, background: `linear-gradient(transparent 50%,#080b12${Math.round(final * 230).toString(16).padStart(2, '0')})`}}/>
      <div style={{position: 'absolute', right: 22, top: 25, display: 'flex', gap: 7}}>{[0, 1, 2].map(i => <div key={i} style={{width: 7, height: 7, borderRadius: '50%', background: '#fff9'}}/>)}</div>
    </div>
    <div style={{position: 'absolute', left: 110, top: 1050 + (1 - card) * 420, width: 860, height: 340, background: 'linear-gradient(120deg,#232630,#151922)', border: '1px solid #ffffff38', borderRadius: 24, boxShadow: '0 30px 75px #000b,inset 0 1px 0 #ffffff12', opacity: card * (1 - sending), scale: 1 - sending * .18, transformOrigin: '72% 45%', overflow: 'hidden'}}>
      <div style={{height: 76, borderBottom: '1px solid #ffffff14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 25, fontWeight: 700}}>Commentaires<div style={{position: 'absolute', right: 27, color: C.muted, fontSize: 31}}>×</div></div>
      <div style={{position: 'absolute', left: 34, top: 108, width: 57, height: 57, borderRadius: '50%', background: 'linear-gradient(145deg,#aa8cd2,#4a4d72)', border: '2px solid #e5d7ff44', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: sans, fontWeight: 800, fontSize: 19, color: '#fff'}}>TOI</div>
      <div style={{position: 'absolute', left: 111, top: 113, fontSize: 21, fontWeight: 700, color: '#ecebf2'}}>toi<span style={{fontWeight: 400, color: C.muted, marginLeft: 14, fontSize: 17}}>à l'instant</span></div>
      <div style={{position: 'absolute', left: 111, top: 150, right: 35, height: 65, fontSize: 28, fontWeight: typed ? 700 : 400, color: typed ? C.text : '#8991a2', display: 'flex', alignItems: 'center', gap: 2}}>{typed || 'Ajouter un commentaire…'}<span style={{display: f > 1.6 * fps && f < 3 * fps ? 'inline-block' : 'none', width: 2, height: 31, background: C.purple, opacity: Math.floor(f / 9) % 2 === 0 ? 1 : .15}}/></div>
      <div style={{position: 'absolute', left: 33, right: 33, bottom: 27, display: 'flex', alignItems: 'center', gap: 22, borderTop: '1px solid #ffffff12', paddingTop: 19}}><span style={{fontSize: 24, color: '#b9bdca'}}>♡</span><span style={{fontSize: 24, color: '#b9bdca'}}>☺</span><span style={{fontFamily: mono, fontSize: 15, color: '#717b90'}}>COMMENTER LE REEL</span><div style={{marginLeft: 'auto', borderRadius: 10, background: letters === 6 ? C.purple : '#343445', color: letters === 6 ? '#171120' : '#797b8e', padding: '12px 25px', fontSize: 23, fontWeight: 800, scale: f > 2.97 * fps && f < 3.13 * fps ? .91 : 1}}>Publier</div></div>
    </div>
    <div style={{position: 'absolute', left: interpolate(sending, [0, .6, 1], [540, 660, 730], clamp), top: interpolate(sending, [0, .5, 1], [1190, 1060, 940], clamp), opacity: sending > 0 ? 1 - p(f, 3.55 * fps, .3 * fps) : 0, translate: '-50% -50%', scale: interpolate(sending, [0, 1], [1, .65], clamp), rotate: `${sending * -8}deg`, borderRadius: '24px 24px 7px 24px', padding: '27px 36px', background: C.purple, color: '#171120', boxShadow: '0 25px 50px #0008', fontSize: 40, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 20}}><Icon kind="check" size={32} color="#261a33"/>CLAUDE</div>
    <Cursor x={interpolate(f, [1.3 * fps, 1.6 * fps, 2.65 * fps, 2.94 * fps], [1020, 412, 412, 843], {...clamp, easing: ease})} y={interpolate(f, [1.3 * fps, 1.6 * fps, 2.65 * fps, 2.94 * fps], [1450, 1228, 1228, 1337], {...clamp, easing: ease})} click={(f > 1.6 * fps && f < 1.77 * fps) || (f > 2.97 * fps && f < 3.13 * fps)} opacity={p(f, 1.25 * fps, .15 * fps) * (1 - p(f, 3.2 * fps, .15 * fps))}/>
    <div style={{position: 'absolute', left: 180, right: 180, top: 1280, opacity: final, translate: `0 ${(1 - final) * 25}px`, textAlign: 'center', padding: '25px 20px', borderRadius: 20, background: '#12141eee', border: `1px solid rgba(179,147,250,${.35 + pulse * .2})`, boxShadow: `0 20px 55px #0008,0 0 ${20 + pulse * 10}px #b393fa0a`}}>
      <div style={{fontSize: 90, fontWeight: 800, color: C.purple, letterSpacing: 3, lineHeight: 1.1}}>CLAUDE</div>
      <div style={{fontFamily: mono, fontSize: 21, letterSpacing: 2, color: C.muted, marginTop: 12}}>EN COMMENTAIRE</div>
    </div>
  </SceneShell>;
};
