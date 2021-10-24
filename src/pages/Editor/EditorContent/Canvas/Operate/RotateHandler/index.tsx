import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const prefixCls = utils.createPrefixCls('rotate-handler', styles, 'ppt');

export interface RotateHandlerProps {
  [x: string]: any;
  style?: React.CSSProperties;
  className?: string;
}

const RotateHandler: React.FC<RotateHandlerProps> = ({
  style,
  className,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={classNames(prefixCls(), className)}
      style={style}
    ></div>
  );
};

export default RotateHandler;
