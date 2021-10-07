import { useState } from 'react';

export default function useCanvasRemarkModel(defaultHeight = 40) {
  const [canvasRemarkHeight, setCanvasRemarkHeight] = useState(defaultHeight);

  return {
    canvasRemarkHeight,
    setCanvasRemarkHeight,
  };
}
