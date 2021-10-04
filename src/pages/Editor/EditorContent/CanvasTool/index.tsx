import React from 'react';
import { Tooltip } from 'antd';
import { IconFont } from '@/components';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const canvasToolPrefixCls = utils.createPrefixCls('canvas-tool', styles, 'ppt');

const CanvasTool: React.FC = () => {
  /** 撤销 */
  const undo = () => {};
  /** 重做 */
  const redo = () => {};

  /** 插入文字 */
  const addText = () => {};

  /** 插入图片 */
  const addPicture = () => {};

  /** 插入图表 */
  const addData = () => {};

  /** 缩小ppt图片 */
  const handleMinus = () => {};

  /** 放大ppt图片 */
  const handlePlus = () => {};

  return (
    <div className={canvasToolPrefixCls()}>
      <div className={canvasToolPrefixCls('left-handler')}>
        <Tooltip title="撤销">
          <span className={canvasToolPrefixCls('handler-item')} onClick={undo}>
            <IconFont type="revoke" />
          </span>
        </Tooltip>
        <Tooltip title="重做">
          <span className={canvasToolPrefixCls('handler-item')} onClick={redo}>
            <IconFont type="redo" />
          </span>
        </Tooltip>
      </div>
      <div className={canvasToolPrefixCls('add-element-handler')}>
        <Tooltip title="插入文字">
          <span
            className={canvasToolPrefixCls('handler-item')}
            onClick={addText}
          >
            <IconFont type="text" />
          </span>
        </Tooltip>
        <Tooltip title="插入图片">
          <span
            className={canvasToolPrefixCls('handler-item')}
            onClick={addPicture}
          >
            <IconFont type="picture" />
          </span>
        </Tooltip>
        <Tooltip title="插入图表">
          <span
            className={canvasToolPrefixCls('handler-item')}
            onClick={addData}
          >
            <IconFont type="data" />
          </span>
        </Tooltip>
      </div>
      <div className={canvasToolPrefixCls('right-handler')}>
        <IconFont type="minus" onClick={handleMinus} />
        <span style={{ margin: '0 10px' }}>百分比</span>
        <IconFont type="plus" onClick={handlePlus} />
      </div>
    </div>
  );
};

export default CanvasTool;
