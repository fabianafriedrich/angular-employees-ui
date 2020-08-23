import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng';
import {EmailValidator, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../models/employee';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  formSignUp: FormGroup;
  employee: Employee = new Employee();
  isSubmitted: boolean;


  constructor(private formBuilder: FormBuilder,
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
      emailSignUp: [null, Validators.required, Validators.email],
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

  register() {
  }
}
