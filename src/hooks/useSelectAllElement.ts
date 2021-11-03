import { useModel } from 'umi';

export default () => {
  const store = useModel('usePagesModel.index');

  const currentSlide = store.getterData.currentSlide;

  // 将当前页面全部元素设置为被选择状态
  const selectAllElement = () => {
    const unlockedElements = currentSlide.elements.filter((el) => !el.lock);
    const newActiveElementIdList = unlockedElements.map((el) => el.id);
    store.setActiveElementIdList(newActiveElementIdList);
  };

  return {
    selectAllElement,
  };
};
