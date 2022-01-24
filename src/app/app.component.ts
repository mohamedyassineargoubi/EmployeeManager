import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './interface/employee';
import { EmployeeService } from './service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[] = [];
  public editEmployee: any;
  public deleteEmployee: any;
  public employeee = null as any;
  constructor(private employeeService: EmployeeService) { }
  ngOnInit() {
    this.getEmployees();
  }
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (data: Employee) => {
        console.log(data)
        this.getEmployees()
        addForm.reset();

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
        addForm.reset();
      }

    );


  }
  public onEditEmployee(employee: Employee): void {

    this.employeeService.updateEmployee(employee).subscribe(
      (data: Employee) => {
        console.log(data)
        this.getEmployees()

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }

    );


  }
  public onDeleteEmployee(employeeId: number): void {

    this.employeeService.deleteEmployee(employeeId).subscribe(
      (data: void) => {
        this.getEmployees()

      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }

    );


  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results?.length === 0 || !key) {
      this.getEmployees();
    }
  }
  public onOpenModal(employee: Employee, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal')
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#editEmployeeModal')
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal')
    }
    container?.appendChild(button);
    button.click();


  }


}
