import { useModel } from 'umi';

export default () => {
  const pagesModel = useModel(
    'usePagesModel.index',
    ({ storeData, setCanvasPercentage }) => ({
      setCanvasPercentage,
      canvasPercentage: storeData.canvasPercentage,
    }),
  );

  /**
   * 缩放画布百分比
   * @param command 缩放命令：放大、缩小
   */
  const scaleCanvas = (command: '+' | '-') => {
    let percentage = pagesModel?.canvasPercentage;
    const step = 5;
    const max = 120;
    const min = 60;
    if (command === '+' && percentage <= max) percentage += step;
    if (command === '-' && percentage >= min) percentage -= step;
    pagesModel.setCanvasPercentage(percentage);
  };

  /**
   * 设置画笔百分比
   * @param percentage 百分比（小数形式，如0.8）
   */
  const setCanvasPercentage = (percentage: number) => {
    pagesModel.setCanvasPercentage(percentage);
  };

  return {
    scaleCanvas,
    setCanvasPercentage,
  };
};
