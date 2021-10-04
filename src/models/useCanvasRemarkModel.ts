import { useState } from 'react';

export default (defaultHeight = 40) => {
  const [canvasRemarkHeight, setCanvasRemarkHeight] = useState(defaultHeight);

  return {
    canvasRemarkHeight,
    setCanvasRemarkHeight,
  };
};
