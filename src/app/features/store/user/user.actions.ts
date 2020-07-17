import { UserModel } from './../../models/user.model';
import { createAction, props } from '@ngrx/store';

export const newUser = createAction('[User] New user');

export const loadUserList = createAction('[User] Load user list');

export const resetState = createAction('[User] Reset state');

export const editUser = createAction(
  '[User] Edit User',
  props<{ user: UserModel }>()
);
