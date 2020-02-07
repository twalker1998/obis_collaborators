import { Injectable } from '@angular/core';
import { Validator, FormControl } from '@angular/forms';

import { RecordService } from './../core/record/record.service';

@Injectable()
export class FamilyValidator implements Validator {
  debouncer: any;

  constructor(private recordService: RecordService) {}

  validate(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.recordService.doesFamilyExist(control.value).subscribe((res) => {
          resolve(null);
        }, (err) => {
          resolve({nonExistingFamily: true});
        });
      }, 1000);
    });
  }
}
