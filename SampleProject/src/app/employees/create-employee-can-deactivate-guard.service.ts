import { CreateEmployeeComponent } from './create-employee.component';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateEmployeeCanDeactivateGuardService implements CanDeactivate<CreateEmployeeComponent> {
    canDeactivate(component: CreateEmployeeComponent):  boolean {
        if (component.createEmployeeForm.dirty) {
            return confirm('Are sure you want to discard the changes?');
        }
        return true;
    }
}
