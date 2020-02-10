import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { DistributionMapComponent } from './components/distribution-map/distribution-map.component';
import { EditMainComponent } from './components/edit-main/edit-main.component';
import { MapComponent } from './components/map/map.component';
import { NewFamilyRecordComponent } from './components/new-family-record/new-family-record.component';
import { NewRecordComponent } from './components/new-record/new-record.component';
import { ResultComponent } from './components/result/result.component';
import { SearchComponent } from './components/search/search.component';

import { AcodeValidator } from './validators/acode-validator';
import { FamilyValidator } from './validators/family-validator';

@NgModule({
  declarations: [
    EditMainComponent,
    SearchComponent,
    ResultComponent,
    DistributionMapComponent,
    MapComponent,
    NewRecordComponent,
    NewFamilyRecordComponent
  ], imports: [
    CommonModule,
    SharedModule,
    NgbModule
  ], exports: [
    EditMainComponent
  ], entryComponents: [
    EditMainComponent,
    NewFamilyRecordComponent
  ], providers: [
    AcodeValidator,
    FamilyValidator
  ]
})
export class AppEditModule { }
