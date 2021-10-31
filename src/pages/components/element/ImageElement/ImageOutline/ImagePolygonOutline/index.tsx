import React from 'react';
import { utils } from 'react-dtcomponents';
import { PPTElementOutline } from '@/types/slides';
import DisplayView from '@/components/DisplayView';
import SvgWrapper from '@/components/SvgWrapper';

import useElementOutline from '@/pages/components/element/hooks/useElementOutline';

import styles from './index.less';

const prefixCls = utils.createPrefixCls('image-polygon-outline', styles, 'ppt');

export interface ImagePolygonOutlineProps {
  width: number;
  height: number;
  outline?: PPTElementOutline;
  createPath: Function;
}

const ImagePolygonOutline: React.FC<ImagePolygonOutlineProps> = (props) => {
  const { outline, width, height, createPath } = props;
  const { outlineWidth, outlineStyle, outlineColor } =
    useElementOutline(outline);

  return (
    <DisplayView display={Boolean(outline)}>
      <SvgWrapper width={width} height={height} className={prefixCls()}>
        <path
          vector-effect="non-scaling-stroke"
          stroke-linecap="butt"
          stroke-miterlimit="8"
          stroke-linejoin
          fill="transparent"
          d={createPath(width, height)}
          stroke={outlineColor}
          stroke-width={outlineWidth}
          stroke-dasharray={outlineStyle === 'dashed' ? '10 6' : '0 0'}
        />
      </SvgWrapper>
    </DisplayView>
  );
};

export default ImagePolygonOutline;
