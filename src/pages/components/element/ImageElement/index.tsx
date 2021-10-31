import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { ImageClipedEmitData } from '@/types/edit';
import DisplayView from '@/components/DisplayView';
import useHistorySnapshot from '@/hooks/useHistorySnapshot';
import { ImageElementClip, PPTImageElement } from '@/types/slides';
import { ContextmenuItem } from '@/components/Contextmenu/types';
import useElementFlip from '@/pages/components/element/hooks/useElementFlip';
import useElementShadow from '@/pages/components/element/hooks/useElementShadow';

import ImageClipHandlers from './ImageClipHandlers';
import ImageOutline from './ImageOutline';
import useClipImage from './useClipImage';
import useFilter from './useFilter';
import styles from './index.less';

const prefixCls = utils.createPrefixCls(
  'editable-element-image',
  styles,
  'ppt',
);

export interface ImageElementProps {
  className?: string;
  selectElement: (
    e: React.MouseEvent,
    element: PPTImageElement,
    canMove?: boolean,
  ) => void;
  elementInfo: PPTImageElement;
  contextmenus: ContextmenuItem[];
}

const ImageElement: React.FC<ImageElementProps> = (props) => {
  const { className, elementInfo } = props;

  const store = useModel('usePagesModel.index');
  const clipingImageElementId = store.storeData.clipingImageElementId;
  const isCliping = clipingImageElementId === props.elementInfo.id;

  const { addHistorySnapshot } = useHistorySnapshot();

  const shadow = props.elementInfo.shadow;
  const { shadowStyle } = useElementShadow(shadow);

  const flipH = props.elementInfo.flipH;
  const flipV = props.elementInfo.flipV;
  const { flipStyle } = useElementFlip(flipH, flipV);

  const clip = props.elementInfo.clip;
  const { clipShape, imgPosition } = useClipImage(clip);

  const filters = props.elementInfo.filters;
  const { filter } = useFilter(filters);

  const handleSelectElement = (e: React.MouseEvent) => {
    if (props.elementInfo.lock) return;
    e.stopPropagation();
    props.selectElement(e, props.elementInfo);
  };

  const handleClip = (data: ImageClipedEmitData) => {
    store.setClipingImageElementId('');

    if (!data) return;

    const { range, position } = data;
    const originClip: ImageElementClip = props.elementInfo.clip || {
      shape: 'rect',
      range: [
        [0, 0],
        [100, 100],
      ],
    };

    const _props = {
      clip: { ...originClip, range },
      left: props.elementInfo.left + position.left,
      top: props.elementInfo.top + position.top,
      width: props.elementInfo.width + position.width,
      height: props.elementInfo.height + position.height,
    };
    store.updateElement({ id: props.elementInfo.id, props: _props });

    addHistorySnapshot();
  };

  return (
    <div
      className={classNames(prefixCls(), className)}
      style={{
        top: elementInfo.top + 'px',
        left: elementInfo.left + 'px',
        width: elementInfo.width + 'px',
        height: elementInfo.height + 'px',
      }}
    >
      <div
        className={prefixCls('rotate-wrapper')}
        style={{ transform: `rotate(${elementInfo.rotate}deg)` }}
      >
        <DisplayView display={isCliping}>
          <ImageClipHandlers
            src={elementInfo.src}
            clipData={elementInfo.clip}
            width={elementInfo.width}
            height={elementInfo.height}
            top={elementInfo.top}
            left={elementInfo.left}
            clipPath={clipShape.style}
            handleClip={handleClip}
          />
        </DisplayView>
        <DisplayView display={!isCliping}>
          <div
            className={classNames(prefixCls('element-content'), {
              [prefixCls('lock')]: elementInfo.lock,
            })}
            style={{
              filter: shadowStyle ? `drop-shadow(${shadowStyle})` : '',
              transform: flipStyle,
            }}
            // 缺少context
            onMouseDown={handleSelectElement}
          >
            <ImageOutline elementInfo={elementInfo} />
            <div
              className={prefixCls('image-content')}
              style={{ clipPath: clipShape.style }}
            >
              <img
                src={elementInfo.src}
                alt=""
                style={{
                  top: imgPosition.top,
                  left: imgPosition.left,
                  width: imgPosition.width,
                  height: imgPosition.height,
                  filter: filter,
                }}
              />
            </div>
          </div>
        </DisplayView>
      </div>
    </div>
  );
};

export default ImageElement;
