import { useModel } from 'umi';
import { debounce, throttle } from 'lodash';

export default () => {
  const actionsModel = useModel('useActionsModel.index');

  // 添加历史快照(历史记录)
  const addHistorySnapshot = debounce(
    function () {
      actionsModel.addSnapshot();
    },
    300,
    { trailing: true },
  );

  // 重做
  const redo = throttle(
    function () {
      actionsModel.reDo();
    },
    100,
    { leading: true, trailing: false },
  );

  // 撤销
  const undo = throttle(
    function () {
      actionsModel.unDo();
    },
    100,
    { leading: true, trailing: false },
  );

  return {
    addHistorySnapshot,
    redo,
    undo,
  };
};
