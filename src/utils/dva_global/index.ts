import { createActions } from '@/utils/models';
import { initDvaGlobalState } from './state';
import { reducers } from './reducer';

export type DvaGlobalState = typeof initDvaGlobalState;

const DvaGlobalModel = {
  namespace: 'dva_global',
  state: initDvaGlobalState,
  reducers: {
    ...reducers,
    setState(
      state: DvaGlobalState,
      { payload }: ActionWithPayload<Partial<DvaGlobalState>>,
    ) {
      return { ...state, ...payload };
    },
    initState() {
      return initDvaGlobalState;
    },
  },
  setup(props: any) {
    console.log(props, 'model初始化时调用');
  },
};

export const DvaGlobalActions = createActions(DvaGlobalModel);

export default DvaGlobalModel;
