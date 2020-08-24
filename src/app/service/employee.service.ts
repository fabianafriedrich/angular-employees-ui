import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Employee} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string;

  constructor(private http: HttpClient) {
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

  /*Get posts from the API passing the auth token by parameter */
  listAll() {
    return this.http.get<Array<Employee>>(this.baseUrl);
    // this.getHeaders(localStorage.getItem('auth')));
  }

  /*Deleting from API by code*/
  delete(code: any) {
    return this.http.delete(this.baseUrl + '/' + code);

    // return this.http.delete(this.baseUrl + '/' + code, this.getHeaders(localStorage.getItem('auth')));
  }

  /*Sign Up functionality*/
  signUp(employee: Employee) {
    return this.http.post(this.baseUrl + '/signup', employee);
  }

  /*Update functionality*/
  update(employee: Employee) {
    // localStorage.removeItem('currentUser');
    // localStorage.setItem('currentUser', JSON.stringify(user.valueOf()));
    // return this.http.put(this.baseUrl + '/update', employee,
    //   this.getHeaders(localStorage.getItem('auth')));
    return this.http.put(this.baseUrl + '/update', employee);
  }

  // logOut() {
  //   const request = this.http.post(this.baseUrl + '/logout', {});
  //   request.subscribe(
  //     data => {
  //       localStorage.removeItem('currentUser');
  //       localStorage.removeItem('auth');
  //       this.currentUserSubject.next(null);
  //       this.loggedIn.next(false);
  //     });
  // }

}
