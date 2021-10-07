import React from 'react';
import { useModel } from 'umi';
import { StoreReturnType } from '@/models/useStore';

const Screen: React.FC<any> = () => {
  const store = useModel('useStore' as any, (model: StoreReturnType) => model);

  return (
    <div>
      <button onClick={() => store.setScreening(false)}>
        点击回到编辑页面
      </button>
    </div>
  );
};

export default Screen;
