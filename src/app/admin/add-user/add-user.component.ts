import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { UploadFile } from 'src/app/model/UploadFile';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';

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
  selectFile!: any;
  imageData!: string;
  photoForm!: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    public uploadFileService: UploadFileService,
    public uploadPhotoService: UploadPhotoService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: any) { }

  ngOnInit(): void {
    this.getPhotoEmployee();
    this.photoForm = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null)
    });
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
      id: new FormControl(this.dataUser.changeUser.id, [Validators.required]),
      imageName: new FormControl(null)
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
  get image() { return this.addEmployeeForm.get('image'); }

  getPhotoEmployee() {
    console.log(this.dataUser.changeUser.email);
    this.uploadPhotoService.GetPhotoByEmail(this.dataUser.changeUser)
      .subscribe((res) => {
        if (res.length) {
          this.imageData = res[0].imagePath;
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
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

  onFileSelected(event: any) {
    console.log(event);
    const file: File = event.target.files[0];
    if (file) {
      this.selectFile = file;
      this.uploadFileName = file.name;
    }
  }

  addCv() {
    console.log(this.addEmployeeForm.value.email);
    this.uploadFileService.uploadFile(this.addEmployeeForm.value, this.selectFile)
      .subscribe(() => {
        this.getUploadFile();
      });
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
        if (this.uploadFileList.length) {
          this.cv = this.uploadFileList[0];
          this.uploadFileName = this.cv.name;
        }
      });
  }
}
