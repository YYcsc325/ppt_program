import React from 'react';
import { useModel } from 'umi';

const Screen: React.FC<any> = () => {
  const pagesModel = useModel('usePagesModel.index');

  return (
    <div>
      <button onClick={() => pagesModel.setScreening(false)}>
        点击回到编辑页面
      </button>
    </div>
  );
};

export default Screen;
