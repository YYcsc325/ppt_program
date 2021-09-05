import React from 'react';

import { utils } from 'react-dtcomponents';
import { IRouteComponentProps } from 'umi';

import connect, { IHomeConnectProps } from './connect';
import Scrren from './Screen';
import Editor from './Editor';
import styles from './index.less';

const homePrefixcls = utils.createPrefixCls('container', styles, 'ppt');

interface IHomeProps extends IRouteComponentProps, IHomeConnectProps {}

const Home: React.FC<IHomeProps> = ({ screening }) => {
  return (
    <div className={homePrefixcls()}>{screening ? <Scrren /> : <Editor />}</div>
  );
};

export default connect(Home);