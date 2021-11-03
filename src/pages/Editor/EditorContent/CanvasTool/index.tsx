import React from 'react';
import { Tooltip } from 'antd';
import { useModel } from 'umi';
import classNames from 'classnames';
import { IconFont } from '@/components';
import { utils } from 'react-dtcomponents';

import useScaleCanvas from '@/hooks/useScaleCanvas';
import useHistorySnapshot from '@/hooks/useHistorySnapshot';

import styles from './index.less';

const canvasToolPrefixCls = utils.createPrefixCls('canvas-tool', styles, 'ppt');

const CanvasTool: React.FC = () => {
  const store = useModel('usePagesModel.index');

  const canvasScale = store.storeData.canvasScale;
  const canUndo = store.getterData.canUndo;
  const canRedo = store.getterData.canRedo;

  const { redo, undo } = useHistorySnapshot();
  const canvasScalePercentage = parseInt(canvasScale * 100 + '') + '%';

  const { scaleCanvas, setCanvasPercentage } = useScaleCanvas();

  /** 插入文字 */
  const addText = () => {};

  /** 插入图片 */
  const addPicture = () => {};

  /** 插入图表 */
  const addData = () => {};

  /** 缩小ppt图片 */
  const handleMinus = () => {
    scaleCanvas('-');
  };

  /** 放大ppt图片 */
  const handlePlus = () => {
    scaleCanvas('+');
  };

  return (
    <div className={canvasToolPrefixCls()}>
      <div className={canvasToolPrefixCls('left-handler')}>
        <Tooltip title="撤销">
          <span
            className={classNames(canvasToolPrefixCls('handler-item'), {
              [canvasToolPrefixCls('disable')]: !canUndo,
            })}
            onClick={undo}
          >
            <IconFont type="revoke" />
          </span>
        </Tooltip>
        <Tooltip title="重做">
          <span
            className={classNames(canvasToolPrefixCls('handler-item'), {
              [canvasToolPrefixCls('disable')]: !canRedo,
            })}
            onClick={redo}
          >
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
        <span className={canvasToolPrefixCls('text')}>
          {canvasScalePercentage}
        </span>
        <IconFont type="plus" onClick={handlePlus} />
      </div>
    </div>
  );
};

export default CanvasTool;
