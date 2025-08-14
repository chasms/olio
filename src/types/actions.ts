// Central shared action & state type definitions

import type { AccountState } from "../reducers/AccountReducer";

// Domain model types
export interface AddonItem {
  id: string;
  x: number;
  y: number;
  h: number;
  w: number;
  url: string;
  category: string; // e.g. 'text', 'image'
  fontFamily?: string;
  value?: string; // text content when category === 'text'
}

export interface AddonLibraryItem {
  id?: string; // may be absent before instantiation
  initial_height: number;
  initial_width: number;
  url: string;
  category: string;
  fontFamily?: string;
}

export interface Creation {
  id: string | number;
  title?: string;
  composition?: AddonItem[];
}

// Central enum of all action type strings
export enum ActionTypes {
  ADD_ADDON = 'ADD_ADDON',
  REMOVE_ADDON = 'REMOVE_ADDON',
  STORE_LOCATION = 'STORE_LOCATION',
  DELETE_ADDONS = 'DELETE_ADDONS',
  RESTORE_CREATION = 'RESTORE_CREATION',
  GET_ADDONS = 'GET_ADDONS',
  GET_DRAWERS = 'GET_DRAWERS',
  SET_TOKEN = 'SET_TOKEN',
  REMOVE_TOKEN = 'REMOVE_TOKEN',
  SET_ACCOUNT_DETAILS = 'SET_ACCOUNT_DETAILS',
  GET_CREATIONS = 'GET_CREATIONS',
  CLEAR_CREATIONS = 'CLEAR_CREATIONS',
  SET_CURRENT_CREATION = 'SET_CURRENT_CREATION',
  FINISHED_LOADING = 'FINISHED_LOADING',
  TOGGLE_WEBCAM = 'TOGGLE_WEBCAM',
  OPEN_SAVE = 'OPEN_SAVE',
  TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
  CLOSE_ALL = 'CLOSE_ALL',
  SWITCH_FORM = 'SWITCH_FORM',
  RESET_LOGIN_FORM = 'RESET_LOGIN_FORM',
  // external notifications library string(s) may remain untyped here if needed
}

// Action interfaces (discriminated by `type`)
// ADDON
export interface AddAddonAction { type: ActionTypes.ADD_ADDON; payload: {
  initial_height: number; initial_width: number; url: string; category: string; fontFamily?: string; value?: string;
} }
export interface RemoveAddonAction { type: ActionTypes.REMOVE_ADDON; payload: { id: string } }
export interface StoreLocationAction { type: ActionTypes.STORE_LOCATION; payload: { id: string; coordinates: { top: number; left: number; height: number; width: number }; value?: string } }
export interface DeleteAddonsAction { type: ActionTypes.DELETE_ADDONS }
export interface RestoreCreationAction { type: ActionTypes.RESTORE_CREATION; payload: { composition: AddonItem[] } }

// ADDON LIBRARY
export interface GetAddonsAction { type: ActionTypes.GET_ADDONS; payload: AddonLibraryItem[] }

// DRAWER
export interface GetDrawersAction { type: ActionTypes.GET_DRAWERS; payload: unknown[] }

// ACCOUNT
export interface SetTokenAction { type: ActionTypes.SET_TOKEN; payload: { token: string } }
export interface RemoveTokenAction { type: ActionTypes.REMOVE_TOKEN }
export interface SetAccountDetailsAction { type: ActionTypes.SET_ACCOUNT_DETAILS; payload: Partial<AccountState> }

// CREATION
export interface GetCreationsAction { type: ActionTypes.GET_CREATIONS; payload: Creation[] }
export interface ClearCreationsAction { type: ActionTypes.CLEAR_CREATIONS }

// CURRENT CREATION
export interface SetCurrentCreationAction { type: ActionTypes.SET_CURRENT_CREATION; payload: { id: string; title?: string } }

// LOADING
export interface FinishedLoadingAction { type: ActionTypes.FINISHED_LOADING }

// MODALS
export interface ToggleWebcamAction { type: ActionTypes.TOGGLE_WEBCAM }
export interface OpenSaveAction { type: ActionTypes.OPEN_SAVE }
export interface ToggleSidebarAction { type: ActionTypes.TOGGLE_SIDEBAR }
export interface CloseAllModalsAction { type: ActionTypes.CLOSE_ALL }

// FORMS
export interface SwitchFormAction { type: ActionTypes.SWITCH_FORM }
export interface ResetLoginFormAction { type: ActionTypes.RESET_LOGIN_FORM }

// Union by feature
export type AddonActions = AddAddonAction | RemoveAddonAction | StoreLocationAction | DeleteAddonsAction | RestoreCreationAction;
export type AddonLibraryActions = GetAddonsAction;
export type DrawerActions = GetDrawersAction;
export type AccountActions = SetTokenAction | RemoveTokenAction | SetAccountDetailsAction;
export type CreationActions = GetCreationsAction | ClearCreationsAction;
export type CurrentCreationActions = SetCurrentCreationAction;
export type LoadingActions = FinishedLoadingAction;
export type ModalsActions = ToggleWebcamAction | OpenSaveAction | ToggleSidebarAction | CloseAllModalsAction;
export type FormsActions = SwitchFormAction | ResetLoginFormAction;

// Aggregate app action
export type AppAction =
  | AddonActions
  | AddonLibraryActions
  | DrawerActions
  | AccountActions
  | CreationActions
  | CurrentCreationActions
  | LoadingActions
  | ModalsActions
  | FormsActions;
