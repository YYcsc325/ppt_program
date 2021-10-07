import React from 'react';
import { useModel } from 'umi';

const Remark: React.FC = () => {
  const canvasRemarkModel = useModel('useCanvasRemarkModel.index');

  return (
    <div style={{ height: `${canvasRemarkModel.canvasRemarkHeight}px` }}>
      <div>Remark</div>
    </div>
  );
};

export default Remark;
