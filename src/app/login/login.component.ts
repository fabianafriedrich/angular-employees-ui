import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from 'primeng';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../models/employee';
import {Router} from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import {EmployeeService} from '../service/employee.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit, OnDestroy {

  formLogin: FormGroup;
  formSignUp: FormGroup;
  employee: Employee = new Employee();
  isSubmitted: boolean;


  constructor(private service: EmployeeService, private formBuilder: FormBuilder,
              private router: Router, private messageService: MessageService) { }
  display = false;

  ngOnInit(): void {
    this.formConfigSignUp();
    this.formConfigLogin();
  }

  showDialog() {
    this.display = true;
  }

  /*Get all the values from the login form*/
  get valuesLogin() {
    return this.formLogin.controls;
  }
  /*Get all the values from the sign up form*/
  get valuesSignUp() {
    return this.formSignUp.controls;
  }

  /*Form fields validation*/
  formConfigLogin() {
    this.formLogin = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, [Validators.required]],
    });
  }
  /*Form fields validation*/
  formConfigSignUp() {
    this.formSignUp = this.formBuilder.group({
      name: [null, Validators.required],
      emailSignUp: [null, Validators.required],
      psw: [null, Validators.required],
      confirmPsw: [null, Validators.required],
      profession: [null, Validators.required],
      city: [null, Validators.required],
      branch: [null, Validators.required],

    });
  }

  onSubmit(value: string) {
    this.isSubmitted = true;
  }

  signUp(){
    if (this.formSignUp.valid){
      if (this.valuesSignUp.psw.value === this.valuesSignUp.confirmPsw.value){
        this.employee.name = this.valuesSignUp.name.value;
        this.employee.email = this.valuesSignUp.emailSignUp.value;
        this.employee.password = this.valuesSignUp.psw.value;
        this.employee.profession = this.valuesSignUp.profession.value;
        this.employee.city = this.valuesSignUp.city.value;
        this.employee.branch = this.valuesSignUp.branch.value;
        this.service.signUp(this.employee).subscribe(result => {
            this.formSignUp.reset();
            this.display = false;
            this.messageService.add({
              severity: 'info',
              summary: 'Success',
              detail: 'Success Sign Up, Login now',
            });
          },
          error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Email already exists',
              detail: 'Cannot register because the email already exists',
            });
            return false;
          });
      }else {
        this.messageService.add({
          severity: 'error',
          summary: 'Passwords do not match',
          detail: 'Register is invalid',
        });
      }
    }

  }

  ngOnDestroy(){}
}
