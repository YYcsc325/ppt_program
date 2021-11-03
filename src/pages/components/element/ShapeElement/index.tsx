import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import SvgWrapper from '@/components/SvgWrapper';
import DisplayView from '@/components/DisplayView';
import { PPTShapeElement, ShapeText } from '@/types/slides';
import useHistorySnapshot from '@/hooks/useHistorySnapshot';
import { ContextmenuItem } from '@/components/Contextmenu/types';
import useElementOutline from '@/pages/components/element/hooks/useElementOutline';
import useElementShadow from '@/pages/components/element/hooks/useElementShadow';
import useElementFlip from '@/pages/components/element/hooks/useElementFlip';
import ProsemirrorEditor from '@/pages/components/element/ProsemirrorEditor';

import GradientDefs from './GradientDefs';
import styles from './index.less';

const prefixCls = utils.createPrefixCls(
  'editable-element-shape',
  styles,
  'ppt',
);

export interface ShapeElementProps {
  className?: string;
  elementInfo: PPTShapeElement;
  selectElement: (
    e: React.MouseEvent,
    element: PPTShapeElement,
    canMove?: boolean,
  ) => void;
  contextmenus: () => ContextmenuItem[];
}

const ShapeElement: React.FC<ShapeElementProps> = (props) => {
  const { className, elementInfo, selectElement } = props;

  const store = useModel('usePagesModel.index');
  const [editable, setEditable] = React.useState(false);

  const { addHistorySnapshot } = useHistorySnapshot();

  const handleSelectElement = (e: React.MouseEvent) => {
    if (elementInfo.lock) return;
    e.stopPropagation();

    selectElement(e, elementInfo);
  };

  const { outlineWidth, outlineStyle, outlineColor } = useElementOutline(
    elementInfo.outline,
  );
  const { shadowStyle } = useElementShadow(elementInfo.shadow);
  const { flipStyle } = useElementFlip(elementInfo.flipH, elementInfo.flipV);

  const enterEditing = () => {
    setEditable(true);
    store.setEditingShapeElementId(elementInfo.id);
  };

  const exitEditing = () => {
    setEditable(false);
    store.setEditingShapeElementId('');
  };

  React.useEffect(() => {
    if (store.storeData.handleElementId !== elementInfo.id) {
      if (editable) exitEditing();
    }
  }, [store.storeData.handleElementId]);

  const text = React.useMemo(() => {
    const defaultText: ShapeText = {
      content: '',
      defaultFontName: '微软雅黑',
      defaultColor: '#000',
      align: 'middle',
    };
    if (!elementInfo.text) return defaultText;

    return elementInfo.text;
  }, [elementInfo]);

  const updateText = (content: string) => {
    const _text = { ...text, content };
    store.updateElement({
      id: props.elementInfo.id,
      props: { text: _text },
    });

    addHistorySnapshot();
  };

  return (
    <div
      className={classNames(prefixCls(), className)}
      style={{
        top: elementInfo.top + 'px',
        left: elementInfo.left + 'px',
        width: elementInfo.width + 'px',
        height: elementInfo.height + 'px',
      }}
    >
      <div
        className={prefixCls('rotate-wrapper')}
        style={{ transform: `rotate(${elementInfo.rotate}deg)` }}
      >
        <div
          className={classNames(prefixCls('element-content'), {
            [prefixCls('lock')]: elementInfo.lock,
          })}
          style={{
            opacity: elementInfo.opacity,
            filter: shadowStyle ? `drop-shadow(${shadowStyle})` : '',
            transform: flipStyle,
            color: text.defaultColor,
            fontFamily: text.defaultFontName,
          }}
          //contextmenu
          onMouseDown={handleSelectElement}
          onDoubleClick={enterEditing}
        >
          <SvgWrapper width={elementInfo.width} height={elementInfo.height}>
            <DisplayView display={Boolean(elementInfo.gradient)}>
              <defs>
                <GradientDefs
                  id={`editabel-gradient-${elementInfo.id}`}
                  type={elementInfo.gradient?.type}
                  color1={elementInfo.gradient?.color[0]}
                  color2={elementInfo.gradient?.color[1]}
                  rotate={elementInfo.gradient?.rotate}
                />
              </defs>
              <g
                transform={`scale(${elementInfo.width / elementInfo.viewBox}, ${
                  elementInfo.height / elementInfo.viewBox
                }) translate(0,0) matrix(1,0,0,1,0,0)`}
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="butt"
                  strokeMiterlimit="8"
                  d={elementInfo.path}
                  fill={
                    elementInfo.gradient
                      ? `url(#editabel-gradient-${elementInfo.id})`
                      : elementInfo.fill
                  }
                  stroke={outlineColor}
                  strokeWidth={outlineWidth}
                  strokeDasharray={outlineStyle === 'dashed' ? '10 6' : '0 0'}
                />
              </g>
            </DisplayView>
          </SvgWrapper>
          <div
            className={classNames(
              prefixCls('shape-text'),
              prefixCls(text.align),
            )}
          >
            <DisplayView display={editable}>
              <ProsemirrorEditor
                elementId={elementInfo.id}
                defaultColor={text.defaultColor}
                defaultFontName={text.defaultFontName}
                editable={!elementInfo.lock}
                autoFocus={true}
                value={text.content}
                onUpdate={updateText}
                onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
              />
            </DisplayView>
            <DisplayView display={!editable}>
              <div dangerouslySetInnerHTML={{ __html: text.content }}></div>
            </DisplayView>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShapeElement;
