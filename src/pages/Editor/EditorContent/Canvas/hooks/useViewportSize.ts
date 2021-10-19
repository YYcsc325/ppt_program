import { useModel } from 'umi';
import React from 'react';
import { VIEWPORT_SIZE } from '@/config/canvas';

export default (canvasRef: any) => {
  const store = useModel('usePagesModel.index');

  const viewportLeft = React.useRef(0);
  const viewportTop = React.useRef(0);

  const canvasPercentage = store.storeData.canvasPercentage;
  const viewportRatio = store.storeData.viewportRatio;

  // 计算画布可视区域的位置
  const setViewportPosition = () => {
    if (!canvasRef.value) return;
    const canvasWidth = canvasRef.value.clientWidth;
    const canvasHeight = canvasRef.value.clientHeight;

    if (canvasHeight / canvasWidth > viewportRatio) {
      const viewportActualWidth = canvasWidth * (canvasPercentage / 100);
      store.setCanvasScale(viewportActualWidth / VIEWPORT_SIZE);
      viewportLeft.current = (canvasWidth - viewportActualWidth) / 2;
      viewportTop.current =
        (canvasHeight - viewportActualWidth * viewportRatio) / 2;
    } else {
      const viewportActualHeight = canvasHeight * (canvasPercentage / 100);
      store.setCanvasScale(
        viewportActualHeight / (VIEWPORT_SIZE * viewportRatio),
      );
      viewportLeft.current =
        (canvasWidth - viewportActualHeight / viewportRatio) / 2;
      viewportTop.current = (canvasHeight - viewportActualHeight) / 2;
    }
  };

  // 可视区域缩放或比例变化时，更新可视区域的位置
  React.useEffect(() => {
    setViewportPosition();
  }, [canvasPercentage, viewportRatio]);

  // 画布可视区域位置和大小的样式
  const viewportStyles = {
    width: VIEWPORT_SIZE,
    height: VIEWPORT_SIZE * viewportRatio,
    left: viewportLeft.current,
    top: viewportTop.current,
  };

  // 监听画布尺寸发生变化时，更新可视区域的位置
  const resizeObserver = new ResizeObserver(setViewportPosition);

  React.useEffect(() => {
    if (canvasRef.current) resizeObserver.observe(canvasRef.current);
    return () => {
      if (canvasRef.current) resizeObserver.unobserve(canvasRef.current);
    };
  }, []);

  return {
    viewportStyles,
  };
};
