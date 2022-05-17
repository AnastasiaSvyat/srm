import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/Employee';
import { UploadFile } from 'src/app/model/UploadFile';
import { UploadPhoto } from 'src/app/model/UploadPhoto';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { UploadPhotoService } from 'src/app/services/uploadPhoto/upload-photo.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  addEmployeeForm!: FormGroup;
  cv!: any;
  uploadFileList!: UploadFile;
  uploadFileName = '';
  imageData!: string;
  photoForm!: FormGroup;
  cvForm!: FormGroup;
  docPDF!: any;
  urlCV!: string;
  duration = 5000;


  constructor(
    public formBuilder: FormBuilder,
    private uploadPhotoService: UploadPhotoService,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
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
      lastName: new FormControl(this.dataUser.updateEmployee.lastName, [Validators.required]),
      email: new FormControl(this.dataUser.updateEmployee.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.dataUser.updateEmployee.phone, [Validators.required]),
      date: new FormControl(this.dataUser.updateEmployee.date, [Validators.required]),
      id: new FormControl(this.dataUser.updateEmployee.id, [Validators.required]),
      lastPerf: new FormControl(this.dataUser.updateEmployee.lastPerf),
      salary: new FormControl(this.dataUser.updateEmployee.salary),
      skype: new FormControl(this.dataUser.updateEmployee.skype)
    });
  }

  get name() { return this.addEmployeeForm.get('name'); }
  get email() { return this.addEmployeeForm.get('email'); }
  get date() { return this.addEmployeeForm.get('date'); }
  get phone() { return this.addEmployeeForm.get('phone'); }
  get skype() { return this.addEmployeeForm.get('skype'); }
  get lastName() { return this.addEmployeeForm.get('lastName'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser(employee: Employee, photo: UploadPhoto, cvFile: UploadFile) {
    if (employee) {
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
            this.snackBar.open(error.error.massage || 'ERROR! Try again.', '', {
              duration: this.duration
            })
        );
    }
  }

  getPhotoEmployee() {
    this.uploadPhotoService.GetPhotoById(this.dataUser.updateEmployee.id)
      .subscribe((res) => {
        if (res) {
          this.imageData = res.imagePath;
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

  getCV() {
    this.uploadFileService.getUplFileById(this.dataUser.updateEmployee)
      .subscribe((res) => {
        if (res != null) {
          this.urlCV = res.imagePath;
        }
        const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + this.urlCV + '\'></iframe>';
        this.docPDF = window.open();
        this.docPDF.document.write(iframe);
        this.docPDF.document.close();
      });
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.urlCV = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.cvForm.patchValue({ cv: file });
      this.cvForm.patchValue({ name: file.name });
      this.uploadFileName = file.name;
    }
  }


  getUploadFile() {
    this.uploadFileService.getUplFileById(this.dataUser.updateEmployee)
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
