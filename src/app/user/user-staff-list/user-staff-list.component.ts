import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { ParamsStaffPag } from 'src/app/admin/admin-staff-list/admin-staff-list.component';
import { InfoAboutUserComponent } from '../info-about-user/info-about-user.component';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-user-staff-list',
  templateUrl: './user-staff-list.component.html',
  styleUrls: ['./user-staff-list.component.scss']
})

export class UserStaffListComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private uloadPhotoService: UploadPhotoService,
    private overlay: Overlay,
    public dialog: MatDialog) { }

  staffList: Employee[] = [];
  photoEmployee: UploadPhoto[] = [];
  page = 0;
  count = 0;
  pageSize = 10;
  imagePath!: string;

  displayedColumns: string[] = ['photo', 'name', 'position', 'birthday', 'phone', 'email', 'skype', 'about'];

  ngOnInit(): void {
    this.retrieveStaff();
    this.getPhotoEmployee();
  }

  getPhotoEmployee() {
    this.uloadPhotoService.GetPhoto()
      .subscribe((res) => {
        this.photoEmployee = res;
      });
  }

  getEmployeePhoto(id: string) {
    const imgPath = this.photoEmployee.find(x => x.idEmployee === id);
    return imgPath?.imagePath ?? '../../../assets/img/nouser.jpeg';
  }

  retrieveStaff(): void {
    const params: ParamsStaffPag = {
      page: this.page,
      size: this.pageSize,
      name: '',
    };
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

  aboutUser(employee: Employee): void {
    const dialogRef = this.dialog.open(InfoAboutUserComponent, {
      width: '398px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '100px',
      height: 'auto',
      data: {
        user: employee,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  handlePageChange(event: any): void {
    this.page = event.pageIndex;
    this.retrieveStaff();
  }
}
