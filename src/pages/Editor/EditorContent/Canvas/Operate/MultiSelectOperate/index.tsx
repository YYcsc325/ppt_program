import React from 'react';
import { useModel } from 'umi';
import { utils } from 'react-dtcomponents';
import { PPTElement } from '@/types/slides';
import DisplayView from '@/components/DisplayView';
import { getElementListRange } from '@/utils/element';
import { OperateResizeHandler, MultiSelectRange } from '@/types/edit';

import styles from './index.less';
import BorderLine from '../BorderLine';
import ResizeHandler from '../ResizeHandler';
import useCommonOperate from '../../hooks/useCommonOperate';

export interface MultiSelectOperateProps {
  elementList: PPTElement[];
  scaleMultiElement: (
    e: React.MouseEvent,
    range: MultiSelectRange,
    command: OperateResizeHandler | string,
  ) => void;
}

const multiSelectOperatePrefixCls = utils.createPrefixCls(
  'multi-select-operate',
  styles,
  'ppt',
);

const MultiSelectOperate: React.FC<MultiSelectOperateProps> = ({
  elementList,
  scaleMultiElement,
}) => {
  const store = useModel('usePagesModel.index');

  const activeElementIdList = store.storeData.activeElementIdList;
  const canvasScale = store.storeData.canvasScale;
  const localActiveElementList = elementList.filter((el) =>
    activeElementIdList.includes(el.id),
  );

  const [range, setRange] = React.useState({
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  });

  // 根据多选元素整体在画布中的范围，计算边框线和缩放点的位置信息
  const width = (range.maxX - range.minX) * canvasScale;
  const height = (range.maxY - range.minY) * canvasScale;
  const { resizeHandlers, borderLines } = useCommonOperate(width, height);

  // 计算多选元素整体在画布中的范围
  React.useEffect(() => {
    const { minX, maxX, minY, maxY } = getElementListRange(
      localActiveElementList,
    );
    setRange({ minX, maxX, minY, maxY });
  }, [localActiveElementList]);

  // 禁用多选状态下缩放：仅未旋转的图片和形状可以在多选状态下缩放
  const disableResize = localActiveElementList.some((item) => {
    if ((item.type === 'image' || item.type === 'shape') && !item.rotate)
      return false;
    return true;
  });

  return (
    <div
      className={multiSelectOperatePrefixCls()}
      style={{
        left: range.minX * canvasScale + 'px',
        top: range.minY * canvasScale + 'px',
      }}
    >
      {borderLines.map((line, index) => {
        return (
          <BorderLine
            key={line.type}
            type={line.type}
            style={line.style}
            isWide={false}
          />
        );
      })}
      <DisplayView display={disableResize}>
        {resizeHandlers.map((point) => {
          return (
            <ResizeHandler
              key={point.direction}
              type={point.direction}
              style={point.style}
              onMouseDown={(e) => {
                e.stopPropagation();
                scaleMultiElement(e, range, point.direction);
              }}
            />
          );
        })}
      </DisplayView>
    </div>
  );
};

export default MultiSelectOperate;
