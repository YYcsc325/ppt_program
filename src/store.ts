import { IDvaModel } from '@/models/index';

import editorModel from '@/models/editor';

/** 获取model的申明 */
export type DelareState<M extends IDvaModel = IDvaModel> = M['state'];

export type AppStore = {
  editor: editorState;
};

/** 用户的state */
export type editorState = DelareState<typeof editorModel>;
