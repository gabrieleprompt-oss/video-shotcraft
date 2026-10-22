import * as React from 'react';

export const AnatomicalHeart = ({size = 320, style}: {size?: number; style?: React.CSSProperties}) => {
  const id = `anatomical-heart-${React.useId().replace(/:/g, '')}`;
  const paint = (name: string) => `url(#${id}-${name})`;
  return (
    <svg width={size} height={size * 1.125} viewBox="0 0 320 360" fill="none" aria-hidden="true" style={style}>
      <defs>
        <linearGradient id={`${id}-aorta`} x1="152" y1="36" x2="234" y2="119" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6f172a"/><stop offset=".28" stopColor="#b43c51"/><stop offset=".52" stopColor="#a12a40"/><stop offset=".77" stopColor="#631326"/><stop offset="1" stopColor="#3f0d1b"/>
        </linearGradient>
        <radialGradient id={`${id}-body`} cx="0" cy="0" r="1" gradientTransform="translate(114 160) rotate(57) scale(174 126)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c5495d"/><stop offset=".27" stopColor="#ae344a"/><stop offset=".56" stopColor="#8a2035"/><stop offset=".82" stopColor="#571122"/><stop offset="1" stopColor="#320b17"/>
        </radialGradient>
        <radialGradient id={`${id}-ventricle`} cx="0" cy="0" r="1" gradientTransform="translate(209 195) rotate(99) scale(147 68)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#b43c51"/><stop offset=".32" stopColor="#9d2b41"/><stop offset=".68" stopColor="#6b162a"/><stop offset="1" stopColor="#350b18"/>
        </radialGradient>
        <radialGradient id={`${id}-sheen`}>
          <stop stopColor="#ec8891" stopOpacity=".42"/><stop offset=".43" stopColor="#cf5f70" stopOpacity=".14"/><stop offset="1" stopColor="#cf5f70" stopOpacity="0"/>
        </radialGradient>
        <path id={`${id}-shape`} d="M116 109C86 94 58 112 52 144C39 201 103 289 171 330C184 339 193 330 207 317C256 273 280 210 266 157C258 125 235 111 209 118C181 93 146 94 116 109Z"/>
        <clipPath id={`${id}-clip`}><use href={`#${id}-shape`}/></clipPath>
        <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="3.8"/></filter>
        <filter id={`${id}-diffuse`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
        <filter id={`${id}-shadow`} x="-40%" y="-30%" width="180%" height="180%">
          <feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="#160711" floodOpacity=".6"/>
        </filter>
      </defs>
      <g filter={paint('shadow')}>
        <path d="M179 111C172 95 161 77 168 59C176 36 202 32 219 48C234 62 232 86 232 113" stroke={paint('aorta')} strokeWidth="39" strokeLinecap="round"/>
        <path d="M176 47L172 20M193 39L196 13M212 46L223 24" stroke={paint('aorta')} strokeWidth="15" strokeLinecap="round"/>
        <path d="M171 79C166 60 179 44 196 44C211 45 219 56 220 71M172 42L170 22M192 34L193 16M211 41L221 26" stroke="#e17b87" strokeOpacity=".38" strokeWidth="5" strokeLinecap="round" filter={paint('soft')}/>
        <path d="M108 123L96 77C94 68 96 58 102 49" stroke={paint('aorta')} strokeWidth="30" strokeLinecap="round"/>
        <path d="M101 116L90 76C89 65 93 55 96 51" stroke="#db7180" strokeOpacity=".28" strokeWidth="7" strokeLinecap="round" filter={paint('soft')}/>
        <use href={`#${id}-shape`} fill={paint('body')}/>
        <path d="M157 127C190 113 229 123 247 153C274 200 247 274 196 321C188 329 181 331 174 328C196 284 183 254 165 224C145 189 143 153 157 127Z" fill={paint('ventricle')}/>
        <g clipPath={paint('clip')}>
          <ellipse cx="99" cy="162" rx="44" ry="68" transform="rotate(-25 99 162)" fill={paint('sheen')}/>
          <ellipse cx="210" cy="197" rx="36" ry="75" transform="rotate(12 210 197)" fill={paint('sheen')} opacity=".6"/>
          <path d="M142 137C151 164 163 177 169 203C183 248 165 285 180 324" stroke="#330b17" strokeOpacity=".62" strokeWidth="14" filter={paint('diffuse')}/>
          <path d="M64 154C63 187 89 232 109 252" stroke="#e47a87" strokeOpacity=".23" strokeWidth="9" filter={paint('soft')}/>
          <path d="M255 151C276 224 218 302 186 326" stroke="#290913" strokeOpacity=".35" strokeWidth="19" filter={paint('diffuse')}/>
        </g>
        <path d="M140 132C132 111 136 94 152 84C163 77 168 67 164 55" stroke={paint('aorta')} strokeWidth="32" strokeLinecap="round"/>
        <path d="M145 86C126 76 116 77 101 77" stroke={paint('aorta')} strokeWidth="20" strokeLinecap="round"/>
        <path d="M132 123C126 108 134 94 145 87C159 79 160 70 159 58" stroke="#df7b86" strokeOpacity=".35" strokeWidth="8" strokeLinecap="round" filter={paint('soft')}/>
        <path d="M72 118C80 101 100 100 116 110L132 132C118 145 104 142 96 133C86 140 77 135 72 128Z" fill={paint('body')}/>
        <path d="M206 121C225 100 251 109 258 132C259 143 248 151 239 150C232 139 220 134 206 134Z" fill={paint('ventricle')}/>
        <path d="M81 118C94 110 110 120 116 129M220 120C233 115 244 125 246 133" stroke="#d96879" strokeOpacity=".3" strokeWidth="7" filter={paint('soft')}/>
        <path d="M111 144C134 148 149 154 163 170C181 195 185 226 183 257C181 284 178 305 181 319" stroke="#4f1021" strokeOpacity=".6" strokeWidth="3" filter={paint('soft')}/>
        <path d="M111 143C134 147 149 154 162 170C180 194 183 226 181 257C179 284 177 305 180 318" stroke="#c45b6c" strokeOpacity=".5" strokeWidth="1.3" strokeLinecap="round"/>
        <g stroke="#c76374" strokeOpacity=".35" strokeWidth=".85" strokeLinecap="round" strokeLinejoin="round">
          <path d="M153 159C169 152 191 150 214 156L241 169M193 152L207 139M215 156L228 147"/>
          <path d="M170 188C151 190 137 203 126 220L111 234M143 201L122 199L108 192M129 216L130 237"/>
          <path d="M181 224C201 220 217 210 233 194M205 217L218 233L225 254M218 233L234 235"/>
          <path d="M180 265C164 265 150 258 139 248M179 291C196 282 206 268 213 252"/>
        </g>
        <g stroke="#e58a94" strokeOpacity=".1" strokeWidth=".65" strokeLinecap="round">
          <path d="M80 153C86 177 103 198 122 210M80 174C89 201 110 222 126 235M91 204C103 233 125 252 142 264M111 239C125 267 148 286 161 296"/>
          <path d="M197 163C214 178 222 197 222 213M201 172C219 193 223 213 218 231M204 217C211 239 206 258 198 273"/>
        </g>
      </g>
    </svg>
  );
};
