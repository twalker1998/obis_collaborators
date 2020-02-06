import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFamilyRecordComponent } from './new-family-record.component';

describe('NewFamilyRecordComponent', () => {
  let component: NewFamilyRecordComponent;
  let fixture: ComponentFixture<NewFamilyRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFamilyRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFamilyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
