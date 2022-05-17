import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StandartHours } from 'src/app/model/standartHours';
import { StandartHoursService } from 'src/app/services/standartHours/standart-hours.service';

@Component({
  selector: 'app-admin-add-standart-hours',
  templateUrl: './admin-add-standart-hours.component.html',
  styleUrls: ['./admin-add-standart-hours.component.scss']
})
export class AdminAddStandartHoursComponent implements OnInit {

  standartHourForm!: FormGroup;

  duration = 5000;

  constructor(
    public dialogRef: MatDialogRef<AdminAddStandartHoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private snackBar: MatSnackBar,

    private standartHourService: StandartHoursService
  ) { }

  ngOnInit(): void {
    this.standartHourForm = new FormGroup({
      time: new FormControl(this.data.hours.time, [Validators.required, Validators.pattern("^[0-9]*$")]),
      id: new FormControl(this.data.hours._id)

    });
  }

  get time() { return this.standartHourForm.get('time'); }
  
  onNoClick(){
    this.dialogRef.close();
  }

  standartHour(hour: StandartHours){
    if (hour) {
      if (this.data.btn === 'ADD') {
        this.addStandartHours(hour);
      }
      if (this.data.btn === 'SAVE') {
        this.updateStandartHours(hour);
      }
    }
  }

  addStandartHours(hour: StandartHours){
    this.standartHourService.AddStandartHours(hour)
    .subscribe((res) => {
      this.dialogRef.close(res);
      this.snackBar.open('Congratulations! Hours has been added!', '', {
        duration: this.duration
      });
    }, (err) => {
      this.snackBar.open('ERROR! Try again.', '', {
        duration: this.duration
      });
    });
  }

  updateStandartHours(hour: any){
    this.standartHourService.UpdateStandartHours(hour.id, hour)
    .subscribe((res) => {
      this.dialogRef.close(res);
      this.snackBar.open('Congratulations! Hours has been changed!', '', {
        duration: this.duration
      });
    }, (err) => {
      this.snackBar.open('ERROR! Try again.', '', {
        duration: this.duration
      });
    });
  }

}
