import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const borderLinePrefixCls = utils.createPrefixCls('border-line', styles, 'ppt');

export interface BorderLineProps {
  isWide?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type: 'top' | 'bottom' | 'left' | 'right' | string;
}

const BorderLine: React.FC<BorderLineProps> = ({
  type,
  style,
  className,
  isWide = false,
}) => {
  return (
    <div
      style={style}
      className={classNames(borderLinePrefixCls(), className, {
        [borderLinePrefixCls('top')]: type === 'top',
        [borderLinePrefixCls('top')]: type === 'bottom',
        [borderLinePrefixCls('top')]: type === 'left',
        [borderLinePrefixCls('top')]: type === 'right',
        [borderLinePrefixCls('wide')]: isWide,
      })}
    ></div>
  );
};

export default BorderLine;
