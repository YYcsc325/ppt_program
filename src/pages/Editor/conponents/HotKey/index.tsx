import React from 'react';
import { utils } from 'react-dtcomponents';

import styles from './index.less';

const hotKeyPrefixCls = utils.createPrefixCls('hot-key', styles, 'pt');

interface HotKeyProps {
  title: React.ReactNode;
}

const HotKey: React.FC<HotKeyProps> & {
  Item: React.FC<HotKeyPaneProps>;
} = ({ children, title }) => {
  return (
    <div className={hotKeyPrefixCls()}>
      <div className={hotKeyPrefixCls('title')}>{title}</div>
      {children}
    </div>
  );
};

interface HotKeyPaneProps {
  label: React.ReactNode;
  value: string;
}

const HotKeyPane: React.FC<HotKeyPaneProps> = ({ label, value }) => {
  return (
    <div className={hotKeyPrefixCls('pane')}>
      <div className={hotKeyPrefixCls('label')}>{label}</div>
      <div className={hotKeyPrefixCls('value')}>{value}</div>
    </div>
  );
};

HotKey.displayName = 'HotKey';
HotKeyPane.displayName = 'HotKeyPane';

HotKey.Item = HotKeyPane;

export default HotKey;
