import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EventService } from 'src/app/services/event/event.service';
import { AdminComponent } from '../admin.component';
import { DashboardAdminComponent } from '../dashboard-admin/dashboard-admin.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})

export class AddEventComponent implements OnInit {

  eventForm!: FormGroup;
  createEvent!: any;

  constructor(public dialogRef: MatDialogRef<AddEventComponent, DashboardAdminComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AdminComponent,
              private eventService: EventService,
              public formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });
  }

  get name() { return this.eventForm.get('name') ; }
  get type() { return this.eventForm.get('type'); }
  get date() { return this.eventForm.get('date'); }
  get description() { return this.eventForm.get('description'); }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
