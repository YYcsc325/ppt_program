import React from 'react';
import { PPTElementOutline } from '@/types/slides';

// 计算边框相关属性值，主要是对默认值的处理
export default (outline: PPTElementOutline | undefined) => {
  const outlineWidth = React.useMemo(() => {
    return outline?.width ?? 0;
  }, [outline]);

  const outlineStyle = React.useMemo(() => {
    return outline?.style || 'solid';
  }, [outline]);

  const outlineColor = React.useMemo(() => {
    return outline?.color || '#d14424';
  }, [outline]);

  return {
    outlineWidth,
    outlineStyle,
    outlineColor,
  };
};
