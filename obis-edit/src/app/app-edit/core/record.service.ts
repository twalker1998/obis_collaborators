import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../../app-auth/authentication.service';
import { HightaxApi } from '../../shared/models/api/hightax-api';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  isAcodeUnique(acode: string) {
    return this.httpClient.get('http://obsvweb1.ou.edu/obis_search_old/check-acode.php?acode=' + acode);
  }

  doesFamilyExist(family: string) {
    return this.httpClient.get('http://obsvweb1.ou.edu/obis_search_old/check-family.php?family=' + family);
  }

  createHightaxRecord(newRecord: HightaxApi): Observable<HightaxApi> {
    const token = this.authenticationService.currentUserValue.key;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Token ' + token,
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<HightaxApi>('https://obis.ou.edu/api/obis/hightax/', JSON.stringify(newRecord), httpOptions).pipe(
      catchError(this.handleError)
    );
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
