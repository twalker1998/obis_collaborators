import { Injectable } from '@angular/core';
import { FormControl, Validator } from '@angular/forms';

import { RecordService } from '../core/record.service';

@Injectable()
export class AcodeValidator implements Validator {
  debouncer: any;

  constructor(private recordService: RecordService) { }

  validate(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.recordService.isAcodeUnique(control.value).subscribe((res) => {
          resolve(null);
        }, (err) => {
          resolve({acodeInUse: true});
        });
      }, 1000);
    });
  }
}
