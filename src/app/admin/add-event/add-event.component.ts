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
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  get name() { return this.eventForm.get('name'); }
  get type() { return this.eventForm.get('type'); }
  get date() { return this.eventForm.get('date'); }
  get description() { return this.eventForm.get('description'); }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveEvent(result: Events) {
    if (result) {
      this.eventService.AddEvent(result)
        .subscribe(() => {
          this.snackBar.open('Congratulations! Event has been added!', '', {
            duration: this.duration
          });
          this.dialogRef.close(result);
        }, (err) => {
          this.snackBar.open('ERROR! Try again.', '', {
            duration: this.duration
          });
        });
    }
  }
}
