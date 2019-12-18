import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestCompComponent } from './components/test-comp/test-comp.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TestCompComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TestCompComponent
  ],
  entryComponents: [TestCompComponent]
})
export class TestModule { }
