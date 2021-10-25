import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { PPTLineElement } from '@/types/slides';
import DisplayView from '@/components/DisplayView';
import { OperateLineHandler, OperateLineHandlers } from '@/types/edit';

import ResizeHandler from '../ResizeHandler';
import styles from './index.less';

const prefixCls = utils.createPrefixCls('line-element-operate', styles, 'ppt');

export interface LineElementOperateProps {
  className?: string;
  style?: React.CSSProperties;
  elementInfo: PPTLineElement & { height?: number; rotate?: number };
  isMultiSelect: boolean;
  isActiveGroupElement: boolean;
  dragLineElement: (
    e: React.MouseEvent,
    element: PPTLineElement,
    command: OperateLineHandler,
  ) => void;
}

const LineElementOperate: React.FC<LineElementOperateProps> = (props) => {
  const { isActiveGroupElement, isMultiSelect, elementInfo, dragLineElement } =
    props;

  const store = useModel('usePagesModel.index');
  const canvasScale = store.storeData.canvasScale;

  const resizeHandlers = React.useMemo(() => {
    const handlers = [
      {
        handler: OperateLineHandlers.START,
        style: {
          left: elementInfo.start[0] * canvasScale + 'px',
          top: elementInfo.start[1] * canvasScale + 'px',
        },
      },
      {
        handler: OperateLineHandlers.END,
        style: {
          left: elementInfo.end[0] * canvasScale + 'px',
          top: elementInfo.end[1] * canvasScale + 'px',
        },
      },
    ];

    if (elementInfo.curve || elementInfo.broken) {
      const midHandler = (elementInfo.curve || elementInfo.broken) as [
        number,
        number,
      ];

      handlers.push({
        handler: OperateLineHandlers.MID,
        style: {
          left: midHandler[0] * canvasScale + 'px',
          top: midHandler[1] * canvasScale + 'px',
        },
      });
    }
    return handlers;
  }, [elementInfo, canvasScale]);

  return (
    <div
      className={classNames(prefixCls(), props.className)}
      style={props.style}
    >
      <DisplayView
        display={!elementInfo.lock && (isActiveGroupElement || !isMultiSelect)}
      >
        {resizeHandlers.map((point) => {
          return (
            <ResizeHandler
              className={prefixCls('operate-resize-handler')}
              key={point.handler}
              type={point.handler}
              rotate={elementInfo.rotate}
              style={point.style}
              onMouseDown={(e) => {
                e.stopPropagation();
                dragLineElement(e, elementInfo, point.handler as any);
              }}
            />
          );
        })}
      </DisplayView>
    </div>
  );
};

export default LineElementOperate;
