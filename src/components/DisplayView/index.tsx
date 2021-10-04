import React from 'react';
import { utils } from 'react-dtcomponents';
import classNames from 'classnames';

import styles from './index.less';

const displayViewPrefixcls = utils.createPrefixCls(
  'display-view',
  styles,
  'ppt',
);

export interface DisplayViewProps {
  display: boolean;
}

const DisplayView: React.FC<DisplayViewProps> = ({
  children,
  display = false,
}) => {
  return (
    <div
      className={classNames(displayViewPrefixcls(), {
        [displayViewPrefixcls('hide')]: !display,
      })}
    >
      {children}
    </div>
  );
};

export default DisplayView;
