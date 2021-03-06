import React from 'react';
import { useModel } from 'umi';
import { utils } from 'react-dtcomponents';
import { DisplayView } from '@/components';

import Scrren from './Screen';
import Editor from './Editor';
import styles from './index.less';

const homePrefixcls = utils.createPrefixCls('container', styles, 'ppt');

const Home: React.FC = () => {
  const pagesModel = useModel('usePagesModel.index', (model) => ({
    screening: model?.storeData?.screening,
  }));

  return (
    <div className={homePrefixcls()}>
      <DisplayView display={pagesModel?.screening}>
        <Scrren />
      </DisplayView>
      <DisplayView display={!pagesModel?.screening}>
        <Editor />
      </DisplayView>
    </div>
  );
};

export default Home;
