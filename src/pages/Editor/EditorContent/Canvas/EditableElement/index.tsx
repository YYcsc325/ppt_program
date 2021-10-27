import React from 'react';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { PPTElement, ElementTypes } from '@/types/slides';
import {
  ElementOrderCommands,
  ElementAlignCommands,
  ElementAlignCommand,
  ElementOrderCommand,
} from '@/types/edit';
import { ContextmenuItem } from '@/components/Contextmenu/types';

import useLockElement from '@/hooks/useLockElement';
import useDeleteElement from '@/hooks/useDeleteElement';
import useCombineElement from '@/hooks/useCombineElement';
import useOrderElement from '@/hooks/useOrderElement';
import useAlignElementToCanvas from '@/hooks/useAlignElementToCanvas';
import useCopyAndPasteElement from '@/hooks/useCopyAndPasteElement';
import useSelectAllElement from '@/hooks/useSelectAllElement';

import ImageElement from '@/pages/components/element/ImageElement';
import TextElement from '@/pages/components/element/TextElement';
import ShapeElement from '@/pages/components/element/ShapeElement';
import LineElement from '@/pages/components/element/LineElement';
import ChartElement from '@/pages/components/element/ChartElement';
import TableElement from '@/pages/components/element/TableElement';

import styles from './index.less';

/** 操作按键未完成 */

const prefixCls = utils.createPrefixCls('editable-element', styles, 'ppt');

export interface EditableElementProps {
  style?: React.CSSProperties;
  className?: string;
  elementInfo: PPTElement;
  elementIndex: number;
  isMultiSelect: boolean;
  selectElement: (
    e: React.MouseEvent,
    element: PPTElement,
    canMove?: boolean,
  ) => void;
  openLinkDialog: () => void;
}

const elementTypeMap = {
  [ElementTypes.IMAGE]: ImageElement,
  [ElementTypes.TEXT]: TextElement,
  [ElementTypes.SHAPE]: ShapeElement,
  [ElementTypes.LINE]: LineElement,
  [ElementTypes.CHART]: ChartElement,
  [ElementTypes.TABLE]: TableElement,
  DEFAULT: (props: any) => null,
};

const EditableElement: React.FC<EditableElementProps> = (props) => {
  const { elementInfo, elementIndex, className, style, selectElement } = props;

  const curId = `editable-element-${elementInfo?.id}`;

  const curStyle = { ...style, zIndex: elementIndex };

  const Component = elementTypeMap[elementInfo.type] || elementTypeMap.DEFAULT;

  const { orderElement } = useOrderElement();
  const { alignElementToCanvas } = useAlignElementToCanvas();
  const { combineElements, uncombineElements } = useCombineElement();
  const { deleteElement } = useDeleteElement();
  const { lockElement, unlockElement } = useLockElement();
  const { copyElement, pasteElement, cutElement } = useCopyAndPasteElement();
  const { selectAllElement } = useSelectAllElement();

  /** 右击菜单得好好想想用react的实现方式 */
  const contextmenus = (): ContextmenuItem[] => {
    if (props.elementInfo.lock) {
      return [
        {
          text: '解锁',
          handler: () => unlockElement(props.elementInfo),
        },
      ];
    }

    return [
      {
        text: '剪切',
        subText: 'Ctrl + X',
        handler: cutElement,
      },
      {
        text: '复制',
        subText: 'Ctrl + C',
        handler: copyElement,
      },
      {
        text: '粘贴',
        subText: 'Ctrl + V',
        handler: pasteElement,
      },
      { divider: true },
      {
        text: '水平居中',
        handler: () =>
          alignElementToCanvas(
            ElementAlignCommands.HORIZONTAL as ElementAlignCommand,
          ),
        children: [
          {
            text: '水平垂直居中',
            handler: () =>
              alignElementToCanvas(
                ElementAlignCommands.CENTER as ElementAlignCommand,
              ),
          },
          {
            text: '水平居中',
            handler: () =>
              alignElementToCanvas(
                ElementAlignCommands.HORIZONTAL as ElementAlignCommand,
              ),
          },
          {
            text: '左对齐',
            handler: () =>
              alignElementToCanvas(
                ElementAlignCommands.LEFT as ElementAlignCommand,
              ),
          },
          {
            text: '右对齐',
            handler: () =>
              alignElementToCanvas(
                ElementAlignCommands.RIGHT as ElementAlignCommand,
              ),
          },
        ],
      },
      {
        text: '垂直居中',
        handler: () =>
          alignElementToCanvas(
            ElementAlignCommands.VERTICAL as ElementAlignCommand,
          ),
        children: [
          {
            text: '水平垂直居中',
            handler: () =>
              alignElementToCanvas(
                ElementAlignCommands.CENTER as ElementAlignCommand,
              ),
          },
          {
            text: '垂直居中',
            handler: () =>
              alignElementToCanvas(
                ElementAlignCommands.VERTICAL as ElementAlignCommand,
              ),
          },
          {
            text: '顶部对齐',
            handler: () =>
              alignElementToCanvas(
                ElementAlignCommands.TOP as ElementAlignCommand,
              ),
          },
          {
            text: '底部对齐',
            handler: () =>
              alignElementToCanvas(
                ElementAlignCommands.BOTTOM as ElementAlignCommand,
              ),
          },
        ],
      },
      { divider: true },
      {
        text: '置于顶层',
        disable: props.isMultiSelect && !props.elementInfo.groupId,
        handler: () =>
          orderElement(
            props.elementInfo,
            ElementOrderCommands.TOP as ElementOrderCommand,
          ),
        children: [
          {
            text: '置于顶层',
            handler: () =>
              orderElement(
                props.elementInfo,
                ElementOrderCommands.TOP as ElementOrderCommand,
              ),
          },
          {
            text: '上移一层',
            handler: () =>
              orderElement(
                props.elementInfo,
                ElementOrderCommands.UP as ElementOrderCommand,
              ),
          },
        ],
      },
      {
        text: '置于底层',
        disable: props.isMultiSelect && !props.elementInfo.groupId,
        handler: () =>
          orderElement(
            props.elementInfo,
            ElementOrderCommands.BOTTOM as ElementOrderCommand,
          ),
        children: [
          {
            text: '置于底层',
            handler: () =>
              orderElement(
                props.elementInfo,
                ElementOrderCommands.BOTTOM as ElementOrderCommand,
              ),
          },
          {
            text: '下移一层',
            handler: () =>
              orderElement(
                props.elementInfo,
                ElementOrderCommands.DOWN as ElementOrderCommand,
              ),
          },
        ],
      },
      { divider: true },
      {
        text: '设置链接',
        handler: props.openLinkDialog,
      },
      {
        text: props.elementInfo.groupId ? '取消组合' : '组合',
        subText: 'Ctrl + G',
        handler: props.elementInfo.groupId
          ? uncombineElements
          : combineElements,
        hide: !props.isMultiSelect,
      },
      {
        text: '全选',
        subText: 'Ctrl + A',
        handler: selectAllElement,
      },
      {
        text: '锁定',
        subText: 'Ctrl + L',
        handler: lockElement,
      },
      {
        text: '删除',
        subText: 'Delete',
        handler: deleteElement,
      },
    ];
  };

  return (
    <div
      className={classNames(prefixCls(), className)}
      id={curId}
      style={curStyle}
    >
      <Component elementInfo={elementInfo} selectElement={selectElement} />
    </div>
  );
};

export default EditableElement;
