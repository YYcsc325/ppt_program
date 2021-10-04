import React from 'react';

import { utils } from 'react-dtcomponents';
import { IRouteComponentProps } from 'umi';
import { DisplayView } from '@/components';

import Scrren from './Screen';
import Editor from './Editor';
import connect, { IHomeConnectProps } from './connect';
import styles from './index.less';

const homePrefixcls = utils.createPrefixCls('container', styles, 'ppt');

interface IHomeProps extends IRouteComponentProps, IHomeConnectProps {}

const Home: React.FC<IHomeProps> = ({ screening }) => {
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

export default connect(Home);
