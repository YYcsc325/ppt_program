import React from 'react';
import { utils } from 'react-dtcomponents';
import SvgWrapper from '@/components/SvgWrapper';
import DisplayView from '@/components/DisplayView';

import styles from './index.less';

const elementCreatePrefixCls = utils.createPrefixCls(
  'element-create',
  styles,
  'ppt',
);

const ElementCreateSelection = () => {
  return (
    <div className={elementCreatePrefixCls()}>
      <DisplayView display={false}>
        <div className={elementCreatePrefixCls('selection')}>
          <DisplayView display={false}>
            <SvgWrapper>
              <path
                d="lineData.path"
                stroke="#d14424"
                fill="none"
                stroke-width="1"
                stroke-linecap
                stroke-linejoin
                stroke-miterlimit
              />
            </SvgWrapper>
          </DisplayView>
        </div>
      </DisplayView>
    </div>
  );
};

export default ElementCreateSelection;
