import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeRequest: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };


  constructor(private employeeService: EmployeeService, private router: Router ) {}

  ngOnInit(): void {}

  addEmployee() {
    this.employeeService.addEmployee(this.addEmployeeRequest).subscribe({
      next: (employee) => {
        this.router.navigate(['employees'])
      },
      error: (Response) => {
        console.log(Response);
      },
    });
  }
}
