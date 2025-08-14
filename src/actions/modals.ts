import { ActionTypes, type CloseAllModalsAction, type OpenSaveAction, type ToggleSidebarAction, type ToggleWebcamAction } from "../types/actions";

export const toggleWebcamModal = (): ToggleWebcamAction => ({
  type: ActionTypes.TOGGLE_WEBCAM,
});

export const openSaveModal = (): OpenSaveAction => ({
  type: ActionTypes.OPEN_SAVE,
});

export const closeAllModals = (): CloseAllModalsAction => ({
  type: ActionTypes.CLOSE_ALL,
});

export const toggleSidebar = (): ToggleSidebarAction => ({
  type: ActionTypes.TOGGLE_SIDEBAR,
});
