import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFile } from 'src/app/model/UploadFile';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  cv: any = [];
  cvList: UploadFile[] = [];
  uploadFileName = '';


  constructor(
    public formBuilder: FormBuilder, private uploadFileService: UploadFileService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: any
  ) {

  }
  ngOnInit(): void {
    this.getUploadFile();
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(this.dataUser.updateEmployee.name, [Validators.required]),
      email: new FormControl(this.dataUser.updateEmployee.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.dataUser.updateEmployee.phone, [Validators.required]),
      date: new FormControl(this.dataUser.updateEmployee.date, [Validators.required]),
      id: new FormControl(this.dataUser.updateEmployee.id, [Validators.required])

    });
  }

  get name() { return this.addEmployeeForm.get('name'); }
  get email() { return this.addEmployeeForm.get('email'); }
  get date() { return this.addEmployeeForm.get('date'); }
  get phone() { return this.addEmployeeForm.get('phone'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteCV() {
    this.uploadFileService.deleteUplFile(this.cv._id)
      .subscribe(() => {
        this.getUploadFile();
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFileName = file.name;
      this.uploadFileService.uploadFile(this.dataUser.updateEmployee, file)
        .subscribe((res) => {
          this.getUploadFile();
          if (this.cv._id !== undefined) {
            this.deleteCV();
          }
        }, (err) => {
          console.log(err);
        });
    }
  }


  getUploadFile() {
    this.uploadFileService.getUplFileByEmail(this.dataUser.updateEmployee)
      .subscribe((res) => {
        this.cvList = res;
        if (this.cvList.length > 0) {
          this.cv = res[res.length - 1];
          this.uploadFileName = this.cv.name;
        } else {
          this.uploadFileName = '';
          this.cv = [];

        }
      });
  }
}
