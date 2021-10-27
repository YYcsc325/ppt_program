import React from 'react';
import { useModel } from 'umi';
import { PPTElement } from '@/types/slides';
import { getElementRange } from '@/utils/element';

const initMouseSelectionState = {
  isShow: false,
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  quadrant: 1,
};

function reducers(state: typeof initMouseSelectionState, data: any) {
  return { ...state, ...data };
}

export default (
  elementList: PPTElement[],
  viewportRef: React.RefObject<HTMLDivElement>,
) => {
  const store = useModel('usePagesModel.index');

  const [state, dispatchState] = React.useReducer(
    reducers,
    initMouseSelectionState,
  );

  // 更新鼠标框选范围
  const updateMouseSelection = (e: React.MouseEvent) => {
    if (!viewportRef.current) return;
    const viewportRect = viewportRef.current.getBoundingClientRect();

    const minSelectionRange = 5;

    const startPageX = e.pageX;
    const startPageY = e.pageY;

    const left = (startPageX - viewportRect.x) / store.storeData.canvasScale;
    const top = (startPageY - viewportRect.y) / store.storeData.canvasScale;

    // 确定框选的起始位置和其他默认值初始化
    dispatchState({
      isShow: false,
      quadrant: 4,
      top,
      left,
      width: 0,
      height: 0,
    });

    document.onmousemove = (ev) => {
      const currentPageX = ev.pageX;
      const currentPageY = ev.pageY;

      const offsetWidth =
        (currentPageX - startPageX) / store.storeData.canvasScale;
      const offsetHeight =
        (currentPageY - startPageY) / store.storeData.canvasScale;

      const width = Math.abs(offsetWidth);
      const height = Math.abs(offsetHeight);

      if (width < minSelectionRange || height < minSelectionRange) return;

      // 计算鼠标框选（移动）的方向
      // 按四个象限的位置区分，如右下角为第四象限
      let quadrant = 0;

      if (offsetWidth > 0 && offsetHeight > 0) quadrant = 4;
      else if (offsetWidth < 0 && offsetHeight < 0) quadrant = 1;
      else if (offsetWidth > 0 && offsetHeight < 0) quadrant = 2;
      else if (offsetWidth < 0 && offsetHeight > 0) quadrant = 3;

      // 更新框选范围
      dispatchState({
        isShow: true,
        quadrant,
        width,
        height,
      });
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      // 计算画布中的元素是否处在鼠标选择范围中，处在范围中的元素设置为被选中状态
      let inRangeElementList: PPTElement[] = [];
      for (let i = 0; i < elementList.length; i++) {
        const element = elementList[i];
        const mouseSelectionLeft = state.left;
        const mouseSelectionTop = state.top;
        const mouseSelectionWidth = state.width;
        const mouseSelectionHeight = state.height;

        const quadrant = state.quadrant;

        const { minX, maxX, minY, maxY } = getElementRange(element);

        // 计算元素是否处在框选范围内时，四个框选方向的计算方式有差异
        let isInclude = false;
        if (quadrant === 4) {
          isInclude =
            minX > mouseSelectionLeft &&
            maxX < mouseSelectionLeft + mouseSelectionWidth &&
            minY > mouseSelectionTop &&
            maxY < mouseSelectionTop + mouseSelectionHeight;
        } else if (quadrant === 1) {
          isInclude =
            minX > mouseSelectionLeft - mouseSelectionWidth &&
            maxX <
              mouseSelectionLeft - mouseSelectionWidth + mouseSelectionWidth &&
            minY > mouseSelectionTop - mouseSelectionHeight &&
            maxY <
              mouseSelectionTop - mouseSelectionHeight + mouseSelectionHeight;
        } else if (quadrant === 2) {
          isInclude =
            minX > mouseSelectionLeft &&
            maxX < mouseSelectionLeft + mouseSelectionWidth &&
            minY > mouseSelectionTop - mouseSelectionHeight &&
            maxY <
              mouseSelectionTop - mouseSelectionHeight + mouseSelectionHeight;
        } else if (quadrant === 3) {
          isInclude =
            minX > mouseSelectionLeft - mouseSelectionWidth &&
            maxX <
              mouseSelectionLeft - mouseSelectionWidth + mouseSelectionWidth &&
            minY > mouseSelectionTop &&
            maxY < mouseSelectionTop + mouseSelectionHeight;
        }

        // 被锁定的元素即使在范围内，也不需要设置为选中状态
        if (isInclude && !element.lock) inRangeElementList.push(element);
      }

      // 如果范围内有组合元素的成员，需要该组全部成员都处在范围内，才会被设置为选中状态
      inRangeElementList = inRangeElementList.filter((inRangeElement) => {
        if (inRangeElement.groupId) {
          const inRangeElementIdList = inRangeElementList.map(
            (inRangeElement) => inRangeElement.id,
          );
          const groupElementList = elementList.filter(
            (element: any) => element.groupId === inRangeElement.groupId,
          );
          return groupElementList.every((groupElement: any) =>
            inRangeElementIdList.includes(groupElement.id),
          );
        }
        return true;
      });
      const inRangeElementIdList = inRangeElementList.map(
        (inRangeElement) => inRangeElement.id,
      );
      if (inRangeElementIdList.length) {
        store.setActiveElementIdList(inRangeElementIdList);
      }
      dispatchState({ isShow: false });
    };
  };

  return {
    mouseSelectionState: state,
    updateMouseSelection,
  };
};
