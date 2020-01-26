import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

export interface Ranks {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {
  acctaxForm: FormGroup;
  comtaxForm: FormGroup;
  showSpinner = false;
  submitted = false;
  error = '';

  gRanks: Ranks[] = [
    {value: 0, viewValue: 'None'},
    {value: 1, viewValue: 'GX'},
    {value: 2, viewValue: 'GH'},
    {value: 3, viewValue: 'G1'},
    {value: 4, viewValue: 'G2'},
    {value: 5, viewValue: 'G3'},
    {value: 6, viewValue: 'G4'},
    {value: 7, viewValue: 'G5'},
    {value: 8, viewValue: 'G?'},
    {value: 9, viewValue: 'GU'},
    {value: 10, viewValue: 'GNR'},
    {value: 11, viewValue: 'GNA'},
  ];

  sRanks: Ranks[] = [
    {value: 0, viewValue: 'None'},
    {value: 1, viewValue: 'SX'},
    {value: 2, viewValue: 'SH'},
    {value: 3, viewValue: 'S1'},
    {value: 4, viewValue: 'S2'},
    {value: 5, viewValue: 'S3'},
    {value: 6, viewValue: 'S4'},
    {value: 7, viewValue: 'S5'},
    {value: 8, viewValue: 'S?'},
    {value: 9, viewValue: 'SU'},
    {value: 10, viewValue: 'SNR'},
    {value: 11, viewValue: 'SNA'},
  ];

  fedStatus: Ranks[] = [
    {value: 0, viewValue: 'None'},
    {value: 1, viewValue: 'LE: Listed Endangered'},
    {value: 2, viewValue: 'LT: Listed Threatened'},
    {value: 3, viewValue: 'LE-EX: Listed Endangered; Believed to be extirpated in Oklahoma'},
    {value: 4, viewValue: 'LT-EX: Listed Threatened; Believed to be extirpated in Oklahoma'},
    {value: 5, viewValue: 'PE: Proposed Endangered'},
    {value: 6, viewValue: 'PT: Proposed Threatened'},
    {value: 7, viewValue: 'C: Candidate'},
    {value: 8, viewValue: 'LE-SA: Endangered due to smiliarity in appearance to other listed species'},
    {value: 9, viewValue: 'LT-SA: Threatened due to smiliarity in appearance to other listed species'}
  ];

  stStatus: Ranks[] = [
    {value: 0, viewValue: 'None'},
    {value: 1, viewValue: 'LE: Listed Endangered'},
    {value: 2, viewValue: 'LT: Listed Threatened'},
  ];

  swap: Ranks[] = [
    {value: 0, viewValue: 'None'},
    {value: 1, viewValue: 'I: Species receiving 11 to 15 points in state ranking'},
    {value: 2, viewValue: 'II: Species receiving 9 to 10 points in state ranking'},
    {value: 3, viewValue: 'III: Species receiving 6 to 8 points in state ranking'}
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.acctaxForm = this.formBuilder.group({
      acode: ['', Validators.required],
      sname: ['', Validators.required],
      sname_author: null,
      family: ['', Validators.required],
      genus: ['', Validators.required],
      species: ['', Validators.required],
      subspecies: null,
      variety: null,
      forma: null,
      elcode: null,
      gelcode: null,
      iucncode: null,
      g_rank: ['', Validators.required],
      s_rank: ['', Validators.required],
      nativity: null,
      source: null,
      usda_code: null,
      tsn: null,
      fed_status: ['', Validators.required],
      st_status: ['', Validators.required],
      swap: ['', Validators.required]
    });
  }

  get af() { return this.acctaxForm.controls; }
  get cf() { return this.comtaxForm.controls; }
}
