import {
  ActionWithPayload,
  createActions,
} from './modelTypes/modelsActionType';

const initGlobalState = {
  screening: false, // 是否进入放映状态
};

export type GlobalState = typeof initGlobalState;

const homeModel = {
  namespace: 'global',
  state: initGlobalState,
  reducers: {
    setState(
      state: GlobalState,
      { payload }: ActionWithPayload<Partial<GlobalState>>,
    ) {
      return { ...state, ...payload };
    },
    initState() {
      return initGlobalState;
    },
  },
};

export const homeActions = createActions(homeModel);

export default homeModel;
