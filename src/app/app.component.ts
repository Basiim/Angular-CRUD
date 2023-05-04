import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private toastr: ToastrService) { }
  makeToast(event: Event) {
    if (!(event instanceof EmployeeFormComponent)) return;
    const child: EmployeeFormComponent = event;
    console.log(event);
    child.formResponse.subscribe(
      (res) => {
        this.toastr.success(res);
      },

      (error) => this.toastr.error(error.message),
      () => console.log('Completed')
    );
  }
  date = new Date();
  title = 'Angular-CRUD';
}
