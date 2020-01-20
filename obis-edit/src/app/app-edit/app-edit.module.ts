import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { EditMainComponent } from './components/edit-main/edit-main.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [EditMainComponent, SearchComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    EditMainComponent
  ],
  entryComponents: [EditMainComponent]
})
export class AppEditModule { }
