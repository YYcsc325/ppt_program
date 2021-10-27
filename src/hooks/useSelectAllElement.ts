import { useModel } from 'umi';
import useGetter from '@/hooks/useGetter';

export default () => {
  const store = useModel('usePagesModel.index');
  const getter = useGetter();

  const currentSlide = getter.currentSlide;

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
