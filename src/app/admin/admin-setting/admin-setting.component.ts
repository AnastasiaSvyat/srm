import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PositionList } from 'src/app/model/positionList';
import { HouseRulesService } from 'src/app/services/houseRules/house-rules.service';
import { PositionListService } from 'src/app/services/positionList/position-list.service';

@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {

  houseRulesForm!: FormGroup;
  positionListForm!: FormGroup;


  houseRulesFile!: any;
  docPDF!: any;
  duration: number = 5000;
  urlCV!: string;
  uploadFileName = 'House rules';

  createNewPosition: boolean = false;

  positionList: PositionList[] = [];

  constructor(
    private houseRulesService: HouseRulesService,
    private snackBar: MatSnackBar,
    private positionListServise: PositionListService
  ) { }

  ngOnInit(): void {

    this.houseRulesForm = new FormGroup({
      houseRules: new FormControl(null)
    });

    this.positionListForm = new FormGroup({
      _id: new FormControl(''),
      positionName: new FormControl('')
    });

    this.getUploadFile();
    this.getAllPosition();
  }

  getUploadFile() {
    this.houseRulesService.getHouseRules()
      .subscribe((res) => {
        this.houseRulesFile = res;
      });
  }

  changePosition(positionName: string){
    this.positionListForm.get("positionName")?.setValue(positionName);
    
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


  getAllPosition(){
    this.positionListServise.GetPositionList()
    .subscribe((res) => {
      this.positionList = res;
    })
  }

  

  actionWithPosition(positionListForm: FormGroup, id: string){
    if(positionListForm.dirty){
      if(id){
        this.updatePosition(positionListForm.value);
      }else{
        this.savePosition(positionListForm.value);
      }
    }
  }

  savePosition(position: PositionList){
        this.positionListServise.CreatePosition(position)
        .subscribe((res) => {
          this.snackBar.open('Congratulations! Position has been created!', '', {
            duration: this.duration
          });
          this.getAllPosition();
          this.createNewPosition = false;
          this.positionListForm.reset();
        }, (err) => {
          this.snackBar.open('ERROR! Try again.', '', {
            duration: this.duration
          });
        });
  }

  updatePosition(position: PositionList){
    this.positionListServise.UpdatePosition(position)
    .subscribe((res) => {
      this.snackBar.open('Congratulations! Position has been changed!', '', {
        duration: this.duration
      });
      this.getAllPosition();
      this.createNewPosition = false;
      this.positionListForm.reset();
    }, (err) => {
      this.snackBar.open('ERROR! Try again.', '', {
        duration: this.duration
      });
    });
  }


  deletePosition(position: PositionList){
    this.positionListServise.DeletePosition(position._id)
    .subscribe((res) => {
      this.snackBar.open('Congratulations! Position has been deleted!', '', {
        duration: this.duration
      });
      this.getAllPosition();
      this.createNewPosition = false;
      this.positionListForm.reset();
    }, (err) => {
      this.snackBar.open('ERROR! Try again.', '', {
        duration: this.duration
      });
    });
  }


}
