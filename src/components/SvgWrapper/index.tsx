import React from 'react';

const SvgWrapper: React.FC = ({ children }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      {children}
    </svg>
  );
};

export default SvgWrapper;
