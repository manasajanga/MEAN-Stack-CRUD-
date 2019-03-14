import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../models/employee.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from '../employees/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

declare var M: any;

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  datePickerConfig: Partial<BsDatepickerConfig>;
  fileToUpload: File = null;
  imageURL = '/assets/images/default-img.png';
  _id: String;
  employee: Employee;

  constructor(private employeeService: EmployeeService, private _router: Router,
    private toastr: ToastrService, private route: ActivatedRoute, private datePipe: DatePipe) {
    this.datePickerConfig = { dateInputFormat: 'YYYY-MM-DD', containerClass: 'theme-dark-blue' };
  }

  ngOnInit() {
    this.route.paramMap.subscribe(parameterMap => {
      this._id = parameterMap.get('id');
      this.getEmployee(this._id);
    });
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    // To show preview Image
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageURL = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  private getEmployee(_id: String) {
    if (_id === '0') {
      this.employee = {
        _id: '',
        firstName: null,
        lastName: null,
        age: null,
        email: '',
        phoneNumber: null,
        birthDay: new Date(),
        favoriteColor: null,
        photoPath: null

      };
    } else {
      this.employeeService.getEmployee(_id).subscribe(
        (employee) => this.employee = employee,
      );
    }

  }

  saveEmployee(form: NgForm) {
    if (form.value._id === '') {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
        this._router.navigate(['list']);
      });
    } else {
      this.employeeService.editEmployee(form.value).subscribe((res) => {
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
        this._router.navigate(['list']);
      });
    }

  }
}
