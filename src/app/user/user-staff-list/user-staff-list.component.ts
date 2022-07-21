import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { ParamsStaffPag } from 'src/app/admin/admin-staff-list/admin-staff-list.component';
import { InfoAboutUserComponent } from '../info-about-user/info-about-user.component';
import { Overlay } from '@angular/cdk/overlay';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PositionListService } from 'src/app/services/positionList/position-list.service';
import { PositionList } from 'src/app/model/positionList';

@Component({
  selector: 'app-user-staff-list',
  templateUrl: './user-staff-list.component.html',
  styleUrls: ['./user-staff-list.component.scss']
})

export class UserStaffListComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['photo', 'name', 'position', 'birthday', 'phone', 'email', 'skype', 'about'];

  staffList: Employee[] = [];
  photoEmployee: UploadPhoto[] = [];
  page = 0;
  count = 0;
  pageSize = 10;
  imagePath!: string;
  positionList: PositionList[] = [];
  
  constructor(
    private employeeService: EmployeeService,
    private uploadPhotoService: UploadPhotoService,
    private overlay: Overlay,
    public dialog: MatDialog,
    private positionListServise: PositionListService,
    ) { }

  


  ngOnInit(): void {
    this.retrieveStaff();
    this.getPhotoEmployee();
    this.getAllPosition();
  }

  getPhotoEmployee() {
    this.uploadPhotoService.GetPhoto()
      .subscribe((res) => {
        this.photoEmployee = res;
      });
  }

  getEmployeePhoto(id: string) {
    const imgPath = this.photoEmployee.find(x => x.idEmployee === id);
    return imgPath?.imagePath ?? '../../../assets/img/nouser.jpeg';
  }

  retrieveStaff(): void {
    this.employeeService.getAllStaff()
      .subscribe(
        response => {
          this.staffList = response;
          this.dataSource = new MatTableDataSource<Employee>(this.staffList);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          // console.log(error);
        });
  }

  applyFilter($event: any) {
    this.dataSource.filter = (($event.target as HTMLInputElement).value).trim().toLowerCase();
  }

  aboutUser(employee: Employee): void {
    const dialogRef = this.dialog.open(InfoAboutUserComponent, {
      width: '400px',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      minHeight: '100px',
      height: 'auto',
      disableClose: true,
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

  getAllPosition(){
    this.positionListServise.GetPositionList()
    .subscribe((res) => {
      this.positionList = res;
    })
  }


  getPositionEmployee(id: string){
      const result = this.positionList.find(req => req._id === id);
      return result?.positionName ?? '-';
  }
}
