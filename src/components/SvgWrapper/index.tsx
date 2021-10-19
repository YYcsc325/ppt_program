import React from 'react';

export interface SvgWrapperProps {
  width?: number;
  height?: number;
}

const SvgWrapper: React.FC<SvgWrapperProps> = ({ children, width, height }) => {
  return (
    <svg
      style={{ width, height, overflow: 'visible' }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      {children}
    </svg>
  );
};

export default SvgWrapper;
