import { ActionWithPayload } from './modelsActionType';
import { createActions } from './modelUtils';

const initPageState = {
  screening: false, // 是否进入放映状态
};

export type PageState = typeof initPageState;

const pageModel = {
  namespace: 'page',
  state: initPageState,
  reducers: {
    setState(
      state: PageState,
      { payload }: ActionWithPayload<Partial<PageState>>,
    ) {
      return { ...state, ...payload };
    },
    initState() {
      return initPageState;
    },
  },
};

export const pageActions = createActions(pageModel);

export default pageModel;
