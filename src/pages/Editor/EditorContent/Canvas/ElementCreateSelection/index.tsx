import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import SvgWrapper from '@/components/SvgWrapper';
import DisplayView from '@/components/DisplayView';
import { CreateElementSelectionData } from '@/types/edit';

import styles from './index.less';

const elementCreatePrefixCls = utils.createPrefixCls(
  'element-create',
  styles,
  'ppt',
);

export interface ElementCreateSelectionProps {
  onChange: (params: CreateElementSelectionData) => void;
}

const ElementCreateSelection: React.FC<ElementCreateSelectionProps> = ({
  onChange,
}) => {
  const store = useModel('usePagesModel.index');
  const getter = useModel('useGetterModel.index');

  const ctrlOrShiftKeyActive = getter.ctrlOrShiftKeyActive();
  const creatingElement = store.storeData.creatingElement;

  const selectionRef = React.useRef<any>(null);

  const [start, setStart] = React.useState<[number, number]>();
  const [end, setEnd] = React.useState<[number, number]>();
  const [offset, setOffset] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    if (!selectionRef.current) return;
    const { x, y } = selectionRef.current.getBoundingClientRect();
    setOffset({
      x,
      y,
    });
  }, []);

  // 鼠标拖动创建元素生成位置大小
  // 获取范围的起始位置和终点位置
  const createSelection = (e: React.MouseEvent) => {
    let isMouseDown = true;

    const startPageX = e.pageX;
    const startPageY = e.pageY;
    setStart([startPageX, startPageY]);

    document.onmousemove = (e) => {
      if (!creatingElement || !isMouseDown) return;

      let currentPageX = e.pageX;
      let currentPageY = e.pageY;

      // 按住Ctrl键或者Shift键时：
      // 对于非线条元素需要锁定宽高比例，对于线条元素需要锁定水平或垂直方向
      if (ctrlOrShiftKeyActive) {
        const moveX = currentPageX - startPageX;
        const moveY = currentPageY - startPageY;

        // 水平和垂直方向的拖动距离，后面以拖动距离较大的方向为基础计算另一方向的数据
        const absX = Math.abs(moveX);
        const absY = Math.abs(moveY);

        if (creatingElement.type === 'shape') {
          // 判断是否为反向拖动：从左上到右下为正向操作，此外所有情况都是反向操作
          const isOpposite =
            (moveY > 0 && moveX < 0) || (moveY < 0 && moveX > 0);

          if (absX > absY) {
            currentPageY = isOpposite ? startPageY - moveX : startPageY + moveX;
          } else {
            currentPageX = isOpposite ? startPageX - moveY : startPageX + moveY;
          }
        } else if (creatingElement.type === 'line') {
          if (absX > absY) currentPageY = startPageY;
          else currentPageX = startPageX;
        }
      }
      setEnd([currentPageX, currentPageY]);
    };

    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
      isMouseDown = false;

      const endPageX = e.pageX;
      const endPageY = e.pageY;

      const minSize = 30;

      if (
        creatingElement?.type === 'line' &&
        (Math.abs(endPageX - startPageX) >= minSize ||
          Math.abs(endPageY - startPageY) >= minSize)
      ) {
        onChange({
          start,
          end,
        } as CreateElementSelectionData);
      } else if (
        creatingElement?.type !== 'line' &&
        Math.abs(endPageX - startPageX) >= minSize &&
        Math.abs(endPageY - startPageY) >= minSize
      ) {
        onChange({
          start,
          end,
        } as CreateElementSelectionData);
      } else {
        const defaultSize = 200;
        const minX = Math.min(endPageX, startPageX);
        const minY = Math.min(endPageY, startPageY);
        const maxX = Math.max(endPageX, startPageX);
        const maxY = Math.max(endPageY, startPageY);
        const offsetX = maxX - minX >= minSize ? maxX - minX : defaultSize;
        const offsetY = maxY - minY >= minSize ? maxY - minY : defaultSize;
        onChange({
          start: [minX, minY],
          end: [minX + offsetX, minY + offsetY],
        } as CreateElementSelectionData);
      }
    };
  };

  /** 绘制线条的路径相关数据（仅当绘制元素类型为线条时使用）*/
  const lineData = React.useMemo(() => {
    if (!start || !end) return null;
    if (!creatingElement || creatingElement.type !== 'line') return null;

    const [_startX, _startY] = start;
    const [_endX, _endY] = end;

    const minX = Math.min(_startX, _endX);
    const maxX = Math.max(_startX, _endX);
    const minY = Math.min(_startY, _endY);
    const maxY = Math.max(_startY, _endY);

    const svgWidth = maxX - minX >= 24 ? maxX - minX : 24;
    const svgHeight = maxY - minY >= 24 ? maxY - minY : 24;

    const startX = _startX === minX ? 0 : maxX - minX;
    const startY = _startY === minY ? 0 : maxY - minY;
    const endX = _endX === minX ? 0 : maxX - minX;
    const endY = _endY === minY ? 0 : maxY - minY;

    const path = `M${startX}, ${startY} L${endX}, ${endY}`;

    return {
      svgWidth,
      svgHeight,
      startX,
      startY,
      endX,
      endY,
      path,
    };
  }, [start, end, creatingElement]);

  /** 根据生成范围的起始位置和终点位置，计算元素创建时的位置和大小 */
  const position = React.useMemo(() => {
    if (!start || !end) return {};

    const [startX, startY] = start;
    const [endX, endY] = end;

    const minX = Math.min(startX, endX);
    const maxX = Math.max(startX, endX);
    const minY = Math.min(startY, endY);
    const maxY = Math.max(startY, endY);

    const width = maxX - minX;
    const height = maxY - minY;

    return {
      left: minX - offset.x + 'px',
      top: minY - offset.y + 'px',
      width: width + 'px',
      height: height + 'px',
    };
  }, [start, end]);

  const selectionVisible = Boolean(start && end);
  const svgWrapperVisible = Boolean(
    creatingElement?.type === 'line' && lineData,
  );

  return (
    <div
      className={classNames(elementCreatePrefixCls(), {
        [elementCreatePrefixCls('no-line')]: creatingElement?.type !== 'line',
      })}
      ref={selectionRef}
      onMouseDown={createSelection}
    >
      <DisplayView display={selectionVisible}>
        <div className={elementCreatePrefixCls('selection')} style={position}>
          <DisplayView display={svgWrapperVisible}>
            <SvgWrapper width={lineData?.svgWidth} height={lineData?.svgHeight}>
              <path
                d={lineData?.path}
                stroke="#d14424"
                fill="none"
                stroke-width="1"
                stroke-linecap
                stroke-linejoin
                stroke-miterlimit
              />
            </SvgWrapper>
          </DisplayView>
        </div>
      </DisplayView>
    </div>
  );
};

export default ElementCreateSelection;
