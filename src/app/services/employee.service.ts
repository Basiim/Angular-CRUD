import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../components/employee/Model/Employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('api/employees');
  }

  getEmployeeByID(id: number): Observable<Employee> {
    const employee = this.http.get<Employee>(`api/employees/${id}`);
    if (employee) {
      return employee;
    } else {
      throw new Error('Employee not found');
    }
  }

  updateEmployee(employee: Employee, id: number): Observable<any> {
    return this.http.put(`api/employees/${id}`, employee);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>('api/employees', employee);
  }

  deleteEmployee(id: number): Observable<any> {
    let res = this.http.delete<Employee>(`api/employees/${id}`);
    return res;
  }
}
