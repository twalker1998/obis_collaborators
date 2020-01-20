import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SearchMainComponent } from './components/search-main/search-main.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [SearchMainComponent, SearchComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SearchMainComponent
  ],
  entryComponents: [SearchMainComponent]
})
export class AppEditModule { }
