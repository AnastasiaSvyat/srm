// import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { Observable } from 'rxjs';
// import { AddUserComponent } from 'src/app/admin/add-user/add-user.component';
// import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
// import { EmployeeService } from 'src/app/services/employee/employee.service';
// import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
// import { AddInfoUserComponent } from '../add-info-user/add-info-user.component';
// import { UpdateUserComponent } from '../update-user/update-user.component';

// @Component({
//   selector: 'app-dashboard-user',
//   templateUrl: './dashboard-user.component.html',
//   styleUrls: ['./dashboard-user.component.scss']
// })
// export class DashboardUserComponent implements OnInit {
//   fileName = ''
//   fileInfos?: Observable<any>;
//   employee:any = []
//   id!:any
//   updateUser!:any
//   addCV!:any
//   head!:any
//   btn!:any
//   cv!:any
//   arr!:any

//   updateEmployee!:any

// constructor(public dialog: MatDialog, private service:DataEmployeeService,
//     private emoloyeeService:EmployeeService,private uploadFileService:UploadFileService) {}


//   ngOnInit(): void {
//     this.service.data.subscribe(value => {
//       this.employee = value
//     });
//     this.id = this.employee.id
//     this.getInfo()
//   }


//   addNewInfo(): void {
//     const dialogRef = this.dialog.open(AddInfoUserComponent, {
//       width: '398px',
//       height :'398px',
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       console.log(result);
//       this.getInfo()
//     });
//    }
    
//   getInfo(){
//     this.emoloyeeService.GetEmployee(this.id)
//       .subscribe(value => {
//         this.employee = value
//       });
//   }

//   editUser(event:any): void {
//     const dialogRef = this.dialog.open(UpdateUserComponent, {
//       width: '398px',
//       height :'670px',
//       data: {head: "Edit user:",btn: "SAVE",updateEmployee:event,
//       addCV:"Add new CV"}
//     });
//     dialogRef.afterClosed().subscribe(result => {
//       this.updateUser = result;
//       this.emoloyeeService.updateEmployee(event.id,this.updateUser)
//           .subscribe(
//             success => {
//               this.emoloyeeService.GetEmployee(event.id)
//               .subscribe((res) => {
//                 this.employee = res
//               })
//             },
//             error => console.log(error));
//     });
//   }
//   getUploadFile(){
//     this.uploadFileService.getUplFileByEmail(this.employee.email)
//       .subscribe((res) => {
//         this.arr = res
//         if(this.arr.length > 0){
//           this.cv = res[res.length - 1]
//           this.fileName = this.cv.name
//         }else{
//           this.fileName = ''
//           this.cv = []
          
//         }
//       })
//     }

//   onFileSelected(event:any) {
//     const file:File = event.target.files[0];
//       if (file) {
//         this.fileName = file.name;
//     this.uploadFileService.uploadFile(this.employee,file)
//       .subscribe((res) => {
//         this.getUploadFile()
//       if(this.cv._id != undefined){
//         this.deleteCV()
//       }}, (err) => {
//           console.log(err);
//       });
//     }
//   }

//   deleteCV(){
//     this.uploadFileService.deleteUplFile(this.cv._id)
//     .subscribe((res) => {
//       this.getUploadFile()
//     })

  
//   }
  
// }
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
// import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { AddInfoUserComponent } from '../add-info-user/add-info-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {
  fileName = ''
  employee:any = []
  getId!:any
  cv!:any
  arr!:any
  updateUser!:any
  updateEmployee!:any
  btn!:any
  addCV!:any
  head!:any


  
  constructor(public dialog: MatDialog, private service:DataEmployeeService,
    private emoloyeeService:EmployeeService,private uploadFileService:UploadFileService,) {}


  ngOnInit(): void {
   this.getEmployee()
    this.getInfo()
    this.getUploadFile()
  }

  getEmployee(){
    this.service.data.subscribe(value => {
      this.employee = value
    });
    this.getId = this.employee.id
  }

  getUploadFile(){
  this.uploadFileService.getUplFileByEmail(this.employee.email)
    .subscribe((res) => {
      this.arr = res
      if(this.arr.length > 0){
        this.cv = res[res.length - 1]
        this.fileName = this.cv.name
      }else{
        this.fileName = ''
        this.cv = []
        
      }
    })
  }
  
  addNewInfo(): void {
    const dialogRef = this.dialog.open(AddInfoUserComponent, {
      width: '398px',
      height :'398px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getInfo()
    });
   }
    
  getInfo(){
    this.emoloyeeService.GetEmployee(this.getId)
      .subscribe(value => {
        this.employee = value
      });
  }
    editUser(event:any): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '398px',
      height :'670px',
      data: {head: "Edit user:",btn: "SAVE",updateEmployee:event,
      addCV:"Add new CV"}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUploadFile()
      this.updateUser = result;
      this.emoloyeeService.updateEmployee(event.id,this.updateUser)
          .subscribe(
            success => {
              this.emoloyeeService.GetEmployee(event.id)
              .subscribe((res) => {
                this.employee = res
              })
            },
            error => console.log(error));
    });
  }
  
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
    this.uploadFileService.uploadFile(this.employee,file)
      .subscribe((res) => {
        this.getUploadFile()
      if(this.cv._id != undefined){
        this.deleteCV()
      }}, (err) => {
          console.log(err);
      });
    }
  }

  deleteCV(){
    this.uploadFileService.deleteUplFile(this.cv._id)
    .subscribe((res) => {
      this.getUploadFile()
    })

  
  }
}