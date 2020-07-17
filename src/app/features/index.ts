import { LoadingComponent } from './shared/loading/loading.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddEditUserComponent } from './users/add-edit-user/add-edit-user.component';
import { AlertConfirmComponent } from './shared/alert-confirm/alert-confirm.component';

export const AppFeaturesComponents = [
  UserListComponent,
  LoadingComponent,
  AddEditUserComponent,
  AlertConfirmComponent,
];

export const AppFeaturesEntryComp = [LoadingComponent, AlertConfirmComponent];
