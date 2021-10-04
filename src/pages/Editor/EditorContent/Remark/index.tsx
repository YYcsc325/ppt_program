import React from 'react';
import { useModel } from 'umi';

const Remark: React.FC = () => {
  const { remarkHeight } = useModel('useCanvasRemarkModel' as any);

  return (
    <div style={{ height: `${remarkHeight}px` }}>
      <div>Remark</div>
    </div>
  );
};

export default Remark;
