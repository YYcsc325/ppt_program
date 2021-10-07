import React, { useRef } from 'react';
import { useModel } from 'umi';
import { utils } from 'react-dtcomponents';
import { throttle } from 'lodash';
import { KEYS } from '@/config/hotKey';

// import useScaleCanvas from '@/models/useScaleCanvas';
// import useSlideHandler from '@/models/useSlideHandler';

import styles from './index.less';

const canvasPrefixCls = utils.createPrefixCls('canvas', styles, 'ppt');

const Canvas: React.FC = () => {
  const canvasRemarkModel = useModel('useCanvasRemarkModel.index');

  const canvasRef = useRef(null);

  // 滚动鼠标
  // const { scaleCanvas } = useScaleCanvas();
  // const { updateSlideIndex } = useSlideHandler();

  // const throttleScaleCanvas = throttle(scaleCanvas, 100, {
  //   leading: true,
  //   trailing: false,
  // });

  // const throttleUpdateSlideIndex = throttle(updateSlideIndex, 300, {
  //   leading: true,
  //   trailing: false,
  // });

  // // 点击画布的空白区域：清空焦点元素、设置画布焦点、清除文字选区
  // const handleClickBlankArea = (e: React.MouseEvent) => {
  //   store.commit(MutationTypes.SET_ACTIVE_ELEMENT_ID_LIST, []);
  //   if (!ctrlOrShiftKeyActive.value) updateMouseSelection(e);
  //   if (!editorAreaFocus.value)
  //     store.commit(MutationTypes.SET_EDITORAREA_FOCUS, true);
  //   removeAllRanges();
  // };

  // const handleMousewheelCanvas = (e: React.WheelEvent) => {
  //   e.preventDefault();

  //   // 按住Ctrl键时：缩放画布
  //   if (ctrlKeyState.value) {
  //     if (e.deltaY > 0) throttleScaleCanvas('-');
  //     else if (e.deltaY < 0) throttleScaleCanvas('+');
  //   }
  //   // 上下翻页
  //   else {
  //     if (e.deltaY > 0) throttleUpdateSlideIndex(KEYS.DOWN);
  //     else if (e.deltaY < 0) throttleUpdateSlideIndex(KEYS.UP);
  //   }
  // };

  return (
    <div
      ref={canvasRef}
      className={canvasPrefixCls()}
      style={{
        height: `calc(100% - ${canvasRemarkModel.canvasRemarkHeight + 40}px)`,
      }}
      // onWheel={handleMousewheelCanvas}
      // onMouseDown={handleClickBlankArea}
    >
      Canvas
    </div>
  );
};

export default Canvas;
