import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Employee} from '../models/employee';
import {BehaviorSubject, Observable} from 'rxjs';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string;
  public currentUser: Observable<Employee>;
  public loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<Employee>;


  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}/employee`;
    this.currentUserSubject = new BehaviorSubject<Employee>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
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

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  /*check if the employee loged is ADMIN or not*/
  isAdmin(){
    const employee = JSON.parse(localStorage.getItem('currentUser'));
    if (employee.role === Role.ADMIN){
      return true;
    }
    return false;
  }


  /*Get posts from the API passing the auth token by parameter */
  listAll() {
    return this.http.get<Array<Employee>>(this.baseUrl,
      this.getHeaders(localStorage.getItem('auth')));
  }

  /*Deleting from API by code*/
  delete(code: any) {
    return this.http.delete(this.baseUrl + '/' + code, this.getHeaders(localStorage.getItem('auth')));
  }

  /*Sign Up functionality*/
  signUp(employee: Employee) {
    return this.http.post(this.baseUrl + '/signup', employee);
  }

  /*Update functionality*/
  update(employee: Employee) {
    // localStorage.removeItem('currentUser');
    // localStorage.setItem('currentUser', JSON.stringify(employee.valueOf()));
    return this.http.put(this.baseUrl + '/update', employee,
      this.getHeaders(localStorage.getItem('auth')));
  }

  /*Login functionality*/
  login(employee: Employee){
    const auth = 'Basic ' + btoa(employee.email + ':' + employee.password);
    const request = this.http.get(this.baseUrl + '/login', this.getHeaders(auth));
    request.subscribe(
      data => {
        localStorage.setItem('auth', auth);
        localStorage.setItem('currentUser', JSON.stringify(data.valueOf()));
        this.loggedIn.next(true);
      },
      error => {
        localStorage.removeItem('auth');
        localStorage.removeItem('currentUser');
      });
    return request;
  }

  logOut() {
    const request = this.http.post(this.baseUrl + '/logout', {});
    request.subscribe(
      data => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('auth');
        this.currentUserSubject.next(null);
        this.loggedIn.next(false);
      });
  }

}
