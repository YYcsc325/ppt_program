import { useReducer } from 'react';
import { utils } from 'react-dtcomponents';
import { set, omit } from 'lodash';

import { SYS_FONTS } from '@/config/font';
import { isSupportFont } from '@/utils/font';
import { CreatingElement } from '@/types/edit';
import { StoreActions } from '@/consts/storeAction';
import { ToolbarState } from '@/types/toolbar';
import { TextAttrs } from '@/utils/utils';
import { Slide, PPTElement, SlideTheme } from '@/types/slides';

import { initStoreState, InitStoreStateType } from './storeState';

interface RemoveElementPropData {
  id: string;
  propName: string | string[];
}

interface UpdateElementData {
  id: string | string[];
  props: Partial<PPTElement>;
}

export default function useStore() {
  const [store, dispatchStore] = useReducer(storeReducer, initStoreState);
  return {
    store: <InitStoreStateType>store,
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

    setSlides: (payload: Slide) => {
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

function storeReducer(state: InitStoreStateType, { type, payload }: any) {
  const newSlides = [...state.slides];
  const slideIndex = state.slideIndex;

  const map = {
    [StoreActions.SET_ACTIVE_ELEMENT_ID_LIST]: (
      activeElementIdList: string[],
    ) => {
      if (activeElementIdList?.length === 1) {
        return { ...state, handleElementId: activeElementIdList?.[0] };
      } else {
        return { ...state, handleElementId: '' };
      }
    },

    [StoreActions.SET_HANDLE_ELEMENT_ID]: (handleElementId: string) => {
      return { ...state, handleElementId };
    },

    [StoreActions.SET_ACTIVE_GROUP_ELEMENT_ID]: (
      activeGroupElementId: string,
    ) => {
      return { ...state, activeGroupElementId };
    },

    [StoreActions.SET_CANVAS_PERCENTAGE]: (canvasPercentage: number) => {
      return { ...state, canvasPercentage };
    },

    [StoreActions.SET_CANVAS_SCALE]: (canvasScale: number) => {
      return { ...state, canvasScale };
    },

    [StoreActions.SET_THUMBNAILS_FOCUS]: (thumbnailsFocus: boolean) => {
      return { ...state, thumbnailsFocus };
    },

    [StoreActions.SET_EDITORAREA_FOCUS]: (editorAreaFocus: boolean) => {
      return { ...state, editorAreaFocus };
    },

    [StoreActions.SET_DISABLE_HOTKEYS_STATE]: (disableHotkeys: boolean) => {
      return { ...state, disableHotkeys };
    },

    [StoreActions.SET_GRID_LINES_STATE]: (showGridLines: boolean) => {
      return { ...state, showGridLines };
    },

    [StoreActions.SET_CREATING_ELEMENT]: (
      creatingElement: CreatingElement | null,
    ) => {
      return { ...state, creatingElement };
    },

    [StoreActions.SET_AVAILABLE_FONTS]: (value: any) => {
      return {
        ...state,
        availableFonts: SYS_FONTS.filter((font) => isSupportFont(font.value)),
      };
    },

    [StoreActions.SET_TOOLBAR_STATE]: (toolbarState: ToolbarState) => {
      return { ...state, toolbarState };
    },

    [StoreActions.SET_CLIPING_IMAGE_ELEMENT_ID]: (
      clipingImageElementId: string,
    ) => {
      return { ...state, clipingImageElementId };
    },

    [StoreActions.SET_RICHTEXT_ATTRS]: (richTextAttrs: TextAttrs) => {
      return { ...state, richTextAttrs };
    },

    [StoreActions.SET_SELECTED_TABLE_CELLS]: (selectedTableCells: string[]) => {
      return { ...state, selectedTableCells };
    },

    [StoreActions.SET_SCALING_STATE]: (isScaling: boolean) => {
      return { ...state, isScaling };
    },

    [StoreActions.SET_EDITING_SHAPE_ELEMENT_ID]: (
      editingShapeElementId: string,
    ) => {
      return { ...state, editingShapeElementId };
    },

    [StoreActions.SET_THEME]: (theme: Partial<SlideTheme>) => {
      return { ...state, theme };
    },

    [StoreActions.SET_VIEWPORT_RATIO]: (viewportRatio: number) => {
      return { ...state, viewportRatio };
    },

    [StoreActions.SET_SLIDES]: (slides: Slide[]) => {
      return { ...state, slides };
    },

    [StoreActions.ADD_SLIDE]: (slide: Slide | Slide[]) => {
      const slidesProps = utils.isArray(slide) ? slide : [slide];

      const addIndex = slideIndex + 1;

      newSlides.splice(addIndex, 0, ...slidesProps);

      return { ...state, slideIndex: addIndex, slides: newSlides };
    },

    [StoreActions.UPDATE_SLIDE]: (slide: Partial<Slide>) => {
      newSlides[slideIndex] = { ...newSlides[slideIndex], ...slide };

      return { ...state, slides: newSlides };
    },

    [StoreActions.DELETE_SLIDE]: (slideId: string | string[]) => {
      const slidesId = utils.isArray(slideId) ? slideId : [slideId];

      const deleteSlidesIndex = [];
      for (let i = 0; i < slidesId.length; i++) {
        const index = newSlides.findIndex((item) => item.id === slidesId[i]);
        deleteSlidesIndex.push(index);
      }

      let newIndex = Math.min(...deleteSlidesIndex);

      const maxIndex = newSlides.length - slidesId.length - 1;
      if (newIndex > maxIndex) newIndex = maxIndex;

      return {
        ...state,
        slideIndex: newIndex,
        slides: newSlides.filter((item) => !slidesId.includes(item.id)),
      };
    },

    [StoreActions.UPDATE_SLIDE_INDEX]: (updateIndex: number) => {
      return { ...state, slideIndex: updateIndex };
    },

    [StoreActions.UPDATE_SELECTED_SLIDES_INDEX]: (
      selectedSlidesIndex: number[],
    ) => {
      return { ...state, selectedSlidesIndex };
    },

    [StoreActions.ADD_ELEMENT]: (element: PPTElement | PPTElement[]) => {
      const elements = utils.isArray(element) ? element : [element];

      const currentSlideEls = newSlides[slideIndex].elements;

      const newEls = [...currentSlideEls, ...elements];

      return {
        ...state,
        slides: [...set(newSlides, [slideIndex, 'elements'], newEls)],
      };
    },

    [StoreActions.UPDATE_ELEMENT]: (value: UpdateElementData) => {
      const { id, props } = value;

      const elIdList = typeof id === 'string' ? [id] : id;

      const slide = newSlides[slideIndex];

      const updateElements = slide.elements.map((el: any) => {
        return elIdList.includes(el.id) ? { ...el, ...props } : el;
      });

      return {
        ...state,
        slides: [...set(newSlides, [slideIndex, 'elements'], updateElements)],
      };
    },

    [StoreActions.REMOVE_ELEMENT_PROPS]: (value: RemoveElementPropData) => {
      const { id, propName } = value;
      const propsNames = typeof propName === 'string' ? [propName] : propName;

      const slide = newSlides[slideIndex];

      const elements = slide.elements.map((el: any) => {
        return el.id === id ? omit(el, propsNames) : el;
      });

      return {
        ...state,
        slides: [...set(newSlides, [slideIndex, 'elements'], elements)],
      };
    },

    [StoreActions.SET_SNAPSHOT_CURSOR]: (snapshotCursor: number) => {
      return { ...state, snapshotCursor };
    },

    [StoreActions.SET_SNAPSHOT_LENGTH]: (snapshotLength: number) => {
      return { ...state, snapshotLength };
    },

    [StoreActions.SET_CTRL_KEY_STATE]: (ctrlKeyState: boolean) => {
      return { ...state, ctrlKeyState };
    },

    [StoreActions.SET_SHIFT_KEY_STATE]: (shiftKeyState: boolean) => {
      return { ...state, shiftKeyState };
    },

    [StoreActions.SET_SCREENING]: (screening: boolean) => {
      return { ...state, screening };
    },
  };

  if (map[type]) return map[type](payload as never);
  return { ...state, ...payload };
}

export type StoreReturnType = ReturnType<typeof useStore>;
