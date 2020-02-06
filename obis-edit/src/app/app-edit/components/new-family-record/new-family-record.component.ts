import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

import { HightaxApi } from '../../../shared/models/api/hightax_api';

@Component({
  selector: 'app-new-family-record',
  templateUrl: './new-family-record.component.html',
  styleUrls: ['./new-family-record.component.css']
})
export class NewFamilyRecordComponent implements OnInit {
  familyForm: FormGroup;
  recordSubmitted = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<NewFamilyRecordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: HightaxApi) { }

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

  createRecord(): void {
    const newFamilyRecord: HightaxApi = {
      kingdom: this.ff.kingdom.value,
      phylum: this.ff.phylum.value,
      class: this.ff.class.value,
      order: this.ff.order.value,
      family: this.data.family,
      category: this.ff.category.value
    };

    console.log(JSON.stringify(newFamilyRecord));
  }
}
