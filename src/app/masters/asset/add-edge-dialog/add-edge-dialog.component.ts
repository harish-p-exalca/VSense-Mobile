import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MEdge } from 'src/app/Models/site';

@Component({
  selector: 'app-add-edge-dialog',
  templateUrl: './add-edge-dialog.component.html',
  styleUrls: ['./add-edge-dialog.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AddEdgeDialogComponent implements OnInit {
  DialogueFormGroup: FormGroup;
  OpenEdges:MEdge[]=[];

  constructor(private _formBuilder: FormBuilder,
     public dialogRef: MatDialogRef<AddEdgeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.OpenEdges=data.OpenEdges;
     }

    ngOnInit(): void {
      this.InitializeDialogueFormGroup();
    }
    InitializeDialogueFormGroup(): void {
      this.DialogueFormGroup = this._formBuilder.group({
        EdgeID: ['',Validators.required],
        Frequency:[null,Validators.required],
        StartDateTime:[null,Validators.required]
      });
    }
    Save(){
      if(this.DialogueFormGroup.valid){
        this.dialogRef.close(this.DialogueFormGroup.value);
      }
      else{
        this.ShowValidationErrors(this.DialogueFormGroup);
      }
    }
    ShowValidationErrors(formGroup:FormGroup): void {
      Object.keys(formGroup.controls).forEach(key => {
        formGroup.get(key).markAsTouched();
        formGroup.get(key).markAsDirty();
      });
    }

}
