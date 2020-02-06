import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(private httpClient: HttpClient) { }

  isAcodeUnique(acode: string) {
    return this.httpClient.get('http://obsvweb1.ou.edu/obis_search_old/check-acode.php?acode=' + acode);
  }

  doesFamilyExist(family: string) {
    return this.httpClient.get('http://obsvweb1.ou.edu/obis_search_old/check-family.php?family=' + family);
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
      return throwError('Something bad happened, please try again later.');
    } else {
      console.error('Backend returned code ' + error.status + ', body was: ' + error.error);
      return throwError('Something bad happened, please try again later.');
    }
  }
}
