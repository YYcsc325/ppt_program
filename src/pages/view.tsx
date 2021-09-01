import React from 'react';
import Draggable from 'react-draggable';

import { IRouteComponentProps } from 'umi';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const prefixCls = utils.createPrefixCls('editor-container', styles, 'pt');

const Editor: React.FC<IRouteComponentProps> = () => {
  return (
    <div className={prefixCls()}>
      <Draggable>
        <div>哈哈啊哈哈</div>
      </Draggable>
    </div>
  );
};

export default Editor;
