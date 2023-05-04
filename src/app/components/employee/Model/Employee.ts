export interface Employee {
  id: number;
  name: string;
  email: string;
  salary: number;
  department: string;
}

export class Employee implements Employee {
  constructor(
    public name: string = '',
    public email: string = '',
    public salary: number = 0,
    public department: string = ''
  ) {}
}
