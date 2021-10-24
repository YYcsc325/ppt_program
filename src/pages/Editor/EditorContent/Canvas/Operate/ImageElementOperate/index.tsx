import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { PPTElement } from '@/types/slides';
import { OperateResizeHandler } from '@/types/edit';
import DisplayView from '@/components/DisplayView';

import BorderLine from '../BorderLine';
import ResizeHandler from '../ResizeHandler';
import RotateHandler from '../RotateHandler';
import useCommonOperate from '../../hooks/useCommonOperate';
import styles from './index.less';

const prefixCls = utils.createPrefixCls('image-element-operate', styles, 'ppt');

export interface ImageElementOperateProps {
  elementInfo: PPTElement & { height?: number; rotate?: number };
  isMultiSelect: boolean;
  rotateElement: (params: PPTElement) => void;
  scaleElement: (
    e: React.MouseEvent,
    element: PPTElement,
    command: OperateResizeHandler,
  ) => void;
  isActiveGroupElement: boolean;
}

const ImageElementOperate: React.FC<ImageElementOperateProps> = (props) => {
  const {
    elementInfo,
    isActiveGroupElement,
    isMultiSelect,
    scaleElement,
    rotateElement,
  } = props;
  const store = useModel('usePagesModel.index');

  const canvasScale = store.storeData.canvasScale;
  const clipingImageElementId = store.storeData.clipingImageElementId;
  const isCliping = clipingImageElementId === elementInfo.id;

  const scaleWidth = elementInfo.width || 0 * canvasScale;
  const scaleHeight = elementInfo.height || 0 * canvasScale;

  const { resizeHandlers, borderLines } = useCommonOperate(
    scaleWidth,
    scaleHeight,
  );

  return (
    <div
      className={classNames(prefixCls(), {
        [prefixCls('cliping')]: isCliping,
      })}
    >
      {borderLines.map((line) => {
        return (
          <BorderLine
            key={line.type}
            type={line.type}
            style={line.style}
            className={prefixCls('operate-border-line')}
          />
        );
      })}
      <DisplayView
        display={!elementInfo.lock && (isActiveGroupElement || !isMultiSelect)}
      >
        {resizeHandlers.map((point) => {
          return (
            <ResizeHandler
              className={prefixCls('operate-resize-handler')}
              key={point.direction}
              type={point.direction}
              rotate={elementInfo.rotate}
              style={point.style}
              onMouseDown={(e) => {
                e.stopPropagation();
                scaleElement(e, elementInfo, point.direction as any);
              }}
            />
          );
        })}
        <RotateHandler
          className={prefixCls('operate-rotate-handler')}
          style={{ left: `${scaleWidth / 2}px` }}
          onMouseDown={(e: React.MouseEvent) => {
            e.stopPropagation();
            rotateElement(elementInfo);
          }}
        />
      </DisplayView>
    </div>
  );
};

export default ImageElementOperate;
