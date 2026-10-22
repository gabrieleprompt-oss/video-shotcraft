import React from 'react';

export type PixelIconKind = 'code' | 'eye' | 'chip' | 'check' | 'arrow' | 'spark' | 'copy';

type IconProps = {
  kind: PixelIconKind;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
};

type CursorProps = {
  size?: number;
  color?: string;
  stroke?: string;
  style?: React.CSSProperties;
};

/** A squared, staircase cursor. `size` controls the rendered width. */
export const PixelCursor: React.FC<CursorProps> = ({
  size = 64,
  color = '#F9F1D8',
  stroke = '#10162A',
  style,
}) => (
  <svg
    width={size}
    height={(size * 38) / 32}
    viewBox="0 0 32 38"
    fill="none"
    shapeRendering="crispEdges"
    aria-hidden="true"
    style={{display: 'block', overflow: 'visible', ...style}}
  >
    <path
      d="M2 2H6V6H10V10H14V14H18V18H22V22H26V26H18V30H22V36H16V32H12V26H8V30H2Z"
      fill={stroke}
    />
    <path
      d="M4 6H6V10H10V14H14V18H18V22H22V24H14V28H18V30H20V34H18V30H14V26H12V22H8V26H4Z"
      fill={color}
    />
  </svg>
);

/** Pixel-grid symbols; all geometry uses integer coordinates. */
export const PixelIcon: React.FC<IconProps> = ({
  kind,
  size = 48,
  color = '#CEFF70',
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    shapeRendering="crispEdges"
    aria-hidden="true"
    style={{display: 'block', flexShrink: 0, ...style}}
  >
    {kind === 'code' && (
      <>
        <path d="M6 4H9V7H6V10H3V14H6V17H9V20H6V17H3V14H0V10H3V7H6Z" />
        <path d="M15 4H18V7H21V10H24V14H21V17H18V20H15V17H18V14H21V10H18V7H15Z" />
        <path d="M12 5H15V8H14V12H13V16H12V19H9V16H10V12H11V8H12Z" />
      </>
    )}
    {kind === 'eye' && (
      <>
        <path d="M7 4H17V7H20V10H23V14H20V17H17V20H7V17H4V14H1V10H4V7H7V10H4V14H7V17H17V14H20V10H17V7H7Z" />
        <path d="M9 8H15V10H17V14H15V16H9V14H7V10H9ZM10 10V13H13V10Z" fillRule="evenodd" />
      </>
    )}
    {kind === 'chip' && (
      <>
        <path d="M6 5H18V6H19V18H18V19H6V18H5V6H6ZM8 8V16H16V8Z" fillRule="evenodd" />
        <rect x="10" y="10" width="4" height="4" />
        <path d="M7 1H9V5H7ZM11 1H13V5H11ZM15 1H17V5H15ZM7 19H9V23H7ZM11 19H13V23H11ZM15 19H17V23H15ZM1 7H5V9H1ZM1 11H5V13H1ZM1 15H5V17H1ZM19 7H23V9H19ZM19 11H23V13H19ZM19 15H23V17H19Z" />
      </>
    )}
    {kind === 'check' && (
      <path d="M18 4H22V8H18V12H14V16H10V20H6V16H2V12H6V16H10V12H14V8H18Z" />
    )}
    {kind === 'arrow' && (
      <path d="M13 3H17V7H21V10H24V14H21V17H17V21H13V17H17V14H0V10H17V7H13Z" />
    )}
    {kind === 'spark' && (
      <path d="M10 0H14V6H18V10H24V14H18V18H14V24H10V18H6V14H0V10H6V6H10ZM10 9V10H9V14H10V15H14V14H15V10H14V9Z" fillRule="evenodd" />
    )}
    {kind === 'copy' && (
      <>
        <path d="M7 1H21V15H18V4H7Z" />
        <path d="M3 7H17V23H3ZM6 10V20H14V10Z" fillRule="evenodd" />
      </>
    )}
  </svg>
);
