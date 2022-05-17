import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/model/Employee';
import { Events } from 'src/app/model/Events';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-description-event',
  templateUrl: './description-event.component.html',
  styleUrls: ['./description-event.component.scss']
})
export class DescriptionEventComponent implements OnInit {

  listOfVotersConfirmaed: Employee[] = [];
  listOfVotersDeclined: Employee[] = [];

  constructor(
    public dialogRef: MatDialogRef<DescriptionEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private eventService: EventService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.getListOfVoters();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getListOfVoters() {
    this.eventService.getEventById(this.data.eventData._id)
      .subscribe((res) => {
        if (res.confirm) {
          res.confirm.forEach(element => {
            this.employeeService.GetEmployee(element)
              .subscribe((employee) => {
                this.listOfVotersConfirmaed.push(employee);
              });
          });
        }
        if (res.decline) {
          res.decline.forEach(element => {
            this.employeeService.GetEmployee(element)
              .subscribe((employee) => {
                this.listOfVotersDeclined.push(employee);
              });
          });
        }
      });
  }
}
