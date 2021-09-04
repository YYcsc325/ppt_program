import React from 'react';

import { utils } from 'react-dtcomponents';
import { IRouteComponentProps } from 'umi';

import connect, { IPageConnectProps } from './connect';
import Scrren from './Screen';
import Editor from './Editor';
import styles from './index.less';

const editPagePrefixcls = utils.createPrefixCls('container', styles, 'ppt');

interface IPageProps extends IRouteComponentProps, IPageConnectProps {}

const editPage: React.FC<IPageProps> = ({ screening }) => {
  return (
    <div className={editPagePrefixcls()}>
      {screening ? <Scrren /> : <Editor />}
    </div>
  );
};

export default connect(editPage);
