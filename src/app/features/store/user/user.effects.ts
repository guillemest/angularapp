import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, mapTo, concatMap, switchMap, map } from 'rxjs/operators';
import { newUser, loadUserList, resetState, editUser } from './user.actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private router: Router) {}
  newUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(newUser, editUser),
        tap(() => this.router.navigate(['/addedituser']))
      ),
    { dispatch: false }
  );

  loadUserList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadUserList),
        tap(() => this.router.navigate(['/userlist']))
      ),
    { dispatch: false }
  );

}
