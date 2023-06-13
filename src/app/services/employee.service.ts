import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  employeeList: Employee[] = [
    { fullName: 'Agustin Demoli', email: 'agustindemoli@gmail.com', phoneNumber: 3512099116,
      gender: 'Male', dateAdmission: new Date(), maritalStatus: 'Single'
    }
  ]

  constructor() { }

  getEmployees() {
    return this.employeeList.slice();
  }

  deleteEmployee(index: number) {
    this.employeeList.splice(index, 1);
  }
}
