import React from 'react';
import { CLIPPATHS, ClipPathTypes } from '@/config/imageClip';
import { ImageElementClip } from '@/types/slides';

export default (clip: ImageElementClip | undefined) => {
  const clipShape = React.useMemo(() => {
    if (!clip) return CLIPPATHS.rect;
    const shape: any = clip.shape || ClipPathTypes.RECT;

    return CLIPPATHS[shape];
  }, [clip]);

  const imgPosition = React.useMemo(() => {
    if (!clip) {
      return {
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
      };
    }

    const [start, end] = clip.range;

    const widthScale = (end[0] - start[0]) / 100;
    const heightScale = (end[1] - start[1]) / 100;
    const left = start[0] / widthScale;
    const top = start[1] / heightScale;

    return {
      left: -left + '%',
      top: -top + '%',
      width: 100 / widthScale + '%',
      height: 100 / heightScale + '%',
    };
  }, [clip]);

  return {
    clipShape,
    imgPosition,
  };
};
