import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Option } from '../../../shared/models/option';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {
  acctaxForm: FormGroup;
  comtaxForm: FormGroup;
  comtaxFormSubmitted = false;
  syntaxForm: FormGroup;
  syntaxFormSubmitted = false;
  synonyms: Array<string> = new Array<string>();
  commonNames: Array<string> = new Array<string>();
  showSpinner = false;
  error = '';
  acode: string;
  recordSubmitted = false;
  synonymAdded = false;
  commonNameAdded = false;

  gRanks: Option[] = [
    {value: 0, viewValue: 'None'},
    {value: 1, viewValue: 'GX'},
    {value: 2, viewValue: 'GH'},
    {value: 3, viewValue: 'G1'},
    {value: 4, viewValue: 'G2'},
    {value: 5, viewValue: 'G3'},
    {value: 6, viewValue: 'G4'},
    {value: 7, viewValue: 'G5'},
    {value: 8, viewValue: 'G?'},
    {value: 9, viewValue: 'G1G1'},
    {value: 10, viewValue: 'G1G2'},
    {value: 11, viewValue: 'G1G3'},
    {value: 12, viewValue: 'G1G4'},
    {value: 13, viewValue: 'G1G5'},
    {value: 14, viewValue: 'G2G2'},
    {value: 15, viewValue: 'G2G3'},
    {value: 16, viewValue: 'G2G4'},
    {value: 17, viewValue: 'G2G5'},
    {value: 18, viewValue: 'G3G3'},
    {value: 19, viewValue: 'G3G4'},
    {value: 20, viewValue: 'G3G5'},
    {value: 21, viewValue: 'G4G4'},
    {value: 22, viewValue: 'G4G5'},
    {value: 23, viewValue: 'G5G5'},
    {value: 24, viewValue: 'GU'},
    {value: 25, viewValue: 'GNR'},
    {value: 26, viewValue: 'GNA'},
  ];

  sRanks: Option[] = [
    {value: 0, viewValue: 'None'},
    {value: 1, viewValue: 'SX'},
    {value: 2, viewValue: 'SH'},
    {value: 3, viewValue: 'S1'},
    {value: 4, viewValue: 'S2'},
    {value: 5, viewValue: 'S3'},
    {value: 6, viewValue: 'S4'},
    {value: 7, viewValue: 'S5'},
    {value: 8, viewValue: 'S?'},
    {value: 9, viewValue: 'S1S1'},
    {value: 10, viewValue: 'S1S2'},
    {value: 11, viewValue: 'S1S3'},
    {value: 12, viewValue: 'S1S4'},
    {value: 13, viewValue: 'S1S5'},
    {value: 14, viewValue: 'S2S2'},
    {value: 15, viewValue: 'S2S3'},
    {value: 16, viewValue: 'S2S4'},
    {value: 17, viewValue: 'S2S5'},
    {value: 18, viewValue: 'S3S3'},
    {value: 19, viewValue: 'S3S4'},
    {value: 20, viewValue: 'S3S5'},
    {value: 21, viewValue: 'S4S4'},
    {value: 22, viewValue: 'S4S5'},
    {value: 23, viewValue: 'S5S5'},
    {value: 24, viewValue: 'SU'},
    {value: 25, viewValue: 'SNR'},
    {value: 26, viewValue: 'SNA'},
  ];

  fedStatus: Option[] = [
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

  stStatus: Option[] = [
    {value: 0, viewValue: 'None'},
    {value: 1, viewValue: 'LE: Listed Endangered'},
    {value: 2, viewValue: 'LT: Listed Threatened'},
  ];

  swap: Option[] = [
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
      swap: ['', Validators.required],
      scientificname: null,
      sspscientificnameauthorship: null,
      varscientificnameauthorship: null,
      formascientificnameauthorship: null,
      tracked: ['', Validators.required]
    });

    this.comtaxForm = this.formBuilder.group({
      acode: ['', Validators.required],
      vname: ['', Validators.required],
      primary_name: ['', Validators.required]
    });

    this.syntaxForm = this.formBuilder.group({
      acode: ['', Validators.required],
      scode: ['', Validators.required],
      sname: ['', Validators.required],
      sname_author: null,
      family: ['', Validators.required],
      genus: ['', Validators.required],
      species: ['', Validators.required],
      subspecies: null,
      variety: null,
      tsn: null,
      scientificname: null,
      sspscientificnameauthorship: null,
      varscientificnameauthorship: null,
      formascientificnameauthorship: null
    });
  }

  get af() { return this.acctaxForm.controls; }
  get cf() { return this.comtaxForm.controls; }
  get sf() { return this.syntaxForm.controls; }

  addSynonym() {
    this.syntaxFormSubmitted = true;

    if (this.syntaxForm.invalid) {
      return;
    }

    this.synonyms.push(this.sf.sname.value);

    this.syntaxFormSubmitted = false;
    this.synonymAdded = true;
  }

  removeSynonym() {
    const synonymsSelect = (<HTMLSelectElement>document.getElementById('synonyms'));
    const index = this.synonyms.indexOf(synonymsSelect.value, 0);

    if (index > -1) {
      this.synonyms.splice(index, 1);
    }
  }

  addCommonName() {
    this.comtaxFormSubmitted = true;

    if (this.comtaxForm.invalid) {
      return;
    }

    this.commonNames.push(this.cf.vname.value);

    this.comtaxFormSubmitted = false;
    this.commonNameAdded = true;
  }

  removeCommonName() {
    const commonNamesSelect = (<HTMLSelectElement>document.getElementById('commonNames'));
    const index = this.commonNames.indexOf(commonNamesSelect.value, 0);

    if (index > -1) {
      this.commonNames.splice(index, 1);
    }
  }
}
