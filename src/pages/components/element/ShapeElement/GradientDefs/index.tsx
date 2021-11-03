import React from 'react';
import DisplayView from '@/components/DisplayView';

export interface GradientDefsProps {
  id: string;
  type?: 'linear' | 'radial';
  color1?: string;
  color2?: string;
  rotate?: number;
}

const GradientDefs: React.FC<GradientDefsProps> = (props) => {
  const { type, id, rotate, color1, color2 } = props;
  return (
    <div>
      <DisplayView display={type === 'linear'}>
        <linearGradient
          id={id}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
          gradientTransform={`rotate(${rotate},0.5,0.5)`}
        >
          <stop offset="0%" stop-color={color1} />
          <stop offset="100%" stop-color={color2} />
        </linearGradient>
      </DisplayView>
      <DisplayView display={type !== 'linear'}>
        <radialGradient id={id}>
          <stop offset="0%" stop-color={color1} />
          <stop offset="100%" stop-color={color2} />
        </radialGradient>
      </DisplayView>
    </div>
  );
};

export default GradientDefs;
