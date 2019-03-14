import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class EmployeeService {
    selectedEmployee: Employee;
    employees: Employee[];
    readonly baseURL = 'http://localhost:3000/employees';
    private headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    constructor(private http: HttpClient) { }

    // By clicking on save button insertion in DB
    postEmployee(emp: Employee) {
        return this.http.post(this.baseURL, emp, { headers: this.headers });
    }

    // To get Employee Details parameter _id
    getEmployee(_id: String): Observable<Employee> {
        return this.http.get<Employee>(this.baseURL + `/${_id}`);
    }

    // To display employees from DB
    getEmployeeList() {
        return this.http.get(this.baseURL, { headers: this.headers });
    }

    // To Update Employee Details
    editEmployee(emp: Employee) {
        return this.http.put(this.baseURL + `/${emp._id}`, emp);
    }

    // To Delete Employee from list
    deleteEmployee(_id: string) {
        return this.http.delete(this.baseURL + `/${_id}`);
    }


}
