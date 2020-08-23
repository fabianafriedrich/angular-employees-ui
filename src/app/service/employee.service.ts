import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string;

  constructor() {
    this.baseUrl = `${environment.apiUrl}/employee`;
  }
  /*Creating Headers to sent into the HTTP request*/
  getHeaders(auth){
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: auth
      })
    };
  }

}
