import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from '../employee/Model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent {

  @Output() formResponse = new EventEmitter<string>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  depts = [
    'IT',
    'HR',
    'Admin',
    'Finance',
    'QA',
    'Sales',
    'Marketing',
    'Operations',
    'Logistics',
    'Product',
    'Engineering',
    'Design',
  ];
  employee: Employee = new Employee();
  id: number = Number(this.route.snapshot.paramMap.get('emp'));
  ngOnInit(): void {
    if (this.id) {
      this.employeeService.getEmployeeByID(this.id).subscribe((res) => {
        this.employee = res;
      });
    }
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe((res) => {
      this.formResponse.emit('Employee Added Successfully!');
      this.router.navigate(['/employees']);
    });
  }
  editEmployee() {
    this.employeeService
      .updateEmployee(this.employee, this.id)
      .subscribe((res) => {
        console.log("Emetting", res);
        this.formResponse.emit(res.message);
        this.router.navigate(['/employees']);
      });
  }
}
