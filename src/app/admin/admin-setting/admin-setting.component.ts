import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HouseRulesService } from 'src/app/services/houseRules/house-rules.service';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {

  uploadFileName = 'House rules';
  urlCV!: string;
  houseRulesForm!: FormGroup;
  houseRulesFile!: any;
  docPDF!: any;
  duration: number = 5000;



  constructor(
    private houseRulesService: HouseRulesService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.houseRulesForm = new FormGroup({
      houseRules: new FormControl(null)
    });

    this.getUploadFile();
  }

  getUploadFile() {
    this.houseRulesService.getHouseRules()
      .subscribe((res) => {
        console.log(res);

        this.houseRulesFile = res;
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.urlCV = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.houseRulesForm.patchValue({ houseRules: file });
      this.houseRulesService.uploadHouseRules(this.houseRulesForm.value.houseRules)
        .subscribe((res: any) => {
          console.log(res);
          this.getUploadFile();
          this.snackBar.open('Congratulations! House rules has been changed!', '', {
            duration: this.duration
          });
        }, (err) => {
          this.snackBar.open('ERROR! Try again.', '', {
            duration: this.duration
          })
        });
    }
  }

  getCV() {
    this.houseRulesService.getHouseRules()
      .subscribe((res) => {
        if (res != null) {
          this.urlCV = res.filePath;
        }
        const iframe = '<iframe width=\'100%\' height=\'100%\' src=\'' + this.urlCV + '\'></iframe>';
        this.docPDF = window.open();
        this.docPDF.document.write(iframe);
        this.docPDF.document.close();
      });
  }

  deleteCV() {

  }

}
