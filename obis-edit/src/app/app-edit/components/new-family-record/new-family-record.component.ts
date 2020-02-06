import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

export interface FamilyData {
  kingdon: string;
  phylum: string;
  class: string;
  order: string;
  family: string;
  category: string;
}

@Component({
  selector: 'app-new-family-record',
  templateUrl: './new-family-record.component.html',
  styleUrls: ['./new-family-record.component.css']
})
export class NewFamilyRecordComponent implements OnInit {
  familyForm: FormGroup;
  recordSubmitted = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<NewFamilyRecordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FamilyData) { }

  ngOnInit(): void {
    this.familyForm = this.formBuilder.group({
      kingdom: ['', Validators.required],
      phylum: ['', Validators.required],
      class: ['', Validators.required],
      order: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  get ff() { return this.familyForm.controls; }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
