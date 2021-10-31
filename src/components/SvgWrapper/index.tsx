import React from 'react';
import classNames from 'classnames';

export interface SvgWrapperProps {
  [x: string]: any;
  className?: string;
  width?: number;
  height?: number;
  overflow?: string;
}

const SvgWrapper: React.FC<SvgWrapperProps> = ({
  children,
  overflow,
  className,
  ...rest
}) => {
  return (
    <svg
      {...rest}
      overflow={overflow || 'visible'}
      className={classNames(className)}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      {children}
    </svg>
  );
};

export default SvgWrapper;
