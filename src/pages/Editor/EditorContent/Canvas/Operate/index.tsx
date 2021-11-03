import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { DisplayView } from '@/components';
import { OperateLineHandler, OperateResizeHandler } from '@/types/edit';
import { ElementTypes, PPTElement, PPTLineElement } from '@/types/slides';

import LinkHandler from './LinkHandler';
import ImageElementOperate from './ImageElementOperate';
import TextElementOperate from './TextElementOperate';
import ShapeElementOperate from './ShapeElementOperate';
import LineElementOperate from './LineElementOperate';
import ChartElementOperate from './ChartElementOperate';
import TableElementOperate from './TableElementOperate';

import styles from './index.less';

const operatePrefixCls = utils.createPrefixCls('operate', styles, 'ppt');

const elementTypeMap = {
  [ElementTypes.IMAGE]: ImageElementOperate,
  [ElementTypes.TEXT]: TextElementOperate,
  [ElementTypes.SHAPE]: ShapeElementOperate,
  [ElementTypes.LINE]: LineElementOperate,
  [ElementTypes.CHART]: ChartElementOperate,
  [ElementTypes.TABLE]: TableElementOperate,
  DEFAULT: (props: any) => null,
};
export interface OperateProps {
  isActive: boolean;
  isSelected: boolean;
  isMultiSelect: boolean;
  isActiveGroupElement: boolean;
  rotateElement: (params: PPTElement) => void;
  scaleElement: (
    e: React.MouseEvent,
    element: PPTElement,
    command: OperateResizeHandler,
  ) => void;
  dragLineElement: (
    e: React.MouseEvent,
    element: PPTLineElement,
    command: OperateLineHandler,
  ) => void;
  openLinkDialog: () => void;
  elementInfo: PPTElement & { height?: number; rotate?: number };
}

const Operate: React.FC<OperateProps> = (props) => {
  const {
    elementInfo,
    isSelected,
    isActiveGroupElement,
    isMultiSelect,
    rotateElement,
    scaleElement,
    dragLineElement,
    isActive,
    openLinkDialog,
  } = props;

  const store = useModel('usePagesModel.index');

  const canvasScale = store.storeData.canvasScale;
  const toolbarState = store.storeData.toolbarState;
  const currentSlide = store.getterData.currentSlide;

  const Component = elementTypeMap[elementInfo.type] || elementTypeMap.DEFAULT;

  const elementIndexInAnimation = (currentSlide.animations || []).findIndex(
    (animation) => animation.elId === elementInfo.id,
  );

  return (
    <div
      style={{
        top: elementInfo.top * canvasScale + 'px',
        left: elementInfo.left * canvasScale + 'px',
        transform: `rotate(${elementInfo.rotate}deg)`,
        transformOrigin: `${(elementInfo.width * canvasScale) / 2}px ${
          (elementInfo?.height || 0 * canvasScale) / 2
        }px`,
      }}
      className={classNames(operatePrefixCls(), {
        [operatePrefixCls('multi-select')]: false,
      })}
    >
      <DisplayView display={isSelected}>
        <Component
          elementInfo={elementInfo}
          scaleElement={scaleElement}
          isMultiSelect={isMultiSelect}
          rotateElement={rotateElement}
          dragLineElement={dragLineElement}
          isActiveGroupElement={isActiveGroupElement}
        />
      </DisplayView>
      <DisplayView
        display={
          toolbarState === 'elAnimation' && elementIndexInAnimation !== -1
        }
      >
        <div className={operatePrefixCls('animation-index')}>
          {elementIndexInAnimation + 1}
        </div>
      </DisplayView>
      <DisplayView display={Boolean(isActive && elementInfo.link)}>
        <LinkHandler
          elementInfo={elementInfo}
          openLinkDialog={openLinkDialog}
        />
      </DisplayView>
    </div>
  );
};

export default Operate;
