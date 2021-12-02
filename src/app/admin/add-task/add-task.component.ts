import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/model/Employee';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  infoAboutUserForm!: FormGroup;
  employee!: Employee;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTask: any,
    private authService: AuthService) {
    this.employee = this.authService.user;
  }

  ngOnInit(): void {
    this.infoAboutUserForm = new FormGroup({
      task: new FormControl(this.dataTask.task, [Validators.required]),
      date: new FormControl(this.dataTask.dateAll, [Validators.required]),
      idEmployee: new FormControl(this.employee.id),
      select: new FormControl(false)
    });
  }

  get date() { return this.infoAboutUserForm.get('date'); }
  get task() { return this.infoAboutUserForm.get('task'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
