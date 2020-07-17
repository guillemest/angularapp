import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Custom imports
import { rutValidator } from './../../validators/rut.validator';
import { RutPipe } from './../../pipes/rut.pipe';
import { UserModel } from './../../models/user.model';
import { AppState } from '../../store';
import { selPerson, loadUserList, editUser } from '../../store/user';
import { DestroySubscriptionService } from '../../services/destroy-subscription/destroy-subscription.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { LoadingService } from './../../services/loading/loading.service';
import { UsersService } from './../../services/users/users.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  person: UserModel;
  personId: number;
  form: FormGroup;
  action: string;
  request = {} as UserModel;
  constructor(
    public store: Store<AppState>,
    private destroy$: DestroySubscriptionService,
    private formBuilder: FormBuilder,
    private rutPipe: RutPipe,
    private usersService: UsersService,
    private loadingService: LoadingService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.store
      .pipe(select(selPerson), takeUntil(this.destroy$))
      .subscribe((person) => {
        this.person = person;
        this.action = this.person === null ? 'New' : 'Edit';
        if (this.person) {
          this.request = this.person;
          this.personId = this.person.person_id;
          Object.keys(this.person).forEach((field) => {
            if (field !== 'person_id') {
              this.form.get(field).setValue(this.person[field]);
            }
          });
        }
      });
  }

  createForm() {
    this.form = this.formBuilder.group({
      person_rut: ['', [rutValidator, Validators.required]],
      person_name: ['', [Validators.required, Validators.maxLength(50)]],
      person_lastname: ['', [Validators.required, Validators.maxLength(60)]],
      person_age: ['', [Validators.min(18)]],
      person_address: ['', ''],
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((field) => {
      this.request = field;
    });
  }

  goBack() {
    this.store.dispatch(editUser(null));
    this.store.dispatch(loadUserList());
  }

  save() {
    this.loadingService.openSpinner();
    this.request.person_rut = this.rutPipe.parse(this.request.person_rut);
    if (!this.person) {
      this.usersService
        .newPerson(this.request)
        .then(() => {
          this.loadingService.closeSpinner();
          this.snackBar.open('User created successfully');
          this.goBack();
        })
        .catch((err) => {
          this.loadingService.closeSpinner();
          this.snackBar.open(err);
        });
    } else {
      this.request.person_id = this.personId;
      this.usersService
        .updatePerson(this.request)
        .then(() => {
          this.loadingService.closeSpinner();
          this.snackBar.open('User updated successfully');
          this.goBack();
        })
        .catch((err) => {
          this.loadingService.closeSpinner();
          this.snackBar.open(err);
        });
    }
  }
}
