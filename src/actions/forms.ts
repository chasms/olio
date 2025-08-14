import { ActionTypes, type SwitchFormAction } from '../types/actions';

export const switchForm = (): SwitchFormAction => ({
  type: ActionTypes.SWITCH_FORM,
});
