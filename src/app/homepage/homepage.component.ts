import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../service/employee.service';
import {MessageService} from 'primeng';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../models/employee';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';


@AutoUnsubscribe()
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [MessageService]

})
export class HomepageComponent implements OnInit, OnDestroy {

  constructor(private service: EmployeeService, private formBuilder: FormBuilder,
              private messageService: MessageService) {
  }

  employees: Employee[];
  employee = new Employee();
  cols: any[];
  display: boolean;
  selectedEmployee: Employee;
  form: FormGroup;
  isSubmitted: boolean;


  ngOnInit(): void {
    this.formConfig();
    this.listAll();
    this.cols = [
      {field: 'Code'},
      {field: 'Name'},
      {field: 'Profession'},
      {field: 'City'},
      {field: 'Branch'}
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
    });
  }

  showDialog(employee) {
    this.display = true;
    this.form = this.formBuilder.group({
      name: [employee.name, Validators.required],
      profession: [employee.profession, Validators.required],
      city: [employee.city, Validators.required],
      branch: [employee.branch, Validators.required],
    });
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

  /*Delete user by id*/
  delete(id) {
    this.service.delete(id).subscribe(() => {
      this.listAll();
    });
  }
  update(){}

  ngOnDestroy(){

  }

}
