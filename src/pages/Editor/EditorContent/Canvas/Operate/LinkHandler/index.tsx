import React from 'react';
import { useModel } from 'umi';
import { Divider } from 'antd';
import { utils } from 'react-dtcomponents';
import { PPTElement } from '@/types/slides';
import useLink from '@/hooks/useLink';

import styles from './index.less';

const linkHandlerPrefixCls = utils.createPrefixCls(
  'link-handler',
  styles,
  'ppt',
);

export interface LinkHandlerProps {
  elementInfo: PPTElement;
  openLinkDialog: () => void;
}

const LinkHandler: React.FC<LinkHandlerProps> = (props) => {
  const { elementInfo, openLinkDialog } = props;

  const store = useModel('usePagesModel.index');

  const { removeLink } = useLink();

  const canvasScale = store.storeData.canvasScale;

  return (
    <div
      className={linkHandlerPrefixCls()}
      style={{ top: elementInfo?.height * canvasScale + 10 + 'px' }}
    >
      <a
        href={elementInfo.link}
        target="_blank"
        className={linkHandlerPrefixCls('link')}
      >
        {elementInfo.link}
      </a>
      <div className={linkHandlerPrefixCls('btns')}>
        <div className={linkHandlerPrefixCls('btn')} onClick={openLinkDialog}>
          更换
        </div>
        <Divider type="vertical" />
        <div
          className={linkHandlerPrefixCls('btn')}
          onClick={() => removeLink(elementInfo)}
        >
          移除
        </div>
      </div>
    </div>
  );
};

export default LinkHandler;
