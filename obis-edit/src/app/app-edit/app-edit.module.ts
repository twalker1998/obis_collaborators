import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SearchMainComponent } from './components/search-main/search-main.component';

@NgModule({
  declarations: [SearchMainComponent],
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
