import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, clamp, Cursor, ease, Icon, mono, p, Panel, Pill, sans, Waveform} from '../Design';
import {ActionCard, Button, PreviewClip, SceneShell, Thumbnail} from '../UI';

const instruction = 'Coupe les silences. Supprime les ratés. Garde les meilleurs passages. Un montage qui retient l’attention.';

/** 20–27s, 210 frames. Every timing is local to this scene. */
export const Prompt: React.FC = () => {
  const f = useCurrentFrame();
  const sent = p(f, 182, 16);
  const typed = instruction.slice(0, Math.floor(Math.max(0, f - 15) * 4.15));
  const clips = p(f, 99, 10);
  const assemble = p(f, 141, 17);
  const panelStyle: React.CSSProperties = {
    position: 'absolute', left: 80, top: 595,
    transform: `perspective(1800px) rotateY(${interpolate(f, [0, 15], [-4, 0], {...clamp, easing: ease})}deg)`,
    scale: interpolate(f, [0, 15, 183, 200], [.94, 1, 1, .98], {...clamp, easing: ease}),
    transformOrigin: '50% 35%',
  };

  return <SceneShell index={5} kicker="UNE SEULE INSTRUCTION" title="Un prompt." second="Le montage suit.">
    <Panel title="Claude Code — reel-demo" width={920} height={390} style={panelStyle} accent>
      <div style={{position: 'absolute', left: 28, top: 20, display: 'flex', gap: 14, alignItems: 'center'}}>
        <Icon kind="file" size={24} color={C.purple}/><span style={{fontFamily: mono, fontSize: 19, color: C.muted}}>rush-demo.mp4</span>
        <span style={{fontFamily: mono, fontSize: 16, color: C.purple, marginLeft: 10}}>READY</span>
      </div>
      <div style={{position: 'absolute', left: 25, right: 25, top: 65, height: 166, borderRadius: 12, border: `1px solid ${f > 14 ? '#b393fa77' : C.line}`, background: '#090d16', padding: '19px 21px', boxSizing: 'border-box', display: 'flex', gap: 15, boxShadow: 'inset 0 0 30px #0004'}}>
        <span style={{fontFamily: mono, fontSize: 26, color: C.purple}}>❯</span>
        <div style={{fontFamily: mono, fontSize: 24, lineHeight: 1.65, color: C.text, opacity: 1 - sent * .45}}>
          {typed}<span style={{display: 'inline-block', width: 10, height: 26, verticalAlign: 'middle', marginLeft: 4, background: C.purple, opacity: f < 180 && Math.floor(f / 11) % 2 === 0 ? 1 : .12}}/>
        </div>
      </div>
      <div style={{position: 'absolute', left: 30, top: 255, fontFamily: mono, fontSize: 17, color: C.muted, display: 'flex', alignItems: 'center', gap: 10, opacity: p(f, 38, 8)}}>
        <Icon kind={f < 190 ? 'spark' : 'check'} size={22} color={C.purple}/>{f < 190 ? '3 règles · 1 résultat' : 'Instruction envoyée'}
      </div>
      <Button active style={{position: 'absolute', right: 25, top: 245, width: 166, height: 60, scale: f >= 180 && f <= 184 ? .94 : 1, background: f > 187 ? '#57456f' : C.purple}}>
        <Icon kind={f > 187 ? 'check' : 'play'} size={22} color="#171120"/>{f > 187 ? 'RUNNING' : 'RUN'}
      </Button>
    </Panel>

    {[
      {start: 45, label: 'Couper les silences', detail: 'Retirer les temps morts', icon: 'cut' as const},
      {start: 105, label: 'Supprimer les ratés', detail: 'Écarter les prises faibles', icon: 'cut' as const},
      {start: 141, label: 'Garder le meilleur', detail: 'Assembler les bons plans', icon: 'spark' as const},
    ].map((card, i) => {
      const enter = p(f, card.start, 10);
      const active = f >= card.start && f < [105, 141, 180][i];
      return <ActionCard key={card.label} icon={card.icon} label={card.label} detail={card.detail} style={{
        position: 'absolute', left: 80 + i * 309 + (1 - i) * 309 * sent,
        top: 1030 + 30 * (1 - enter) - 190 * sent,
        width: 302, height: 163, padding: 21, opacity: enter * (1 - sent),
        scale: 1 - sent * .65, borderColor: active ? '#b393fa88' : '#ffffff22',
        transform: `perspective(1300px) rotateY(${(1 - i) * -3}deg)`,
      }}/>;
    })}

    <div style={{position: 'absolute', left: 80, top: 1237, width: 920, height: 230, borderRadius: 16, background: '#101621', border: `1px solid ${C.line}`, boxShadow: '0 30px 70px #0007', opacity: p(f, 57, 12) * (1 - sent * .5), overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 23, top: 18, fontFamily: mono, fontSize: 17, letterSpacing: .8, color: C.muted}}>
        {f < 100 ? '01 / SILENCES' : f < 141 ? '02 / PRISES À ÉCARTER' : '03 / MEILLEURS PASSAGES'}
      </div>
      <div style={{position: 'absolute', right: 23, top: 15, fontFamily: mono, fontSize: 18, color: C.purple, opacity: p(f, 75, 7)}}>{f < 100 ? '− 02.4 s' : f < 141 ? '2 prises retirées' : '3 plans retenus'}</div>
      <div style={{position: 'absolute', left: 35, top: 83, opacity: 1 - clips}}>
        <Waveform width={850} height={90} color={C.ice} progress={1}/>
        {[188, 410, 636].map((x, i) => <div key={x} style={{position: 'absolute', top: -10, left: x, width: 43, height: 110, border: `1px solid ${C.red}`, background: '#e17d8e22', opacity: p(f, 75 + i * 5, 4) * (1 - p(f, 86 + i * 5, 6)), scale: `${1 - p(f, 86 + i * 5, 6)} 1`, borderRadius: 5}}/>)}
      </div>
      {[0, 1, 2, 3, 4].map(i => {
        const rejected = i === 1 || i === 3;
        const lift = rejected ? p(f, 106 + (i - 1) * 2, 12) : 0;
        const target = 163 + i / 2 * 196;
        return <div key={i} style={{position: 'absolute', left: 35 + i * 174 + (!rejected ? (target - (35 + i * 174)) * assemble : 0), top: 75 - lift * 110, width: 155 + (!rejected ? 23 * assemble : 0), height: 111, borderRadius: 8, overflow: 'hidden', border: `1px solid ${rejected && f > 104 ? C.red : f > 141 ? C.purple : '#ffffff44'}`, opacity: clips * (1 - lift), rotate: `${lift * (i === 1 ? -8 : 8)}deg`, boxShadow: f > 141 && !rejected ? '0 0 22px #b393fa16' : undefined}}>
          <Thumbnail index={i} style={{height:111}}/>
          <div style={{position: 'absolute', left: 8, bottom: 7, fontFamily: mono, fontSize: 13, color: '#fff', textShadow: '0 2px 4px #000'}}>TAKE {String(i + 1).padStart(2, '0')}</div>
          {!rejected && <div style={{position: 'absolute', right: 7, top: 7, opacity: assemble}}><Icon kind="check" size={18} color={C.purple}/></div>}
        </div>;
      })}
      <div style={{position: 'absolute', left: 35, right: 35, bottom: 17, height: 2, background: '#ffffff0a'}}><div style={{height: 2, width: `${p(f, 58, 120) * 100}%`, background: C.purple}}/></div>
    </div>

    <Cursor x={interpolate(f, [0, 15, 164, 178], [760, 580, 580, 890], {...clamp, easing: ease})} y={interpolate(f, [0, 15, 164, 178], [790, 807, 807, 931], {...clamp, easing: ease})} opacity={p(f, 0, 6) * (1 - p(f, 188, 7))} click={f >= 180 && f < 184}/>
    <Pill style={{position: 'absolute', left: 352, top: 1070, opacity: p(f, 193, 8), translate: `0 ${18 * (1 - p(f, 193, 8))}px`}}><Icon kind="spark" size={22} color={C.purple}/>CLAUDE PREND LE RELAIS</Pill>
  </SceneShell>;
};
