import { UserModel } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestHandlerService } from '../request-handler/request-handler.service';

@Injectable()
export class UsersService {
  constructor(private requestHandlerService: RequestHandlerService) {}

  newPerson(request: UserModel) {
    const url = '/person/newPerson';
    return this.requestHandlerService.doPost(url, request);
  }

  updatePerson(request: UserModel) {
    const url = '/person/updatePerson';
    return this.requestHandlerService.doPut(url, request);
  }

  getAllPerson() {
    const url = '/person/getAllPerson';
    return this.requestHandlerService.doGet(url);
  }

  deletePerson(personId): Observable<any> {
    const url = `/person/deletePerson/${personId}`;
    return this.requestHandlerService.doDelete(url);
  }
}
