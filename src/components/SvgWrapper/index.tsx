import React from 'react';
import classNames from 'classnames';

export interface SvgWrapperProps {
  className?: string;
  width?: number;
  height?: number;
}

const SvgWrapper: React.FC<SvgWrapperProps> = ({
  children,
  width,
  height,
  className,
}) => {
  return (
    <svg
      className={classNames(className)}
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
