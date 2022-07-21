import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Events } from 'src/app/model/Events';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})

export class AddEventComponent implements OnInit {

  eventForm!: FormGroup;
  today = new Date();
  duration = 5000;


  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    private eventService: EventService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      name: new FormControl(this.data.eventData.name, [Validators.required]),
      type: new FormControl(this.data.eventData.type, [Validators.required]),
      date: new FormControl(this.data.eventData.date, [Validators.required]),
      description: new FormControl(this.data.eventData.description),
      id: new FormControl(this.data.eventData._id)
    });
  }

  get name() { return this.eventForm.get('name'); }
  get type() { return this.eventForm.get('type'); }
  get date() { return this.eventForm.get('date'); }
  get description() { return this.eventForm.get('description'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getEvent(eventForm: FormGroup) {
    if (eventForm.valid) {
      if (this.data.btn === 'ADD') {
        this.addEvent(eventForm.value);
      }
      if (this.data.btn === 'EDIT') {
        this.updateEvent(eventForm.value);
      }
    } else {
      this.snackBar.open('ERROR! Enter correct data!', '', {
        duration: this.duration
      });
    }
  }

  addEvent(event: Events) {
    if (event) {
      this.eventService.AddEvent(event)
        .subscribe(() => {
          this.snackBar.open('Congratulations! Event has been added!', '', {
            duration: this.duration
          });
          this.dialogRef.close(event);
        }, (err) => {
          this.snackBar.open('ERROR! Try again.', '', {
            duration: this.duration
          });
        });
    }
  }

  updateEvent(event: Events) {
    this.eventService.UpdateEvent(event.id, event)
      .subscribe(() => {
        this.dialogRef.close(event);
        this.snackBar.open('Congratulations! Event has been changed!', '', {
          duration: this.duration
        });
      }, (err) => {
        this.snackBar.open('ERROR! Try again.', '', {
          duration: this.duration
        });
      });
  }
}
