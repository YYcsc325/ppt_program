import { useModel } from 'umi';
import { throttle } from 'lodash';
import React, { useRef } from 'react';
import { utils } from 'react-dtcomponents';

import { KEYS } from '@/config/hotKey';
import { PPTElement } from '@/types/slides';
import { removeAllRanges } from '@/utils/selection';

import useScaleCanvas from '@/hooks/useScaleCanvas';
// import useSlideHandler from '@/hooks/useSlideHandler';
import useGetter from '@/hooks/useGetter';

import Operate from './Operate';
import AlignmentLine from './AlignmentLine';
import MouseSelection from './MouseSelection';
import MultiSelectOperate from './MultiSelectOperate';
import ViewportBackground from './ViewportBackground';
import EditableElement from './EditableElement';
import ElementCreateSelection from './ElementCreateSelection';

import useMouseSelection from './hooks/useMouseSelection';

import styles from './index.less';

const canvasPrefixCls = utils.createPrefixCls('canvas', styles, 'ppt');

const Canvas: React.FC = () => {
  const canvasRef = useRef(null);
  const viewportRef = useRef(null);
  const elementList = useRef<PPTElement[]>([]);

  const pagesModel = useModel(
    'usePagesModel.index',
    ({ storeData, setActiveElementIdList, setEditorAreaFocus }) => ({
      setActiveElementIdList,
      setEditorAreaFocus,
      ctrlKeyState: storeData.ctrlKeyState,
      editorAreaFocus: storeData.editorAreaFocus,
    }),
  );

  const canvasRemarkModel = useModel('useCanvasRemarkModel.index');

  const gettterHook = useGetter();

  // const { mouseSelectionState, updateMouseSelection } = useMouseSelection(
  //   elementList,
  //   viewportRef,
  // );

  // 滚动鼠标
  const { scaleCanvas } = useScaleCanvas();
  // const { updateSlideIndex } = useSlideHandler?.();

  const throttleScaleCanvas = throttle(scaleCanvas, 100, {
    leading: true,
    trailing: false,
  });

  // const throttleUpdateSlideIndex = throttle(updateSlideIndex, 300, {
  //   leading: true,
  //   trailing: false,
  // });

  // // 点击画布的空白区域：清空焦点元素、设置画布焦点、清除文字选区
  const handleClickBlankArea = (e: React.MouseEvent) => {
    pagesModel.setActiveElementIdList([]);
    // if (!gettterHook?.ctrlOrShiftKeyActive) updateMouseSelection(e);
    if (!pagesModel.editorAreaFocus) pagesModel.setEditorAreaFocus(true);
    removeAllRanges();
  };

  const handleMousewheelCanvas = (e: React.WheelEvent) => {
    e.preventDefault();

    // 按住Ctrl键时：缩放画布
    if (pagesModel.ctrlKeyState) {
      if (e.deltaY > 0) throttleScaleCanvas('-');
      else if (e.deltaY < 0) throttleScaleCanvas('+');
    }
    // 上下翻页
    else {
      // if (e.deltaY > 0) throttleUpdateSlideIndex(KEYS.DOWN);
      // else if (e.deltaY < 0) throttleUpdateSlideIndex(KEYS.UP);
    }
  };

  return (
    <div
      ref={canvasRef}
      className={canvasPrefixCls()}
      style={{
        height: `calc(100% - ${canvasRemarkModel.canvasRemarkHeight + 40}px)`,
      }}
      onWheel={handleMousewheelCanvas}
      onMouseDown={handleClickBlankArea}
    >
      <ElementCreateSelection />
      <div className={canvasPrefixCls('viewport-wrapper')}>
        <div className={canvasPrefixCls('operates')}>
          <AlignmentLine />
          <MultiSelectOperate />
          <Operate />
          <ViewportBackground />
        </div>
        <div className={canvasPrefixCls('viewport')} ref={viewportRef}>
          <MouseSelection />
          <EditableElement />
        </div>
      </div>
    </div>
  );
};

export default Canvas;
