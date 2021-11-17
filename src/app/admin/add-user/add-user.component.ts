import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { UploadFile } from 'src/app/model/UploadFile';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  uploadFileName = '';
  cv: any = [];
  uploadFileList: UploadFile[] = [];


  constructor(
    public formBuilder: FormBuilder,
    public uploadFileService: UploadFileService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: any) { }

  ngOnInit(): void {
    this.getUploadFile();
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(this.dataUser.changeUser.name, [Validators.required]),
      email: new FormControl(this.dataUser.changeUser.email, [Validators.required, Validators.email]),
      password: new FormControl(this.dataUser.changeUser.password, [Validators.required, Validators.minLength(6)]),
      salary: new FormControl(this.dataUser.changeUser.salary, [Validators.required]),
      phone: new FormControl(this.dataUser.changeUser.phone, [Validators.required]),
      position: new FormControl(this.dataUser.changeUser.position, [Validators.required]),
      lastPerf: new FormControl(this.dataUser.changeUser.lastPerf, [Validators.required]),
      date: new FormControl(this.dataUser.changeUser.date, [Validators.required]),
      role: new FormControl(this.dataUser.changeUser.role, [Validators.required]),
      id: new FormControl(this.dataUser.changeUser.id, [Validators.required])

    });
  }

  get name() { return this.addEmployeeForm.get('name'); }
  get email() { return this.addEmployeeForm.get('email'); }
  get password() { return this.addEmployeeForm.get('password'); }
  get position() { return this.addEmployeeForm.get('position'); }
  get role() { return this.addEmployeeForm.get('role'); }
  get date() { return this.addEmployeeForm.get('date'); }
  get salary() { return this.addEmployeeForm.get('salary'); }
  get phone() { return this.addEmployeeForm.get('phone'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    console.log(this.uploadFileList);
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFileName = file.name;
      this.uploadFileService.uploadFile(this.dataUser.changeUser, file)
        .subscribe((res) => {
          this.getUploadFile();
        });
    }
  }

  deleteCV() {
    this.uploadFileService.deleteUplFile(this.cv._id)
      .subscribe(() => {
        this.getUploadFile();
      });
  }

  getUploadFile() {
    this.uploadFileService.getUplFileByEmail(this.dataUser.changeUser)
      .subscribe((res) => {
        this.uploadFileList = res;
        this.uploadFileName = '';
        if (this.uploadFileList.length){
          this.cv = this.uploadFileList[0];
          this.uploadFileName = this.cv.name;
        }
      });
  }
}
