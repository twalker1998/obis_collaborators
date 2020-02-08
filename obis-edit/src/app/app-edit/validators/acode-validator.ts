import { Injectable } from '@angular/core';
import { FormControl, Validator } from '@angular/forms';

import { ApiService } from '../core/api.service';

@Injectable()
export class AcodeValidator implements Validator {
  debouncer: any;

  constructor(private apiService: ApiService) { }

  validate(control: FormControl): any {
    clearTimeout(this.debouncer);

    return new Promise(resolve => {
      this.debouncer = setTimeout(() => {
        this.apiService.isAcodeUnique(control.value).subscribe((res) => {
          resolve(null);
        }, (err) => {
          resolve({acodeInUse: true});
        });
      }, 1000);
    });
  }
}
