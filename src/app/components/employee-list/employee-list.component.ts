import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from '../employee/Model/Employee';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  constructor(
    public employeeService: EmployeeService,
    private toastr: ToastrService
  ) { }
  employees: Employee[] = [];
  getEmployees() {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
  }
  ngOnInit() {
    this.getEmployees();
  }
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe((msg) => {
        this.getEmployees();
        this.toastr.success(msg.message);
      });
    }
  }
}
