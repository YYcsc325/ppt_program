import React from 'react';
import { useModel } from 'umi';
import { utils } from 'react-dtcomponents';
import DisplayView from '@/components/DisplayView';
import useSlideBackgroundStyle from '@/hooks/useSlideBackgroundStyle';

import GridLines from '../GridLines';
import styles from './index.less';

const viewportBackgroundPrefixCls = utils.createPrefixCls(
  'viewport-background',
  styles,
  'ppt',
);

export interface ViewportBackgroundProps {}

const ViewportBackground = () => {
  const store = useModel('usePagesModel.index');

  const showGridLines = store.storeData.showGridLines;
  const background = store.getterData.currentSlide?.background;

  const { backgroundStyle } = useSlideBackgroundStyle(background);

  return (
    <div className={viewportBackgroundPrefixCls()} style={backgroundStyle}>
      <DisplayView display={showGridLines}>
        <GridLines />
      </DisplayView>
    </div>
  );
};

export default ViewportBackground;
