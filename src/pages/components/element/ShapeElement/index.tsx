import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import SvgWrapper from '@/components/SvgWrapper';
import { PPTShapeElement, ShapeText } from '@/types/slides';
import { ContextmenuItem } from '@/components/Contextmenu/types';

import styles from './index.less';

const prefixCls = utils.createPrefixCls(
  'editable-element-shape',
  styles,
  'ppt',
);

export interface ShapeElementProps {
  className?: string;
  elementInfo: PPTShapeElement;
  selectElement: (
    e: React.MouseEvent,
    element: PPTShapeElement,
    canMove?: boolean,
  ) => void;
  contextmenus: () => ContextmenuItem[];
}

const ShapeElement: React.FC<ShapeElementProps> = (props) => {
  const { className, elementInfo } = props;
  return (
    <div
      className={classNames(prefixCls(), className)}
      style={{
        top: elementInfo.top + 'px',
        left: elementInfo.left + 'px',
        width: elementInfo.width + 'px',
        height: elementInfo.height + 'px',
      }}
    >
      <div
        className={prefixCls('rotate-wrapper')}
        style={{ transform: `rotate(${elementInfo.rotate}deg)` }}
      >
        <div className={prefixCls('element-content')}>
          <SvgWrapper></SvgWrapper>
          <div className={prefixCls('shape-text')}></div>
        </div>
      </div>
    </div>
  );
};

export default ShapeElement;
