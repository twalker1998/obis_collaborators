import { Injectable } from '@angular/core';
import { FormControl, Validator } from '@angular/forms';

import { DbService } from '../core/db.service';

@Injectable()
export class AcodeValidator implements Validator {
  debouncer: any;

  constructor(private dbService: DbService) { }

  validate(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.dbService.isAcodeUnique(control.value).subscribe((res) => {
          resolve(null);
        }, (err) => {
          resolve({acodeInUse: true});
        });
      }, 1000);
    });
  }
}
