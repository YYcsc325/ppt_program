import React from 'react';

import { utils } from 'react-dtcomponents';

import EditorHeader from './EditorHeader';
import EditorContent from './EditorContent';
import styles from './index.less';

const editorPrefixCls = utils.createPrefixCls('editor', styles, 'ppt');

const Editor: React.FC = () => {
  return (
    <div className={editorPrefixCls()}>
      <EditorHeader />
      <EditorContent />
    </div>
  );
};

export default Editor;
