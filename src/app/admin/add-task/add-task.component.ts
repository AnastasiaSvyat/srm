import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataEmployeeService } from 'src/app/services/dataEmployee/dataEmployee.service';
import { DashboardAdminComponent } from '../dashboard-admin/dashboard-admin.component';
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
    private service: DataEmployeeService,
    private authService: AuthService) {
    // this.service.data.subscribe(value => {
      this.employee = this.authService.user;
    // });
  }

  ngOnInit(): void {
    this.infoAboutUserForm = new FormGroup({
      task: new FormControl(this.dataTask.task, [Validators.required]),
      date: new FormControl(this.dataTask.dateAll, [Validators.required]),
      email: new FormControl(this.employee.email),
      select: new FormControl(false)
    });
  }

  get date() { return this.infoAboutUserForm.get('date'); }
  get task() { return this.infoAboutUserForm.get('task'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
