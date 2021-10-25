import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { PPTElement } from '@/types/slides';
import { OperateResizeHandler } from '@/types/edit';
import DisplayView from '@/components/DisplayView';

import BorderLine from '../BorderLine';
import ResizeHandler from '../ResizeHandler';
import useCommonOperate from '../../hooks/useCommonOperate';
import styles from './index.less';

const prefixCls = utils.createPrefixCls('chart-element-operate', styles, 'ppt');

export interface ChartElementOperateProps {
  style?: React.CSSProperties;
  className?: string;
  elementInfo: PPTElement & { height?: number; rotate?: number };
  isMultiSelect: boolean;
  isActiveGroupElement: boolean;
  scaleElement: (
    e: React.MouseEvent,
    element: PPTElement,
    command: OperateResizeHandler,
  ) => void;
}

const ChartElementOperate: React.FC<ChartElementOperateProps> = (props) => {
  const {
    className,
    style,
    elementInfo,
    isActiveGroupElement,
    isMultiSelect,
    scaleElement,
  } = props;

  const store = useModel('usePagesModel.index');
  const canvasScale = store.storeData.canvasScale;

  const scaleWidth = elementInfo.width || 0 * canvasScale;
  const scaleHeight = elementInfo.height || 0 * canvasScale;
  const { resizeHandlers, borderLines } = useCommonOperate(
    scaleWidth,
    scaleHeight,
  );

  return (
    <div className={classNames(prefixCls(), className)} style={style}>
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
      </DisplayView>
    </div>
  );
};

export default ChartElementOperate;
