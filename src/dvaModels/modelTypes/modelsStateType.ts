import { GlobalState } from '../global';
import { EditorState } from '../editor';
import { EditorContentState } from '../editorContent';

export type AppStore = {
  global: GlobalState;
  editor: EditorState;
  editorContent: EditorContentState;
};
