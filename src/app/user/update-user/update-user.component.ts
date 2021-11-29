import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFile } from 'src/app/model/UploadFile';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  cv: any = [];
  uploadFileList: UploadFile[] = [];
  uploadFileName = '';
  imageData!: any;
  photoForm!: FormGroup;
  cvForm!: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private uploadPhotoService: UploadPhotoService,
    private uploadFileService: UploadFileService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: any
  ) {

  }
  ngOnInit(): void {
    this.getUploadFile();
    this.getPhotoEmployee();
    this.cvForm = new FormGroup({
      name: new FormControl(null),
      cv: new FormControl(null)
    });
    this.photoForm = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null)
    });
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

  getPhotoEmployee() {
    this.uploadPhotoService.GetPhotoByEmail(this.dataUser.updateEmployee)
      .subscribe((res) => {
        if (res.length) {
          this.imageData = res[0].imagePath;
        }
      });
  }


  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    this.photoForm.patchValue({ image: file });
    this.photoForm.patchValue({ name: file.name });
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  deleteCV() {
    if (!this.cv._id){
      this.cvForm.reset();
      this.uploadFileName = '';
    }else{
      this.uploadFileService.deleteUplFile(this.cv._id)
      .subscribe(() => {
        this.getUploadFile();
      });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.cvForm.patchValue({ cv: file });
      this.cvForm.patchValue({ name: file.name });
      this.uploadFileName = file.name;
    }
  }


  getUploadFile() {
    this.uploadFileService.getUplFileByEmail(this.dataUser.updateEmployee)
      .subscribe((res) => {
        this.uploadFileList = res;
        this.uploadFileName = '';
        if (this.uploadFileList.length) {
          this.cv = this.uploadFileList[0];
          this.uploadFileName = this.cv.name;
        }
      });
  }
}
