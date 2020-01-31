import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

import { RecordService } from '../core/record/record.service';

@Injectable()
export class AcodeValidator {
  debouncer: any;

  constructor(private recordService: RecordService) { }

  isAcodeUnique(control: FormControl): any {
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
