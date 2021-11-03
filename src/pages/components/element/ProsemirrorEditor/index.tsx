import React from 'react';
import { useModel } from 'umi';
import { debounce } from 'lodash';
import classNames from 'classnames';
import { utils } from 'react-dtcomponents';
import { EditorView } from 'prosemirror-view';
import { getTextAttrs } from '@/utils/prosemirror/utils';
import { toggleMark, wrapIn, selectAll } from 'prosemirror-commands';
import emitter, { EmitterEvents, RichTextCommand } from '@/utils/emitter';
import { toggleList } from '@/utils/prosemirror/commands/toggleList';
import { alignmentCommand } from '@/utils/prosemirror/commands/setTextAlign';
import { initProsemirrorEditor, createDocument } from '@/utils/prosemirror';

import styles from './index.less';

const prefixCls = utils.createPrefixCls('prosemirror-editor', styles, 'ppt');

export interface ProsemirrorEditorProps {
  [x: string]: any;
  className?: string;
  elementId: string;
  defaultColor: string;
  editable: boolean;
  value: string;
  defaultFontName?: string;
  autoFocus?: boolean;
  onUpdate?: (params: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const ProsemirrorEditor: React.FC<ProsemirrorEditorProps> = (props) => {
  const {
    className,
    onUpdate,
    onFocus,
    onBlur,
    value,
    editable,
    autoFocus,
    elementId,
    defaultColor,
    defaultFontName,
    ...rest
  } = props;

  const store = useModel('usePagesModel.index');
  const handleElementId = store.storeData.handleElementId;

  const editorViewRef = React.useRef(null);
  // const [editorView, setEditorView] = React.useState<EditorView | any>(null);
  const editorView = React.useRef<EditorView | any>(null);

  // 富文本的各种交互事件监听：
  // 聚焦时取消全局快捷键事件
  // 输入文字时同步数据到vuex
  // 点击鼠标和键盘时同步富文本状态到工具栏
  const handleInput = debounce(
    function () {
      onUpdate?.(editorView.current.dom.innerHTML);
    },
    300,
    { trailing: true },
  );

  const handleFocus = () => {
    if (props.value === '请输入内容') {
      setTimeout(() => {
        selectAll(editorView.current.state, editorView.current.dispatch);
      }, 0);
    }
    store.setDisableHotkeys(true);
    onFocus?.();
  };

  const handleBlur = () => {
    store.setDisableHotkeys(false);
    onBlur?.();
  };

  const handleClick = React.useCallback(
    debounce(
      function () {
        const attrs = getTextAttrs(editorView.current, {
          color: defaultColor,
          fontname: defaultFontName,
        });
        store.setRichTextAttrs(attrs);
      },
      30,
      { trailing: true },
    ),
    [editorView.current, defaultColor, defaultFontName],
  );

  const handleKeydown = () => {
    handleInput();
    handleClick();
  };

  // 将富文本内容同步到DOM
  React.useEffect(() => {
    if (!editorView.current) return;
    if (editorView.current?.hasFocus?.()) return;

    const { doc, tr } = editorView.current.state;
    editorView.current.dispatch(
      tr.replaceRangeWith(0, doc.content.size, createDocument(value)),
    );
  }, [value, editorView]);

  React.useEffect(() => {
    const editorViews = initProsemirrorEditor(
      editorViewRef.current as any,
      value,
      {
        handleDOMEvents: {
          focus: handleFocus,
          blur: handleBlur,
          keydown: handleKeydown,
          click: handleClick,
        },
        editable: () => editable,
      },
    );

    editorView.current = editorViews;
    if (autoFocus) editorViews.focus();
    emitter.on(EmitterEvents.RICH_TEXT_COMMAND, execCommand);
    return () => {
      editorView && editorView.current.destroy();
      emitter.off(EmitterEvents.RICH_TEXT_COMMAND, execCommand);
    };
  }, []);

  // 打开/关闭编辑器的编辑模式
  React.useEffect(() => {
    if (editorView) {
      editorView.current.setProps({ editable: () => editable });
    }
  }, [editable, editorView]);

  // 执行富文本命令（可以是一个或多个）
  // 部分命令在执行前先判断当前选区是否为空，如果选区为空先进行全选操作
  const execCommand = (payload: RichTextCommand | RichTextCommand[]) => {
    if (handleElementId !== elementId) return;

    const commands = 'command' in payload ? [payload] : payload;

    for (const item of commands) {
      if (item.command === 'fontname' && item.value) {
        const mark = editorView.current.state.schema.marks.fontname.create({
          fontname: item.value,
        });
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        const { $from, $to } = editorView.current.state.selection;
        editorView.current.dispatch(
          editorView.current.state.tr.addMark($from.pos, $to.pos, mark),
        );
      } else if (item.command === 'fontsize' && item.value) {
        const mark = editorView.current.state.schema.marks.fontsize.create({
          fontsize: item.value,
        });
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        const { $from, $to } = editorView.current.state.selection;
        editorView.current.dispatch(
          editorView.current.state.tr.addMark($from.pos, $to.pos, mark),
        );
      } else if (item.command === 'color' && item.value) {
        const mark = editorView.current.state.schema.marks.forecolor.create({
          color: item.value,
        });
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        const { $from, $to } = editorView.current.state.selection;
        editorView.current.dispatch(
          editorView.current.state.tr.addMark($from.pos, $to.pos, mark),
        );
      } else if (item.command === 'backcolor' && item.value) {
        const mark = editorView.current.state.schema.marks.backcolor.create({
          backcolor: item.value,
        });
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        const { $from, $to } = editorView.current.state.selection;
        editorView.current.dispatch(
          editorView.current.state.tr.addMark($from.pos, $to.pos, mark),
        );
      } else if (item.command === 'bold') {
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        toggleMark(editorView.current.state.schema.marks.strong)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'em') {
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        toggleMark(editorView.current.state.schema.marks.em)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'underline') {
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        toggleMark(editorView.current.state.schema.marks.underline)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'strikethrough') {
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        toggleMark(editorView.current.state.schema.marks.strikethrough)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'subscript') {
        toggleMark(editorView.current.state.schema.marks.subscript)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'superscript') {
        toggleMark(editorView.current.state.schema.marks.superscript)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'blockquote') {
        wrapIn(editorView.current.state.schema.nodes.blockquote)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'code') {
        toggleMark(editorView.current.state.schema.marks.code)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'align' && item.value) {
        alignmentCommand(editorView.current, item.value);
      } else if (item.command === 'bulletList') {
        const { bullet_list: bulletList, list_item: listItem } =
          editorView.current.state.schema.nodes;
        toggleList(bulletList, listItem)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'orderedList') {
        const { ordered_list: orderedList, list_item: listItem } =
          editorView.current.state.schema.nodes;
        toggleList(orderedList, listItem)(
          editorView.current.state,
          editorView.current.dispatch,
        );
      } else if (item.command === 'clear') {
        const { empty } = editorView.current.state.selection;
        if (empty)
          selectAll(editorView.current.state, editorView.current.dispatch);
        const { $from, $to } = editorView.current.state.selection;
        editorView.current.dispatch(
          editorView.current.state.tr.removeMark($from.pos, $to.pos),
        );
      } else if (item.command === 'insert' && item.value) {
        editorView.current.dispatch(
          editorView.current.state.tr.insertText(item.value),
        );
      }
    }

    editorView.current.focus();
    handleInput();
    handleClick();
  };

  return (
    <div
      {...rest}
      className={classNames(prefixCls(), className)}
      ref={editorViewRef}
    ></div>
  );
};

export default ProsemirrorEditor;
