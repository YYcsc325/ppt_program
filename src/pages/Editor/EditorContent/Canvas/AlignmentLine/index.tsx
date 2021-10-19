import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';

import styles from './index.less';
export interface AlignmentLineProps {
  length: number;
  type: 'vertical' | 'horizontal';
  axis: {
    x: number;
    y: number;
  };
}

const alignmentLinePrefixCls = utils.createPrefixCls('canvas', styles, 'ppt');

const AlignmentLine: React.FC<AlignmentLineProps> = (props) => {
  const store = useModel('usePagesModel.index');

  const canvasScale = store.storeData.canvasScale;

  // 吸附对齐线的位置
  const left = props.axis.x * canvasScale + 'px';
  const top = props.axis.y * canvasScale + 'px';

  // 吸附对齐线的长度
  const sizeStyle = React.useMemo(() => {
    if (props.type === 'vertical')
      return { height: props.length * canvasScale + 'px' };
    return { width: props.length * canvasScale + 'px' };
  }, [props.type, props.length, canvasScale]);

  return (
    <div
      className={alignmentLinePrefixCls('alignment-line')}
      style={{ left, top }}
    >
      <div
        className={classNames(alignmentLinePrefixCls('line'), {
          [alignmentLinePrefixCls('vertical')]: props.type === 'vertical',
          [alignmentLinePrefixCls('horizontal')]: props.type === 'horizontal',
        })}
        style={sizeStyle}
      ></div>
    </div>
  );
};

export default AlignmentLine;
