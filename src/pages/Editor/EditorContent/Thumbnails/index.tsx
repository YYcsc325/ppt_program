import React from 'react';
import { Popover } from 'antd';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const thumbnailsPrefixCls = utils.createPrefixCls('thumbnails', styles, 'ppt');

const Thumbnails: React.FC = () => {
  return (
    <div className={thumbnailsPrefixCls()}>
      <div className={thumbnailsPrefixCls('add-slide')}>
        <div className={thumbnailsPrefixCls('btn')}>添加幻灯片</div>
        <Popover
          content={'待开发模板'}
          title="模板"
          placement="bottomLeft"
          trigger="click"
        >
          <div className={thumbnailsPrefixCls('select-btn')}>下拉</div>
        </Popover>
      </div>
    </div>
  );
};

export default Thumbnails;
