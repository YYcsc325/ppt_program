import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { createFromIconfontCN } from '@ant-design/icons';

import styles from './index.less';

const Font = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2554036_zm1vqeeiwb.js',
});

const iconFontPrefixCls = utils.createPrefixCls('icon-font', styles, 'ppt');

export type IconFontTypes =
  | 'redo'
  | 'revoke'
  | 'text'
  | 'picture'
  | 'data'
  | 'plus'
  | 'minus'
  | 'screen'
  | 'expand'
  | 'edit'
  | 'file'
  | 'help'
  | 'down';

export interface IconFontProps {
  type: IconFontTypes;
  style?: React.CSSProperties;
  className?: string;
  [x: string]: any;
}

const IconFont: React.FC<IconFontProps> = ({ type, className, ...reset }) => {
  return (
    <Font
      type={`icon-${type}`}
      {...reset}
      className={classNames(iconFontPrefixCls(), className)}
    />
  );
};

export default IconFont;
