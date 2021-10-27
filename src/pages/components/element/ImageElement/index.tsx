import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const prefixCls = utils.createPrefixCls(
  'editable-element-image',
  styles,
  'ppt',
);

export interface ImageElementProps {
  className?: string;
}

const ImageElement: React.FC<ImageElementProps> = (props) => {
  const { className } = props;

  return <div className={classNames(prefixCls(), className)}>ImageElement</div>;
};

export default ImageElement;
