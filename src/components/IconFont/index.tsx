import React from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const Font = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2554036_ly3tvu0857.js',
});

export type IconFontTypes = 'redo' | 'revoke' | 'text' | 'picture' | 'data';

export interface IconFontProps {
  type: IconFontTypes;
  style?: React.CSSProperties;
  className?: string;
  [x: string]: any;
}

const IconFont: React.FC<IconFontProps> = ({ type, ...reset }) => {
  return <Font type={`icon-${type}`} {...reset} />;
};

export default IconFont;
