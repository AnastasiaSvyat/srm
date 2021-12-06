import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { SearchName } from 'src/app/model/SearchName';
import { Employee } from 'src/app/model/Employee';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { UploadFile } from 'src/app/model/UploadFile';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-admin-staff-list',
  templateUrl: './admin-staff-list.component.html',
  styleUrls: ['./admin-staff-list.component.scss']
})
export class AdminStaffListComponent implements OnInit {

  staffList: Employee[] = [];
  currentEmployee: SearchName = {};
  currentIndex = -1;
  updateUser!: any;
  employee: Employee[] = [];
  dataAddEmloyee!: Employee;
  dataPhotoUpload!: UploadPhoto;
  dataCVUpload!: UploadFile;
  duration = 5000;
  urlCV!: string;
  photoEmployee: UploadPhoto[] = [];
  searchByName = new FormControl();
  page = 1;
  count = 0;
  pageSize = 10;
  docPDF!: any;

  displayedColumns: string[] = ['name', 'position', 'birthday', 'salary', 'firstDay', 'lastPerf', 'phone', 'email', 'cv', 'change'];

  private unsubscribe = new Subject();

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    public uplFileService: UploadFileService,
    public uloadPhotoService: UploadPhotoService,
    private snackBar: MatSnackBar,
    private authService: AuthService) {
    this.searchByName.valueChanges
      .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(300),
        switchMap((value: any) => {
          const params = this.getRequestParams(this.searchByName.value, this.page, this.pageSize);
          return this.employeeService.getStaffListPagination(params);
        }),
      ).subscribe((list: any) => {
        console.log(list);
        if (list.staffList.length) {
          const { staffList, totalItems } = list;
          this.staffList = staffList;
          this.count = totalItems;
        } else {
          this.staffList = [];
        }
      });
  }

  ngOnInit(): void {
    this.employee = this.authService.user;
    this.retrieveStaff();
    this.getPhotoEmployee();
  }

  ngOnDesttroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getRequestParams(searchName: string, page: number, pageSize: number): any {
    const params: any = {};
    if (searchName) {
      params[`name`] = searchName;
    }
    if (page) {
      params[`page`] = page - 1;
    }
    if (pageSize) {
      params[`size`] = pageSize;
    }
    return params;
  }

  getPhotoEmployee() {
    this.uloadPhotoService.GetPhoto()
      .subscribe((res) => {
        this.photoEmployee = res;
      });
  }

  retrieveStaff(): void {
    const params = this.getRequestParams(this.searchByName.value, this.page, this.pageSize);
    this.employeeService.getStaffListPagination(params)
      .subscribe(
        response => {
          const { staffList, totalItems } = response;
          this.staffList = staffList;
          this.count = totalItems;
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveStaff();
  }

  setActiveEmployee(employee: Employee, index: number): void {
    this.currentEmployee = employee;
    this.currentIndex = index;
  }

  getCV(res: any) {
    this.uplFileService.getUplFileById(res)
      .subscribe((result) => {
        if (result.length){
          this.urlCV = result[0].imagePath;
          const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + this.urlCV + '\'></iframe>';
          this.docPDF = window.open();
          this.docPDF.document.write(iframe);
          this.docPDF.document.close();
        }else{
          this.snackBar.open('CV was not added!', '', {
            duration: this.duration
          });
        }
      });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height: '984px',
      data: {
        head: 'Add user:',
        btn: 'ADD',
        showArhiveUser: false,
        addCV: 'Add CV',
        changeUser: '',
        showRole: true,
        showCV: true,
        showPassword: true,
        showLastPerf: false,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.dataAddEmloyee = result[0];
        this.dataPhotoUpload = result[1];
        this.dataCVUpload = result[2];
        this.employeeService.AddEmployee(this.dataAddEmloyee)
          .subscribe((res) => {
            this.retrieveStaff();
            this.snackBar.open('Congratulations! Employee has been added!', '', {
              duration: this.duration
            });
          }, error => {
            this.snackBar.open('This email is already taken. Try another.', '', {
              duration: this.duration
            });
          });
        if (this.dataPhotoUpload.image != null) {
          this.uloadPhotoService.uploadPhoto(this.dataPhotoUpload.name, this.dataPhotoUpload.image, this.dataAddEmloyee)
            .subscribe(() => {
              this.getPhotoEmployee();
            });
        }
        if (this.dataCVUpload.cv != null) {
          this.uplFileService.uploadFile(this.dataCVUpload.name, this.dataCVUpload.cv, this.dataAddEmloyee)
            .subscribe((res: any) => {
              console.log(res);
            });
        }
      }
    });
  }

  editUser(event: any): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '398px',
      height: '984px',
      data: {
        head: 'Edit user:',
        btn: 'SAVE',
        changeUser: event,
        showArhiveUser: true,
        addCV: 'Add new CV',
        showPassword: false,
        showRole: false,
        showLastPerf: true,
        showCV: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateUser = result[0];
        this.dataPhotoUpload = result[1];
        this.dataCVUpload = result[2];
        this.employeeService.updateEmployee(event.id, this.updateUser)
          .subscribe(
            success => {
              this.employeeService.GetEmployee(event.id)
                .subscribe((res) => {
                  console.log(res);
                });
            },
            error => console.log(error));
        if (this.dataPhotoUpload.image != null) {
          this.uloadPhotoService.uploadPhoto(this.dataPhotoUpload.name, this.dataPhotoUpload.image, this.updateUser)
            .subscribe(success => {
              this.getPhotoEmployee();
            },
              error => console.log(error));
        }
        if (this.dataCVUpload.cv != null) {
          this.uplFileService.uploadFile(this.dataCVUpload.name, this.dataCVUpload.cv, this.updateUser)
            .subscribe((res: any) => {
              console.log(res);
            });
        }
      }
    });
  }

  searchName(): void {
    this.page = 1;
    this.retrieveStaff();
  }
}










