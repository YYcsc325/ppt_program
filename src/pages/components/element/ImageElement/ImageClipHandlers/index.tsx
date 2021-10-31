import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import useGetter from '@/hooks/useGetter';
import { ACTION_KEYS } from '@/config/actionHotKey';
import SvgWrapper from '@/components/SvgWrapper';
import {
  ImageClipData,
  ImageClipDataRange,
  ImageClipedEmitData,
} from '@/types/edit';

import styles from './index.less';

const prefixCls = utils.createPrefixCls('image-clip-handler', styles, 'ppt');

export interface ImageClipHandlersProps {
  className?: string;
  src: string;
  clipData?: ImageClipData;
  clipPath: string;
  width: number;
  height: number;
  top: number;
  left: number;
  handleClip: (params: any) => void;
}

const initPositionStyleState = {
  top: '0',
  left: '0',
};

const initTopImgWrapperPosition = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
};

type ScaleClipRangeType = 't-l' | 't-r' | 'b-l' | 'b-r';

function reducer(state: any, data: any) {
  return { ...state, ...data };
}

const ImageClipHandlers: React.FC<ImageClipHandlersProps> = (props) => {
  const store = useModel('usePagesModel.index');
  const getter = useGetter();

  const canvasScale = store.storeData.canvasScale;
  const ctrlOrShiftKeyActive = getter.ctrlOrShiftKeyActive;

  const [clipWrapperPositionStyle, dispatchClipPosStyle] = React.useReducer(
    reducer,
    initPositionStyleState,
  );

  // 顶层图片容器位置大小（裁剪高亮区域）
  const [topImgWrapperPosition, dispatchTopImgPos] = React.useReducer(
    reducer,
    initTopImgWrapperPosition,
  );

  const [isSettingClipRange, dispatchClipRange] = React.useState(false);
  const [currentRange, dispatchCurrentRange] =
    React.useState<ImageClipDataRange>(null as any);

  // 获取裁剪区域信息（裁剪区域占原图的宽高比例，处在原图中的位置）
  const getClipDataTransformInfo = React.useMemo(() => {
    const [start, end] = props.clipData
      ? props.clipData.range
      : [
          [0, 0],
          [100, 100],
        ];

    const widthScale = (end[0] - start[0]) / 100;
    const heightScale = (end[1] - start[1]) / 100;
    const left = start[0] / widthScale;
    const top = start[1] / heightScale;

    return { widthScale, heightScale, left, top };
  }, [props.clipData]);

  // 底层图片位置大小（遮罩区域图片）
  const imgPosition = React.useMemo(() => {
    const { widthScale, heightScale, left, top } = getClipDataTransformInfo;
    return {
      left: -left,
      top: -top,
      width: 100 / widthScale,
      height: 100 / heightScale,
    };
  }, [getClipDataTransformInfo]);

  // 底层图片位置大小样式（遮罩区域图片）
  const bottomImgPositionStyle = React.useMemo(() => {
    return {
      top: imgPosition.top + '%',
      left: imgPosition.left + '%',
      width: imgPosition.width + '%',
      height: imgPosition.height + '%',
    };
  }, [imgPosition]);

  // 顶层图片容器位置大小样式（裁剪高亮区域）
  const topImgWrapperPositionStyle = React.useMemo(() => {
    return {
      top: topImgWrapperPosition.top + '%',
      left: topImgWrapperPosition.left + '%',
      width: topImgWrapperPosition.width + '%',
      height: topImgWrapperPosition.height + '%',
    };
  }, [topImgWrapperPosition]);

  // 顶层图片位置大小样式（裁剪区域图片）
  const topImgPositionStyle = React.useMemo(() => {
    const bottomWidth = imgPosition.width;
    const bottomHeight = imgPosition.height;

    const topLeft = topImgWrapperPosition.left;
    const topTop = topImgWrapperPosition.top;
    const topWidth = topImgWrapperPosition.width;
    const topHeight = topImgWrapperPosition.height;

    return {
      left: -topLeft * (100 / topWidth) + '%',
      top: -topTop * (100 / topHeight) + '%',
      width: (bottomWidth / topWidth) * 100 + '%',
      height: (bottomHeight / topHeight) * 100 + '%',
    };
  }, [imgPosition, topImgWrapperPosition]);

  // 初始化裁剪位置信息
  const initClipPosition = () => {
    const { left, top } = getClipDataTransformInfo;
    dispatchTopImgPos({ left, top, width: 100, height: 100 });
    dispatchClipPosStyle({ top: -top + '%', left: -left + '%' });
  };

  // 执行裁剪：计算裁剪后的图片位置大小和裁剪信息，并将数据同步出去
  const handleClip = () => {
    if (isSettingClipRange) return;

    if (!currentRange) {
      props.handleClip(null);
      return;
    }

    const { left, top } = getClipDataTransformInfo;

    const position = {
      left: ((topImgWrapperPosition.left - left) / 100) * props.width,
      top: ((topImgWrapperPosition.top - top) / 100) * props.height,
      width: ((topImgWrapperPosition.width - 100) / 100) * props.width,
      height: ((topImgWrapperPosition.height - 100) / 100) * props.height,
    };

    const clipedEmitData: ImageClipedEmitData = {
      range: currentRange,
      position,
    };
    props.handleClip(clipedEmitData);
  };

  // 快捷键监听：回车确认裁剪
  const keyboardListener = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    if (key === ACTION_KEYS.ENTER) handleClip();
  };

  React.useEffect(() => {
    initClipPosition();
    document.addEventListener('keydown', keyboardListener);
    return () => {
      document.removeEventListener('keydown', keyboardListener);
    };
  }, []);

  // 计算并更新裁剪区域范围数据
  const updateRange = () => {
    const retPosition = {
      left: parseInt(topImgPositionStyle.left),
      top: parseInt(topImgPositionStyle.top),
      width: parseInt(topImgPositionStyle.width),
      height: parseInt(topImgPositionStyle.height),
    };

    const widthScale = 100 / retPosition.width;
    const heightScale = 100 / retPosition.height;

    const start: [number, number] = [
      -retPosition.left * widthScale,
      -retPosition.top * heightScale,
    ];
    const end: [number, number] = [
      widthScale * 100 + start[0],
      heightScale * 100 + start[1],
    ];

    dispatchCurrentRange([start, end]);
  };

  // 移动裁剪区域
  const moveClipRange = (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatchClipRange(true);
    let isMouseDown = true;

    const startPageX = e.pageX;
    const startPageY = e.pageY;
    const bottomPosition = imgPosition;

    const originPositopn = {
      left: topImgWrapperPosition.left,
      top: topImgWrapperPosition.top,
      width: topImgWrapperPosition.width,
      height: topImgWrapperPosition.height,
    };

    document.onmousemove = (e) => {
      if (!isMouseDown) return;

      const currentPageX = e.pageX;
      const currentPageY = e.pageY;

      const moveX =
        ((currentPageX - startPageX) / canvasScale / props.width) * 100;
      const moveY =
        ((currentPageY - startPageY) / canvasScale / props.height) * 100;

      let targetLeft = originPositopn.left + moveX;
      let targetTop = originPositopn.top + moveY;

      if (targetLeft < 0) targetLeft = 0;
      else if (targetLeft + originPositopn.width > bottomPosition.width) {
        targetLeft = bottomPosition.width - originPositopn.width;
      }
      if (targetTop < 0) targetTop = 0;
      else if (targetTop + originPositopn.height > bottomPosition.height) {
        targetTop = bottomPosition.height - originPositopn.height;
      }

      dispatchTopImgPos({ left: targetLeft, top: targetTop });
    };

    document.onmouseup = () => {
      isMouseDown = false;
      document.onmousemove = null;
      document.onmouseup = null;

      updateRange();

      setTimeout(() => {
        dispatchClipRange(false);
      }, 0);
    };
  };

  // 缩放裁剪区域
  const scaleClipRange = (e: React.MouseEvent, type: ScaleClipRangeType) => {
    e.stopPropagation();

    dispatchClipRange(true);
    let isMouseDown = true;

    const minWidth = (50 / props.width) * 100;
    const minHeight = (50 / props.height) * 100;

    const startPageX = e.pageX;
    const startPageY = e.pageY;
    const bottomPosition = imgPosition;

    const originPositopn = {
      left: topImgWrapperPosition.left,
      top: topImgWrapperPosition.top,
      width: topImgWrapperPosition.width,
      height: topImgWrapperPosition.height,
    };

    const aspectRatio =
      topImgWrapperPosition.width / topImgWrapperPosition.height;

    document.onmousemove = (e) => {
      if (!isMouseDown) return;

      const currentPageX = e.pageX;
      const currentPageY = e.pageY;

      let moveX =
        ((currentPageX - startPageX) / canvasScale / props.width) * 100;
      let moveY =
        ((currentPageY - startPageY) / canvasScale / props.height) * 100;

      if (ctrlOrShiftKeyActive) {
        if (type === 'b-r' || type === 't-l') moveY = moveX / aspectRatio;
        if (type === 'b-l' || type === 't-r') moveY = -moveX / aspectRatio;
      }

      let targetLeft, targetTop, targetWidth, targetHeight;

      if (type === 't-l') {
        if (originPositopn.left + moveX < 0) {
          moveX = -originPositopn.left;
        }
        if (originPositopn.top + moveY < 0) {
          moveY = -originPositopn.top;
        }
        if (originPositopn.width - moveX < minWidth) {
          moveX = originPositopn.width - minWidth;
        }
        if (originPositopn.height - moveY < minHeight) {
          moveY = originPositopn.height - minHeight;
        }
        targetWidth = originPositopn.width - moveX;
        targetHeight = originPositopn.height - moveY;
        targetLeft = originPositopn.left + moveX;
        targetTop = originPositopn.top + moveY;
      } else if (type === 't-r') {
        if (
          originPositopn.left + originPositopn.width + moveX >
          bottomPosition.width
        ) {
          moveX =
            bottomPosition.width - (originPositopn.left + originPositopn.width);
        }
        if (originPositopn.top + moveY < 0) {
          moveY = -originPositopn.top;
        }
        if (originPositopn.width + moveX < minWidth) {
          moveX = minWidth - originPositopn.width;
        }
        if (originPositopn.height - moveY < minHeight) {
          moveY = originPositopn.height - minHeight;
        }
        targetWidth = originPositopn.width + moveX;
        targetHeight = originPositopn.height - moveY;
        targetLeft = originPositopn.left;
        targetTop = originPositopn.top + moveY;
      } else if (type === 'b-l') {
        if (originPositopn.left + moveX < 0) {
          moveX = -originPositopn.left;
        }
        if (
          originPositopn.top + originPositopn.height + moveY >
          bottomPosition.height
        ) {
          moveY =
            bottomPosition.height -
            (originPositopn.top + originPositopn.height);
        }
        if (originPositopn.width - moveX < minWidth) {
          moveX = originPositopn.width - minWidth;
        }
        if (originPositopn.height + moveY < minHeight) {
          moveY = minHeight - originPositopn.height;
        }
        targetWidth = originPositopn.width - moveX;
        targetHeight = originPositopn.height + moveY;
        targetLeft = originPositopn.left + moveX;
        targetTop = originPositopn.top;
      } else if (type === 'b-r') {
        if (
          originPositopn.left + originPositopn.width + moveX >
          bottomPosition.width
        ) {
          moveX =
            bottomPosition.width - (originPositopn.left + originPositopn.width);
        }
        if (
          originPositopn.top + originPositopn.height + moveY >
          bottomPosition.height
        ) {
          moveY =
            bottomPosition.height -
            (originPositopn.top + originPositopn.height);
        }
        if (originPositopn.width + moveX < minWidth) {
          moveX = minWidth - originPositopn.width;
        }
        if (originPositopn.height + moveY < minHeight) {
          moveY = minHeight - originPositopn.height;
        }
        targetWidth = originPositopn.width + moveX;
        targetHeight = originPositopn.height + moveY;
        targetLeft = originPositopn.left;
        targetTop = originPositopn.top;
      } else if (type === 't') {
        if (originPositopn.top + moveY < 0) {
          moveY = -originPositopn.top;
        }
        if (originPositopn.height - moveY < minHeight) {
          moveY = originPositopn.height - minHeight;
        }
        targetWidth = originPositopn.width;
        targetHeight = originPositopn.height - moveY;
        targetLeft = originPositopn.left;
        targetTop = originPositopn.top + moveY;
      } else if (type === 'b') {
        if (
          originPositopn.top + originPositopn.height + moveY >
          bottomPosition.height
        ) {
          moveY =
            bottomPosition.height -
            (originPositopn.top + originPositopn.height);
        }
        if (originPositopn.height + moveY < minHeight) {
          moveY = minHeight - originPositopn.height;
        }
        targetWidth = originPositopn.width;
        targetHeight = originPositopn.height + moveY;
        targetLeft = originPositopn.left;
        targetTop = originPositopn.top;
      } else if (type === 'l') {
        if (originPositopn.left + moveX < 0) {
          moveX = -originPositopn.left;
        }
        if (originPositopn.width - moveX < minWidth) {
          moveX = originPositopn.width - minWidth;
        }
        targetWidth = originPositopn.width - moveX;
        targetHeight = originPositopn.height;
        targetLeft = originPositopn.left + moveX;
        targetTop = originPositopn.top;
      } else {
        if (
          originPositopn.left + originPositopn.width + moveX >
          bottomPosition.width
        ) {
          moveX =
            bottomPosition.width - (originPositopn.left + originPositopn.width);
        }
        if (originPositopn.width + moveX < minWidth) {
          moveX = minWidth - originPositopn.width;
        }
        targetHeight = originPositopn.height;
        targetWidth = originPositopn.width + moveX;
        targetLeft = originPositopn.left;
        targetTop = originPositopn.top;
      }

      dispatchTopImgPos({
        left: targetLeft,
        top: targetTop,
        width: targetWidth,
        height: targetHeight,
      });
    };

    document.onmouseup = () => {
      isMouseDown = false;
      document.onmousemove = null;
      document.onmouseup = null;

      updateRange();

      setTimeout(() => dispatchClipRange(false), 0);
    };
  };

  return (
    <div className={prefixCls()} style={clipWrapperPositionStyle}>
      <img
        src={props.src}
        alt=""
        className={prefixCls('bottom-img')}
        draggable={false}
        style={bottomImgPositionStyle}
      />
      <div
        className={prefixCls('top-image-content')}
        style={{
          ...topImgWrapperPositionStyle,
          clipPath: props.clipPath,
        }}
      >
        <img
          src={props.src}
          alt=""
          className={prefixCls('top-img')}
          draggable={false}
          style={topImgPositionStyle}
        />
      </div>
      <div
        className={prefixCls('operate')}
        style={topImgWrapperPositionStyle}
        onMouseDown={moveClipRange}
      >
        {['t-l', 't-r', 'b-l', 'b-r'].map((item: any) => {
          return (
            <div
              key={item}
              className={classNames(prefixCls('clip-point'), prefixCls(item))}
              onMouseDown={(e) => scaleClipRange(e, item)}
            >
              <SvgWrapper width={16} height={16} fill="#fff" stroke="#333">
                <path
                  stroke-width="0.3"
                  shape-rendering="crispEdges"
                  d="M 16 0 L 0 0 L 0 16 L 4 16 L 4 4 L 16 4 L 16 0 Z"
                ></path>
              </SvgWrapper>
            </div>
          );
        })}
        {['t', 'b', 'l', 'r'].map((item: any) => {
          return (
            <div
              key={item}
              className={classNames(prefixCls('clip-point'), prefixCls(item))}
              onMouseDown={(e) => scaleClipRange(e, item)}
            >
              <SvgWrapper width={16} height={16} fill="#fff" stroke="#333">
                <path
                  stroke-width="0.3"
                  shape-rendering="crispEdges"
                  d="M 16 0 L 0 0 L 0 4 L 16 4 Z"
                ></path>
              </SvgWrapper>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageClipHandlers;
