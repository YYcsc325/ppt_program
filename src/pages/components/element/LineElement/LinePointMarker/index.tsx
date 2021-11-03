import React from 'react';

export interface LinePointMarkerProps {
  id: string;
  position: 'start' | 'end';
  type: 'dot' | 'arrow' | '';
  color: string;
  baseSize: number;
}

const pathMap = {
  dot: 'm0 5a5 5 0 1 0 10 0a5 5 0 1 0 -10 0z',
  arrow: 'M0,0 L10,5 0,10 Z',
};
const rotateMap = {
  'arrow-start': 180,
  'arrow-end': 0,
};

const LinePointMarker: React.FC<LinePointMarkerProps> = (props) => {
  const { id, type, position, baseSize, color } = props;

  const path = pathMap[type];
  const rotate = rotateMap[`${type}-${position}`] || 0;
  const size = baseSize < 2 ? 2 : baseSize;

  return (
    <marker
      id={`${id}-${type}-${position}`}
      markerUnits="userSpaceOnUse"
      orient="auto"
      markerWidth={size * 3}
      markerHeight={size * 3}
      refY={size * 1.5}
      refX={size * 1.5}
    >
      <path
        d={path}
        fill={color}
        transform={`scale(${size * 0.3}, ${
          size * 0.3
        }) rotate(${rotate}, 5, 5)`}
      ></path>
    </marker>
  );
};

export default LinePointMarker;
