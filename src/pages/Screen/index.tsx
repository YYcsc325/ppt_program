import React from 'react';
import { useModel } from 'umi';

import customHook from './customHook';

const Screen: React.FC<any> = () => {
  const pagesModel = useModel('usePagesModel.index', (model) => ({
    setScreening: model?.setScreening,
  }));

  const refs = React.useRef(0);
  const [a, setA] = React.useState(0);

  const db = React.useMemo(() => {
    return refs.current;
  }, [refs.current]);

  const { params, updateParams } = customHook(refs);

  return (
    <div>
      <button onClick={() => pagesModel.setScreening(false)}>
        点击回到编辑页面
      </button>
      <button
        onClick={() => {
          refs.current = 2;
          updateParams({ b: 2 });
        }}
      >
        点击测试ref
      </button>
      <button
        onClick={() => {
          setA(1);
        }}
      >
        点击测试hook
      </button>
      <div>
        <div>测试数据</div>
        <span>{refs.current}</span>&nbsp;
        <span>{db}</span>
      </div>
    </div>
  );
};

export default Screen;
