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
    // private listEmployees: Employee[] = [
    //     {
    //         firstName: 'Manasa',
    //         lastName: 'Janga',
    //         age: 29,
    //         email: 'iammanasaappidi@gmail.com',
    //         phoneNumber: 7276671727,
    //         birthDay: new Date('08/10/1990'),
    //         favoriteColor: 'Red',
    //         photoPath: 'assets/images/mark.png'
    //     },
    //     {
    //         firstName: 'Manasa',
    //         lastName: 'Janga',
    //         age: 29,
    //         email: 'iammanasaappidi@gmail.com',
    //         phoneNumber: 7276671727,
    //         birthDay: new Date('08/10/1990'),
    //         favoriteColor: 'Red',
    //         photoPath: 'assets/images/mary.png'
    //     },
    //     {
    //         firstName: 'Manasa',
    //         lastName: 'Janga',
    //         age: 29,
    //         email: 'iammanasaappidi@gmail.com',
    //         phoneNumber: 7276671727,
    //         birthDay: new Date('08/10/1990'),
    //         favoriteColor: 'Red',
    //         photoPath: 'assets/images/john.jpg'
    //     }

    // ];

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
