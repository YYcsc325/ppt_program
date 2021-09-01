import type { ActionWithPayload } from './index';
import { createActions } from './index';

const editorInitialState = {};

type EditorInitialState = typeof editorInitialState;

const editorModel = {
  namespace: 'editor',
  state: editorInitialState,
  effects: {},
  reducers: {
    setState(
      state: EditorInitialState,
      { payload }: ActionWithPayload<Partial<EditorInitialState>>,
    ) {
      return { ...state, ...payload };
    },
    clearState() {
      return editorInitialState;
    },
  },
};

export const editorActions = createActions(editorModel);

export default editorModel;
