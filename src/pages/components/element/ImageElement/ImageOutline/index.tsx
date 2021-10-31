import React from 'react';
import DisplayView from '@/components/DisplayView';
import { PPTImageElement } from '@/types/slides';

import useClipImage from '../useClipImage';
import ImageRectOutline from './ImageRectOutline';
import ImageEllipseOutline from './ImageEllipseOutline';
import ImagePolygonOutline from './ImagePolygonOutline';

export interface ImageOutlineProps {
  elementInfo: PPTImageElement;
}

const ImageOutline: React.FC<ImageOutlineProps> = (props) => {
  const { elementInfo } = props;
  const { clipShape } = useClipImage(elementInfo.clip);

  return (
    <div>
      <DisplayView display={clipShape.type === 'rect'}>
        <ImageRectOutline
          width={elementInfo.width}
          height={elementInfo.height}
          radius={clipShape.radius}
          outline={elementInfo.outline}
        />
      </DisplayView>
      <DisplayView display={clipShape.type === 'ellipse'}>
        <ImageEllipseOutline
          width={elementInfo.width}
          height={elementInfo.height}
          outline={elementInfo.outline}
        />
      </DisplayView>
      <DisplayView display={clipShape.type === 'polygon'}>
        <ImagePolygonOutline
          width={elementInfo.width}
          height={elementInfo.height}
          outline={elementInfo.outline}
          createPath={clipShape.createPath}
        />
      </DisplayView>
    </div>
  );
};

export default ImageOutline;
