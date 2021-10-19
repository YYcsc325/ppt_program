import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';

import styles from './index.less';
export interface MultiSelectOperateProps {
  elementList: any;
  scaleMultiElement: any;
}

const multiSelectOperatePrefixCls = utils.createPrefixCls(
  'multi-select-operate',
  styles,
  'ppt',
);

const MultiSelectOperate: React.FC<MultiSelectOperateProps> = () => {
  return (
    <div className={multiSelectOperatePrefixCls()}>MultiSelectOperate</div>
  );
};

export default MultiSelectOperate;
