import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-add-request-user',
  templateUrl: './add-request-user.component.html',
  styleUrls: ['./add-request-user.component.scss']
})
export class AddRequestUserComponent implements OnInit {

  requestForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddRequestUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public requestService: RequestService,
  ) { }

  ngOnInit(): void {

    this.requestForm = new FormGroup({
      idEmployee: new FormControl(this.data.employee.id),
      name: new FormControl(this.data.employee.name),
      type: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      confirm: new FormControl(false),
      decline: new FormControl(false)
    });
  }

  get type() { return this.requestForm.get('type'); }
  get date() { return this.requestForm.get('date'); }
  get endDate() { return this.requestForm.get('endDate'); }
  get description() { return this.requestForm.get('description'); }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
