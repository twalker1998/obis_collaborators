import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Acctax } from '../../../shared/models/acctax';
import { ApiResponse } from '../../../shared/models/api-response';
import { FedStatus } from '../../../shared/models/fed-status';
import { Hightax } from '../../../shared/models/hightax';
import { OccurrenceData } from '../../../shared/models/occurrence-data';
import { StateStatus } from '../../../shared/models/st-status';
import { Swap } from '../../../shared/models/swap';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://obis.ou.edu/api/obis/';

  constructor(private httpClient: HttpClient) { }

  get_url(url: string, type: string): any {
    if (type === 'api_response') {
      return this.httpClient.get<ApiResponse>(url).pipe(
        retry(1),
        catchError(this.handleError)
      );
    } else if (type === 'acctax') {
      return this.httpClient.get<Acctax>(url).pipe(
        retry(1),
        catchError(this.handleError)
      );
    } else if (type === 'hightax') {
      return this.httpClient.get<Hightax>(url).pipe(
        retry(1),
        catchError(this.handleError)
      );
    } else if (type === 'swap') {
      return this.httpClient.get<Swap>(url).pipe(
        retry(1),
        catchError(this.handleError)
      );
    } else if (type === 'fed_status') {
      return this.httpClient.get<FedStatus>(url).pipe(
        retry(1),
        catchError(this.handleError)
      );
    } else if (type === 'st_status') {
      return this.httpClient.get<StateStatus>(url).pipe(
        retry(1),
        catchError(this.handleError)
      );
    }
  }

  get_url_promise(url: string, type: string): any {
    if (type === 'api_response') {
      return this.httpClient.get<ApiResponse>(url).pipe(
        retry(1),
        catchError(this.handleError)
      ).toPromise();
    } else if (type === 'acctax') {
      return this.httpClient.get<Acctax>(url).pipe(
        retry(1),
        catchError(this.handleError)
      ).toPromise();
    } else if (type === 'hightax') {
      return this.httpClient.get<Hightax>(url).pipe(
        retry(1),
        catchError(this.handleError)
      ).toPromise();
    } else if (type === 'swap') {
      return this.httpClient.get<Swap>(url).pipe(
        retry(1),
        catchError(this.handleError)
      ).toPromise();
    } else if (type === 'fed_status') {
      return this.httpClient.get<FedStatus>(url).pipe(
        retry(1),
        catchError(this.handleError)
      ).toPromise();
    } else if (type === 'st_status') {
      return this.httpClient.get<StateStatus>(url).pipe(
        retry(1),
        catchError(this.handleError)
      ).toPromise();
    }
  }

  get_query(table: string, field: string, query: string) {
    return this.httpClient.get<ApiResponse>(this.baseUrl + table + '/?' + field + '=' + query + '&format=json').pipe(
      retry(1),
      catchError(this.handleError)
    ).toPromise();
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
      return throwError('Something bad happened, please try again later.');
    } else {
      console.error('Backend returned code ' + error.status + ', body was: ' + error.error);
      return throwError('Something bad happened, please try again later.');
    }
  }

  get_occurrence_data(sname: string) {
    return this.httpClient.get<OccurrenceData>('http://obsvweb1.ou.edu/obis_search_old/occurrence-table.php?sname=' + sname);
  }
}
