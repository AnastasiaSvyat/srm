import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { UploadFile } from 'src/app/model/UploadFile';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/model/Employee';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  uploadFileName = '';
  cv!: any;
  uploadFileList!: UploadFile;
  selectFile!: File;
  imageData!: string;
  photoForm!: FormGroup;
  cvForm!: FormGroup;
  urlCV!: string;
  docPDF!: any;
  duration = 5000;

  constructor(
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public employeeService: EmployeeService,
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
    this.cvForm = new FormGroup({
      name: new FormControl(null),
      cv: new FormControl(null)
    });
    this.getUploadFile();
    this.addEmployeeForm = new FormGroup({
      name: new FormControl(this.dataUser.changeUser.name, [Validators.required]),
      email: new FormControl(this.dataUser.changeUser.email, [Validators.required, Validators.email]),
      password: new FormControl(this.dataUser.changeUser.password, [Validators.required, Validators.minLength(6)]),
      salary: new FormControl(this.dataUser.changeUser.salary, [Validators.required]),
      phone: new FormControl(this.dataUser.changeUser.phone, [Validators.required]),
      position: new FormControl(this.dataUser.changeUser.position, [Validators.required]),
      lastPerf: new FormControl(this.dataUser.changeUser.lastPerf),
      date: new FormControl(this.dataUser.changeUser.date, [Validators.required]),
      role: new FormControl(this.dataUser.changeUser.role, [Validators.required]),
      skype: new FormControl(this.dataUser.changeUser.skype),
      id: new FormControl(this.dataUser.changeUser.id),
      infoUser: new FormControl('')
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
  get id() { return this.addEmployeeForm.get('id'); }
  get lastPerf() { return this.addEmployeeForm.get('lastPerf'); }
  get skype() { return this.addEmployeeForm.get('skype'); }




  getPhotoEmployee() {
    this.uploadPhotoService.GetPhotoById(this.dataUser.changeUser.id)
      .subscribe((res) => {
        if (res) {
          this.imageData = res.imagePath;
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getEmployee(employee: Employee, photo: UploadPhoto, cvFile: UploadFile) {
    if (employee) {
      if (this.dataUser.btn === 'ADD') {
        this.addUser(employee, photo, cvFile);
      }
      if (this.dataUser.btn === 'SAVE') {
        this.updateUser(employee, photo, cvFile);
      }
    }
  }

  addUser(employee: Employee, photo: UploadPhoto, cvFile: UploadFile) {
    this.employeeService.AddEmployee(employee)
      .subscribe((success) => {
        if (photo.name) {
          this.uploadPhotoService.uploadPhoto(photo.name, photo.image, success.id)
            .subscribe(res => {
              console.log(res);
            },
              error => console.log(error));
        }
        if (cvFile.name) {
          this.uploadFileService.uploadFile(cvFile.name, cvFile.cv, success.id)
            .subscribe((res) => {
              console.log(res);
            });
        }
        this.snackBar.open('Congratulations! Employee has been added!', '', {
          duration: this.duration
        });
        this.dialogRef.close(employee);
      },
        error =>
          this.snackBar.open(error.error.massage || 'ERROR! Try again.', '', {
            duration: this.duration
          })
      );
  }

  updateUser(employee: Employee, photo: UploadPhoto, cvFile: UploadFile) {
    this.employeeService.updateEmployee(employee.id, employee)
      .subscribe(
        success => {
          if (photo.name) {
            this.uploadPhotoService.uploadPhoto(photo.name, photo.image, employee.id)
              .subscribe(res => {
                console.log(res);
              },
                error => console.log(error));
          }
          if (cvFile.name) {
            this.uploadFileService.uploadFile(cvFile.name, cvFile.cv, employee.id)
              .subscribe((res) => {
                console.log(res);
              });
          }
          this.dialogRef.close(employee);
          this.snackBar.open('Congratulations! Employee has been changed!', '', {
            duration: this.duration
          });
        },
        error =>
          this.snackBar.open('ERROR! Try again.', '', {
            duration: this.duration
          })
      );
  }


  getCV() {
    this.uploadFileService.getUplFileById(this.dataUser.changeUser)
      .subscribe((res) => {
        this.urlCV = res.imagePath;
        const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + this.urlCV + '\'></iframe>';
        this.docPDF = window.open();
        this.docPDF.document.write(iframe);
        this.docPDF.document.close();
      });
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photoForm.patchValue({ image: file });
      this.photoForm.patchValue({ name: file.name });
      const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/pdf'];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.cvForm.patchValue({ cv: file });
      this.cvForm.patchValue({ name: file.name });
      this.selectFile = file;
      this.uploadFileName = file.name;
    }
  }

  deleteCV() {
    if (!this.cv) {
      this.cvForm.reset();
      this.uploadFileName = '';
    } else {
      this.uploadFileService.deleteUplFile(this.cv._id)
        .subscribe(() => {
          this.getUploadFile();
        });
    }
  }


  getUploadFile() {
    this.uploadFileService.getUplFileById(this.dataUser.changeUser)
      .subscribe((res) => {
        this.uploadFileList = res;
        this.uploadFileName = '';
        if (this.uploadFileList) {
          this.cv = this.uploadFileList;
          this.uploadFileName = this.cv.name;
        }
      });
  }
}
