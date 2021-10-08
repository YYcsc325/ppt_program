import React from 'react';
import { Popover } from 'antd';
import { IconPosition, IconFont } from '@/components';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const thumbnailsPrefixCls = utils.createPrefixCls('thumbnails', styles, 'ppt');

const Thumbnails: React.FC = () => {
  return (
    <div className={thumbnailsPrefixCls()}>
      <div className={thumbnailsPrefixCls('add-slide')}>
        <div className={thumbnailsPrefixCls('btn')}>
          <IconPosition type="plus" position="left">
            添加幻灯片
          </IconPosition>
        </div>
        <Popover
          content={'待开发模板'}
          title="模板"
          placement="bottomLeft"
          trigger="click"
        >
          <div className={thumbnailsPrefixCls('select-btn')}>
            <IconFont type="down" />
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default Thumbnails;
