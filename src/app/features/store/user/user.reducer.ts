import { Action, createReducer, on } from '@ngrx/store';

import { editUser, resetState } from './user.actions';
import { UserModel } from '../../models/user.model';

export interface UserState {
  person: UserModel;
}

const initialUserState: UserState = {
  person: null,
};

const reducer = createReducer(
  initialUserState,
  on(editUser, (state, { user }) => ({
    ...state,
    person: user,
  }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
