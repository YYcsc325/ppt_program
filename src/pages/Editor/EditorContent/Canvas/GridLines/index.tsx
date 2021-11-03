import React from 'react';
import { useModel } from 'umi';
import tinycolor from 'tinycolor2';
import { utils } from 'react-dtcomponents';
import SvgWrapper from '@/components/SvgWrapper';
import { VIEWPORT_SIZE } from '@/config/canvas';

import styles from './index.less';

const gridLinesPrefixCls = utils.createPrefixCls('grid-lines', styles, 'ppt');

const gridSize = 50;

const GridLines = () => {
  const store = useModel('usePagesModel.index');

  const canvasScale = store.storeData.canvasScale;
  const viewportRatio = store.storeData.viewportRatio;
  const background = store.getterData.currentSlide?.background;

  // 计算网格线的颜色，避免与背景的颜色太接近
  const gridColor = React.useMemo(() => {
    const bgColor = background?.color || '#fff';
    const colorList = ['#000', '#fff'];
    return tinycolor
      .mostReadable(bgColor, colorList, { includeFallbackColors: true })
      .setAlpha(0.5)
      .toRgbString();
  }, [background]);

  // 计算网格路径
  const getPath = () => {
    const maxX = VIEWPORT_SIZE;
    const maxY = VIEWPORT_SIZE * viewportRatio;

    let path = '';
    for (let i = 0; i <= Math.floor(maxY / gridSize); i++) {
      path += `M0 ${i * gridSize} L${maxX} ${i * gridSize} `;
    }
    for (let i = 0; i <= Math.floor(maxX / gridSize); i++) {
      path += `M${i * gridSize} 0 L${i * gridSize} ${maxY} `;
    }
    return path;
  };

  return (
    <SvgWrapper className={gridLinesPrefixCls()}>
      <path
        d={getPath()}
        style={{ transform: `scale(${canvasScale})` }}
        fill="none"
        strokeWidth="0.3"
        strokeDasharray="5"
        stroke={gridColor}
      />
    </SvgWrapper>
  );
};

export default GridLines;
