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

const prefixCls = utils.createPrefixCls('table-element-operate', styles, 'ppt');

export interface TableElementOperateProps {
  className?: string;
  style?: React.CSSProperties;
  elementInfo: PPTElement & { height?: number; rotate?: number };
  isMultiSelect: boolean;
  scaleElement: (
    e: React.MouseEvent,
    element: PPTElement,
    command: OperateResizeHandler,
  ) => void;
  isActiveGroupElement: boolean;
}

const TableElementOperate: React.FC<TableElementOperateProps> = (props) => {
  const {
    elementInfo,
    className,
    style,
    isActiveGroupElement,
    isMultiSelect,
    scaleElement,
  } = props;

  const store = useModel('usePagesModel.index');

  const canvasScale = store.storeData.canvasScale;

  const scaleWidth = elementInfo?.width || 0 * canvasScale;
  const scaleHeight = elementInfo?.height || 0 * canvasScale;

  const { textElementResizeHandlers, borderLines } = useCommonOperate(
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
        {textElementResizeHandlers.map((point) => {
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

export default TableElementOperate;
