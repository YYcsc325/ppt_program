import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const borderLinePrefixCls = utils.createPrefixCls('border-line', styles, 'ppt');

export interface BorderLineProps {
  type: 'top' | 'bottom' | 'left' | 'right' | string;
  isWide: boolean;
  style: React.CSSProperties;
}

const BorderLine: React.FC<BorderLineProps> = ({ type, isWide = false }) => {
  return (
    <div
      className={classNames(borderLinePrefixCls(), {
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
