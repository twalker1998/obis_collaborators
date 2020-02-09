import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { NewFamilyRecordComponent } from '../new-family-record/new-family-record.component';
import { Option } from '../../../shared/models/php/option';

import { AcodeValidator } from '../../validators/acode-validator';
import { DbService } from '../../core/db.service';
import { FamilyValidator } from '../../validators/family-validator';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {
  acode: string;
  acctaxForm: FormGroup;
  comtaxForm: FormGroup;
  comtaxFormSubmitted = false;
  syntaxForm: FormGroup;
  syntaxFormSubmitted = false;
  recordSubmitted = false;
  showSpinner = false;
  error = '';

  synonyms: Array<string> = new Array<string>();
  synonymAdded = false;
  commonNames: Array<string> = new Array<string>();
  commonNameAdded = false;

  iucnCodes: Array<Option> = new Array<Option>();
  nativities: Array<Option> = new Array<Option>();
  swaps: Array<Option> = new Array<Option>();
  glRanks: Array<Option> = new Array<Option>();
  stRanks: Array<Option> = new Array<Option>();
  fedStatuses: Array<Option> = new Array<Option>();
  stStatuses: Array<Option> = new Array<Option>();

  constructor(private formBuilder: FormBuilder, private dbService: DbService,
              private acodeValidator: AcodeValidator, private familyValidator: FamilyValidator, public dialog: MatDialog) { }

  ngOnInit() {
    this.dbService.getIUCNCodes().subscribe(res => {
      this.iucnCodes = res.iucn_codes;
    });

    this.dbService.getNativities().subscribe(res => {
      this.nativities = res.nativities;
    });

    this.dbService.getSwaps().subscribe(res => {
      this.swaps = res.ok_swap;
    });

    this.dbService.getRanks().subscribe(res => {
      this.glRanks = res.gl_ranks;
      this.stRanks = res.st_ranks;
    });

    this.dbService.getStatuses().subscribe(res => {
      this.fedStatuses = res.fed_statuses;
      this.stStatuses = res.st_statuses;
    });

    this.acctaxForm = this.formBuilder.group({
      acode: ['', Validators.required, this.acodeValidator.validate.bind(this.acodeValidator)],
      sname: ['', Validators.required],
      sname_author: null,
      family: ['', Validators.required, this.familyValidator.validate.bind(this.familyValidator)],
      genus: ['', Validators.required],
      species: ['', Validators.required],
      subspecies: null,
      variety: null,
      forma: null,
      elcode: null,
      gelcode: null,
      iucncode: ['', Validators.required],
      g_rank: ['', Validators.required],
      s_rank: ['', Validators.required],
      nativity: ['', Validators.required],
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
      vname: ['', Validators.required],
      primary_name: ['', Validators.required]
    });

    this.syntaxForm = this.formBuilder.group({
      scode: ['', Validators.required],
      sname: ['', Validators.required],
      sname_author: null,
      family: ['', Validators.required, this.familyValidator.validate.bind(this.familyValidator)],
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
    const synonymsSelect = (document.getElementById('synonyms') as HTMLSelectElement);
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
    const commonNamesSelect = (document.getElementById('commonNames') as HTMLSelectElement);
    const index = this.commonNames.indexOf(commonNamesSelect.value, 0);

    if (index > -1) {
      this.commonNames.splice(index, 1);
    }
  }

  openDialog(): void {
    const familyVal = this.af.family.value;

    const dialogRef = this.dialog.open(NewFamilyRecordComponent, {
      width: 'auto',
      height: 'auto',
      data: {family: familyVal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.acctaxForm.get('family').hasError('nonExistingFamily')) {
        this.acctaxForm.get('family').updateValueAndValidity();
      }
    });
  }
}
