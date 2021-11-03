import tinycolor from 'tinycolor2';
import React, { useReducer } from 'react';

import { CreatingElement } from '@/types/edit';
import { StoreActions } from '@/consts/storeAction';
import { ToolbarState } from '@/types/toolbar';
import { layouts as layout } from '@/mocks/layout';
import { TextAttrs } from '@/utils/prosemirror/utils';
import { Slide, PPTElement, SlideTheme } from '@/types/slides';

import { initStoreState, InitStoreStateType } from './state';
import { pageReducer } from './reducer';

export interface RemoveElementPropData {
  id: string;
  propName: string | string[];
}

export interface UpdateElementData {
  id: string | string[];
  props: Partial<PPTElement>;
}

export default function usePagesModel() {
  const [store, dispatchStore] = useReducer(pageReducer, initStoreState);

  const currentSlide = store.slides[store.slideIndex] || null;
  const canUndo = store.snapshotCursor > 0;
  const canRedo = store.snapshotCursor < store.snapshotLength - 1;
  const ctrlOrShiftKeyActive = store.ctrlKeyState || store.shiftKeyState;

  const activeElementList = React.useMemo(() => {
    const currentSlide = store.slides[store.slideIndex];
    if (!currentSlide || !currentSlide.elements) return [];
    return currentSlide.elements.filter((element) =>
      store.activeElementIdList.includes(element.id),
    );
  }, [store.slides, store.slideIndex]);

  const handleElement = React.useMemo(() => {
    const currentSlide = store.slides[store.slideIndex];
    if (!currentSlide || !currentSlide.elements) return null;
    return (
      currentSlide.elements.find(
        (element) => store.handleElementId === element.id,
      ) || null
    );
  }, [store.slides, store.slideIndex]);

  const currentSlideAnimations = React.useMemo(() => {
    const currentSlide = store.slides[store.slideIndex];
    if (!currentSlide) return null;
    const animations = currentSlide.animations;
    if (!animations) return null;

    const els = currentSlide.elements;
    const elIds = els.map((el) => el.id);
    return animations.filter((animation) => elIds.includes(animation.elId));
  }, [store.slides, store.slideIndex]);

  const layouts = React.useMemo(() => {
    const { themeColor, fontColor, fontName, backgroundColor } = store.theme;

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
  }, [store.theme]);

  return {
    activeElementList,
    storeData: store,
    getterData: {
      canUndo,
      canRedo,
      layouts,
      currentSlide,
      handleElement,
      activeElementList,
      ctrlOrShiftKeyActive,
      currentSlideAnimations,
    },
    setActiveElementIdList: (payload: string[]) =>
      dispatchStore({ type: StoreActions.SET_ACTIVE_ELEMENT_ID_LIST, payload }),
    setHandleElementId: (payload: string) =>
      dispatchStore({ type: StoreActions.SET_HANDLE_ELEMENT_ID, payload }),
    setActiveGroupElementId: (payload: string) =>
      dispatchStore({
        type: StoreActions.SET_ACTIVE_GROUP_ELEMENT_ID,
        payload,
      }),
    setCanvasPercentage: (payload: number) =>
      dispatchStore({ type: StoreActions.SET_CANVAS_PERCENTAGE, payload }),
    setCanvasScale: (payload: number) =>
      dispatchStore({ type: StoreActions.SET_CANVAS_SCALE, payload }),
    setThumbnailsFocus: (payload: boolean) =>
      dispatchStore({ type: StoreActions.SET_THUMBNAILS_FOCUS, payload }),
    setEditorAreaFocus: (payload: boolean) =>
      dispatchStore({ type: StoreActions.SET_EDITORAREA_FOCUS, payload }),
    setDisableHotkeys: (payload: boolean) => {
      dispatchStore({ type: StoreActions.SET_DISABLE_HOTKEYS_STATE, payload });
    },
    setShowGridLines: (payload: boolean) => {
      dispatchStore({ type: StoreActions.SET_GRID_LINES_STATE, payload });
    },
    setCreatingElement: (payload: CreatingElement) => {
      dispatchStore({ type: StoreActions.SET_CREATING_ELEMENT, payload });
    },
    setAvailableFonts: () => {
      dispatchStore({ type: StoreActions.SET_AVAILABLE_FONTS });
    },
    setToolbarState: (payload: ToolbarState) => {
      dispatchStore({ type: StoreActions.SET_TOOLBAR_STATE, payload });
    },
    setClipingImageElementId: (payload: string) => {
      dispatchStore({
        type: StoreActions.SET_CLIPING_IMAGE_ELEMENT_ID,
        payload,
      });
    },
    setRichTextAttrs: (payload: TextAttrs) => {
      dispatchStore({
        type: StoreActions.SET_RICHTEXT_ATTRS,
        payload,
      });
    },
    setSelectedTableCells: (payload: string[]) => {
      dispatchStore({
        type: StoreActions.SET_SELECTED_TABLE_CELLS,
        payload,
      });
    },
    setIsScaling: (payload: boolean) => {
      dispatchStore({
        type: StoreActions.SET_SCALING_STATE,
        payload,
      });
    },
    setEditingShapeElementId: (payload: string) => {
      dispatchStore({
        type: StoreActions.SET_EDITING_SHAPE_ELEMENT_ID,
        payload,
      });
    },
    setTheme: (payload: Partial<SlideTheme>) => {
      dispatchStore({
        type: StoreActions.SET_THEME,
        payload,
      });
    },
    setViewportRatio: (payload: number) => {
      dispatchStore({
        type: StoreActions.SET_VIEWPORT_RATIO,
        payload,
      });
    },
    setSlides: (payload: Slide[]) => {
      dispatchStore({
        type: StoreActions.SET_SLIDES,
        payload,
      });
    },
    addSlide: (payload: Slide | Slide[]) => {
      dispatchStore({
        type: StoreActions.ADD_SLIDE,
        payload,
      });
    },
    updateSlide: (payload: Partial<Slide>) => {
      dispatchStore({
        type: StoreActions.UPDATE_SLIDE,
        payload,
      });
    },
    deleteSlide: (payload: string | string[]) => {
      dispatchStore({
        type: StoreActions.DELETE_SLIDE,
        payload,
      });
    },
    setSlideIndex: (payload: number) => {
      dispatchStore({
        type: StoreActions.UPDATE_SLIDE_INDEX,
        payload,
      });
    },
    setSelectedSlidesIndex: (payload: number[]) => {
      dispatchStore({
        type: StoreActions.UPDATE_SELECTED_SLIDES_INDEX,
        payload,
      });
    },
    addElement: (payload: PPTElement | PPTElement[]) => {
      dispatchStore({
        type: StoreActions.ADD_ELEMENT,
        payload,
      });
    },
    updateElement: (payload: UpdateElementData) => {
      dispatchStore({
        type: StoreActions.UPDATE_ELEMENT,
        payload,
      });
    },
    removeElement: (payload: RemoveElementPropData) => {
      dispatchStore({
        type: StoreActions.REMOVE_ELEMENT_PROPS,
        payload,
      });
    },
    setSnapshotCursor: (payload: number) => {
      dispatchStore({
        type: StoreActions.SET_SNAPSHOT_CURSOR,
        payload,
      });
    },
    setSnapshotLength: (payload: number) => {
      dispatchStore({
        type: StoreActions.SET_SNAPSHOT_LENGTH,
        payload,
      });
    },
    setCtrlKeyState: (payload: boolean) => {
      dispatchStore({
        type: StoreActions.SET_CTRL_KEY_STATE,
        payload,
      });
    },
    setShiftKeyState: (payload: boolean) => {
      dispatchStore({
        type: StoreActions.SET_SHIFT_KEY_STATE,
        payload,
      });
    },
    setScreening: (payload: boolean) => {
      dispatchStore({
        type: StoreActions.SET_SCREENING,
        payload,
      });
    },
  };
}

export type StoreReturnType = ReturnType<typeof usePagesModel>;
