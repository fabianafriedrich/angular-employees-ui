import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomepageComponent} from './homepage/homepage.component';


const routes: Routes = [
  { path: 'employee/login', component: LoginComponent },
  { path: 'employee/homepage', component: HomepageComponent },

  { path: '', redirectTo: 'employee/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
