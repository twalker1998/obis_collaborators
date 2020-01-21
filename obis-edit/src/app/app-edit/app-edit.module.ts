import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { EditMainComponent } from './components/edit-main/edit-main.component';
import { SearchComponent } from './components/search/search.component';
import { ResultComponent } from './components/result/result.component';

@NgModule({
  declarations: [EditMainComponent, SearchComponent, ResultComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule
  ],
  exports: [
    EditMainComponent
  ],
  entryComponents: [EditMainComponent]
})
export class AppEditModule { }
