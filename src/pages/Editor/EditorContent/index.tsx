import React from 'react';
import { utils } from 'react-dtcomponents';

import Canvas from './Canvas';
import Remark from './Remark';
import Toolbar from './Toolbar';
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
        <Canvas />
        <Remark />
        {/* <Toolbar /> */}
      </div>
    </div>
  );
};

export default EditorContent;
