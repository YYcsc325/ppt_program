import React from 'react';
import { useModel } from 'umi';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { PPTTextElement } from '@/types/slides';
import useHistorySnapshot from '@/hooks/useHistorySnapshot';
import { ContextmenuItem } from '@/components/Contextmenu/types';
import ElementOutline from '@/pages/components/element/ElementOutline';
import useElementShadow from '@/pages/components/element/hooks/useElementShadow';
import ProsemirrorEditor from '@/pages/components/element/ProsemirrorEditor';
import styles from './index.less';

const prefixCls = utils.createPrefixCls('editable-element-text', styles, 'ppt');

export interface TextElementProps {
  className?: string;
  selectElement: (
    e: React.MouseEvent,
    element: PPTTextElement,
    canMove?: boolean,
  ) => void;
  elementInfo: PPTTextElement;
  contextmenus: ContextmenuItem[];
}

const TextElement: React.FC<TextElementProps> = (props) => {
  const { elementInfo, selectElement, contextmenus } = props;
  const store = useModel('usePagesModel.index');

  const elementRef = React.useRef(null);
  const [realHeightCache, setRealHeightCache] = React.useState(-1);

  const { addHistorySnapshot } = useHistorySnapshot();

  const { shadowStyle } = useElementShadow(elementInfo.shadow);

  const handleElementId = store.storeData.handleElementId;
  const isScaling = store.storeData.isScaling;

  const handleSelectElement = (e: React.MouseEvent, canMove = true) => {
    if (elementInfo.lock) return;
    e.stopPropagation();

    selectElement(e, elementInfo, canMove);
  };

  const updateTextElementHeight = (entries: ResizeObserverEntry[]) => {
    const contentRect = entries[0].contentRect;
    if (!elementRef.current) return;

    const realHeight = contentRect.height;

    if (elementInfo.height !== realHeight) {
      if (!isScaling) {
        store.updateElement({
          id: elementInfo.id,
          props: { height: realHeight },
        });
      } else {
        setRealHeightCache(realHeight);
      }
    }
  };

  const resizeObserver = new ResizeObserver(updateTextElementHeight);

  React.useEffect(() => {
    if (elementRef.current) resizeObserver.observe(elementRef.current);
    return () => {
      if (elementRef.current) resizeObserver.unobserve(elementRef.current);
    };
  }, []);

  React.useEffect(() => {
    if (handleElementId !== elementInfo.id) return;

    if (!isScaling && realHeightCache !== -1) {
      store.updateElement({
        id: elementInfo.id,
        props: { height: realHeightCache },
      });
      setRealHeightCache(-1);
    }
  }, [isScaling]);

  const updateContent = (content: string) => {
    store.updateElement({
      id: elementInfo.id,
      props: { content },
    });
    addHistorySnapshot();
  };

  return (
    <div
      className={prefixCls()}
      ref={elementRef}
      style={{
        top: elementInfo.top + 'px',
        left: elementInfo.left + 'px',
        width: elementInfo.width + 'px',
      }}
    >
      <div
        className={prefixCls('rotate-wrapper')}
        style={{ transform: `rotate(${elementInfo.rotate}deg)` }}
      >
        <div
          // contextmenus
          className={classNames(prefixCls('element-content'), {
            [prefixCls('lock')]: elementInfo.lock,
          })}
          onMouseDown={(e) => handleSelectElement(e)}
          style={{
            backgroundColor: elementInfo.fill,
            opacity: elementInfo.opacity,
            textShadow: shadowStyle,
            lineHeight: elementInfo.lineHeight,
            letterSpacing: (elementInfo.wordSpace || 0) + 'px',
            color: elementInfo.defaultColor,
            fontFamily: elementInfo.defaultFontName,
          }}
        >
          <ElementOutline
            width={elementInfo.width}
            height={elementInfo.height}
            outline={elementInfo.outline}
          />
          <ProsemirrorEditor
            className={prefixCls('text')}
            elementId={elementInfo.id}
            defaultColor={elementInfo.defaultColor}
            editable={!elementInfo.lock}
            value={elementInfo.content}
            onUpdate={updateContent}
            onMouseDown={(e: React.MouseEvent) => handleSelectElement(e, false)}
          />
        </div>
      </div>
    </div>
  );
};

export default TextElement;
