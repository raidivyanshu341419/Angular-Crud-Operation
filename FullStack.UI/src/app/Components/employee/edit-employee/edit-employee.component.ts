import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails: Employee = {
    id: '',
    name: '',
    email: '',
    phone: 0,
    salary: 0,
    department: '',
  };

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.employeeService.getEmployee(id).subscribe({
            next: (response) => {
              this.employeeDetails = response;
              console.log(response);
            },
            error: (response) => {
              console.log(response);
            },
          });
        }
      },
    });
  }

  updateEmployee() {
    this.employeeService
      .updateEmployee(this.employeeDetails.id, this.employeeDetails)
      .subscribe({
        next: (employee) => {
          this.router.navigate(['employees']);
        },
        error: (Response) => {
          console.log(Response);
        },
      });
  }

  deleteEmployee(){
    this.employeeService.deleteEmployee(this.employeeDetails.id)
    .subscribe({
      next:(response) => {
        this.router.navigate(['employees']);
      }, 
      error: (Response) => {
        console.log(Response);
      },
    })
  }
}
