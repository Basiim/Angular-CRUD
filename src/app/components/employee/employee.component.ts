import { Component } from '@angular/core';
import { Employee } from './Model/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent {
  employee: Employee | undefined;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  getEmployee(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.employeeService
      .getEmployeeByID(id)
      .subscribe((employee) => (this.employee = employee));
  }

  ngOnInit(): void {
    this.getEmployee();
  }
}
