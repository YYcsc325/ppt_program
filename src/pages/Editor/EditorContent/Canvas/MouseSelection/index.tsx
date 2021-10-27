import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const mouseSelectionPrefixCls = utils.createPrefixCls(
  'mouse-selection',
  styles,
  'ppt',
);

export interface MouseSelectionProps {
  quadrant: number;
  top: number;
  left: number;
  width: number;
  height: number;
}

const MouseSelection: React.FC<MouseSelectionProps> = (props) => {
  const { quadrant, top, left, width, height } = props;
  return (
    <div
      className={classNames(
        mouseSelectionPrefixCls(),
        mouseSelectionPrefixCls(`quadrant-${quadrant}`),
      )}
      style={{
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    ></div>
  );
};

export default MouseSelection;
