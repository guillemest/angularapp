import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './features/users/user-list/user-list.component';
import { AddEditUserComponent } from './features/users/add-edit-user/add-edit-user.component';

const appRoutes: Routes = [
  { path: 'userlist', component: UserListComponent },
  { path: 'addedituser', component: AddEditUserComponent },
  { path: '**', redirectTo: '/userlist', pathMatch: 'full' },
];

export const RoutingModule = RouterModule.forRoot(appRoutes);
