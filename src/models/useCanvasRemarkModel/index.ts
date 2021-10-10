import { useState } from 'react';

export default function useCanvasRemarkModel() {
  const [canvasRemarkHeight, setCanvasRemarkHeight] = useState(40);

  return {
    canvasRemarkHeight,
    setCanvasRemarkHeight,
  };
}
