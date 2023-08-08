import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employee: Employee[] = [];
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (employee) => {
        this.employee = employee;
        console.log(this.employee)
      },
      error: (Response) => {
        console.log(Response);
      }
    });
  }
}
