import React from 'react';
import { utils } from 'react-dtcomponents';

import Thumbnails from './Thumbnails';
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
    </div>
  );
};

export default EditorContent;
