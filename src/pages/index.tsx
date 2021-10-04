import React from 'react';

import { utils } from 'react-dtcomponents';
import { DisplayView } from '@/components';
import { useModel } from 'umi';

import Scrren from './Screen';
import Editor from './Editor';
import styles from './index.less';

const homePrefixcls = utils.createPrefixCls('container', styles, 'ppt');

const Home: React.FC = () => {
  const { screening } = useModel('useGlobalModel' as any) || {};

  return (
    <div className={homePrefixcls()}>
      <DisplayView display={screening}>
        <Scrren />
      </DisplayView>
      <DisplayView display={!screening}>
        <Editor />
      </DisplayView>
    </div>
  );
};

export default Home;
