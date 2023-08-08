import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee-model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseApiUrl: string = environment.baseApiUrl;
  Employee : any;

  constructor(private http: HttpClient) { }
 
  getAllEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.baseApiUrl + '/api/Employee');
  }

  addEmployee(addEmployeeRequest: Employee): Observable<Employee>{
    addEmployeeRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Employee>(this.baseApiUrl + '/api/Employee',addEmployeeRequest)
  }

  getEmployee(id:string):Observable<Employee>{
    return this.http.get<Employee>(this.baseApiUrl + '/api/Employee/' + id);
  }

  updateEmployee(id:string, updateEmployeeRequest: Employee):Observable<Employee>{
    return this.http.put<Employee>(this.baseApiUrl + '/api/Employee/' + id, updateEmployeeRequest);
  }

  deleteEmployee(id:string):Observable<Employee>{
    return this.http.delete<Employee>(this.baseApiUrl + '/api/Employee/' + id); 
  }
} 
