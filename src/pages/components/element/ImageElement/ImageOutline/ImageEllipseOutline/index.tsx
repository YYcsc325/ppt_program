import React from 'react';
import { utils } from 'react-dtcomponents';
import { PPTElementOutline } from '@/types/slides';
import DisplayView from '@/components/DisplayView';
import SvgWrapper from '@/components/SvgWrapper';

import useElementOutline from '@/pages/components/element/hooks/useElementOutline';

import styles from './index.less';

const prefixCls = utils.createPrefixCls('image-ellipse-outline', styles, 'ppt');

export interface ImageEllipseOutlineProps {
  width: number;
  height: number;
  outline?: PPTElementOutline;
}

const ImageEllipseOutline: React.FC<ImageEllipseOutlineProps> = (props) => {
  const { outline, width, height } = props;
  const { outlineWidth, outlineStyle, outlineColor } =
    useElementOutline(outline);

  return (
    <DisplayView display={Boolean(outline)}>
      <SvgWrapper width={width} height={height} className={prefixCls()}>
        <ellipse
          vector-effect="non-scaling-stroke"
          stroke-linecap="butt"
          stroke-miterlimit="8"
          stroke-linejoin
          fill="transparent"
          cx={width / 2}
          cy={height / 2}
          rx={width / 2}
          ry={height / 2}
          stroke={outlineColor}
          stroke-width={outlineWidth}
          stroke-dasharray={outlineStyle === 'dashed' ? '10 6' : '0 0'}
        />
      </SvgWrapper>
    </DisplayView>
  );
};

export default ImageEllipseOutline;
