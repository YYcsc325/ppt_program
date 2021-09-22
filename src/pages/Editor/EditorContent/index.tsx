import React from 'react';
import { utils } from 'react-dtcomponents';

import Thumbnails from './Thumbnails';
import CanvasTool from './CanvasTool';
import styles from './index.less';

const editorContentPrefixCls = utils.createPrefixCls(
  'editor-content',
  styles,
  'ppt',
);

const EditorContent: React.FC = () => {
  return (
    <div className={editorContentPrefixCls()}>
      <Thumbnails />
      <div className={editorContentPrefixCls('center')}>
        <CanvasTool />
      </div>
    </div>
  );
};

export default EditorContent;
