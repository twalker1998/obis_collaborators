import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';

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
  glRankDefault: number;
  glRankFilter: FormControl = new FormControl();
  stRanks: Array<Option> = new Array<Option>();
  stRankDefault: number;
  stRankFilter: FormControl = new FormControl();
  fedStatuses: Array<Option> = new Array<Option>();
  stStatuses: Array<Option> = new Array<Option>();
  noneOption = 0;

  // Testing for tooltips
  position: TooltipPosition = 'above';
  showDelay = '2000';

  constructor(private formBuilder: FormBuilder, private dbService: DbService,
              private acodeValidator: AcodeValidator, private familyValidator: FamilyValidator, public dialog: MatDialog) { }

  ngOnInit() {
    this.dbService.getIUCNCodes().subscribe(res => {
      this.iucnCodes.push({id: 0, display_name: 'None'});

      for (const iucnCode of res.iucn_codes) {
        this.iucnCodes.push(iucnCode);
      }
    });

    this.dbService.getNativities().subscribe(res => {
      this.nativities.push({id: 0, display_name: 'None'});

      for (const nativity of res.nativities) {
        this.nativities.push(nativity);
      }
    });

    this.dbService.getSwaps().subscribe(res => {
      this.swaps.push({id: 0, display_name: 'None'});

      for (const swap of res.ok_swap) {
        this.swaps.push(swap);
      }
    });

    this.dbService.getRanks().subscribe(res => {
      this.glRanks = res.gl_ranks;
      this.stRanks = res.st_ranks;

      for (const glRank of this.glRanks) {
        if (glRank.display_name === 'GNR') {
          this.glRankDefault = glRank.id;
          break;
        }
      }

      for (const stRank of this.stRanks) {
        if (stRank.display_name === 'SNR') {
          this.stRankDefault = stRank.id;
          break;
        }
      }
    });

    this.dbService.getStatuses().subscribe(res => {
      this.fedStatuses.push({id: 0, display_name: 'None'});

      for (const fedStatus of res.fed_statuses) {
        this.fedStatuses.push(fedStatus);
      }

      this.stStatuses.push({id: 0, display_name: 'None'});

      for (const stStatus of res.st_statuses) {
        this.stStatuses.push(stStatus);
      }
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
      scode: ['', Validators.required, this.acodeValidator.validate.bind(this.acodeValidator)],
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
    let familyVal = '';

    if (this.acctaxForm.get('family').hasError('nonExistingFamily')) {
      familyVal = this.af.family.value;
    } else if (this.syntaxForm.get('family').hasError('nonExistingFamily')) {
      familyVal = this.sf.family.value;
    }

    const dialogRef = this.dialog.open(NewFamilyRecordComponent, {
      width: 'auto',
      height: 'auto',
      data: {family: familyVal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.acctaxForm.get('family').hasError('nonExistingFamily')) {
        this.acctaxForm.get('family').updateValueAndValidity();
      } else if (this.syntaxForm.get('family').hasError('nonExistingFamily')) {
        this.syntaxForm.get('family').updateValueAndValidity();
      }
    });
  }
}
