import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationMessageComponent } from '../shared/confirmation-message/confirmation-message.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})

export class ListEmployeeComponent implements OnInit{
  displayedColumns: string[] = ['fullName', 'email', 'maritalStatus', 'dateAdmission', 'gender', 'phoneNumber', 'actions'];
  dataSource = new MatTableDataSource();
  employeeList!: Employee[];

  @ViewChild(MatPaginator, {static:true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static:true}) sort!: MatSort;

  constructor( private employeeService: EmployeeService,
                public dialog: MatDialog,
                public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loadEmployees() {
    this.employeeList = this.employeeService.getEmployees();
    this.dataSource = new MatTableDataSource<unknown>(this.employeeList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteEmployee(index: number) {

    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '350px',
      data: {message: 'Do you really want to delete this employee?'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.employeeService.deleteEmployee(index);
        this.loadEmployees();
        this.snackBar.open('Employee successfully deleted!',  '', {
          duration: 2000
        });
      }
    });
  }
}