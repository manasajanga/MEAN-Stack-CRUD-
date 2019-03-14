import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
  employees: Employee[];
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    // this.employees = this._employeeService.getEmployees();
    this.refreshEmployeeList();

  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
     this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
    this.router.navigate(['edit', emp._id]);

  }

  onDelete(emp: Employee) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.employeeService.deleteEmployee(emp._id).subscribe((res) => {
        this.refreshEmployeeList();
        M.toast({ html: 'Deleted Successfully', classes: 'rounded'});
      });
    }
  }

}
