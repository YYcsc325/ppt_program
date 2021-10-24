import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const resizeHandlerPrefixCls = utils.createPrefixCls(
  'resize-handler',
  styles,
  'ppt',
);

export interface ResizeHandlerProps {
  rotate?: number;
  className?: string;
  type: 'top' | 'bottom' | 'left' | 'right' | string;
  style?: React.CSSProperties;
  onMouseDown: (e: React.MouseEvent) => void;
}

const ResizeHandler: React.FC<ResizeHandlerProps> = (props) => {
  const { style, className, type, onMouseDown } = props;

  const rotateClassName = React.useMemo(() => {
    const prefix = 'rotate-';
    const rotate = props.rotate as number;
    if (rotate > -22.5 && rotate <= 22.5) return prefix + 0;
    else if (rotate > 22.5 && rotate <= 67.5) return prefix + 45;
    else if (rotate > 67.5 && rotate <= 112.5) return prefix + 90;
    else if (rotate > 112.5 && rotate <= 157.5) return prefix + 135;
    else if (rotate > 157.5 || rotate <= -157.5) return prefix + 0;
    else if (rotate > -157.5 && rotate <= -112.5) return prefix + 45;
    else if (rotate > -112.5 && rotate <= -67.5) return prefix + 90;
    else if (rotate > -67.5 && rotate <= -22.5) return prefix + 135;
    return prefix + 0;
  }, [props.rotate]);

  return (
    <div
      style={style}
      className={classNames(
        resizeHandlerPrefixCls(),
        rotateClassName,
        className,
        type,
      )}
      onMouseDown={onMouseDown}
    ></div>
  );
};

export default ResizeHandler;
