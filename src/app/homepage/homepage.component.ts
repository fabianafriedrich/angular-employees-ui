import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../service/employee.service';
import {MessageService, SelectItem} from 'primeng';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../models/employee';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Router } from '@angular/router';
import {Role} from '../models/role';


@AutoUnsubscribe()
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [MessageService]

})
export class HomepageComponent implements OnInit, OnDestroy {

  constructor(private service: EmployeeService, private formBuilder: FormBuilder,
              private messageService: MessageService, private router: Router) {
  }

  employees: Employee[];
  employee = new Employee();
  cols: any[];
  display: boolean;
  form: FormGroup;
  isSubmitted: boolean;
  isAdmin: boolean;
  roles: SelectItem[];


  ngOnInit(): void {
    this.showDelete();
    this.formConfig();
    this.listAll();
    this.cols = [
      {field: 'Code'},
      {field: 'Name'},
      {field: 'Profession'},
      {field: 'City'},
      {field: 'Branch'}
    ];

    this.roles = [
      {label: 'Admin', value: 'ADMIN'},
      {label: 'User', value: 'USER'}
    ];

  }
  /*Get all the values from the employee form*/
  get values() {
    return this.form.controls;
  }

  /*Form fields validation*/
  formConfig() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      profession: [null, Validators.required],
      city: [null, Validators.required],
      branch: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  showDelete(){
    this.isAdmin = this.service.isAdmin();
    console.log(this.service.isAdmin());
  }

  showDialog(employee) {
    this.display = true;
    this.form = this.formBuilder.group({
      code: [employee.code],
      name: [employee.name, Validators.required],
      profession: [employee.profession, Validators.required],
      city: [employee.city, Validators.required],
      branch: [employee.branch, Validators.required],
      role: [employee.role]
    });
    this.employee = employee;
  }

  /*Get all the values from the sign up form*/
  get valuesUpdate() {
    return this.form.controls;
  }

  onSubmit(value: string) {
    this.isSubmitted = true;
  }

  /*List all Employees*/
  listAll() {
    this.service.listAll()
      .subscribe(result =>
        this.employees = result
      );
  }

  /*Delete employee by code*/
  delete(code) {
    this.service.delete(code).subscribe(() => {
      this.listAll();
    });
  }

  update(employee){
    if (this.form.valid) {
      employee.code = this.employee.code;
      employee.name = this.values.name.value;
      employee.profession = this.values.profession.value;
      employee.city = this.values.city.value;
      employee.branch = this.values.branch.value;
      employee.role = this.values.role.value;
      this.service.update(this.employee).subscribe(result => {
          this.form.reset();
          this.display = false;
          this.listAll();
          this.messageService.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Success Updating Employee',
          });
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Invalid Inputs',
            detail: 'Information is invalid',
          });
          return false;
        });
    }
  }
  /*Logout of the system*/
  logout(){
    this.service.logOut();
    this.router.navigate(['employee/login']);
  }

  ngOnDestroy(){

  }

}
