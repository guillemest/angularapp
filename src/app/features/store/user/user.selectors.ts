import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from './user.reducer';

const userSelector = createFeatureSelector<UserState>('user');

export const selPerson = createSelector(userSelector, (s) => s.person);
