import { ActionWithPayload } from './modelsActionType';
import { createActions } from './modelUtils';

const initHomeState = {
  screening: false, // 是否进入放映状态
};

export type HomeState = typeof initHomeState;

const homeModel = {
  namespace: 'home',
  state: initHomeState,
  reducers: {
    setState(
      state: HomeState,
      { payload }: ActionWithPayload<Partial<HomeState>>,
    ) {
      return { ...state, ...payload };
    },
    initState() {
      return initHomeState;
    },
  },
};

export const homeActions = createActions(homeModel);

export default homeModel;
