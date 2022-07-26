import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RequestService } from 'src/app/services/request/request.service';
import { Request } from 'src/app/model/Request';
import { LogTimeVacation } from 'src/app/model/logTimeVacation';
import { LogTimeVacationService } from 'src/app/services/LogTimeVacation/log-time-vacation.service';

@Component({
  selector: 'app-add-request-user',
  templateUrl: './add-request-user.component.html',
  styleUrls: ['./add-request-user.component.scss']
})
export class AddRequestUserComponent implements OnInit {

  requestForm!: FormGroup;
  today = new Date();
  duration = 5000;

  constructor(
    public dialogRef: MatDialogRef<AddRequestUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public requestService: RequestService,
    private snackBar: MatSnackBar,
    private logTimeVacationService: LogTimeVacationService
  ) { }

  ngOnInit(): void {
    // this.checkCorrectUpdateDate();
    this.requestForm = new FormGroup({
      idEmployee: new FormControl(this.data.employee.id),
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      confirm: new FormControl(false),
      decline: new FormControl(false),
      month: new FormControl(''),
      id: new FormControl('')
    });

  }

  get type() { return this.requestForm.get('type'); }
  get date() { return this.requestForm.get('date'); }
  get endDate() { return this.requestForm.get('endDate'); }
  get description() { return this.requestForm.get('description'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  disableWeekendFromCalendar(selectDate: any){
    const day = selectDate?.getDay();    
    return day !== 0 && day !== 6;
  }


  checkCorrectUpdateDate(){
    this.logTimeVacationService.checkCorrectUpdateDateOrCreateLogTimeVacation(this.data.employee.id)
    .subscribe((res) => {
      console.log(res);
    })
  }

  getRequest(resultForm: FormGroup) {
    if (resultForm.valid) {
      this.requestService.AddRequest(resultForm.value)
        .subscribe((res) => {
          this.snackBar.open('Congratulations! Request has been added!', '', {
            duration: this.duration
          });
          this.dialogRef.close(resultForm.value);
        }, (err) => {
          this.snackBar.open('ERROR! Try again.!', '', {
            duration: this.duration
          });
        });
    }else {
      this.snackBar.open('ERROR! Enter correct data!', '', {
        duration: this.duration
      });
    }
  }
}
