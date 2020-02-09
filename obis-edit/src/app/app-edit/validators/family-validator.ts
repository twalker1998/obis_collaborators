import { Injectable } from '@angular/core';
import { FormControl, Validator } from '@angular/forms';

import { DbService } from '../core/db.service';

@Injectable()
export class FamilyValidator implements Validator {
  debouncer: any;

  constructor(private dbService: DbService) {}

  validate(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.dbService.doesFamilyExist(control.value).subscribe((res) => {
          resolve(null);
        }, (err) => {
          resolve({nonExistingFamily: true});
        });
      }, 1000);
    });
  }
}
