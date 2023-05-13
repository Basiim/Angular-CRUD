import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from '../employee/Model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

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
    this.validate(this.employee);
    this.employeeService.addEmployee(this.employee).subscribe((res) => {
      this.formResponse.emit('Employee Added Successfully!');
      this.router.navigate(['/employees']);
    });
  }
  editEmployee() {
    this.validate(this.employee);
    this.employeeService
      .updateEmployee(this.employee, this.id)
      .subscribe((res) => {
        console.log('Emetting', res);
        this.formResponse.emit(res.message);
        this.router.navigate(['/employees']);
      });
  }
  validate(employee: Employee) {
    // validate Employee data
    if (employee.name == null || employee.name == '') {
      this.toastr.error('Employee name is required');
      throw new Error('Employee name is required');
    }
    // regex for email validation
    const emailRegex = new RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
    );

    if (
      employee.email == null ||
      employee.email == '' ||
      !emailRegex.test(employee.email)
    ) {
      this.toastr.error('Employee email is empty or invalid');
      throw new Error('Employee email is empty or invalid');
    }
    if (employee.department == null || employee.department == '') {
      this.toastr.error('Employee department is required');
      throw new Error('Employee department is required');
    }
    if (employee.salary == null || employee.salary == 0) {
      this.toastr.error('Employee salary is required');
      throw new Error('Employee salary is required');
    }
  }
}
