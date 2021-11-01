import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { DashboardUserComponent } from '../dashboard-user/dashboard-user.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  cv!:any
  arr!:any
  fileName = ''


  constructor(
    public formBuilder: FormBuilder,private uploadFileService :UploadFileService,
    public dialogRef: MatDialogRef<UpdateUserComponent,DashboardUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: DashboardUserComponent
) { 

}
  ngOnInit(): void {
    this.getUploadFile()
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(this.dataUser.updateEmployee.name,[Validators.required]),
      email : new FormControl(this.dataUser.updateEmployee.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.dataUser.updateEmployee.phone,[Validators.required]),
      date: new FormControl(this.dataUser.updateEmployee.date,[Validators.required]),
      id: new FormControl(this.dataUser.updateEmployee.id,[Validators.required])

    })
  }

  get name() { return this.addEmployeeForm.get('name')!; }
  get email() { return this.addEmployeeForm.get('email')!; }
  get date() { return this.addEmployeeForm.get('date')!; } 
  get phone() { return this.addEmployeeForm.get('phone')!; }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  deleteCV(){
    this.uploadFileService.deleteUplFile(this.cv._id)
    .subscribe((res) => {
      this.getUploadFile()
    })
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];
      if (file) {
        this.fileName = file.name;
    this.uploadFileService.uploadFile(this.dataUser.updateEmployee,file)
      .subscribe((res) => {
        this.getUploadFile()
      if(this.cv._id != undefined){
        this.deleteCV()
      }}, (err) => {
          console.log(err);
      });
    }
  }


  getUploadFile(){
    this.uploadFileService.getUplFileByEmail(this.dataUser.updateEmployee.email)
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
}