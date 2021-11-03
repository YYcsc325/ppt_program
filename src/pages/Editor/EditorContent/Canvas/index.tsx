import React from 'react';
import { useModel } from 'umi';
import { throttle } from 'lodash';
import { utils } from 'react-dtcomponents';
import { PPTElement } from '@/types/slides';
import { AlignmentLineProps } from '@/types/edit';
import DisplayView from '@/components/DisplayView';
import { ACTION_KEYS } from '@/config/actionHotKey';
import { removeAllRanges } from '@/utils/selection';
import { ContextmenuItem } from '@/components/Contextmenu/types';

import useScreening from '@/hooks/useScreening';
import useScaleCanvas from '@/hooks/useScaleCanvas';
import useSlideHandler from '@/hooks/useSlideHandler';
import useDeleteElement from '@/hooks/useDeleteElement';
import useSelectAllElement from '@/hooks/useSelectAllElement';
import useCopyAndPasteElement from '@/hooks/useCopyAndPasteElement';

import Operate from './Operate';
import AlignmentLine from './AlignmentLine';
import MouseSelection from './MouseSelection';
import EditableElement from './EditableElement';
import ViewportBackground from './ViewportBackground';
import ElementCreateSelection from './ElementCreateSelection';
import MultiSelectOperate from './Operate/MultiSelectOperate';

import useScaleElement from './hooks/useScaleElement';
import useViewportSize from './hooks/useViewportSize';
import useMouseSelection from './hooks/useMouseSelection';
import useRotateElement from './hooks/useRotateElement';
import useDragElement from './hooks/useDragElement';
import useDragLineElement from './hooks/useDragLineElement';
import useSelectElement from './hooks/useSelectElement';
import useInsertFromCreateSelection from './hooks/useInsertFromCreateSelection';

import styles from './index.less';

const canvasPrefixCls = utils.createPrefixCls('canvas', styles, 'ppt');

const Canvas: React.FC = () => {
  const store = useModel('usePagesModel.index');
  const canvasRemarkStore = useModel('useCanvasRemarkModel.index');

  const canvasRef = React.useRef(null);
  const viewportRef = React.useRef(null);
  const elementList = React.useRef<PPTElement[]>([]);
  const alignmentLines = React.useRef<AlignmentLineProps[]>([]);

  const [linkDialogVisible, setLinkDialogVisible] = React.useState(false);

  const canvasScale = store.storeData.canvasScale;
  const ctrlKeyState = store.storeData.ctrlKeyState;
  const showGridLines = store.storeData.showGridLines;
  const creatingElement = store.storeData.creatingElement;
  const handleElementId = store.storeData.handleElementId;
  const editorAreaFocus = store.storeData.editorAreaFocus;
  const activeElementIdList = store.storeData.activeElementIdList;
  const activeGroupElementId = store.storeData.activeGroupElementId;

  const currentSlide = store.getterData.currentSlide;
  const ctrlOrShiftKeyActive = store.getterData.ctrlOrShiftKeyActive;

  const ecsVisible = Boolean(creatingElement);
  const msoVisible = Boolean(activeElementIdList.length > 1);

  /** 进入放映 */
  const { enterScreening } = useScreening();
  /** 滚动鼠标 */
  const { scaleCanvas } = useScaleCanvas();
  const { updateSlideIndex } = useSlideHandler();
  const { deleteAllElements } = useDeleteElement();
  const { pasteElement } = useCopyAndPasteElement();
  const { selectAllElement } = useSelectAllElement();
  const { viewportStyles } = useViewportSize(canvasRef);
  const { dragLineElement } = useDragLineElement(elementList);
  const { dragElement } = useDragElement(elementList, alignmentLines);
  const { selectElement } = useSelectElement(elementList, dragElement);
  const { rotateElement } = useRotateElement(elementList, viewportRef);
  const { scaleElement, scaleMultiElement } = useScaleElement(
    elementList,
    alignmentLines,
  );
  const { mouseSelectionState, updateMouseSelection } = useMouseSelection(
    elementList.current,
    viewportRef,
  );
  /** 在鼠标绘制的范围插入元素 */
  const { insertElementFromCreateSelection } =
    useInsertFromCreateSelection(viewportRef);

  const throttleScaleCanvas = throttle(scaleCanvas, 100, {
    leading: true,
    trailing: false,
  });

  const throttleUpdateSlideIndex = throttle(updateSlideIndex, 300, {
    leading: true,
    trailing: false,
  });

  // 点击画布的空白区域：清空焦点元素、设置画布焦点、清除文字选区
  const handleClickBlankArea = (e: React.MouseEvent) => {
    store.setActiveElementIdList([]);
    if (!ctrlOrShiftKeyActive) updateMouseSelection(e);
    if (!editorAreaFocus) store.setEditorAreaFocus(true);
    removeAllRanges();
  };

  const handleMousewheelCanvas = (e: React.WheelEvent) => {
    e.preventDefault();
    // 按住Ctrl键时：缩放画布
    if (ctrlKeyState) {
      if (e.deltaY > 0) throttleScaleCanvas('-');
      else if (e.deltaY < 0) throttleScaleCanvas('+');
    }
    // 上下翻页
    else {
      if (e.deltaY > 0) throttleUpdateSlideIndex(ACTION_KEYS.DOWN);
      else if (e.deltaY < 0) throttleUpdateSlideIndex(ACTION_KEYS.UP);
    }
  };

  const openLinkDialog = () => {
    setLinkDialogVisible(true);
  };

  // 开关网格线
  const toggleGridLines = () => {
    store.setShowGridLines(!showGridLines);
  };

  React.useEffect(() => {
    elementList.current = currentSlide
      ? JSON.parse(JSON.stringify(currentSlide.elements))
      : [];
  }, [currentSlide]);

  const contextmenus = (): ContextmenuItem[] => {
    return [
      {
        text: '粘贴',
        subText: 'Ctrl + V',
        handler: pasteElement,
      },
      {
        text: '全选',
        subText: 'Ctrl + A',
        handler: selectAllElement,
      },
      {
        text: '网格线',
        subText: showGridLines ? '√' : '',
        handler: toggleGridLines,
      },
      {
        text: '重置当前页',
        handler: deleteAllElements,
      },
      { divider: true },
      {
        text: '从当前页演示',
        subText: 'Ctrl+F',
        handler: enterScreening,
      },
    ];
  };

  const canvasStyle = {
    height: `calc(100% - ${canvasRemarkStore.canvasRemarkHeight + 40}px)`,
  };

  const viewportWrapperStyle = {
    width: viewportStyles.width * canvasScale + 'px',
    height: viewportStyles.height * canvasScale + 'px',
    left: viewportStyles.left + 'px',
    top: viewportStyles.top + 'px',
  };

  return (
    <div
      ref={canvasRef}
      style={canvasStyle}
      className={canvasPrefixCls()}
      onWheel={handleMousewheelCanvas}
      onMouseDown={handleClickBlankArea}
    >
      <DisplayView display={ecsVisible}>
        <ElementCreateSelection onChange={insertElementFromCreateSelection} />
      </DisplayView>
      <div
        style={viewportWrapperStyle}
        className={canvasPrefixCls('viewport-wrapper')}
      >
        <div className={canvasPrefixCls('operates')}>
          {alignmentLines.current.map((line, index) => {
            return (
              <AlignmentLine
                key={index}
                type={line.type}
                axis={line.axis}
                length={line.length}
              />
            );
          })}
          <DisplayView display={msoVisible}>
            <MultiSelectOperate
              elementList={elementList.current}
              scaleMultiElement={scaleMultiElement as any}
            />
          </DisplayView>
          {elementList.current.map((element) => (
            <Operate
              key={element.id}
              elementInfo={element}
              scaleElement={scaleElement}
              rotateElement={rotateElement}
              openLinkDialog={openLinkDialog}
              dragLineElement={dragLineElement}
              isActive={handleElementId === element.id}
              isSelected={activeElementIdList.includes(element.id)}
              isMultiSelect={activeElementIdList.length > 1}
              isActiveGroupElement={activeGroupElementId === element.id}
            />
          ))}
          <ViewportBackground />
        </div>
        <div
          ref={viewportRef}
          className={canvasPrefixCls('viewport')}
          style={{ transform: `scale(${canvasScale})` }}
        >
          <DisplayView display={mouseSelectionState.isShow}>
            <MouseSelection
              top={mouseSelectionState.top}
              left={mouseSelectionState.left}
              width={mouseSelectionState.width}
              height={mouseSelectionState.height}
              quadrant={mouseSelectionState.quadrant}
            />
          </DisplayView>
          {elementList.current.map((element, index) => (
            <EditableElement
              key={element.id}
              elementInfo={element}
              elementIndex={index + 1}
              isMultiSelect={activeElementIdList.length > 1}
              selectElement={selectElement}
              openLinkDialog={openLinkDialog}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
