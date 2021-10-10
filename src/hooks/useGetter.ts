import { useMemo } from 'react';
import { useModel } from 'umi';
import tinycolor from 'tinycolor2';
import { layouts as layout } from '@/mocks/layout';

export default function useGetter() {
  const state = useModel('usePagesModel.index', (model) => model.storeData);

  const currentSlide = useMemo(() => {
    return state.slides[state.slideIndex] || null;
  }, [state.slides, state.slideIndex]);

  const currentSlideAnimations = useMemo(() => {
    const currentSlide = state.slides[state.slideIndex];
    if (!currentSlide) return null;
    const animations = currentSlide.animations;
    if (!animations) return null;

    const els = currentSlide.elements;
    const elIds = els.map((el) => el.id);
    return animations.filter((animation) => elIds.includes(animation.elId));
  }, [state.slides, state.slideIndex]);

  const layouts = useMemo(() => {
    const { themeColor, fontColor, fontName, backgroundColor } = state.theme;

    const subColor = tinycolor(fontColor).isDark()
      ? 'rgba(230, 230, 230, 0.5)'
      : 'rgba(180, 180, 180, 0.5)';

    const layoutsString = JSON.stringify(layout)
      .replaceAll('{{themeColor}}', themeColor)
      .replaceAll('{{fontColor}}', fontColor)
      .replaceAll('{{fontName}}', fontName)
      .replaceAll('{{backgroundColor}}', backgroundColor)
      .replaceAll('{{subColor}}', subColor);

    return JSON.parse(layoutsString);
  }, [state.theme]);

  const activeElementList = useMemo(() => {
    const currentSlide = state.slides[state.slideIndex];
    if (!currentSlide || !currentSlide.elements) return [];
    return currentSlide.elements.filter((element) =>
      state.activeElementIdList.includes(element.id),
    );
  }, [state.slides, state.slideIndex]);

  const handleElement = useMemo(() => {
    const currentSlide = state.slides[state.slideIndex];
    if (!currentSlide || !currentSlide.elements) return null;
    return (
      currentSlide.elements.find(
        (element) => state.handleElementId === element.id,
      ) || null
    );
  }, [state.slides, state.slideIndex]);

  const canUndo = useMemo(() => {
    return state.snapshotCursor > 0;
  }, [state.snapshotCursor]);

  const canRedo = useMemo(() => {
    return state.snapshotCursor < state.snapshotLength - 1;
  }, [state.snapshotCursor, state.snapshotLength]);

  const ctrlOrShiftKeyActive = useMemo(() => {
    return state.ctrlKeyState || state.shiftKeyState;
  }, [state.ctrlKeyState, state.shiftKeyState]);

  return {
    canUndo,
    canRedo,
    layouts,
    currentSlide,
    handleElement,
    activeElementList,
    ctrlOrShiftKeyActive,
    currentSlideAnimations,
  };
}
