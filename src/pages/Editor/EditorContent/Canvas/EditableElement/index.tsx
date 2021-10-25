import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { PPTElement, ElementTypes } from '@/types/slides';

import ImageElement from '@/pages/components/element/ImageElement';
import TextElement from '@/pages/components/element/TextElement';
import ShapeElement from '@/pages/components/element/ShapeElement';
import LineElement from '@/pages/components/element/LineElement';
import ChartElement from '@/pages/components/element/ChartElement';
import TableElement from '@/pages/components/element/TableElement';

import styles from './index.less';

/** 操作按键未完成 */

const prefixCls = utils.createPrefixCls('editable-element', styles, 'ppt');

export interface EditableElementProps {
  style?: React.CSSProperties;
  className?: string;
  elementInfo: PPTElement;
  elementIndex: number;
  isMultiSelect: boolean;
  selectElement: (
    e: React.MouseEvent,
    element: PPTElement,
    canMove?: boolean,
  ) => void;
  openLinkDialog: () => void;
}

const elementTypeMap = {
  [ElementTypes.IMAGE]: ImageElement,
  [ElementTypes.TEXT]: TextElement,
  [ElementTypes.SHAPE]: ShapeElement,
  [ElementTypes.LINE]: LineElement,
  [ElementTypes.CHART]: ChartElement,
  [ElementTypes.TABLE]: TableElement,
  DEFAULT: (props: any) => null,
};

const EditableElement: React.FC<EditableElementProps> = (props) => {
  const { elementInfo, elementIndex, className, style, selectElement } = props;

  const curId = `editable-element-${elementInfo?.id}`;
  console.log(curId, 'curId');
  const curStyle = { ...style, zIndex: elementIndex };

  const Component = elementTypeMap[elementInfo.type] || elementTypeMap.DEFAULT;

  return (
    <div
      className={classNames(prefixCls(), className)}
      id={curId}
      style={curStyle}
    >
      <Component elementInfo={elementInfo} selectElement={selectElement} />
    </div>
  );
};

export default EditableElement;
