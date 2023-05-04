import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/view/:id', component: EmployeeComponent },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees/add', component: EmployeeFormComponent },
  { path: 'employees/edit/:emp', component: EmployeeFormComponent },
  { path: 'employees/:msg', component: EmployeeListComponent },
  { path: 'edit/:id', component: EmployeeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
