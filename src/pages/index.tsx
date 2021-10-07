import React from 'react';

import { utils } from 'react-dtcomponents';
import { DisplayView } from '@/components';

import Scrren from './Screen';
import Editor from './Editor';
import styles from './index.less';
import { StoreReturnType } from '@/models/useStore';
import { useModel } from 'umi';

const homePrefixcls = utils.createPrefixCls('container', styles, 'ppt');

const Home: React.FC = () => {
  const { store } = useModel(
    'useStore' as any,
    (model: StoreReturnType) => model,
  );

  return (
    <div className={homePrefixcls()}>
      <DisplayView display={store?.screening}>
        <Scrren />
      </DisplayView>
      <DisplayView display={!store?.screening}>
        <Editor />
      </DisplayView>
    </div>
  );
};

export default Home;
