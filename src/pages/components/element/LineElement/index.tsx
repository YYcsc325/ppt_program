import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { PPTLineElement } from '@/types/slides';
import SvgWrapper from '@/components/SvgWrapper';
import DisplayView from '@/components/DisplayView';
import { getLineElementPath } from '@/utils/element';
import { ContextmenuItem } from '@/components/Contextmenu/types';
import useElementShadow from '@/pages/components/element/hooks/useElementShadow';

import LinePointMarker from './LinePointMarker';
import styles from './index.less';

const prefixCls = utils.createPrefixCls('editable-element-line', styles, 'ppt');
export interface LineElementProps {
  className?: string;
  elementInfo: PPTLineElement;
  selectElement: (
    e: React.MouseEvent,
    element: PPTLineElement,
    canMove?: boolean,
  ) => void;
  contextmenus: () => ContextmenuItem[];
}

const LineElement: React.FC<LineElementProps> = (props) => {
  const { elementInfo, selectElement, className } = props;
  const handleSelectElement = (e: React.MouseEvent) => {
    if (elementInfo.lock) return;
    e.stopPropagation();

    selectElement(e, elementInfo);
  };

  const { shadowStyle } = useElementShadow(elementInfo.shadow);

  const svgWidth = React.useMemo(() => {
    const width = Math.abs(elementInfo.start[0] - elementInfo.end[0]);
    return width < 24 ? 24 : width;
  }, [elementInfo.start, elementInfo.end]);

  const svgHeight = React.useMemo(() => {
    const height = Math.abs(elementInfo.start[1] - elementInfo.end[1]);
    return height < 24 ? 24 : height;
  }, [elementInfo.start, elementInfo.end]);

  const lineDashArray = React.useMemo(() => {
    return elementInfo.style === 'dashed' ? '10 6' : '0 0';
  }, [elementInfo.style]);

  const path = React.useMemo(() => {
    return getLineElementPath(elementInfo);
  }, [elementInfo]);

  return (
    <div
      className={classNames(prefixCls(), className)}
      style={{
        top: elementInfo.top + 'px',
        left: elementInfo.left + 'px',
      }}
    >
      <div
        className={prefixCls('element-content')}
        style={{ filter: shadowStyle ? `drop-shadow(${shadowStyle})` : '' }}
      >
        <SvgWrapper width={svgWidth} height={svgHeight}>
          <defs>
            <DisplayView display={Boolean(elementInfo.points[0])}>
              <LinePointMarker
                id={elementInfo.id}
                position="start"
                type={elementInfo.points[0]}
                color={elementInfo.color}
                baseSize={elementInfo.width}
              />
            </DisplayView>
            <DisplayView display={Boolean(elementInfo.points[1])}>
              <LinePointMarker
                id={elementInfo.id}
                position="end"
                type={elementInfo.points[1]}
                color={elementInfo.color}
                baseSize={elementInfo.width}
              />
            </DisplayView>
          </defs>
          <path
            d={path}
            stroke={elementInfo.color}
            strokeWidth={elementInfo.width}
            strokeDasharray={lineDashArray}
            fill="none"
            markerStart={
              elementInfo.points[0]
                ? `url(#${elementInfo.id}-${elementInfo.points[0]}-start)`
                : ''
            }
            markerEnd={
              elementInfo.points[1]
                ? `url(#${elementInfo.id}-${elementInfo.points[1]}-end)`
                : ''
            }
          />
          <path
            className={classNames(prefixCls('line-path'), {
              [prefixCls('lock-line-path')]: elementInfo.lock,
            })}
            d={path}
            stroke="transparent"
            strokeWidth="20"
            fill="none"
            onMouseDown={handleSelectElement}
            // contextmenu
          />
        </SvgWrapper>
      </div>
    </div>
  );
};

export default LineElement;
