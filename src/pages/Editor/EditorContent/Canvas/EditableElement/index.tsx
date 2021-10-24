import React from 'react';
import { useModel } from 'umi';
import tinycolor from 'tinycolor2';
import useGetter from '@/hooks/useGetter';
import { utils } from 'react-dtcomponents';
import SvgWrapper from '@/components/SvgWrapper';
import { VIEWPORT_SIZE } from '@/config/canvas';

import styles from './index.less';

const editableElementPrefixCls = utils.createPrefixCls(
  'editable-element',
  styles,
  'ppt',
);

const EditableElement = () => {
  return <div className={editableElementPrefixCls()}>EditableElement</div>;
};

export default EditableElement;
