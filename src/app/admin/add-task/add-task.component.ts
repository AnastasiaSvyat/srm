import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/model/Employee';
import { ToDoList } from 'src/app/model/ToDoList';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ToDoListService } from 'src/app/services/toToList/to-do-list.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  infoAboutUserForm!: FormGroup;
  employee!: Employee;
  today = new Date();
  duration = 5000;
  staffList!: Employee[];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTask: any,
    private authService: AuthService,
    private taskService: ToDoListService,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
  ) {
    this.employee = this.authService.user;
    this.initStaff();
  }

  ngOnInit(): void {
    this.infoAboutUserForm = new FormGroup({
      task: new FormControl(this.dataTask.eventData.task, [Validators.required]),
      date: new FormControl(this.dataTask.eventData.date, [Validators.required]),
      idEmployee: new FormControl(this.employee.id),
      select: new FormControl(false),
      id: new FormControl(this.dataTask.eventData._id)
    });
  }

  get date() { return this.infoAboutUserForm.get('date'); }
  get task() { return this.infoAboutUserForm.get('task'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getTask(taskForm: FormGroup) {
    if (taskForm.valid) {
      if (this.dataTask.btn === 'ADD') {
        this.addTask(taskForm.value);
      }
      if (this.dataTask.btn === 'EDIT') {
        this.updateTask(taskForm.value);
      }
    }else {
      this.snackBar.open('ERROR! Enter correct data!', '', {
        duration: this.duration
      });
    }
  }

  addTask(result: ToDoList) {
    this.taskService.AddTask(result)
      .subscribe(() => {
        this.dialogRef.close(result);
        this.snackBar.open('Congratulations! Task has been added!', '', {
          duration: this.duration
        });
      }, (err) => {
        this.snackBar.open('ERROR! Try again.', '', {
          duration: this.duration
        });
      });
  }

  initStaff() {
    this.employeeService.GetStaff()
      .subscribe((res) => {
        this.staffList = res;
      });
  }

  updateTask(result: ToDoList) {
    this.taskService.UpdateTask(result.id, result)
      .subscribe((res) => {
        this.dialogRef.close(result);
        this.snackBar.open('Congratulations! Task has been changed!', '', {
          duration: this.duration
        });
      }, (err) => {
        this.snackBar.open('ERROR! Try again.', '', {
          duration: this.duration
        });
      });
  }
}
